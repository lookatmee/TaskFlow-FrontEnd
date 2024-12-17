namespace TaskFlow.Solution.Pages.Apps.Models;

public class WorkItem
{
    public int id { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public int status { get; set; }
    public int assignedUserId { get; set; }
    public string assignedUserName { get; set; }
    public string createdAt { get; set; }
    public string updatedAt { get; set; }

    // Constructor para inicializar las propiedades requeridas
    public WorkItem()
    {
        title = string.Empty;
        description = string.Empty;
        assignedUserName = string.Empty;
        createdAt = DateTime.UtcNow.ToString("o");
        updatedAt = DateTime.UtcNow.ToString("o");
    }
}
