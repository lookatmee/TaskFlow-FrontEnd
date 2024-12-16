using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using BW_WEB.Pages.Vehicle.Models;
using BW_WEB.Models;
using Microsoft.Extensions.Options;

namespace BW_WEB.Pages.Vehicle
{
  public class Vehicle_TypesModel : PageModel
  {
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<Vehicle_TypesModel> _logger;
    private readonly ApiSettings _apiSettings;
    // Lista de tipos de vehículos
    public List<Vehicle_type> Vehicles_type { get; set; }

    // Propiedad para el vehículo seleccionado
    [BindProperty]
    public Vehicle_type VehicleType { get; set; }

    public Vehicle_type VehicleTypeUpdate { get; set; }
    public Vehicle_TypesModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings, ILogger<Vehicle_TypesModel> logger)
    {
      _httpClientFactory = httpClientFactory;
      _logger = logger;
      _apiSettings = apiSettings.Value;
      Vehicles_type = new List<Vehicle_type>();
      VehicleTypeUpdate = new Vehicle_type();
    }

    
    public async Task<IActionResult> OnGetAsync()
    {
      try
      {
        var client = _httpClientFactory.CreateClient("ApiClient");
        // Realizar una solicitud GET para obtener los tipos de vehículos
        Vehicles_type = await client.GetFromJsonAsync<List<Vehicle_type>>($"{_apiSettings.BaseUrl}/Vehicle_type");
      }
      catch (HttpRequestException ex)
      {
        _logger.LogError(ex, "Error al cargar los tipos de vehículos.");
        ModelState.AddModelError(string.Empty, $"Error inesperado: {ex.Message}");
      }

      return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
      if (VehicleType == null)
      {
        ModelState.AddModelError(string.Empty, "Datos del vehículo no válidos.");
        return Page();
      }

     
        try
        {

          var client = _httpClientFactory.CreateClient("ApiClient");
          var response = await client.PostAsJsonAsync($"{_apiSettings.BaseUrl}/Vehicle_type", VehicleType);

          if (response.IsSuccessStatusCode)
          {
            return RedirectToPage("Vehicle_Types");
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

    public async Task<IActionResult> OnPostEditOrUpdate(string id)
    {
      if (VehicleType == null || string.IsNullOrWhiteSpace(id))
      {
        ModelState.AddModelError(string.Empty, "Datos no válidos para editar el vehículo.");
        return Page();
      }

      try
      {
        

        // Realizar una solicitud PUT para actualizar el vehículo
        var client = _httpClientFactory.CreateClient("ApiClient");
        var response = await client.PutAsJsonAsync($"{_apiSettings.BaseUrl}/Vehicle_type/{id}", VehicleType);

        if (response.IsSuccessStatusCode)
        {
          return RedirectToPage("Vehicle_Types");
        }
        else
        {
          ModelState.AddModelError(string.Empty, $"Error al editar el vehículo: {response.ReasonPhrase}");
        }
      }
      catch (HttpRequestException ex)
      {
        _logger.LogError(ex, "Error al editar el vehículo.");
        ModelState.AddModelError(string.Empty, $"Error inesperado: {ex.Message}");
      }

      return Page();
    }

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
        // Realizar una solicitud DELETE para eliminar el vehículo por ID
        var response = await client.DeleteAsync($"{_apiSettings.BaseUrl}/Vehicle_type/{id}");

        if (response.IsSuccessStatusCode)
        {
          return RedirectToPage("Vehicle_Types");
        }
        else
        {
          ModelState.AddModelError(string.Empty, $"Error al eliminar el tipo vehículo: {response.ReasonPhrase}");
          var errorMessage = "\"Ocurrió un error al intentar eliminar el tipo de vehículo. Esto puede deberse a que hay vehículos asociados a este tipo, o ha ocurrido un problema en el servidor. Por favor, verifica que no haya vehículos asignados y vuelve a intentarlo.\"\r\n";
          return BadRequest( errorMessage ); // Cambia el estado a 400 para manejar el error en el cliente
        }
      }      
      catch (HttpRequestException ex)
      {
        _logger.LogError(ex, "Error al eliminar el tipo vehículo.");
        ModelState.AddModelError(string.Empty, $"Error inesperado: {ex.Message}");
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error al eliminar el tipo vehículo.");
        ModelState.AddModelError(string.Empty, $"Error al eliminar el tipo vehículo: {ex.Message}");
      }

      return Page();
    }
  }

  // Modelos de ejemplo (de acuerdo a tus clases de dominio originales)
 
}
