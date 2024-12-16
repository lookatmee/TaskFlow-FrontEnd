namespace BW_WEB.Pages.Administration.SystemUsers.Models;

// Clase que representa un Usuario en el sistema
public class User
{
  // ID único del usuario, que sirve como clave primaria
  public int UsuarioID { get; set; }

  // Dirección de correo electrónico del usuario
  public string Email { get; set; }

  // Nombre del usuario
  public string Nombre { get; set; }

  // Apellidos del usuario
  public string Apellidos { get; set; }

  // Contraseña del usuario en formato hash (encriptada)
  public string? PasswordHash { get; set; }

  // Rol seleccionado por el usuario. Representa el rol actual del usuario en el sistema.
  // Puede ser nulo en caso de que no se haya asignado un rol.
  public string? SelectedRole { get; set; } = string.Empty;

  // ID del rol asociado al usuario, que sirve como clave foránea para enlazar con la entidad RolDto
  public int RolID { get; set; }

  // Objeto RolDto que contiene la información detallada del rol asignado al usuario
  public RolDto Rol { get; set; }

  // Lista nullable para manejar el caso en que no se asocien empresas al usuario
  public List<UserCompaniesDto>? UsuarioEmpresas { get; set; }

  public int Estado { get; set; }


}
