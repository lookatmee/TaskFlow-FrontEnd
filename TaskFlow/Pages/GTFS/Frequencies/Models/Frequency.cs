namespace BW_WEB.Pages.GTFS.Frequencies.Models;

public class Frequency
{
  public int TripID { get; set; }
  public TimeSpan StartTime { get; set; }
  public TimeSpan EndTime { get; set; }
  public int HeadwaySecs { get; set; }
  public int ExactTimes { get; set; }

  // Propiedades de descripción
  public string HeadwaySecsDescripcion { get; set; }
  public string ExactTimesDescripcion { get; set; }
}
