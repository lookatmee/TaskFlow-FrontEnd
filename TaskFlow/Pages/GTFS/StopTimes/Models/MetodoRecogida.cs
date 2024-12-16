namespace BW_WEB.Pages.GTFS.StopTimes.Models;

public enum MetodoRecogida
{
    RecogidaProgramadaRegularmente = 0,
    NoHayRecogidaDisponible = 1,
    LlamarAgenciaParaConcertarRecogida = 2,
    CoordinarConConductorParaOrganizarRecogida = 3
}
