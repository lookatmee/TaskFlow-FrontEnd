$(document).ready(function () {
  $('#calendarDatesTable').DataTable({
    order: [[1, 'asc']], // Ordena por la segunda columna (Fecha)
    displayLength: 100,
    dom:
      '<"row"' +
      '<"col-md-2"<"me-3"l>>' +
      '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-4 mb-md-0"f>>' +
      '>t' +
      '<"row"' +
      '<"col-sm-12 col-md-6"i>' +
      '<"col-sm-12 col-md-6"p>' +
      '>',
    lengthMenu: [10, 20, 50, 100, 250, 500],
    responsive: true,
    columns: [
      { data: 'serviceID' }, // Primera columna: Código Servicio
      {
        data: 'date',
        render: function (data) {
          var fecha = new Date(data);
          const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
          return fecha.toLocaleDateString('es-EC', opciones);
        }
      }, // Segunda columna: Fecha
      {
        data: 'exceptionTypeDescripcion', // Tercera columna: Disponibilidad del Servicio
        render: function (data, type, row) {
          return data; // Aquí se utiliza la descripción procesada previamente en el servidor
        }
      }
    ],
    columnDefs: [
      {
        className: 'control',
        targets: 0,
        orderable: false
      }
    ],
    destroy: true,
    responsive: true
  });
});
