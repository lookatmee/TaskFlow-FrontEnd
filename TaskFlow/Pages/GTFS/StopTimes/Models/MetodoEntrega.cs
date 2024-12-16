namespace BW_WEB.Pages.GTFS.StopTimes.Models;

public enum MetodoEntrega
{
    EntregaProgramadaRegularmente = 0,
    NoHayEntregaDisponible = 1,
    LlamarAgenciaParaConcertarEntrega = 2,
    CoordinarConConductorParaOrganizarEntrega = 3
}
