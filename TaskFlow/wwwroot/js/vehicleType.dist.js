/**
 * Vehicle CRUD JS
 */

'use strict';

// Funciones para manejar las alertas Sweet del proceso de eliminación de Tipo de Vehículo (Confirmación de Eliminación)
function showDeleteConfirmation(vehicle_id) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener el nombre y la placa del vehículo usando el vehicle_id
  const vehicleName = document.querySelector(`.vehicleType-id-${vehicle_id}`).innerText;
  const licensePlate = document.querySelector(`.vehicleType-name-${vehicle_id}`).innerText;

  Swal.fire({
    title: 'Eliminar Tipo de Vehículo', // Título traducido
    // Mostrar al usuario el nombre del tipo de vehículo que se va a eliminar
    html: `<p class="text-danger">¿Está seguro de que desea eliminar el tipo de vehículo?<br> <span class="fw-medium text-body">${vehicleName} (Placa: ${licensePlate})</span></p>`, // Mensaje traducido
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar', // Botón de confirmación traducido
    cancelButtonText: 'Cancelar', // Botón de cancelación traducido
    customClass: {
      confirmButton: 'btn btn-primary waves-effect waves-light',
      cancelButton: 'btn btn-label-secondary waves-effect waves-light'
    }
  }).then(result => {
    if (result.isConfirmed) {
      const form = document.getElementById(`${vehicle_id}-deleteForm`);
      if (form) {
        submitFormAndSetSuccessFlag(form, 'successFlag');
      } else {
        console.error('Elemento del formulario no encontrado');
      }
    } else {
      Swal.fire({
        title: 'Cancelado', // Título de la alerta de cancelación traducido
        // Mostrar al usuario que el tipo de vehículo no ha sido eliminado
        html: `<p><span class="fw-medium text-primary">${vehicleName}</span> no ha sido eliminado!</p>`, // Mensaje de no eliminado traducido
        icon: 'error',
        confirmButtonText: 'OK', // Botón de confirmación traducido
        customClass: {
          confirmButton: 'btn btn-success waves-effect waves-light'
        }
      });
    }
  });
}


// Function to submit the form and set the success flag (Set success flags for delete, create and update)
function submitFormAndSetSuccessFlag(form, flagName) {
  if (flagName != "successFlag") {
    form.submit();
    sessionStorage.setItem(flagName, 'true');

  } else {
    const formData = new FormData(form);
    const actionUrl = form.action; // Obtener la URL del formulario

    fetch(actionUrl, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          // Si la respuesta es exitosa, establece el flag y redirige o muestra un mensaje de éxito
          sessionStorage.setItem(flagName, 'true');

        } else {
          // Manejar errores
          return response.text().then(text => {
            throw new Error(text); // Lanzar un error con el mensaje del servidor
          });
        }
      })
      .catch(error => {
        // Mostrar el mensaje de error en un SweetAlert
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Ocurrió un error al intentar eliminar el tipo de vehículo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-danger waves-effect waves-light'
          }
        });
      });
  }
}

(function () {
  // Function to set element attributes (asp-for)
  function setElementAttributes(element, attribute, value) {
    element.setAttribute(attribute, value);
  }

  // Function to set form attributes (route and action)
  function setFormAttributes(form, vehicleId, handler) {
    const routeAttribute = 'asp-route-id';
    setElementAttributes(form, routeAttribute, vehicleId);
    form.action = `/Vehicle/VehicleType/Vehicle_Types?handler=${handler}&id=${vehicleId}`;
  }

  // Función de Alerta de Éxito (Tipo de Vehículo Eliminado/Creado/Actualizado)
  function showSuccessAlert(message) {
    var name = message[0].toUpperCase() + message.slice(1);
    Swal.fire({
      title: name,
      text: `¡Tipo de Vehículo ${message} con éxito!`, // Mensaje traducido
      icon: 'success',
      confirmButtonText: 'Ok', // Botón de confirmación traducido
      confirmButton: false,
      customClass: {
        confirmButton: 'btn btn-success waves-effect waves-light'
      }
    });
  }


  // Function to check for success flag and display success message
  function checkAndShowSuccessAlert(flagName, successMessage) {
    const flag = sessionStorage.getItem(flagName);
    if (flag === 'true') {
      showSuccessAlert(successMessage);
      sessionStorage.removeItem(flagName);
    }
  }

  // Function to handle the "Edit Vehicle" Offcanvas Modal
  const handleEditVehicleModal = editButton => {
    // Obtener el ID del vehículo desde el botón
    const vehicleId = editButton.id.split('-')[0]; // Extraer el ID del vehículo del botón

    // Obtener la fila del vehículo desde la tabla usando el vehicleId
    const row = document.querySelector(`#${vehicleId}-editVehicle`).parentElement.parentElement;

   
    const name = row.children[2].innerText; // El ID de la agencia está en la columna 3
    const vehicleTypeUpdateId = row.children[1].innerText;
    // Establecer atributos del formulario de edición
    const editForm = document.getElementById('editVehicleTypeForm');
    setFormAttributes(editForm, vehicleId, 'EditOrUpdate');

    
    setElementAttributes(document.getElementById('EditVehicletype_Name'), 'asp-for', `Vehicles[${vehicleId}].name`);
    setElementAttributes(document.getElementById('EditVehicleType_Id'), 'asp-for', `Vehicles[${vehicleId}].vehicle_Type_id`);

    
    document.getElementById('EditVehicletype_Name').value = name;
    document.getElementById('EditVehicleType_Id').value = vehicleTypeUpdateId;

  };


  // Attach event listeners for "Edit Vehicle" buttons
  const editVehicleButtons = document.querySelectorAll(".edit-vehicle-button");
  editVehicleButtons.forEach(editButton => {
    editButton.addEventListener('click', () => handleEditVehicleModal(editButton));
  });

  // Check and Call the functions to check and display success messages on page reload (for delete, create and update)
  checkAndShowSuccessAlert('successFlag', 'Eliminado');
  checkAndShowSuccessAlert('newVehicleFlag', 'Creado');
  checkAndShowSuccessAlert('editVehicleFlag', 'Actualizado');

  // Get the Create Vehicle form for validation
  const createNewVehicleForm = document.getElementById('createVehicleTypeForm');

  // Initialize FormValidation for create vehicle form
  const fv = FormValidation.formValidation(document.getElementById('createVehicleTypeForm'), {
    fields: {
      'VehicleType.vehicle_type_id': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese un ID de tipo de vehículo'
          },
          stringLength: {
            min: 1,
            max: 100,
            message: 'El ID de vehículo debe tener entre 1 y 100 caracteres'
          }
        }
      },
      'VehicleType.name': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese un nombre del tipo de vehículo'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: '.mb-6'  // Usa la clase correcta del contenedor de los campos
      }),
      submitButton: new FormValidation.plugins.SubmitButton({
        button: '[type="submit"]'
      }),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  })
    .on('core.form.valid', function () {
      submitFormAndSetSuccessFlag(createNewVehicleForm, 'newVehicleFlag');
    })
    .on('core.form.invalid', function () {
      return;
    });

//  // Get the Edit Vehicle form for validation
  const editVehicleForm = document.getElementById('editVehicleTypeForm');

  // Initialize FormValidation for edit vehicle form
  const fv2 = FormValidation.formValidation(editVehicleForm, {
    fields: {
      'VehicleType.vehicle_type_id': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese un ID de tipo de vehículo'
          },
          stringLength: {
            min: 1,
            max: 100,
            message: 'El ID de vehículo debe tener entre 1 y 100 caracteres'
          }
        }
      },
      'VehicleType.name': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese el nombre del tipo de vehículo'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: '.mb-6'  // Usa la clase correcta del contenedor de los campos
      }),
      submitButton: new FormValidation.plugins.SubmitButton({
        button: '[type="submit"]'
      }),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  })
    .on('core.form.valid', function () {
      submitFormAndSetSuccessFlag(editVehicleForm, 'editVehicleFlag');
    })
    .on('core.form.invalid', function () {
      return;
    });
})();



// Vehicle List DataTable Initialization
$(document).ready(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Vehicle List DataTable Initialization
  $('#vehicleTable').DataTable({
    order: [[1, 'desc']],
    displayLength: 7,
    dom:
      '<"row"' +
      '<"col-md-2"<"me-3"l>>' +
      '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-4 mb-md-0"fB>>' +
      '>t' +
      '<"row"' +
      '<"col-sm-12 col-md-6"i>' +
      '<"col-sm-12 col-md-6"p>' +
      '>',
    lengthMenu: [7, 10, 15, 20],
    language: {
      sLengthMenu: '_MENU_',
      search: '',
      searchPlaceholder: 'Buscar vehículo'
    },
    // Buttons with Dropdown
    buttons: [
      {
        extend: 'collection',
        className: 'btn btn-label-secondary dropdown-toggle mx-4 waves-effect waves-light',
        text: '<i class="ti ti-download me-1"></i>Exportar',
        buttons: [
          {
            extend: 'print',
            text: '<i class="ti ti-printer me-2" ></i>Imprimir',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5]
            }
          },
          {
            extend: 'csv',
            text: '<i class="ti ti-file-text me-2" ></i>Csv',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5]
            }
          },
          {
            extend: 'excel',
            text: '<i class="ti ti-file-spreadsheet me-2"></i>Excel',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5]
            }
          },
          {
            extend: 'pdf',
            text: '<i class="ti ti-file-text me-2"></i>Pdf',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5]
            }
          },
          {
            extend: 'copy',
            text: '<i class="ti ti-copy me-2" ></i>Copiar',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5]
            }
          }
        ]
      },
      {
        text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Agregar nuevo tipo de vehículo</span>',
        className: 'add-new btn btn-primary ms-2 ms-sm-0 waves-effect waves-light',
        attr: {
          'data-bs-toggle': 'offcanvas',
          'data-bs-target': '#createVehicleTypeOffcanvas'
        }
      }
    ],

    // For responsive popup
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal({
          header: function (row) {
            var data = row.data();
            return 'Detalles de ' + data[2];
          }
        }),
        type: 'column',
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col, i) {
            return col.title !== '' // ? Do not show actions in modal
              ? '<tr data-dt-row="' +
              col.rowIndex +
              '" data-dt-column="' +
              col.columnIndex +
              '">' +
              '<td>' +
              col.title +
              ':' +
              '</td> ' +
              '<td>' +
              col.data +
              '</td>' +
              '</tr>'
              : '';
          }).join('');

          return data ? $('<table class="table"/><tbody />').append(data) : false;
        }
      }
    }
  });
});

// For Modal to close on edit button click
var editVehicleOffcanvas = $('#editVehicleTypeOffcanvas');

// Event listener for the "Edit" offcanvas opening
editVehicleOffcanvas.on('show.bs.offcanvas', function () {
  // Close any open modals
  $('.modal').modal('hide');
});
