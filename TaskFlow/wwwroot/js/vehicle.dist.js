/**
 * Vehicle CRUD JS
 */

'use strict';

// Funciones para manejar la alerta de confirmación de eliminación de un vehículo
function showDeleteConfirmation(vehicle_id) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener el nombre y la placa del vehículo usando el vehicle_id
  const vehicleName = document.querySelector(`.vehicle-label-${vehicle_id}`).innerText;
  const licensePlate = document.querySelector(`.vehicle-plate-${vehicle_id}`).innerText;

  Swal.fire({
    title: 'Eliminar Vehículo',
    // Mostrar al usuario el nombre del vehículo que se va a eliminar
    html: `<p class="text-danger">¿Estás seguro de que deseas eliminar el vehículo?<br> <span class="fw-medium text-body">${vehicleName} (Placa: ${licensePlate})</span></p>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
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
        console.error('No se encontró el formulario');
      }
    } else {
      Swal.fire({
        title: 'Cancelado',
        // Mostrar al usuario que el vehículo no ha sido eliminado.
        html: `<p><span class="fw-medium text-primary">${vehicleName}</span> no ha sido eliminado.</p>`,
        icon: 'error',
        confirmButtonText: 'Aceptar',
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

  
  // Función Sweet Alert de éxito (Vehículo Eliminado/Creado/Actualizado)
  function showSuccessAlert(message) {
    var name = message[0].toUpperCase() + message.slice(1);
    Swal.fire({
      title: name,
      text: `¡Vehículo ${message} con éxito!`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
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
    const vehicleType = row.children[3].innerText;
    const licensePlate = row.querySelector(`.vehicle-plate-${vehicleId}`).innerText;
    const label = row.children[5].innerText; // La etiqueta está en la columna 6
    const companyID = row.children[2].innerText; // El ID de la agencia está en la columna 3
    // Establecer atributos del formulario de edición
    const editForm = document.getElementById('editVehicleForm');
    setFormAttributes(editForm, vehicleId, 'EditOrUpdate');

    // Asignar atributos asp-for para enlazar los datos del formulario con el modelo
    setElementAttributes(document.getElementById('EditVehicle_LicensePlate'), 'asp-for', `Vehicles[${vehicleId}].license_plate`);
    setElementAttributes(document.getElementById('EditVehicle_Label'), 'asp-for', `Vehicles[${vehicleId}].label`);
    setElementAttributes(document.getElementById('EditVehicle_Type'), 'asp-for', `Vehicles[${vehicleId}].vehicle_type_id`);
    setElementAttributes(document.getElementById('EditVehicle_CompanyID'), 'asp-for', `Vehicles[${vehicleId}].CompanyID`);
    setElementAttributes(document.getElementById('EditVehicle_Id'), 'asp-for', `Vehicles[${vehicleId}].vehicle_id`);

    // Establecer valores en los campos del formulario
    document.getElementById('EditVehicle_Id').value = vehicleId;
    document.getElementById('EditVehicle_LicensePlate').value = licensePlate;
    document.getElementById('EditVehicle_Label').value = label;
    document.getElementById('EditVehicle_Type').value = vehicleType;

    // Seleccionar la opción del select por el texto de la compañía
    const companySelect = document.getElementById('EditVehicle_CompanyID'); // Asegúrate de que este sea el ID correcto
    for (let i = 0; i < companySelect.options.length; i++) {
      if (companySelect.options[i].text === companyID) {
        companySelect.selectedIndex = i; // Seleccionar la opción que coincide
        break; // Salir del bucle una vez encontrada
      }
    }
    
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
  const createNewVehicleForm = document.getElementById('createVehicleForm');

  // Inicializar FormValidation para el formulario de creación de vehículos
  const fv = FormValidation.formValidation(document.getElementById('createVehicleForm'), {
    fields: {
      'Vehicle.vehicle_id': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese un ID de vehículo'
          },
          stringLength: {
            min: 1,
            max: 100,
            message: 'El ID del vehículo debe tener entre 1 y 100 caracteres'
          }
        }
      },
      'Vehicle.license_plate': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese una matricula'
          },
          stringLength: {
            min: 1,
            max: 20,
            message: 'La placa debe tener entre 1 y 20 caracteres'
          }
        }
      },
      'Vehicle.label': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese una etiqueta'
          },
          stringLength: {
            max: 50,
            message: 'La etiqueta debe tener menos de 50 caracteres'
          }
        }
      },
      'Vehicle.Vehicle_type_id': {
        validators: {
          notEmpty: {
            message: 'Por favor, seleccione un tipo de vehículo'
          }
        }
      },
      'Vehicle.EmpresaID': {
        validators: {
          notEmpty: {
            message: 'Por favor, seleccione una empresa la que se va asociar'
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


  // Obtener el formulario de edición de vehículos para la validación
  const editVehicleForm = document.getElementById('editVehicleForm');

  // Inicializar FormValidation para el formulario de edición de vehículos
  const fv2 = FormValidation.formValidation(editVehicleForm, {
    fields: {
      'vehicle.vehicle_id': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese un ID de vehículo'
          },
          stringLength: {
            min: 1,
            max: 100,
            message: 'El ID del vehículo debe tener entre 1 y 100 caracteres'
          }
        }
      },
      'vehicle.license_plate': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese una matricula'
          },
          stringLength: {
            min: 1,
            max: 20,
            message: 'La placa debe tener entre 1 y 20 caracteres'
          }
        }
      },
      'vehicle.label': {
        validators: {
          notEmpty: {
            message: 'Por favor, ingrese una etiqueta'
          },
          stringLength: {
            max: 50,
            message: 'La etiqueta debe tener menos de 50 caracteres'
          }
        }
      },
      'vehicle.vehicle_type_id': {
        validators: {
          notEmpty: {
            message: 'Por favor, seleccione un tipo de vehículo'
          }
        }
      },
      'vehicle.EmpresaID': {
        validators: {
          notEmpty: {
            message: 'Por favor, seleccione una empresa a la cual se va asociar'
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


// Inicialización de DataTable para la lista de vehículos
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

  // Inicialización de DataTable para la lista de vehículos
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
      searchPlaceholder: 'Buscar Vehículo' // Texto de búsqueda traducido
    },
    // Botones con Dropdown
    buttons: [
      {
        extend: 'collection',
        className: 'btn btn-label-secondary dropdown-toggle mx-4 waves-effect waves-light',
        text: '<i class="ti ti-download me-1"></i>Exportar', // Texto de exportar traducido
        buttons: [
          {
            extend: 'print',
            text: '<i class="ti ti-printer me-2"></i>Imprimir', // Botón de imprimir traducido
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5]
            }
          },
          {
            extend: 'csv',
            text: '<i class="ti ti-file-text me-2"></i>Csv',
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
            text: '<i class="ti ti-copy me-2"></i>Copiar', // Botón de copiar traducido
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5]
            }
          }
        ]
      },
      {
        text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Agregar Nuevo Vehículo</span>', // Texto traducido
        className: 'add-new btn btn-primary ms-2 ms-sm-0 waves-effect waves-light',
        attr: {
          'data-bs-toggle': 'offcanvas',
          'data-bs-target': '#createVehicleOffcanvas'
        }
      },
      {
        text: '<i class="me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Tipo</span>', // Texto para "Tipo" traducido
        className: 'add-new btn btn-primary ms-2 waves-effect waves-light',
        action: function (e, dt, node, config) {
          // Redirigir a la URL deseada en la misma pestaña
          window.location.href = '/Vehicle/VehicleType/Vehicle_Types';
        }
      }
    ],

    // Para ventana emergente responsiva
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal({
          header: function (row) {
            var data = row.data();
            return 'Detalles de ' + data[2]; // Texto de "Detalles de" traducido
          }
        }),
        type: 'column',
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col, i) {
            return col.title !== '' // ? No mostrar acciones en modal
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
