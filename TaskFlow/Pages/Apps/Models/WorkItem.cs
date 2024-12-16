namespace TaskFlow.Solution.Pages.Apps.Models;

public class WorkItem
{
  public int Id { get; set; }
  public string Title { get; set; }
  public string Description { get; set; }
  public WorkItemStatus Status { get; set; }
  public int? AssignedUserId { get; set; }
}
