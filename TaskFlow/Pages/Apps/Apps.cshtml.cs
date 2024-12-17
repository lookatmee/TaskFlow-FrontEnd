using BW_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using System.Text.Json;
using TaskFlow.Solution.Pages.Apps.Models;

namespace AspnetCoreFull.Pages.Apps;

public class CalendarModel : PageModel
{
  public void OnGet() { }
}
public class KanbanModel : PageModel
{
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly IOptions<ApiSettings> _apiSettings;

  public string KanbanData { get; private set; }
  public string UsersData { get; private set; }

  public KanbanModel(IHttpClientFactory httpClientFactory, IOptions<ApiSettings> apiSettings)
  {
    _httpClientFactory = httpClientFactory;
    _apiSettings = apiSettings;
  }

  public async Task OnGetAsync()
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");
      var kanbanBoards = new List<KanbanBoard>();

      // Obtener usuarios
      var users = await client.GetFromJsonAsync<List<User>>($"{_apiSettings.Value.BaseUrl}/Users");
      if (users != null)
      {
        var option = new JsonSerializerOptions
        {
          PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
          WriteIndented = true
        };
        UsersData = JsonSerializer.Serialize(users, option);
      }

      foreach (WorkItemStatus status in Enum.GetValues(typeof(WorkItemStatus)))
      {
        Console.WriteLine($"Consultando items para status: {status}");

        var response = await client.GetFromJsonAsync<List<WorkItem>>($"{_apiSettings.Value.BaseUrl}/WorkItems/status/{(int)status}");

        if (response != null)
        {
          Console.WriteLine($"Items encontrados para status {status}: {response.Count}");

          var board = new KanbanBoard
          {
            id = $"board-{status.ToString().ToLower()}",
            title = GetStatusTitle(status),
            item = response
          };

          kanbanBoards.Add(board);
        }
      }

      var options = new JsonSerializerOptions
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true
      };

      KanbanData = JsonSerializer.Serialize(kanbanBoards, options);

      Console.WriteLine("Datos serializados: " + KanbanData);
    }
    catch (Exception ex)
    {
      Console.WriteLine($"Error en OnGetAsync: {ex.Message}");
      KanbanData = JsonSerializer.Serialize(new { error = ex.Message });
    }
  }

  public async Task<IActionResult> OnPostAsync([FromBody] WorkItem workItem)
  {
    try
    {
      var client = _httpClientFactory.CreateClient("ApiClient");

      // Establecer valores por defecto para las fechas
      workItem.createdAt = DateTime.UtcNow.ToString("o");
      workItem.updatedAt = DateTime.UtcNow.ToString("o");

      var response = await client.PostAsJsonAsync($"{_apiSettings.Value.BaseUrl}/WorkItems", workItem);

      if (response.IsSuccessStatusCode)
      {
        var createdWorkItem = await response.Content.ReadFromJsonAsync<WorkItem>();
        return new JsonResult(createdWorkItem);
      }
      else
      {
        var error = await response.Content.ReadAsStringAsync();
        return new JsonResult(new { error = "Error al crear el WorkItem", details = error })
        {
          StatusCode = (int)response.StatusCode
        };
      }
    }
    catch (Exception ex)
    {
      return new JsonResult(new { error = ex.Message })
      {
        StatusCode = 500
      };
    }
  }

  private string GetStatusTitle(WorkItemStatus status)
  {
    return status switch
    {
      WorkItemStatus.Pending => "Pendiente",
      WorkItemStatus.InProgress => "En Progreso",
      WorkItemStatus.Completed => "Completado",
      _ => status.ToString()
    };
  }
}

public class KanbanBoard
{
  public string id { get; set; }
  public string title { get; set; }
  public List<WorkItem> item { get; set; }
}

public class WorkItemResponse
{
  public int id { get; set; }
  public string title { get; set; }
  public string description { get; set; }
  public int status { get; set; }
  public int assignedUserId { get; set; }
  public string assignedUserName { get; set; }
  public string createdAt { get; set; }
  public string updatedAt { get; set; }
}

public class EmailModel : PageModel
{
  public void OnGet() { }
}
public class ChatModel : PageModel
{
  public void OnGet() { }
}
