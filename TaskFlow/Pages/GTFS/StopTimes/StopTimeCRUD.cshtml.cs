using BW_WEB.Models;
using BW_WEB.Pages.GTFS.StopTimes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Serilog;

namespace BW_WEB.Pages.GTFS.StopTimes;

public class StopTimeCRUDModel : PageModel
{
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ApiSettings _apiSettings;

  public StopTimeCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    _httpClientFactory = httpClientFactory;
    _apiSettings = apiSettings.Value;
    StopTimesByVersion = new List<StopTime>();
  }

  [BindProperty]
  public int? SelectedVersionID { get; set; }
  public List<SelectListItem> Versions { get; set; }
  public List<StopTime> StopTimesByVersion { get; set; }

  public async Task OnGetAsync()
  {
    await LoadVersionsAsync();
  }

  public async Task OnPostAsync()
  {
    await LoadVersionsAsync();

    if (SelectedVersionID.HasValue)
    {
      await LoadStopTimesByVersionAsync();
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

      SelectedVersionID = versionProd.VersionID;

      if (SelectedVersionID is not null)
      {
        await LoadStopTimesByVersionAsync();
      }
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }

  private async Task LoadStopTimesByVersionAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var stopTimes = await client.GetFromJsonAsync<List<StopTime>>($"{_apiSettings.BaseUrl}/StopTimes?versionId={SelectedVersionID}");

      foreach (var stopTime in stopTimes)
      {
        stopTime.MetodoRecogidaDescripcion = GetMetodoRecogidaDescripcion(stopTime.PickupType);
        stopTime.MetodoEntregaDescripcion = GetMetodoEntregaDescripcion(stopTime.DropOffType);
        stopTime.TipoTiempoDescripcion = GetTipoTiempoDescripcion(stopTime.Timepoint);
      }

      StopTimesByVersion = stopTimes;
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }

  // Helper methods
  private static string GetMetodoRecogidaDescripcion(int tipoRecogida)
  {
    return tipoRecogida switch
    {
      0 => "Recogida programada regularmente",
      1 => "No hay recogida disponible",
      2 => "Debe llamar a la agencia para concertar la recogida",
      3 => "Debe coordinarse con el conductor para organizar la recogida",
      _ => $"[{tipoRecogida}] Código desconocido"
    };
  }

  private static string GetMetodoEntregaDescripcion(int tipoEntrega)
  {
    return tipoEntrega switch
    {
      0 => "Entrega programada regularmente",
      1 => "No hay entrega disponible",
      2 => "Debe llamar a la agencia para concertar la entrega",
      3 => "Debe coordinarse con el conductor para organizar la entrega",
      _ => $"[{tipoEntrega}] Código desconocido"
    };
  }

  private static string GetTipoTiempoDescripcion(int tipoTiempo)
  {
    return tipoTiempo switch
    {
      0 => "Los tiempos de llegada y salida son aproximados",
      1 => "Los tiempos de llegada y salida son exactos",
      _ => $"[{tipoTiempo}] Código desconocido"
    };
  }
}
