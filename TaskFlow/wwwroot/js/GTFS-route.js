'use strict';

(function () {
  // Inicialización de DataTable para listar routes con opciones de paginación más altas
  $('#routeTable').DataTable({
    order: [[1, 'desc']], // Ordena por la segunda columna (Código Ruta) de manera descendente
    displayLength: 7, // Muestra 7 registros inicialmente
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
      searchPlaceholder: 'Buscar Ruta',
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
        targets: 1, // Código Ruta
        responsivePriority: 4
      },
      {
        targets: 2, // Nombre Ruta
        responsivePriority: 3
      },
      {
        targets: 3, // Código Agencia
        responsivePriority: 9
      },
      {
        targets: 4, // Tipo Ruta
        responsivePriority: 5
      },
      {
        targets: -1, // Ultima columna (Tipo Ruta)
        searchable: false,
        orderable: false,
        responsivePriority: 1
      }
    ],
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal({
          header: function (row) {
            var data = row.data();
            var routeName = data[2]; // Nombre Ruta
            return 'Detalles de la Ruta ' + routeName;
          }
        }),
        type: 'column',
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col) {
            return col.title !== ''
              ? '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
              '<td>' + col.title + ':</td> <td>' + col.data + '</td>' +
              '</tr>'
              : '';
          }).join('');

          return data ? $('<table class="table mt-3"/>').append('<tbody />').append(data) : false;
        }
      }
    }
  });
})();
