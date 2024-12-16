namespace BW_WEB.Pages.Vehicle.Models
{
  // Clase que representa una Agencia en el sistema
  public class Agency
  {
    // ID único de la agencia, clave primaria
    public string AgencyID { get; set; }

    // Nombre de la agencia
    public string AgencyName { get; set; }

    // URL de la agencia
    public string AgencyURL { get; set; }

    // Zona horaria de la agencia
    public string AgencyTimezone { get; set; }

    // Idioma de la agencia
    public string AgencyLang { get; set; }

    // Teléfono de contacto de la agencia
    public string AgencyPhone { get; set; }

    // URL de tarifas de la agencia
    public string AgencyFareURL { get; set; }

    // Correo electrónico de la agencia
    public string AgencyEmail { get; set; }
  }
}
