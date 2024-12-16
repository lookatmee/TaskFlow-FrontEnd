using BW_WEB.Models;
using BW_WEB.Pages.Administration.Companies.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;

namespace BW_WEB.Pages.Administration.Companies;

public class CompanyCRUDModel : PageModel
{
  private readonly IHttpClientFactory HttpClientFactory;
  private readonly ApiSettings ApiSettings;

  public CompanyCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    HttpClientFactory = httpClientFactory;
    ApiSettings = apiSettings.Value;

    Companies = new List<Company>();
    AvailableAgenciesSelectList = new SelectList(new List<string>());
    AvailableSubsistemasSelectList = new SelectList(new List<string>());

    NewCompany = new Company();
    UpdateCompany = new Company();
  }

  [BindProperty]
  public Company NewCompany { get; set; }

  [BindProperty]
  public Company UpdateCompany { get; set; }

  public List<Company> Companies { get; set; }

  public SelectList AvailableAgenciesSelectList { get; set; }
  public SelectList AvailableSubsistemasSelectList { get; set; }

  public string ErrorMessage { get; set; }

  public async Task OnGetAsync()
  {
    try
    {
      var client = HttpClientFactory.CreateClient("ApiClient");

      // Obtener la lista de empresas desde la API
      Companies = await client.GetFromJsonAsync<List<Company>>($"{ApiSettings.BaseUrl}/Empresas");

      // Asignar agencias y subsistemas a los selectores
      AvailableAgenciesSelectList = new SelectList(GetAvailableAgency(await client.GetFromJsonAsync<List<Agency>>($"{ApiSettings.BaseUrl}/Agencies/GetAllAgencies")));
      AvailableSubsistemasSelectList = new SelectList(GetAvailableSubSistema(await client.GetFromJsonAsync<List<SubsistemaTransporte>>($"{ApiSettings.BaseUrl}/SubSistemas")));
    }
    catch (HttpRequestException ex)
    {
      ErrorMessage = $"Error de conexión: {ex.Message}";
    }
    catch (Exception ex)
    {
      ErrorMessage = $"Error inesperado: {ex.Message}";
    }
  }

  public async Task<IActionResult> OnPostAsync()
  {
    try
    {
      var client = HttpClientFactory.CreateClient("ApiClient");

      // Validar Agencia
      var agencias = await client.GetFromJsonAsync<List<Agency>>($"{ApiSettings.BaseUrl}/Agencies/GetAllAgencies");
      var selectedAgency = agencias.FirstOrDefault(x => x.AgencyID == NewCompany.SelectedAgency);
      if (selectedAgency == null)
      {
        ErrorMessage = "La agencia seleccionada no es válida.";
        return Page();
      }

      // Validar Subsistema
      var subsistemas = await client.GetFromJsonAsync<List<SubsistemaTransporte>>($"{ApiSettings.BaseUrl}/SubSistemas");
      var selectedSubsistema = subsistemas.FirstOrDefault(x => x.Nombre == NewCompany.SelectedSubsistemaTransporte);
      if (selectedSubsistema == null)
      {
        ErrorMessage = "El subsistema seleccionado no es válido.";
        return Page();
      }

      // Asignar agencia y subsistema a la nueva empresa
      NewCompany.AgencyID = NewCompany.SelectedAgency;
      NewCompany.SubsistemaTransporte = selectedSubsistema;

      // Crear la empresa a través de la API
      var response = await client.PostAsJsonAsync($"{ApiSettings.BaseUrl}/Empresas", NewCompany);

      if (response.IsSuccessStatusCode)
      {
        return RedirectToPage();
      }
      else
      {
        ErrorMessage = $"Error al crear la empresa: {response.ReasonPhrase}";
      }
    }
    catch (HttpRequestException ex)
    {
      ErrorMessage = $"Error de conexión: {ex.Message}";
    }
    catch (Exception ex)
    {
      ErrorMessage = $"Error inesperado: {ex.Message}";
    }

    return Page();
  }

  public async Task<IActionResult> OnPostEditOrUpdateAsync(int id)
  {
    try
    {
      var client = HttpClientFactory.CreateClient("ApiClient");

      // Obtener la empresa por ID desde la API
      var companyToUpdate = await client.GetFromJsonAsync<Company>($"{ApiSettings.BaseUrl}/Empresas/{id}");

      if (companyToUpdate == null)
      {
        ErrorMessage = "La empresa no existe.";
        return NotFound();
      }

      // Validar Agencia
      var agencias = await client.GetFromJsonAsync<List<Agency>>($"{ApiSettings.BaseUrl}/Agencies/GetAllAgencies");
      var selectedAgency = agencias.FirstOrDefault(x => x.AgencyName == UpdateCompany.SelectedAgency);
      if (selectedAgency == null)
      {
        ErrorMessage = "La agencia seleccionada no es válida.";
        return Page();
      }

      // Validar Subsistema
      var subsistemas = await client.GetFromJsonAsync<List<SubsistemaTransporte>>($"{ApiSettings.BaseUrl}/SubSistemas");
      var selectedSubsistema = subsistemas.FirstOrDefault(x => x.Nombre == UpdateCompany.SelectedSubsistemaTransporte);
      if (selectedSubsistema == null)
      {
        ErrorMessage = "El subsistema seleccionado no es válido.";
        return Page();
      }

      // Asignar datos actualizados
      UpdateCompany.EmpresaID = companyToUpdate.EmpresaID;
      UpdateCompany.AgencyID = selectedAgency.AgencyID;
      UpdateCompany.SubsistemaTransporte = selectedSubsistema;


      // Enviar la solicitud de actualización
      var response = await client.PutAsJsonAsync($"{ApiSettings.BaseUrl}/Empresas/{id}", UpdateCompany);

      if (!response.IsSuccessStatusCode)
      {
        ErrorMessage = $"Error al actualizar la empresa: {response.ReasonPhrase}";
        return Page();
      }

      return RedirectToPage();
    }
    catch (HttpRequestException ex)
    {
      ErrorMessage = $"Error de conexión: {ex.Message}";
    }
    catch (Exception ex)
    {
      ErrorMessage = $"Error inesperado: {ex.Message}";
    }

    return Page();
  }

  public async Task<IActionResult> OnPostDeleteAsync(int id)
  {
    try
    {
      var client = HttpClientFactory.CreateClient("ApiClient");

      // Eliminar la empresa por ID
      var response = await client.DeleteAsync($"{ApiSettings.BaseUrl}/Empresas/{id}");

      if (!response.IsSuccessStatusCode)
      {
        ErrorMessage = $"Error al eliminar la empresa: {response.ReasonPhrase}";
      }
    }
    catch (HttpRequestException ex)
    {
      ErrorMessage = $"Error de conexión: {ex.Message}";
    }
    catch (Exception ex)
    {
      ErrorMessage = $"Error inesperado: {ex.Message}";
    }

    return RedirectToPage();
  }

  private List<string> GetAvailableAgency(List<Agency> rolsDtos)
  {
    return rolsDtos.Select(r => r.AgencyName).ToList();
  }

  private List<string> GetAvailableSubSistema(List<SubsistemaTransporte> rolsDtos)
  {
    return rolsDtos.Select(r => r.Nombre).ToList();
  }
}
