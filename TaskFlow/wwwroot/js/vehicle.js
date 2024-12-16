/**
 * Vehicle CRUD JS
 */

'use strict';

// Functions to handle the Delete Vehicle Sweet Alerts (Delete Confirmation)
function showDeleteConfirmation(vehicle_id) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener el nombre y la placa del vehículo usando el vehicle_id
  const vehicleName = document.querySelector(`.vehicle-label-${vehicle_id}`).innerText;
  const licensePlate = document.querySelector(`.vehicle-plate-${vehicle_id}`).innerText;

  Swal.fire({
    title: 'Delete Vehicle',
    // Mostrar al usuario el nombre del vehículo que se va a eliminar
    html: `<p class="text-danger">Are you sure you want to delete the vehicle?<br> <span class="fw-medium text-body">${vehicleName} (License Plate: ${licensePlate})</span></p>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
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
        console.error('Form element not found');
      }
    } else {
      Swal.fire({
        title: 'Cancelled',
        // Mostrar al usuario que el vehículo no ha sido eliminado.
        html: `<p><span class="fw-medium text-primary">${vehicleName}</span> has not been deleted!</p>`,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-success waves-effect waves-light'
        }
      });
    }
  });
}

// Function to submit the form and set the success flag (Set success flags for delete, create and update)
function submitFormAndSetSuccessFlag(form, flagName) {
  form.submit();
  sessionStorage.setItem(flagName, 'true');
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
    form.action = `/Vehicle/Vehicle?handler=${handler}&id=${vehicleId}`;
  }

  // Sweet Alert Success Function (Vehicle Deleted/Created/Updated)
  function showSuccessAlert(message) {
    var name = message[0].toUpperCase() + message.slice(1);
    Swal.fire({
      title: name,
      text: `Vehicle ${message} Successfully!`,
      icon: 'success',
      confirmButtonText: 'Ok',
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

    // Extraer los valores de cada columna según su posición
    const vehicleType = row.querySelector(`.vehicle-label-${vehicleId}`).innerText;
    const licensePlate = row.querySelector(`.vehicle-plate-${vehicleId}`).innerText;
    const label = row.children[5].innerText; // La etiqueta está en la columna 6
    const agencyID = row.children[2].innerText; // El ID de la agencia está en la columna 3

    // Establecer atributos del formulario de edición
    const editForm = document.getElementById('editVehicleForm');
    setFormAttributes(editForm, vehicleId, 'EditOrUpdate');

    // Asignar atributos asp-for para enlazar los datos del formulario con el modelo
    setElementAttributes(document.getElementById('EditVehicle_LicensePlate'), 'asp-for', `Vehicles[${vehicleId}].license_plate`);
    setElementAttributes(document.getElementById('EditVehicle_Label'), 'asp-for', `Vehicles[${vehicleId}].label`);
    setElementAttributes(document.getElementById('EditVehicle_Type'), 'asp-for', `Vehicles[${vehicleId}].vehicle_type_id`);
    setElementAttributes(document.getElementById('EditVehicle_AgencyID'), 'asp-for', `Vehicles[${vehicleId}].AgencyID`);
    setElementAttributes(document.getElementById('EditVehicle_VehicleId'), 'asp-for', `Vehicles[${vehicleId}].vehicle_id`);

    // Establecer valores en los campos del formulario
    document.getElementById('EditVehicle_LicensePlate').value = licensePlate;
    document.getElementById('EditVehicle_Label').value = label;
    document.getElementById('EditVehicle_Type').value = vehicleType;
    document.getElementById('EditVehicle_AgencyID').value = agencyID;

    // Establecer el valor del campo oculto para el vehicle_id
    document.getElementById('EditVehicle_VehicleId').value = vehicleId;
  };


  // Attach event listeners for "Edit Vehicle" buttons
  const editVehicleButtons = document.querySelectorAll(".edit-vehicle-button");
  editVehicleButtons.forEach(editButton => {
    editButton.addEventListener('click', () => handleEditVehicleModal(editButton));
  });

  // Check and Call the functions to check and display success messages on page reload (for delete, create and update)
  checkAndShowSuccessAlert('successFlag', 'Deleted');
  checkAndShowSuccessAlert('newVehicleFlag', 'Created');
  checkAndShowSuccessAlert('editVehicleFlag', 'Updated');

  // Get the Create Vehicle form for validation
  const createNewVehicleForm = document.getElementById('createVehicleForm');

  // Initialize FormValidation for create vehicle form
  const fv = FormValidation.formValidation(createNewVehicleForm, {
    fields: {
      'NewVehicle.NewVehicle_VehicleId': {
        validators: {
          notEmpty: {
            message: 'Please enter a vehicle id'
          },
          stringLength: {
            min: 1,
            max: 100,
            message: 'The vehicle must be between 1 and 100 characters long'
          }
        }
      },
      'NewVehicle.license_plate': {
        validators: {
          notEmpty: {
            message: 'Please enter a license plate'
          },
          stringLength: {
            min: 1,
            max: 20,
            message: 'The license plate must be between 1 and 20 characters long'
          }
        }
      },
      'NewVehicle.label': {
        validators: {
          notEmpty: {
            message: 'Please enter a label'
          },
          stringLength: {
            max: 50,
            message: 'The label must be less than 50 characters long'
          }
        }
      },
      'NewVehicle.Vehicle_type_id': {
        validators: {
          notEmpty: {
            message: 'Please select a vehicle type'
          }
        }
      },
      'NewVehicle.AgencyID': {
        validators: {
          notEmpty: {
            message: 'Please select an agency'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: function (field, ele) {
          return '.mb-3';
        }
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

  // Get the Edit Vehicle form for validation
  const editVehicleForm = document.getElementById('editVehicleForm');

  // Initialize FormValidation for edit vehicle form
  const fv2 = FormValidation.formValidation(editVehicleForm, {
    fields: {
      'EditVehicle.VehicleId': {
        validators: {
          notEmpty: {
            message: 'Please enter a vehicle Id'
          },
          stringLength: {
            min: 1,
            max: 100,
            message: 'The vehicle Id must be between 1 and 100 characters long'
          }
        }
      },
      'EditVehicle.LicensePlate': {
        validators: {
          notEmpty: {
            message: 'Please enter a license plate'
          },
          stringLength: {
            min: 1,
            max: 20,
            message: 'The license plate must be between 1 and 20 characters long'
          }
        }
      },
      'EditVehicle.Label': {
        validators: {
          notEmpty: {
            message: 'Please enter a label'
          },
          stringLength: {
            max: 50,
            message: 'The label must be less than 50 characters long'
          }
        }
      },
      'EditVehicle.Vehicle_type_id': {
        validators: {
          notEmpty: {
            message: 'Please select a vehicle type'
          }
        }
      },
      'EditVehicle.AgencyID': {
        validators: {
          notEmpty: {
            message: 'Please select an agency'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: function (field, ele) {
          return '.mb-3';
        }
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
      searchPlaceholder: 'Search Vehicle'
    },
    // Buttons with Dropdown
    buttons: [
      {
        extend: 'collection',
        className: 'btn btn-label-secondary dropdown-toggle mx-4 waves-effect waves-light',
        text: '<i class="ti ti-download me-1"></i>Export',
        buttons: [
          {
            extend: 'print',
            text: '<i class="ti ti-printer me-2" ></i>Print',
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
            text: '<i class="ti ti-copy me-2" ></i>Copy',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5]
            }
          }
        ]
      },
      {
        text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Add New Vehicle</span>',
        className: 'add-new btn btn-primary ms-2 ms-sm-0 waves-effect waves-light',
        attr: {
          'data-bs-toggle': 'offcanvas',
          'data-bs-target': '#createVehicleOffcanvas'
        }
      },
      {
        text: '<i class="me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Tipo</span>',
        className: 'add-new btn btn-primary ms-2 waves-effect waves-light',
        action: function (e, dt, node, config) {
          // Redirigir a la URL deseada en la misma pestaña
          window.location.href = '/Vehicle/VehicleType/Vehicle_Types';
        }
      }
    ],

    // For responsive popup
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal({
          header: function (row) {
            var data = row.data();
            return 'Details of ' + data[2];
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
var editVehicleOffcanvas = $('#editVehicleOffcanvas');

// Event listener for the "Edit" offcanvas opening
editVehicleOffcanvas.on('show.bs.offcanvas', function () {
  // Close any open modals
  $('.modal').modal('hide');
});
