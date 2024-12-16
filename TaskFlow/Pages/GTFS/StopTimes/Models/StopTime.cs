namespace BW_WEB.Pages.GTFS.StopTimes.Models;

public class StopTime
{
  public int TripID { get; set; }
  public int VersionID { get; set; }
  public TimeSpan? ArrivalTime { get; set; }
  public TimeSpan? DepartureTime { get; set; }
  public int StopID { get; set; }
  public int StopSequence { get; set; }
  public string? StopHeadsign { get; set; }
  public int PickupType { get; set; }
  public int DropOffType { get; set; }
  public double ShapeDistTraveled { get; set; }
  public int Timepoint { get; set; }

  // Propiedades para las descripciones
  public string MetodoRecogidaDescripcion { get; set; }
  public string MetodoEntregaDescripcion { get; set; }
  public string TipoTiempoDescripcion { get; set; }
}
