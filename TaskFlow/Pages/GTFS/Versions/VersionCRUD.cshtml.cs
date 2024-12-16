using BW_WEB.Models;
using BW_WEB.Pages.GTFS.Versions.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;

namespace BW_WEB.Pages.GTFS.Versions;

public class VersionCRUDModel : PageModel
{
  private readonly IHttpClientFactory HttpClientFactory;
  private readonly ApiSettings ApiSettings;

  public VersionCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    HttpClientFactory = httpClientFactory;
    ApiSettings = apiSettings.Value;

    Versions = new List<GTFSVersion>();
    AvailableEstadosSelectList = new SelectList(Enumerable.Empty<SelectListItem>());
    UpdateVersion = new GTFSVersion();
  }

  [BindProperty]
  public GTFSVersion UpdateVersion { get; set; }

  public List<GTFSVersion> Versions { get; set; }

  public SelectList AvailableEstadosSelectList { get; set; }

  public string ErrorMessage { get; set; }

  // Método que se ejecuta al cargar la página para obtener la lista de versiones desde la API.
  public async Task OnGetAsync()
  {
    try
    {
      var client = HttpClientFactory.CreateClient("ApiClient");
      Versions = await client.GetFromJsonAsync<List<GTFSVersion>>($"{ApiSettings.BaseUrl}/GTFSVersions");

      // Cargar la lista de estados utilizando el método privado
      AvailableEstadosSelectList = new SelectList(GetAvailableEstados());
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

  // Método que se ejecuta al enviar el formulario de actualización de una versión existente.
  public async Task<IActionResult> OnPostEditOrUpdateAsync(int id)
  {
    try
    {
      var client = HttpClientFactory.CreateClient("ApiClient");
      var versionToUpdate = await client.GetFromJsonAsync<GTFSVersion>($"{ApiSettings.BaseUrl}/GTFSVersions/{id}");

      if (versionToUpdate == null)
      {
        ErrorMessage = "La versión no existe.";
        return NotFound();
      }

      // Actualiza los valores de la versión seleccionada
      versionToUpdate.DescripcionVersion = UpdateVersion.DescripcionVersion ;
      versionToUpdate.FechaInicioVersion = UpdateVersion.FechaInicioVersion;
      versionToUpdate.Estado = Enum.TryParse(UpdateVersion.SelectedEstado, out Estado_Version_GTFS_Dto estadoEnum) ? estadoEnum : UpdateVersion.Estado;

      var response = await client.PutAsJsonAsync($"{ApiSettings.BaseUrl}/GTFSVersions/{versionToUpdate.VersionID}", versionToUpdate);

      if (!response.IsSuccessStatusCode)
      {
        ErrorMessage = $"Error al actualizar la versión: {response.ReasonPhrase}";
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

  // Método privado que devuelve una lista de estados desde el enum Estado_Version_GTFS_Dto
  private List<string> GetAvailableEstados()
  {
    return Enum.GetValues(typeof(Estado_Version_GTFS_Dto))
                .Cast<Estado_Version_GTFS_Dto>()
                .Select(e => e.ToString())
                .ToList();
  }
}
