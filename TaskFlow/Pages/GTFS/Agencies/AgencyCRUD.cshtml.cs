using BW_WEB.Models;
using BW_WEB.Pages.GTFS.Agencies.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Serilog;

namespace BW_WEB.Pages.GTFS.Agencies;

public class AgencyCRUDModel : PageModel
{
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ApiSettings _apiSettings;

  public AgencyCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    _httpClientFactory = httpClientFactory;
    _apiSettings = apiSettings.Value;
    AgenciesByVersion = new List<Agency>();
  }

  [BindProperty]
  public int? SelectedVersionID { get; set; }
  public List<SelectListItem> Versions { get; set; }
  public List<Agency> AgenciesByVersion { get; set; }

  public async Task OnGetAsync()
  {
    // Cargar versiones
    await LoadVersionsAsync();
  }

  public async Task OnPostAsync()
  {
    // Cargar versiones
    await LoadVersionsAsync();

    // Si se seleccionó una versión, se cargarán las agencias
    if (SelectedVersionID.HasValue)
    {
      await LoadAgenciesByVersionAsync();
    }
  }

  private async Task LoadVersionsAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var response = await client.GetFromJsonAsync<List<GTFSVersion>>($"{_apiSettings.BaseUrl}/gtfsversions");

      Versions = response.Select(v => new SelectListItem
      {
        Value = v.VersionID.ToString(),
        Text = v.DescripcionVersion
      }).ToList();

      var versionProd = await client.GetFromJsonAsync<GTFSVersion>($"{_apiSettings.BaseUrl}/gtfsversions/VersionPRoduccion");

      SelectedVersionID = versionProd.VersionID;

      if (SelectedVersionID is not null)
      {
        await LoadAgenciesByVersionAsync();
      }
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }

  private async Task LoadAgenciesByVersionAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var agencies = await client.GetFromJsonAsync<List<Agency>>($"{_apiSettings.BaseUrl}/Agencies/Version/{SelectedVersionID}");
      AgenciesByVersion = agencies;
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }
}
