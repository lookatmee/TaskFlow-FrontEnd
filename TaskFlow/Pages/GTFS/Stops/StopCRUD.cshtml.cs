using BW_WEB.Models;
using BW_WEB.Pages.GTFS.Stops.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Serilog;

namespace BW_WEB.Pages.GTFS.Stops;

public class StopCRUDModel : PageModel
{
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ApiSettings _apiSettings;

  public StopCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    _httpClientFactory = httpClientFactory;
    _apiSettings = apiSettings.Value;
    StopsByVersion = new List<Stop>();
  }

  [BindProperty]
  public int? SelectedVersionID { get; set; }
  public List<SelectListItem> Versions { get; set; }
  public List<Stop> StopsByVersion { get; set; }

  public async Task OnGetAsync()
  {
    await LoadVersionsAsync();
  }

  public async Task OnPostAsync()
  {
    await LoadVersionsAsync();

    if (SelectedVersionID.HasValue)
    {
      await LoadStopsByVersionAsync();
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
        await LoadStopsByVersionAsync();
      }
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }

  private async Task LoadStopsByVersionAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var stops = await client.GetFromJsonAsync<List<Stop>>($"{_apiSettings.BaseUrl}/Stops?versionId={SelectedVersionID}");

      // Procesar las descripciones de cada stop
      foreach (var stop in stops)
      {
        stop.LocationTypeDescripcion = TipoLocalizacionHelper.GetDescripcion((TipoLocalizacion)stop.LocationType);
        stop.WheelchairBoardingDescripcion = TipoAccesibilidadHelper.GetDescripcion((TipoAccesibilidad)stop.WheelchairBoarding);
      }

      StopsByVersion = stops;
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }
}



public static class TipoLocalizacionHelper
{
  public static string GetDescripcion(TipoLocalizacion tipoLocalizacion)
  {
    switch (tipoLocalizacion)
    {
      case TipoLocalizacion.Plataforma:
        return "Plataforma";
      case TipoLocalizacion.Estacion:
        return "Estación";
      case TipoLocalizacion.EntradaSalida:
        return "Entrada/Salida";
      case TipoLocalizacion.NodoGenerico:
        return "Nodo genérico";
      case TipoLocalizacion.ZonaDeEmbarque:
        return "Zona de embarque";
      default:
        return "[" + (int)tipoLocalizacion + "] Código desconocido";
    }
  }
}

public static class TipoAccesibilidadHelper
{
  public static string GetDescripcion(TipoAccesibilidad tipoAccesibilidad)
  {
    switch (tipoAccesibilidad)
    {
      case TipoAccesibilidad.SinInformacion:
        return "Sin información accesibilidad";
      case TipoAccesibilidad.ConEmbarqueAccesible:
        return "Con posibilidad de embarque de accesibilidad";
      case TipoAccesibilidad.SinEmbarqueAccesible:
        return "Sin embarque de accesibilidad";
      default:
        return "[" + (int)tipoAccesibilidad + "] Código desconocido";
    }
  }
}
