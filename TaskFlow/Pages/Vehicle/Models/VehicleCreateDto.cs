namespace BW_WEB.Pages.Vehicle.Models;

public class VehicleCreateDto
{
  public string VehicleId { get; set; }
  public int EmpresaId { get; set; }
  public string VehicleTypeId { get; set; }
  public string LicensePlate { get; set; }
  public string Label { get; set; }
  public int VehicleStatusTypeId { get; set; }
}
