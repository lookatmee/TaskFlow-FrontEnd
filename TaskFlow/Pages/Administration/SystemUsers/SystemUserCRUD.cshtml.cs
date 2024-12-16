//using BW_DATA.Utilities;
using BW_WEB.Models;
using BW_WEB.Pages.Administration.Companies.Models;
using BW_WEB.Pages.Administration.SystemUsers.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;

namespace BW_WEB.Pages.Administration.SystemUsers;

public class SystemUserCRUDModel : PageModel
{
  // Dependencias necesarias: fábrica de clientes HTTP y configuración de API.
  private readonly IHttpClientFactory HttpClientFactory;
  private readonly ApiSettings ApiSettings;

  // Propiedad para almacenar la lista de roles de los usuarios.
  public List<RolDto> RolesDelUsuario { get; set; }

  // Constructor que inicializa las dependencias y las propiedades del modelo.
  public SystemUserCRUDModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    HttpClientFactory = httpClientFactory;  // Inicialización de la fábrica de clientes HTTP.
    ApiSettings = apiSettings.Value;        // Inicialización de la configuración de la API.

    Users = new List<User>();               // Inicializa la lista de usuarios.
    AvailableRolesSelectList = new SelectList(new List<string>()); // Inicializa la lista de roles disponibles.
    RolesDelUsuario = new List<RolDto>();   // Inicializa la lista de roles del usuario.

    AvailableEmpresasSelectList = new SelectList(new List<string>()); //Inicializa la lista de empresas disponibles.

    AvailableEstadoUsuarioSelectList = new SelectList(new List<string>()); //Inicializa la lista de estados para usuario disponibles.


    // Inicialización de las propiedades para el nuevo usuario y el usuario a actualizar.
    NewUser = new User();
    UpdateUser = new User();
  }

  [BindProperty]
  // Propiedad que representa al nuevo usuario, utilizada en el formulario de creación.
  public User NewUser { get; set; }

  [BindProperty]
  // Propiedad que representa al usuario a actualizar, utilizada en el formulario de edición.
  public User UpdateUser { get; set; }

  // Propiedad que almacena la lista de usuarios que se obtienen de la API.
  public List<User> Users { get; set; }

  // Propiedad que almacena la lista de roles disponibles para seleccionar en un dropdown.
  public SelectList AvailableRolesSelectList { get; set; }

  // Propiedad que almacena la lista de empresas disponibles para seleccionar en un dropdown.
  public SelectList AvailableEmpresasSelectList { get; set; }

  // Propiedad que almacena la lista de estados del usuario para seleccionar en un dropdown.
  public SelectList AvailableEstadoUsuarioSelectList { get; set; }

  [BindProperty]
  public List<int> SelectedEmpresaIDs { get; set; }  // Para capturar los IDs seleccionados

  // Propiedad para almacenar mensajes de error que puedan ocurrir durante las operaciones.
  public string ErrorMessage { get; set; }

  // Método que se ejecuta al cargar la página para obtener la lista de usuarios y roles desde la API.
  public async Task OnGetAsync()
  {
    try
    {
      // Crea un cliente HTTP y obtiene los usuarios y roles de la API.
      var client = HttpClientFactory.CreateClient("ApiClient");
      Users = await client.GetFromJsonAsync<List<User>>($"{ApiSettings.BaseUrl}/Usuarios");

      // Asigna los roles disponibles al dropdown.
      AvailableRolesSelectList = new SelectList(GetAvailableRoles(await client.GetFromJsonAsync<List<RolDto>>($"{ApiSettings.BaseUrl}/Roles")));


      var empresas = await client.GetFromJsonAsync<List<Company>>($"{ApiSettings.BaseUrl}/Empresas");
      AvailableEmpresasSelectList = new SelectList(empresas, "EmpresaID", "Nombre");

      var estadosUsuario = Enum.GetValues(typeof(EstadoUsuario))
            .Cast<EstadoUsuario>()
            .Select(e => new { Value = (int)e, Text = e.ToString() })
            .ToList();
      AvailableEstadoUsuarioSelectList = new SelectList(estadosUsuario, "Value", "Text");

    }
    catch (HttpRequestException ex)
    {
      // Maneja errores de conexión y muestra un mensaje de error.
      ErrorMessage = $"Error de conexión: {ex.Message}";
    }
    catch (Exception ex)
    {
      // Maneja errores inesperados y muestra un mensaje de error.
      ErrorMessage = $"Error inesperado: {ex.Message}";
    }
  }

  // Método que se ejecuta al enviar el formulario de creación de un nuevo usuario.
  public async Task<IActionResult> OnPostAsync()
  {
    try
    {
      var client = HttpClientFactory.CreateClient("ApiClient");

      // Verificar si hay empresas seleccionadas
      if (SelectedEmpresaIDs != null && SelectedEmpresaIDs.Count > 0)
      {
        // Obtener la lista de empresas de la API
        var allEmpresas = await client.GetFromJsonAsync<List<Company>>($"{ApiSettings.BaseUrl}/Empresas");

        // Filtrar las empresas seleccionadas usando los IDs capturados
        NewUser.UsuarioEmpresas = new List<UserCompaniesDto>();
        // Filtrar las empresas seleccionadas usando los IDs capturados y asignar a listUserCompanies
        NewUser.UsuarioEmpresas = allEmpresas
            .Where(e => SelectedEmpresaIDs.Contains(e.EmpresaID))  // Filtra las empresas seleccionadas
            .Select(e => new UserCompaniesDto { EmpresaID = e.EmpresaID })  // Crea una lista de UserCompaniesDto
            .ToList();  // Convierte a lista
      }

      // Resto del código para procesar la creación de usuario
      var listaRoles = await client.GetFromJsonAsync<List<RolDto>>($"{ApiSettings.BaseUrl}/Roles");

      var selectedRole = listaRoles.FirstOrDefault(x => x.Nombre == NewUser.SelectedRole);
      if (selectedRole == null)
      {
        ErrorMessage = "El rol seleccionado no es válido.";
        return Page();
      }

      NewUser.RolID = selectedRole.RolID;
      NewUser.Rol = new RolDto { RolID = selectedRole.RolID };

      var response = await client.PostAsJsonAsync($"{ApiSettings.BaseUrl}/Usuarios", NewUser);

      if (response.IsSuccessStatusCode)
      {
        // Realizar la solicitud POST a la API de Email
        var postResponse = await SendForgotPasswordRequestAsync(client, NewUser.Email);

        return RedirectToPage();
      }
      else
      {
        ErrorMessage = $"Error al crear el usuario: {response.ReasonPhrase}";
      }
    }
    catch (HttpRequestException ex)
    {
      ErrorMessage = $"Error de conexión: {ex.Message}";
    }
    catch (Exception ex)
    {
      ErrorMessage = $"Error inesperado: {ex.Message}";
    }
    return Page();
  }


  // Método que se ejecuta al enviar el formulario de actualización de un usuario existente.
  public async Task<IActionResult> OnPostEditOrUpdateAsync(int id)
  {
    try
    {
      var client = HttpClientFactory.CreateClient("ApiClient");

      // Obtener el usuario desde la API
      var userToUpdate = await client.GetFromJsonAsync<User>($"{ApiSettings.BaseUrl}/Usuarios/{id}");

      if (userToUpdate == null)
      {
        ErrorMessage = "El usuario no existe.";
        return NotFound();
      }

      // Procesar el rol seleccionado
      var listaRoles = await client.GetFromJsonAsync<List<RolDto>>($"{ApiSettings.BaseUrl}/Roles");
      var selectedRole = listaRoles.FirstOrDefault(x => x.Nombre == UpdateUser.SelectedRole);

      if (selectedRole == null)
      {
        ErrorMessage = "El rol seleccionado no es válido.";
        return Page();
      }

      // Actualizar los datos del usuario
      userToUpdate.Nombre = UpdateUser.Nombre;
      userToUpdate.Apellidos = UpdateUser.Apellidos;
      userToUpdate.RolID = selectedRole.RolID;
      userToUpdate.Estado = UpdateUser.Estado;

      // Verificar si hay empresas seleccionadas y actualizar la propiedad UsuarioEmpresas
      if (SelectedEmpresaIDs != null && SelectedEmpresaIDs.Count > 0)
      {
        var allEmpresas = await client.GetFromJsonAsync<List<Company>>($"{ApiSettings.BaseUrl}/Empresas");
        userToUpdate.UsuarioEmpresas = allEmpresas
            .Where(e => SelectedEmpresaIDs.Contains(e.EmpresaID))
            .Select(e => new UserCompaniesDto { EmpresaID = e.EmpresaID })
            .ToList();
      }
      else
      {
        // Si no hay empresas seleccionadas, limpiamos la lista
        userToUpdate.UsuarioEmpresas = new List<UserCompaniesDto>();
      }

      // Enviar la solicitud de actualización
      var response = await client.PutAsJsonAsync($"{ApiSettings.BaseUrl}/Usuarios/{id}", userToUpdate);

      if (!response.IsSuccessStatusCode)
      {
        ErrorMessage = $"Error al actualizar el usuario: {response.ReasonPhrase}";
        return Page();
      }

      return RedirectToPage();
    }
    catch (HttpRequestException ex)
    {
      ErrorMessage = $"Error de conexión: {ex.Message}";
    }
    catch (Exception ex)
    {
      ErrorMessage = $"Error inesperado: {ex.Message}";
    }

    return Page();
  }


  // Método que se ejecuta al eliminar un usuario.
  public async Task<IActionResult> OnPostDeleteAsync(int id)
  {
    try
    {
      // Crea un cliente HTTP y envía una solicitud para eliminar el usuario de la API.
      var client = HttpClientFactory.CreateClient("ApiClient");
      var response = await client.DeleteAsync($"{ApiSettings.BaseUrl}/Usuarios/{id}");

      if (!response.IsSuccessStatusCode)
      {
        // Si hubo un error al eliminar, muestra un mensaje de error.
        ErrorMessage = $"Error al eliminar el usuario: {response.ReasonPhrase}";
      }
    }
    catch (HttpRequestException ex)
    {
      ErrorMessage = $"Error de conexión: {ex.Message}";
    }
    catch (Exception ex)
    {
      ErrorMessage = $"Error inesperado: {ex.Message}";
    }
    return RedirectToPage();
  }


  [HttpPost]
  public async Task<IActionResult> OnPostChangePasswordAsync([FromBody] ChangePasswordModel model)
  {
    try
    {
      // Crear el cliente HTTP
      var client = HttpClientFactory.CreateClient("ApiClient");

      // Buscar el usuario por ID para verificar su existencia
      var userExists = await client.GetFromJsonAsync<User>($"{ApiSettings.BaseUrl}/Usuarios/{model.Id}");

      if (userExists == null)
      {
        return NotFound("Usuario no encontrado.");
      }

      // Asignar la contraseña hasheada al modelo
      model.NewPassword = "";

      // Enviar la solicitud POST para cambiar la contraseña
      var response = await client.PostAsJsonAsync($"{ApiSettings.BaseUrl}/Usuarios/ChangePassword", model);

      if (!response.IsSuccessStatusCode)
      {
        return StatusCode((int)response.StatusCode, "Error al actualizar la contraseña.");
      }

      return new JsonResult(new { message = "Contraseña actualizada correctamente." });
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Error inesperado: {ex.Message}");
    }
  }


  public async Task<HttpResponseMessage> SendForgotPasswordRequestAsync(HttpClient client, string email)
  {
    // Crear el objeto ForgotPasswordRequest
    var forgotPasswordRequest = new ForgotPasswordRequest
    {
      Email = email
    };

    // Realizar la solicitud POST a la API
    var postResponse = await client.PostAsJsonAsync($"{ApiSettings.BaseUrl}/Email/ForgotPassword", forgotPasswordRequest);

    // Devolver la respuesta de la API
    return postResponse;
  }



  public class ChangePasswordModel
  {
    public int Id { get; set; }
    public string NewPassword { get; set; }
  }

  // Método privado que devuelve una lista de nombres de roles desde un listado de objetos RolDto.
  private List<string> GetAvailableRoles(List<RolDto> rolsDtos)
  {
    return rolsDtos.Select(r => r.Nombre).ToList();
  }

  public class ForgotPasswordRequest
  {
    public string Email { get; set; }
  }
}
