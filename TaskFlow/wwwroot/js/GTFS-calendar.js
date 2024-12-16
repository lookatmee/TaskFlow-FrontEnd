'use strict';

(function () {
  // Inicialización de DataTable para listar fechas de calendario con opciones de paginación
  $('#calendarDatesTable').DataTable({
    order: [[1, 'asc']], // Ordena por la segunda columna (Fecha) de manera ascendente
    displayLength: 7, // Muestra 100 registros inicialmente
    dom:
      '<"row"' +
      '<"col-md-2"<"me-3"l>>' +
      '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-4 mb-md-0"f>>' +
      '>t' +
      '<"row"' +
      '<"col-sm-12 col-md-6"i>' +
      '<"col-sm-12 col-md-6"p>' +
      '>',
    lengthMenu: [7, 10, 15, 20], // Opciones para mostrar registros por página
    language: {
      sLengthMenu: '_MENU_',
      search: '',
      searchPlaceholder: 'Buscar Calendario',
      paginate: {
        next: '<i class="ti ti-chevron-right ti-sm"></i>', // Icono para el botón de siguiente
        previous: '<i class="ti ti-chevron-left ti-sm"></i>' // Icono para el botón de anterior
      }
    },
    responsive: true,
    columnDefs: [
      {
        className: 'control',
        searchable: false,
        orderable: false,
        responsivePriority: 2,
        targets: 0,
        render: function () {
          return '';
        }
      },
      {
        targets: 1, // Fecha
        responsivePriority: 4
      },
      {
        targets: 2, // Disponibilidad del servicio
        responsivePriority: 1
      }
    ]
  });
})();
