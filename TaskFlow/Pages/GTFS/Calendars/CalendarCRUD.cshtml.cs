using BW_WEB.Models;
using BW_WEB.Pages.GTFS.Calendars.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Serilog;

namespace BW_WEB.Pages.GTFS.Calendars;

public class CalendarCRUDModel : PageModel
{
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ApiSettings _apiSettings;

  public CalendarCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    _httpClientFactory = httpClientFactory;
    _apiSettings = apiSettings.Value;
    CalendarsByVersion = new List<Calendar>();
  }

  [BindProperty]
  public int? SelectedVersionID { get; set; }
  public List<SelectListItem> Versions { get; set; }
  public List<Calendar> CalendarsByVersion { get; set; }

  public async Task OnGetAsync()
  {
    await LoadVersionsAsync();
  }

  public async Task OnPostAsync()
  {
    await LoadVersionsAsync();

    if (SelectedVersionID.HasValue)
    {
      await LoadCalendarsByVersionAsync();
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
        await LoadCalendarsByVersionAsync();
      }

    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }

  private async Task LoadCalendarsByVersionAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var calendars = await client.GetFromJsonAsync<List<Calendar>>($"{_apiSettings.BaseUrl}/Calendars?versionId={SelectedVersionID}");

      CalendarsByVersion = calendars;
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }
}
