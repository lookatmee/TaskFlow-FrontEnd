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
}
