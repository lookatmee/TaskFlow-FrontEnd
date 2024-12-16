using BW_WEB.Models;
using BW_WEB.Pages.GTFS.Routes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Serilog;

namespace BW_WEB.Pages.GTFS.Routes;

public class RouteCRUDModel : PageModel
{
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ApiSettings _apiSettings;

  public RouteCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    _httpClientFactory = httpClientFactory;
    _apiSettings = apiSettings.Value;
    RoutesByVersion = new List<Routte>();
  }

  [BindProperty]
  public int? SelectedVersionID { get; set; }
  public List<SelectListItem> Versions { get; set; }
  public List<Routte> RoutesByVersion { get; set; }

  public async Task OnGetAsync()
  {
    await LoadVersionsAsync();
  }

  public async Task OnPostAsync()
  {
    await LoadVersionsAsync();

    if (SelectedVersionID.HasValue)
    {
      await LoadRoutesByVersionAsync();
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

      var versionProd = await client.GetFromJsonAsync<GTFSVersion>($"{_apiSettings.BaseUrl}/gtfsversions/VersionProduccion");
      SelectedVersionID = versionProd?.VersionID;

      if (SelectedVersionID is not null)
      {
        await LoadRoutesByVersionAsync();
      }
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }

  private async Task LoadRoutesByVersionAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var routes = await client.GetFromJsonAsync<List<Routte>>($"{_apiSettings.BaseUrl}/Routes/Version/{SelectedVersionID}");

      foreach (var route in routes)
      {
        route.TipoRutaDescripcion = TipoRutaHelper.GetDescripcion((TipoRuta)route.RouteType);
      }

      RoutesByVersion = routes;
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }
}

public static class TipoRutaHelper
{
  public static string GetDescripcion(TipoRuta tipoRuta)
  {
    return tipoRuta switch
    {
      TipoRuta.TranviaTrenLigero => "Tranvía, Tren ligero",
      TipoRuta.Metro => "Metro",
      TipoRuta.Carril => "Carril",
      TipoRuta.Autobus => "Autobús",
      TipoRuta.Transbordador => "Transbordador",
      TipoRuta.Teleferico => "Teleférico",
      TipoRuta.TelefericoSuspendido => "Teleférico - teleférico suspendido",
      TipoRuta.Funicular => "Funicular",
      TipoRuta.Trolebus => "Trolebús",
      TipoRuta.Monorrail => "Monorraíl",
      _ => $"[{(int)tipoRuta}] Código desconocido",
    };
  }
}
