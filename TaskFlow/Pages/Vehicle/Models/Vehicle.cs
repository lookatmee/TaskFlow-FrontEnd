using System.ComponentModel.DataAnnotations;

namespace BW_WEB.Pages.Vehicle.Models;

public class Vehicle
{
  [Key]
  public string vehicle_id { get; set; }

  public int EmpresaID { get; set; }
  public Empresa Empresa { get; set; }
  public string Vehicle_type_id { get; set; }
  public Vehicle_type? Vehicle_type { get; set; }
  public string license_plate { get; set; }

  public string label { get; set; }

  public int Vehicle_status_type_id {get; set;}

}



