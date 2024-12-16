namespace BW_WEB.Pages.GTFS.Versions.Models;

public class GTFSVersion
{
  public int VersionID { get; set; } // Clave primaria
  public string? DescripcionVersion { get; set; }
  public DateTime? FechaInicioVersion { get; set; }
  public string? SelectedEstado { get; set; } = string.Empty;
  public Estado_Version_GTFS_Dto Estado { get; set; }
}
