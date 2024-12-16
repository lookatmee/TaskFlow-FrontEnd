using BW_WEB.Models;
using BW_WEB.Pages.Vehicle.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Empresa = BW_WEB.Pages.Vehicle.Models.Empresa;

namespace BW_WEB.Pages.Vehicle;

public class VehicleModel : PageModel
{
  // Dependencias necesarias: fábrica de clientes HTTP y configuración de API.
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ApiSettings _apiSettings;
  private readonly ILogger<VehicleModel> _logger;

  // Propiedades para almacenar datos.
  public List<BW_WEB.Pages.Vehicle.Models.Vehicle> Vehicles { get; set; }

  [BindProperty]
  public BW_WEB.Pages.Vehicle.Models.Vehicle Vehicle { get; set; } // Variable reorganizada para claridad

  public List<SelectListItem> EmpresaList { get; set; }
  public List<SelectListItem> VehicleTypes { get; set; }
  public List<SelectListItem> VehicleStatus { get; set; }
  public BW_WEB.Pages.Vehicle.Models.Vehicle updateVehicle { get; set; }
  // Constructor
  public VehicleModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings, ILogger<VehicleModel> logger)
  {
    _httpClientFactory = httpClientFactory;  // Inicialización de la fábrica de clientes HTTP.
    _apiSettings = apiSettings.Value;        // Inicialización de la configuración de la API.
    _logger = logger;
    Vehicles = new List<BW_WEB.Pages.Vehicle.Models.Vehicle>(); // Inicialización de la lista de vehículos
    EmpresaList = new List<SelectListItem>(); // Inicialización de la lista de agencias
    VehicleTypes = new List<SelectListItem>(); // Inicialización de la lista de tipos de vehículos
    VehicleStatus = new List<SelectListItem>(); // Inicialización de la lista de status de vehículos
    updateVehicle = new BW_WEB.Pages.Vehicle.Models.Vehicle();
  }

  // Método para obtener los vehículos, agencias y tipos de vehículos
  public async Task<IActionResult> OnGetAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");

      // Intentar obtener la lista de vehículos desde la API
      try
      {
        Vehicles = await client.GetFromJsonAsync<List<BW_WEB.Pages.Vehicle.Models.Vehicle>>($"{_apiSettings.BaseUrl}/Vehicles");
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error al cargar la lista de vehículos.");
        Vehicles = new List<BW_WEB.Pages.Vehicle.Models.Vehicle>(); // Asignar una lista vacía si hay un error
        ModelState.AddModelError(string.Empty, $"Error al obtener la lista de vehículos: {ex.Message}");
      }

      // Intentar obtener y mapear la lista de agencias desde la API
      List<Empresa> agenciesFromApi = new List<Empresa>();
      try
      {
        agenciesFromApi = await client.GetFromJsonAsync<List<Empresa>>($"{_apiSettings.BaseUrl}/Empresas");
        EmpresaList = agenciesFromApi.Select(a => new SelectListItem
        {
          Value = a.EmpresaID.ToString(),
          Text = a.Nombre
        }).ToList();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error al cargar la lista de agencias.");
        EmpresaList = new List<SelectListItem>(); // Asignar una lista vacía si hay un error
        ModelState.AddModelError(string.Empty, $"Error al obtener la lista de agencias: {ex.Message}");
      }

      // Asignar el nombre de la empresa a cada vehículo
      Vehicles.ForEach(vehicle =>
      {
        if (vehicle.Empresa == null)
        {
          vehicle.Empresa = new Empresa();
        }

        var matchingAgency = agenciesFromApi.FirstOrDefault(agency => agency.EmpresaID == vehicle.EmpresaID);
        if (matchingAgency != null)
        {
          vehicle.Empresa.Nombre = matchingAgency.Nombre;
        }
      });

      // Intentar obtener y mapear la lista de tipos de vehículos desde la API
      try
      {
        var vehicleTypesFromApi = await client.GetFromJsonAsync<List<BW_WEB.Pages.Vehicle.Models.Vehicle_type>>($"{_apiSettings.BaseUrl}/Vehicle_type");
        VehicleTypes = vehicleTypesFromApi.Select(vt => new SelectListItem
        {
          Value = vt.vehicle_type_id.ToString(),
          Text = vt.name
        }).ToList();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error al cargar la lista de tipos de vehículos.");
        VehicleTypes = new List<SelectListItem>(); // Asignar una lista vacía si hay un error
        ModelState.AddModelError(string.Empty, $"Error al obtener la lista de tipos de vehículos: {ex.Message}");
      }

      //Intentar obtener y mapear la lista de statud de vehículos desde la API
      try
      {
        var vehicleStatusFromApi = await client.GetFromJsonAsync<List<BW_WEB.Pages.Vehicle.Models.Vehicle_status_type>>($"{_apiSettings.BaseUrl}/VehicleStatusType");
        VehicleStatus = vehicleStatusFromApi.Select(vs => new SelectListItem
        {
          Value = vs.Vehicle_status_type_id.ToString(),
          Text = vs.Name
        }).ToList();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error al cargar la lista de status de vehículos.");
        EmpresaList = new List<SelectListItem>(); // Asignar una lista vacía si hay un error
        ModelState.AddModelError(string.Empty, $"Error al obtener la lista de status de vehículos: {ex.Message}");
      }
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error inesperado al cargar los datos.");
      ModelState.AddModelError(string.Empty, $"Error inesperado: {ex.Message}");
    }

    return Page();
  }


  // Método para obtener un vehículo específico
  public async Task<IActionResult> OnGetVehicleAsync(string id)
  {
    if (string.IsNullOrWhiteSpace(id))
    {
      ModelState.AddModelError(string.Empty, "El ID del vehículo es requerido.");
      return Page();
    }

    try
    {
      var client = _httpClientFactory.CreateClient();
      Vehicle = await client.GetFromJsonAsync<BW_WEB.Pages.Vehicle.Models.Vehicle>($"{_apiSettings.BaseUrl}/Vehicles/{id}");
     
      if (Vehicle == null)
      {
        return NotFound("Vehículo no encontrado.");
      }
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error al obtener el vehículo.");
      ModelState.AddModelError(string.Empty, $"Error inesperado: {ex.Message}");
    }

    return Page();
  }

  // Método para crear un nuevo vehículo
  public async Task<IActionResult> OnPostAsync()
  {
    
    try
    {
      VehicleCreateDto vehicleCreateDto = new VehicleCreateDto
      {
        EmpresaId = Vehicle.EmpresaID,
        Label = Vehicle.label,
        LicensePlate = Vehicle.license_plate,
        VehicleId = Vehicle.vehicle_id,
        VehicleStatusTypeId = Vehicle.Vehicle_status_type_id,
        VehicleTypeId = Vehicle.Vehicle_type_id
      };

      var client = _httpClientFactory.CreateClient("ApiClient");
      var response = await client.PostAsJsonAsync($"{_apiSettings.BaseUrl}/Vehicles", vehicleCreateDto);

      if (response.IsSuccessStatusCode)
      {
        return RedirectToPage("Vehicle");
      }

      ModelState.AddModelError(string.Empty, "Error al crear el vehículo.");
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error al crear el vehículo.");
      ModelState.AddModelError(string.Empty, $"Error al crear el vehículo: {ex.Message}");
    }

    return Page();
  }

  // Método para editar un vehículo existente
  public async Task<IActionResult> OnPostEditOrUpdate(string id)
  {
    if (Vehicle == null || string.IsNullOrWhiteSpace(id))
    {
      ModelState.AddModelError(string.Empty, "Datos no válidos para editar el vehículo.");
      return Page();
    }

    try
    {
      Vehicle.vehicle_id = id;
      var client = _httpClientFactory.CreateClient("ApiClient");
      var response = await client.PutAsJsonAsync($"{_apiSettings.BaseUrl}/Vehicles/{id}", Vehicle);

      if (response.IsSuccessStatusCode)
      {
        return RedirectToPage("Vehicle");
      }


      ModelState.AddModelError(string.Empty, "Error al editar el vehículo.");
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error al editar el vehículo.");
      ModelState.AddModelError(string.Empty, $"Error al editar el vehículo: {ex.Message}");
    }

    return Page();
  }

  // Método para eliminar un vehículo
  public async Task<IActionResult> OnPostDeleteAsync(string id)
  {
    if (string.IsNullOrWhiteSpace(id))
    {
      ModelState.AddModelError(string.Empty, "El ID del vehículo es requerido.");
      return Page();
    }

    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var response = await client.DeleteAsync($"{_apiSettings.BaseUrl}/Vehicles/{id}");

      if (response.IsSuccessStatusCode)
      {
        return RedirectToPage("Vehicle");
      }

      ModelState.AddModelError(string.Empty, "Error al eliminar el vehículo.");
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error al eliminar el vehículo.");
      ModelState.AddModelError(string.Empty, $"Error al eliminar el vehículo: {ex.Message}");
    }

    return Page();
  }
}
