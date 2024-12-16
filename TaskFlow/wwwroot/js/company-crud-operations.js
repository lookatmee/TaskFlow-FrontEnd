/**
 * Company CRUD JS
 *
 * Este archivo maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las empresas en la interfaz de usuario.
 */

'use strict';

// Función para manejar la confirmación de eliminación de la empresa con Sweet Alert
function showDeleteConfirmation(companyId) {
  event.preventDefault(); // Evita el envío del formulario automáticamente
  Swal.fire({
    title: 'Borrar Empresa',
    // Mensaje de confirmación antes de eliminar una empresa
    html: `<p class="text-danger">¿Estás seguro de que deseas eliminar esta empresa?<br /></p>`,
    icon: 'warning',
    showCancelButton: true, // Mostrar botón de cancelar
    confirmButtonText: 'Borrar', // Texto del botón de confirmación
    cancelButtonText: 'Cancelar', // Texto del botón de cancelar
    customClass: {
      confirmButton: 'btn btn-primary waves-effect waves-light',
      cancelButton: 'btn btn-label-secondary waves-effect waves-light'
    }
  }).then(result => {
    if (result.isConfirmed) {
      // Buscar y enviar el formulario de eliminación si el usuario confirma
      const form = document.getElementById(companyId + '-deleteForm');
      if (form) {
        submitFormAndSetSuccessFlag(form, 'successFlag');
      } else {
        console.error('No se encontró el formulario para eliminar la empresa');
      }
    } else {
      // Mostrar mensaje de cancelación si el usuario decide no eliminar
      Swal.fire({
        title: 'Cancelado',
        html: `<p>El registro no ha sido eliminado!</p>`,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-success waves-effect waves-light'
        }
      });
    }
  });
}

// Función para enviar el formulario y establecer la bandera de éxito (para eliminar, crear y actualizar)
function submitFormAndSetSuccessFlag(form, flagName) {
  form.submit(); // Envía el formulario
  sessionStorage.setItem(flagName, 'true'); // Establece la bandera de éxito en sessionStorage
}

(function () {
  // Función para establecer atributos de un elemento, por ejemplo, asp-for
  function setElementAttributes(element, attribute, value) {
    element.setAttribute(attribute, value); // Establece el atributo HTML en un elemento
  }

  // Función para configurar los atributos del formulario, incluyendo la ruta y la acción
  function setFormAttributes(form, companyId, handler) {
    const routeAttribute = 'asp-route-id'; // Atributo usado para enviar la ID de la empresa
    setElementAttributes(form, routeAttribute, companyId); // Establece el ID de la empresa en el formulario
    form.action = `/Administration/Companies/CompanyCRUD?handler=${handler}&id=${companyId}`; // Define la acción del formulario
  }

  // Función para mostrar un mensaje de éxito utilizando Sweet Alert después de una operación
  function showSuccessAlert(message) {
    var name = message[0].toUpperCase() + message.slice(1);
    Swal.fire({
      title: name,
      text: `Empresa ${message} con éxito!`, // Texto que indica el éxito de la operación
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButton: false,
      customClass: {
        confirmButton: 'btn btn-success waves-effect waves-light'
      }
    });
  }

  // Verificar si existe una bandera de éxito en sessionStorage y mostrar un mensaje de éxito
  function checkAndShowSuccessAlert(flagName, successMessage) {
    const flag = sessionStorage.getItem(flagName);
    if (flag === 'true') {
      showSuccessAlert(successMessage); // Muestra el mensaje de éxito
      sessionStorage.removeItem(flagName); // Elimina la bandera después de mostrar el mensaje
    }
  }

  // Función para manejar el modal "Editar Empresa" usando Offcanvas
  const handleEditCompanyModal = editButton => {
    // Obtener detalles de la empresa desde la tabla
    const companyId = editButton.id.split('-')[0]; // Extraer el ID de la empresa del botón
    const companyName = document.getElementById(`${companyId}-editCompany`).parentElement.parentElement.children[0].innerText;
    const companyNameLargo = document.getElementById(`${companyId}-editCompany`).parentElement.parentElement.children[1].innerText;
    const companyDireccion = document.getElementById(`${companyId}-editCompany`).parentElement.parentElement.children[2].innerText;
    const companyTelefono = document.getElementById(`${companyId}-editCompany`).parentElement.parentElement.children[3].innerText;
    const companyEmail = document.getElementById(`${companyId}-editCompany`).parentElement.parentElement.children[4].innerText;
    const companySubsistema = document.getElementById(`${companyId}-editCompany`).parentElement.parentElement.children[5].innerText.trim();
    const companyAgency = document.getElementById(`${companyId}-editCompany`).parentElement.parentElement.children[6].innerText.trim();

    // Establecer atributos del formulario de edición
    const editForm = document.getElementById('editCompanyForm');
    setFormAttributes(editForm, companyId, 'EditOrUpdate');

    // Asignar atributos asp-for para enlazar los datos del formulario con el modelo
    setElementAttributes(document.getElementById('EditCompany_Nombre'), 'asp-for', `Companies[${companyId}].Nombre`);
    setElementAttributes(document.getElementById('EditCompany_NombreLargo'), 'asp-for', `Companies[${companyId}].NombreLargo`);
    setElementAttributes(document.getElementById('EditCompany_Direccion'), 'asp-for', `Companies[${companyId}].Direccion`);
    setElementAttributes(document.getElementById('EditCompany_Telefono'), 'asp-for', `Companies[${companyId}].Telefono`);
    setElementAttributes(document.getElementById('EditCompany_Email'), 'asp-for', `Companies[${companyId}].Email`);
    setElementAttributes(document.getElementById('EditCompany_SelectedAgency'), 'asp-for', `Companies[${companyId}].SelectedAgency`);
    setElementAttributes(document.getElementById('EditCompany_SelectedSubsistemaTransporte'), 'asp-for', `Companies[${companyId}].SelectedSubsistemaTransporte`);

    // Establecer valores en los campos del formulario
    document.getElementById('EditCompany_Nombre').value = companyName;
    document.getElementById('EditCompany_NombreLargo').value = companyNameLargo;
    document.getElementById('EditCompany_Direccion').value = companyDireccion;
    document.getElementById('EditCompany_Telefono').value = companyTelefono;
    document.getElementById('EditCompany_Email').value = companyEmail;

    // Asignar los valores del select de Subsistema y Agencia
    const subsistemaSelect = document.getElementById('EditCompany_SelectedSubsistemaTransporte');
    subsistemaSelect.value = companySubsistema; // Seleccionar el subsistema correcto

    const agencySelect = document.getElementById('EditCompany_SelectedAgency');
    agencySelect.value = companyAgency; // Seleccionar la agencia correcta
  };

  // Añadir eventos a los botones de edición
  const editCompanyButtons = document.querySelectorAll("[id$='-editCompany']");
  editCompanyButtons.forEach(editButton => {
    editButton.addEventListener('click', () => handleEditCompanyModal(editButton));
  });


  // Añadir eventos a los botones de edición
  const editCompanyButtons = document.querySelectorAll("[id$='-editCompany']");
  editCompanyButtons.forEach(editButton => {
    editButton.addEventListener('click', () => handleEditCompanyModal(editButton));
  });

  // Verificar y mostrar mensajes de éxito después de cargar la página
  checkAndShowSuccessAlert('successFlag', 'Borrada');
  checkAndShowSuccessAlert('newCompanyFlag', 'Creada');
  checkAndShowSuccessAlert('editCompanyFlag', 'Actualizada');

  // Obtener el formulario de creación para la validación
  const createNewCompanyForm = document.getElementById('createCompanyForm');

  // Inicializar la validación para el formulario de creación de empresa
  const fv = FormValidation.formValidation(createNewCompanyForm, {
    fields: {
      'NewCompany.Nombre': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese un nombre de empresa'
          },
          stringLength: {
            min: 2,
            max: 50,
            message: 'El nombre debe tener entre 2 y 50 caracteres'
          }
        }
      },
      'NewCompany.NombreLargo': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese el nombre largo de la empresa'
          },
          stringLength: {
            max: 100,
            message: 'El nombre largo no puede tener más de 100 caracteres'
          }
        }
      },
      'NewCompany.Direccion': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese la dirección de la empresa'
          }
        }
      },
      'NewCompany.Telefono': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese el teléfono de la empresa'
          }
        }
      },
      'NewCompany.Email': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese un correo electrónico'
          },
          emailAddress: {
            message: 'Por favor ingrese un correo válido'
          }
        }
      },
      'NewCompany.SelectedAgency': {
        validators: {
          notEmpty: {
            message: 'Por favor seleccione una agencia'
          }
        }
      },
      'NewCompany.SelectedSubsistemaTransporte': {
        validators: {
          notEmpty: {
            message: 'Por favor seleccione un subsistema'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: '.mb-6'
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  }).on('core.form.valid', function () {
    // Si los campos son válidos, enviar el formulario
    submitFormAndSetSuccessFlag(createNewCompanyForm, 'newCompanyFlag');
  });

  // Inicializar la validación para el formulario de edición de empresa
  const editCompanyForm = document.getElementById('editCompanyForm');

  const fv2 = FormValidation.formValidation(editCompanyForm, {
    fields: {
      'UpdateCompany.Nombre': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese un nombre de empresa'
          },
          stringLength: {
            min: 2,
            max: 50,
            message: 'El nombre debe tener entre 2 y 50 caracteres'
          }
        }
      },
      'UpdateCompany.NombreLargo': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese el nombre largo de la empresa'
          },
          stringLength: {
            max: 100,
            message: 'El nombre largo no puede tener más de 100 caracteres'
          }
        }
      },
      'UpdateCompany.Direccion': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese la dirección de la empresa'
          }
        }
      },
      'UpdateCompany.Telefono': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese el teléfono de la empresa'
          }
        }
      },
      'UpdateCompany.Email': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese un correo electrónico'
          },
          emailAddress: {
            message: 'Por favor ingrese un correo válido'
          }
        }
      },
      'UpdateCompany.SelectedAgency': {
        validators: {
          notEmpty: {
            message: 'Por favor seleccione una agencia'
          }
        }
      },
      'UpdateCompany.SelectedSubsistemaTransporte': {
        validators: {
          notEmpty: {
            message: 'Por favor seleccione un subsistema'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: '.mb-6'
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  }).on('core.form.valid', function () {
    // Si los campos son válidos, enviar el formulario
    submitFormAndSetSuccessFlag(editCompanyForm, 'editCompanyFlag');
  });

  // Inicialización de DataTable para listar empresas
  $('#companyTable').DataTable({
    order: [[1, 'desc']], // Ordena por la segunda columna (Nombre largo) de manera descendente
    displayLength: 7, // Muestra 7 registros por página
    dom:
      '<"row"' +
      '<"col-md-2"<"me-3"l>>' +
      '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-4 mb-md-0"fB>>' +
      '>t' +
      '<"row"' +
      '<"col-sm-12 col-md-6"i>' +
      '<"col-sm-12 col-md-6"p>' +
      '>',
    lengthMenu: [7, 10, 15, 20], // Opciones para mostrar registros por página
    language: {
      sLengthMenu: '_MENU_',
      search: '',
      searchPlaceholder: 'Buscar Empresa',
      paginate: {
        next: '<i class="ti ti-chevron-right ti-sm"></i>', // Icono para el botón de siguiente
        previous: '<i class="ti ti-chevron-left ti-sm"></i>' // Icono para el botón de anterior
      }
    },
    buttons: [
      {
        extend: 'collection',
        className: 'btn btn-label-secondary dropdown-toggle mx-4 waves-effect waves-light',
        text: '<i class="ti ti-download me-1"></i>Exportar',
        buttons: [
          {
            extend: 'print',
            title: 'Datos de Empresas',
            text: '<i class="ti ti-printer me-2"></i>Imprimir',
            className: 'dropdown-item',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6], // Columnas que serán exportadas
              format: {
                body: function (data, row, column, node) {
                  return data;
                }
              }
            }
          },
          {
            extend: 'csv',
            title: 'Empresas',
            text: '<i class="ti ti-file-text me-2"></i>CSV',
            className: 'dropdown-item',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6]
            }
          },
          {
            extend: 'excel',
            title: 'Empresas',
            text: '<i class="ti ti-file-spreadsheet me-2"></i>Excel',
            className: 'dropdown-item',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6]
            }
          },
          {
            extend: 'pdf',
            title: 'Empresas',
            text: '<i class="ti ti-file-text me-2"></i>PDF',
            className: 'dropdown-item',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6]
            }
          },
          {
            extend: 'copy',
            title: 'Empresas',
            text: '<i class="ti ti-copy me-2"></i>Copiar',
            className: 'dropdown-item',
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6]
            }
          }
        ]
      },
      {
        // Botón para añadir una nueva empresa
        text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Añadir Nueva Empresa</span>',
        className: 'add-new btn btn-primary ms-2 ms-sm-0 waves-effect waves-light',
        attr: {
          'data-bs-toggle': 'offcanvas',
          'data-bs-target': '#createCompanyOffcanvas'
        }
      }
    ],
    responsive: true,
    rowReorder: {
      selector: 'td:nth-child(2)' // Permite el reordenamiento por la columna de Nombre largo
    },
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
        targets: 1, // Nombre
        responsivePriority: 4
      },
      {
        targets: 2, // Nombre largo
        responsivePriority: 3
      },
      {
        targets: 3, // Dirección
        responsivePriority: 9
      },
      {
        targets: 4, // Teléfono
        responsivePriority: 5
      },
      {
        targets: 5, // Email
        responsivePriority: 6
      },
      {
        targets: -1, // Acciones
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
            var companyName = data[0];
            return 'Detalles de ' + companyName;
          }
        }),
        type: 'column',
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col) {
            return col.title
              ? '<tr data-dt-row="' +
              col.rowIndex +
              '" data-dt-column="' +
              col.columnIndex +
              '">' +
              '<td>' +
              col.title +
              ':</td> ' +
              '<td>' +
              col.data +
              '</td>' +
              '</tr>'
              : '';
          }).join('');

          return data ? $('<table class="table mt-3"/>').append(data) : false;
        }
      }
    }
  });
})();

// Para cerrar el modal de edición al hacer clic en el botón
var editCompanyOffcanvas = $('#editCompanyOffcanvas');

// Evento para cerrar el offcanvas de edición cuando se abre
editCompanyOffcanvas.on('show.bs.offcanvas', function () {
  $('.modal').modal('hide');
});

// Ajuste de estilos de formulario de filtro después de la inicialización de DataTable
setTimeout(() => {
  $('.dt-buttons').addClass('d-flex flex-wrap justify-content-center');
  $('div.dataTables_wrapper div.dataTables_length select').addClass('mx-0');
  $('div.dataTables_wrapper .dataTables_filter').addClass('mt-0 mt-md-6');
  $('div.dataTables_wrapper div.dataTables_filter input').addClass('ms-0');
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm m-0');
  $('div.dataTables_wrapper div.dataTables_info').addClass('text-start text-sm-center text-md-start');
}, 300);
