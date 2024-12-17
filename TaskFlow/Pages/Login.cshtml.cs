using BW_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using System.Text.Json;
using System.Text;

namespace BW_WEB.Pages
{
  public class LoginModel : PageModel
  {
    private readonly ApiSettings _apiSettings;

    public LoginModel(IOptions<ApiSettings> apiSettings)
    {
      _apiSettings = apiSettings.Value;
    }

    [BindProperty]
    public string Email { get; set; }

    [BindProperty]
    public string Password { get; set; }

    public string ErrorMessage { get; set; }

    // Handler for login form
    public async Task<IActionResult> OnPostLoginAsync()
    {
      // Validación adicional del lado del servidor
      if (string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(Password))
      {
        ErrorMessage = "Debe ingresar un email y contraseña válidos.";
        return Page();
      }

      var loginModel = new { Email, Password };
      var json = JsonSerializer.Serialize(loginModel);
      var content = new StringContent(json, Encoding.UTF8, "application/json");

      using var client = new HttpClient();
      var response = await client.PostAsync($"{_apiSettings.BaseUrl}/Auth/login", content);

      if (response.IsSuccessStatusCode)
      {
        var jsonString = await response.Content.ReadAsStringAsync();
        var token = string.Empty;

        try
        {
          // Parsear el JSON y obtener el valor del token
          using (JsonDocument doc = JsonDocument.Parse(jsonString))
          {
            token = doc.RootElement.GetProperty("token").GetString();
          }
        }
        catch (JsonException)
        {
          ErrorMessage = "Error al procesar la respuesta del servidor.";
          return Page();
        }

        HttpContext.Session.SetString("JWToken", token);
        return RedirectToPage("/Apps/Kanban");
      }
      else
      {
        ErrorMessage = "Email o Password inválido.";
        return Page();
      }
    }
  }
}
