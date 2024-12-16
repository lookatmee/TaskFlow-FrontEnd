namespace BW_WEB.Pages.GTFS.Stops.Models;

public class Stop
{
  public int StopID { get; set; }
  public string StopName { get; set; }
  public double StopLat { get; set; }
  public double StopLon { get; set; }
  public int LocationType { get; set; }
  public int WheelchairBoarding { get; set; }

  // Descripciones para mostrar en la vista
  public string LocationTypeDescripcion { get; set; }
  public string WheelchairBoardingDescripcion { get; set; }
}
