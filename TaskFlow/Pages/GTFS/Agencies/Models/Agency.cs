namespace BW_WEB.Pages.GTFS.Agencies.Models;

public class Agency
{
  public string AgencyID { get; set; }
  public int VersionID { get; set; }
  public string AgencyName { get; set; }
  public string AgencyURL { get; set; }
  public string AgencyTimezone { get; set; }
  public string? AgencyLang { get; set; }
  public string? AgencyPhone { get; set; }
  public string? AgencyFareURL { get; set; }
  public string? AgencyEmail { get; set; }
}
