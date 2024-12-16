namespace BW_WEB.Pages.Administration.SystemUsers.Models;

// Clase que representa un Rol en el sistema (por ejemplo: Administrador, Usuario)
public class RolDto
{
  // ID único del rol, que sirve como clave primaria
  public int RolID { get; set; }

  // Nombre del rol (por ejemplo: Administrador, Usuario)
  public string Nombre { get; set; }

  // Descripción opcional del rol, proporcionando detalles adicionales sobre su propósito
  public string Descripcion { get; set; }
}
