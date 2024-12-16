namespace BW_WEB.Pages.GTFS.Trips.Models;

public class Trip
{
  public int TripID { get; set; }
  public int RouteID { get; set; }
  public string ServiceID { get; set; }
  public string TripHeadsign { get; set; }
  public string ShapeID { get; set; }

  public int DirectionID { get; set; }
  public int WheelchairAccessible { get; set; }
  public int BikesAllowed { get; set; }

  // Descripciones para mostrar en la vista
  public string DirectionDescripcion { get; set; }
  public string WheelchairAccessibleDescripcion { get; set; }
  public string BikesAllowedDescripcion { get; set; }
}
