using BW_WEB.Pages.Vehicle.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BW_WEB.Pages.Vehicle.Models
{
    public class Vehicle_type
    {
        [Key]
        public string vehicle_type_id { get; set; }
        public string name { get; set; }
        public ICollection<Vehicle> Vehicles{ get; set; }
    }
}
