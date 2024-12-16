using System.ComponentModel.DataAnnotations;

namespace BW_WEB.Pages.Vehicle.Models;

public class Vehicle_status_type
{
  [Key]
  public int Vehicle_status_type_id { get; set; }

  [Required]
  [StringLength(100)]
  public string Name { get; set; }

  public bool IsActive { get; set; }
}
