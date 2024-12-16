using BW_WEB.Models;
using BW_WEB.Pages.GTFS.Frequencies.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Serilog;

namespace BW_WEB.Pages.GTFS.Frequencies;

public class FrequencyCRUDModel : PageModel
{
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ApiSettings _apiSettings;

  public FrequencyCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    _httpClientFactory = httpClientFactory;
    _apiSettings = apiSettings.Value;
    FrequenciesByVersion = new List<Frequency>();
  }

  [BindProperty]
  public int? SelectedVersionID { get; set; }
  public List<SelectListItem> Versions { get; set; }
  public List<Frequency> FrequenciesByVersion { get; set; }

  public async Task OnGetAsync()
  {
    await LoadVersionsAsync();
  }

  public async Task OnPostAsync()
  {
    await LoadVersionsAsync();

    if (SelectedVersionID.HasValue)
    {
      await LoadFrequenciesByVersionAsync();
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
        await LoadFrequenciesByVersionAsync();
      }
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }

  private async Task LoadFrequenciesByVersionAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var frequencies = await client.GetFromJsonAsync<List<Frequency>>($"{_apiSettings.BaseUrl}/Frequencies?versionId={SelectedVersionID}");

      foreach (var frequency in frequencies)
      {
        frequency.HeadwaySecsDescripcion = FrequencyHelper.GetTiemposString(frequency.HeadwaySecs);
        frequency.ExactTimesDescripcion = FrequencyHelper.GetTipoTiempoServicio(frequency.ExactTimes);
      }

      FrequenciesByVersion = frequencies;
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }
}

// Helpers
public static class FrequencyHelper
{
  public static string GetTiemposString(int tiempoSec)
  {
    if (tiempoSec <= 60)
    {
      return tiempoSec + " segundos";
    }
    else if (tiempoSec > 60 && tiempoSec <= 3600)
    {
      var res = (tiempoSec / 60) == 1 ? " minuto" : " minutos";
      return (tiempoSec / 60) + res;
    }
    else
    {
      var res = ((tiempoSec / 60) / 60) == 1 ? " hora" : " horas";
      return ((tiempoSec / 60) / 60) + res;
    }
  }

  public static string GetTipoTiempoServicio(int tipoAccesibilidad)
  {
    return tipoAccesibilidad switch
    {
      0 => "Viajes basados en frecuencias",
      1 => "Viajes basados en horarios exactos",
      _ => "[" + tipoAccesibilidad + "] Código desconocido"
    };
  }
}
