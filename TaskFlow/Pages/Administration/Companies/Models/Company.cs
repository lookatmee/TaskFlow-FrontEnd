namespace BW_WEB.Pages.Administration.Companies.Models
{
  // Clase que representa una Empresa en el sistema
  public class Company
  {
    // ID único de la empresa, que sirve como clave primaria
    public int EmpresaID { get; set; }

    // Nombre corto de la empresa
    public string Nombre { get; set; }

    // Nombre largo o formal de la empresa
    public string NombreLargo { get; set; }

    // Dirección de la empresa
    public string Direccion { get; set; }

    // Teléfono de contacto de la empresa
    public string Telefono { get; set; }

    // Email de contacto de la empresa
    public string Email { get; set; }

    // ID de la agencia seleccionada
    public string? SelectedAgency { get; set; } = string.Empty;

    //ID de la agencia seleccionada
    public string AgencyID { get; set; }

    // Objeto relacionado con la Agencia
    public Agency Agency { get; set; }

    // ID del subsistema de transporte seleccionado
    public string? SelectedSubsistemaTransporte { get; set; }

    // Objeto relacionado con el Subsistema de Transporte
    public SubsistemaTransporte SubsistemaTransporte { get; set; }
  }
}
