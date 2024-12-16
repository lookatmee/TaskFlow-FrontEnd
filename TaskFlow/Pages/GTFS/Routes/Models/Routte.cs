namespace BW_WEB.Pages.GTFS.Routes.Models;

public class Routte
{
  public int RouteID { get; set; }
  public int VersionID { get; set; }
  public string AgencyID { get; set; }
  public string RouteShortName { get; set; }
  public string RouteLongName { get; set; }
  public string? RouteDesc { get; set; }
  public int RouteType { get; set; } // El tipo de ruta como valor entero del enumerador TipoRuta
  public string? RouteURL { get; set; }
  public string? RouteColor { get; set; } // Color de fondo de la ruta
  public string? RouteTextColor { get; set; } // Color del texto de la ruta

  // Propiedad adicional para mostrar la descripción del tipo de ruta en la vista
  public string TipoRutaDescripcion { get; set; }
}
