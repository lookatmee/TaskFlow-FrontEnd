namespace BW_WEB.Pages.Administration.SystemUsers.Models;

public enum EstadoUsuario
{
  Pendiente = 0,  // El usuario aún no ha establecido su contraseña. No debería tener acceso hasta que complete este paso.
  Activo = 1,     // El usuario ha establecido su contraseña y tiene acceso completo.
  Desactivado = 2 // El usuario no debería poder solicitar restablecer su contraseña ni tener acceso al sistema.
}
