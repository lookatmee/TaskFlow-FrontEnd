using BW_WEB.Models;
using BW_WEB.Pages.GTFS.CalendarDates.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Serilog;

namespace BW_WEB.Pages.GTFS.CalendarDates;

public class CalendarDateCRUDModel : PageModel
{
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ApiSettings _apiSettings;

  public CalendarDateCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    _httpClientFactory = httpClientFactory;
    _apiSettings = apiSettings.Value;
    CalendarDatesByVersion = new List<CalendarDate>();
  }

  [BindProperty]
  public int? SelectedVersionID { get; set; }
  public List<SelectListItem> Versions { get; set; }
  public List<CalendarDate> CalendarDatesByVersion { get; set; }

  public async Task OnGetAsync()
  {
    await LoadVersionsAsync();
  }

  public async Task OnPostAsync()
  {
    await LoadVersionsAsync();

    if (SelectedVersionID.HasValue)
    {
      await LoadCalendarDatesByVersionAsync();
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
        await LoadCalendarDatesByVersionAsync();
      }
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }

  private async Task LoadCalendarDatesByVersionAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var calendarDates = await client.GetFromJsonAsync<List<CalendarDate>>($"{_apiSettings.BaseUrl}/CalendarDates?versionId={SelectedVersionID}");

      // Asignar las descripciones utilizando el helper
      foreach (var calendarDate in calendarDates)
      {
        calendarDate.ExceptionTypeDescripcion = CalendarDateHelper.GetExceptionTypeDescription(calendarDate.ExceptionType);
      }

      CalendarDatesByVersion = calendarDates;
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }
}

// Helper para obtener las descripciones de los tipos de excepción
public static class CalendarDateHelper
{
  public static string GetExceptionTypeDescription(int exceptionType)
  {
    return exceptionType switch
    {
      1 => "Servicio agregado para la fecha establecida",
      2 => "Servicio eliminado para la fecha establecida",
      _ => "[" + exceptionType + "] Código desconocido"
    };
  }
}
