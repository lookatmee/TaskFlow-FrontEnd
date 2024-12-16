using BW_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;

namespace BW_WEB.Pages
{
  public class ForgotPasswordModel : PageModel
  {
    private readonly ApiSettings _apiSettings;
    public string ErrorMessage { get; set; }
    public string SuccessMessage { get; set; }

    [BindProperty]
    public string Email { get; set; }

    public ForgotPasswordModel(IOptions<ApiSettings> apiSettings)
    {
      _apiSettings = apiSettings.Value;
    }

    public void OnGet()
    {
    }

    public async Task<IActionResult> OnPostAsync()
    {
      if (!ModelState.IsValid)
      {
        return Page();
      }

      using var client = new HttpClient();
      var content = new StringContent(JsonSerializer.Serialize(new { email = Email }), Encoding.UTF8, "application/json");
      var response = await client.PostAsync($"{_apiSettings.BaseUrl}/Email/ForgotPassword", content);

      if (response.IsSuccessStatusCode)
      {
        SuccessMessage = "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.";
        return RedirectToPage("/Login");
      }
      else
      {
        ErrorMessage = "Ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.";
        return Page();
      }
    }
  }
}
