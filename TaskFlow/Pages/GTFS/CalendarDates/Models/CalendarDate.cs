namespace BW_WEB.Pages.GTFS.CalendarDates.Models;

public class CalendarDate
{
  public string ServiceID { get; set; }
  public int VersionID { get; set; }
  public DateTime Date { get; set; }
  public int ExceptionType { get; set; }

  // Campo para almacenar la descripción de la excepción
  public string ExceptionTypeDescripcion { get; set; }
}
