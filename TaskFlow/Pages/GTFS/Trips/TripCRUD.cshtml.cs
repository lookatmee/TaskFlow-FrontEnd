using BW_WEB.Models;
using BW_WEB.Pages.GTFS.Trips.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Serilog;

namespace BW_WEB.Pages.GTFS.Trips;

public class TripCRUDModel : PageModel
{
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ApiSettings _apiSettings;

  public TripCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    _httpClientFactory = httpClientFactory;
    _apiSettings = apiSettings.Value;
    TripsByVersion = new List<Trip>();
  }

  [BindProperty]
  public int? SelectedVersionID { get; set; }
  public List<SelectListItem> Versions { get; set; }
  public List<Trip> TripsByVersion { get; set; }

  public async Task OnGetAsync()
  {
    // Cargar versiones
    await LoadVersionsAsync();
  }

  public async Task OnPostAsync()
  {
    // Cargar versiones
    await LoadVersionsAsync();

    // Si se seleccionó una versión, se cargarán los trips
    if (SelectedVersionID.HasValue)
    {
      await LoadTripsByVersionAsync();
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
        await LoadTripsByVersionAsync();
      }

    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }

  private async Task LoadTripsByVersionAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var trips = await client.GetFromJsonAsync<List<Trip>>($"{_apiSettings.BaseUrl}/Trips/Version/{SelectedVersionID}");

      // Procesamos cada trip y generamos las descripciones
      foreach (var trip in trips)
      {
        trip.DirectionDescripcion = TripDireccionHelper.GetDescripcion((TripDireccion)trip.DirectionID);
        trip.WheelchairAccessibleDescripcion = TipoAccesibilidadTripHelper.GetDescripcion((TipoAccesibilidadTrip)trip.WheelchairAccessible);
        trip.BikesAllowedDescripcion = TipoAccesoVehiculosTripHelper.GetDescripcion((TipoAccesoVehiculosTrip)trip.BikesAllowed);
      }

      TripsByVersion = trips;
    }
    catch (Exception ex)
    {
      Log.Error(ex, ex.Message);
    }
  }
}

// Helpers para obtener las descripciones de los enumeradores
public static class TripDireccionHelper
{
  public static string GetDescripcion(TripDireccion direccion)
  {
    switch (direccion)
    {
      case TripDireccion.Ida:
        return "Ida";
      case TripDireccion.Vuelta:
        return "Vuelta";
      default:
        return "[" + (int)direccion + "] Código desconocido";
    }
  }
}

public static class TipoAccesibilidadTripHelper
{
  public static string GetDescripcion(TipoAccesibilidadTrip tipoAccesibilidad)
  {
    switch (tipoAccesibilidad)
    {
      case TipoAccesibilidadTrip.SinInformacionAccesibilidad:
        return "Sin información accesibilidad";
      case TipoAccesibilidadTrip.ConEspacioReservado:
        return "Con al menos un espacio reservado";
      case TipoAccesibilidadTrip.SinEspacioReservado:
        return "Sin espacio reservado";
      default:
        return "[" + (int)tipoAccesibilidad + "] Código desconocido";
    }
  }
}

public static class TipoAccesoVehiculosTripHelper
{
  public static string GetDescripcion(TipoAccesoVehiculosTrip tipoAcceso)
  {
    switch (tipoAcceso)
    {
      case TipoAccesoVehiculosTrip.SinInformacionParaBicicletas:
        return "Sin información para bicicletas";
      case TipoAccesoVehiculosTrip.CapacidadParaUnaBicicleta:
        return "Capacidad al menos para una bicicleta";
      case TipoAccesoVehiculosTrip.NoPermiteBicicletas:
        return "No permite bicicletas a bordo";
      default:
        return "[" + (int)tipoAcceso + "] Código desconocido";
    }
  }
}
