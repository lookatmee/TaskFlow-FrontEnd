/**
 * User CRUD JS
 * 
 * Este archivo maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los usuarios en la interfaz de usuario.
 */

'use strict';

// Funciones para mostrar modales de SweetAlert

// Función para mostrar el modal de éxito
function showSuccessModal(message) {
  Swal.fire({
    title: 'Éxito',
    text: message,
    icon: 'success',
    confirmButtonText: 'OK',
    customClass: {
      confirmButton: 'btn btn-success waves-effect waves-light'
    }
  });
}

// Función para mostrar el modal de error
function showErrorModal(message) {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    confirmButtonText: 'OK',
    customClass: {
      confirmButton: 'btn btn-danger waves-effect waves-light'
    }
  });
}

// Función para manejar la confirmación de eliminación del usuario con Sweet Alert
function showDeleteConfirmation(userId) {
  event.preventDefault(); // Evita el envío del formulario automáticamente
  Swal.fire({
    title: 'Borrar Usuario',
    html: `<p class="text-danger">¿Estás seguro de que deseas eliminar al usuario?<br /></p>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'btn btn-primary waves-effect waves-light',
      cancelButton: 'btn btn-label-secondary waves-effect waves-light'
    }
  }).then(result => {
    if (result.isConfirmed) {
      const form = document.getElementById(userId + '-deleteForm');
      if (form) {
        submitFormAndSetSuccessFlag(form, 'successFlag');
      } else {
        console.error('No se encontró el formulario para eliminar el usuario');
      }
    } else {
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

// Función para manejar el modal de "Cambiar contraseña" y asignar el UsuarioID
$('#modalCenter').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Botón que activó el modal
  var userId = button.data('userid'); // Extrae el UsuarioID del atributo data-userid
  var modal = $(this);

  // Asignar el UsuarioID al botón de cambiar contraseña
  modal.find('#changePasswordButton').attr('data-userid', userId);
});

// Función para validar las contraseñas
function validatePasswords() {
  const password = document.getElementById('passwordWithTitle').value;
  const confirmPassword = document.getElementById('repeatPasswordWithTitle').value;

  // Validación de contraseñas vacías
  if (!password || !confirmPassword) {
    showErrorModal('Debe escribir ambas contraseñas.');
    return false;
  }

  // Validación de contraseñas iguales
  if (password !== confirmPassword) {
    showErrorModal('Las contraseñas no coinciden.');
    return false;
  }

  // Validación de longitud de la contraseña (al menos 6 caracteres)
  if (password.length < 6) {
    showErrorModal('La contraseña debe tener al menos 6 caracteres.');
    return false;
  }

  return true;
}

// Función al hacer clic en el botón "Cambiar contraseña"
$('#changePasswordButton').on('click', function () {
  // Primero validamos las contraseñas
  if (!validatePasswords()) {
    return;  // Si la validación falla, no se procede con la solicitud AJAX
  }

  // Si las contraseñas son válidas, procedemos con la solicitud AJAX
  var userId = parseInt($(this).attr('data-userid'), 10);
  var newPassword = $('#passwordWithTitle').val();

  $.ajax({
    url: '/Administration/SystemUsers/SystemUserCRUD?handler=ChangePassword',
    method: 'POST',
    data: JSON.stringify({
      id: userId,
      newPassword: newPassword
    }),
    contentType: 'application/json',
    dataType: 'json',
    headers: {
      "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val()
    },
    success: function (response) {
      showSuccessModal('Contraseña cambiada correctamente');
      $('#modalCenter').modal('hide');
    },
    error: function (error) {
      showErrorModal('Error al cambiar la contraseña: ' + error.responseText);
    }
  });
});

// Función para enviar correo desde el Front cambiar contraseña.
function enviarCorreoRestablecerContrasena(email) {
  // Usar la variable baseUrl que fue pasada desde el backend al .cshtml
  const url = `${baseUrl}/Email/ForgotPassword`; // Construir la URL completa usando baseUrl

  // Crear el cuerpo de la solicitud
  const data = {
    Email: email // Asegúrate de que coincida con el modelo ForgotPasswordRequest del API
  };

  // Hacer la solicitud usando fetch
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Especificar que el contenido es JSON
    },
    body: JSON.stringify(data) // Convertir el cuerpo de la solicitud a JSON
  })
    .then(response => {
      if (response.ok) {
        return response.text(); // Manejar la respuesta como texto
      } else {
        throw new Error('Error al enviar el correo de restablecimiento de contraseña');
      }
    })
    .then(message => {
      // Mostrar mensaje de éxito al usuario
      showSuccessModal(message);
    })
    .catch(error => {
      console.error('Error:', error);
      showErrorModal('Hubo un problema al procesar la solicitud.');
    });
}


(function () {
  // Función para establecer atributos de un elemento, por ejemplo, asp-for
  function setElementAttributes(element, attribute, value) {
    element.setAttribute(attribute, value); // Establece el atributo HTML en un elemento
  }

  // Función para configurar los atributos del formulario, incluyendo la ruta y la acción
  function setFormAttributes(form, userId, handler) {
    const routeAttribute = 'asp-route-id';
    setElementAttributes(form, routeAttribute, userId); // Establece el ID del usuario en el formulario
    form.action = `/Administration/SystemUsers/SystemUserCRUD?handler=${handler}&id=${userId}`;
  }

  // Función para mostrar un mensaje de éxito utilizando Sweet Alert después de una operación
  function showSuccessAlert(message) {
    var name = message[0].toUpperCase() + message.slice(1);
    Swal.fire({
      title: name,
      text: `Usuario ${message} con éxito!`,
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
      showSuccessAlert(successMessage);
      sessionStorage.removeItem(flagName);
    }
  }

  // Función para manejar el modal "Editar Usuario" usando Offcanvas
  const handleEditUserModal = editButton => {
    const userId = editButton.id.split('-')[0]; // Extraer el ID del usuario del botón
    const userName = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[2].innerText;
    const userEmail = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[1].innerText;
    const userApellidos = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[3].innerText;
    const userSelectedRole = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[4].innerText;

    const editForm = document.getElementById('editUserForm');
    setFormAttributes(editForm, userId, 'EditOrUpdate');

    setElementAttributes(document.getElementById('EditUser_UserName'), 'asp-for', `Users[${userId}].Nombre`);
    setElementAttributes(document.getElementById('EditUser_Email'), 'asp-for', `Users[${userId}].Email`);
    setElementAttributes(document.getElementById('EditUser_Apellidos'), 'asp-for', `Users[${userId}].Apellidos`);
    setElementAttributes(document.getElementById('EditUser_SelectedRole'), 'asp-for', `Users[${userId}].SelectedRole`);
    setElementAttributes(document.getElementById('EditUser_SelectedEstado'), 'asp-for', `Users[${userId}].Estado`);
    setElementAttributes(document.getElementById('EditUser_SelectedEmpresas'), 'asp-for', `Users[${userId}].UsuarioEmpresas`);

    document.getElementById('EditUser_UserName').value = userName;
    document.getElementById('EditUser_Email').value = userEmail;
    document.getElementById('EditUser_Apellidos').value = userApellidos;

    const roleSelect = document.getElementById('EditUser_SelectedRole');
    roleSelect.value = userSelectedRole;

    const userSelectEstado = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[5].querySelector('span').textContent;
    const estadoSelect = document.getElementById('EditUser_SelectedEstado');
    estadoSelect.value = userSelectEstado;

    let ids = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[6].innerText.split(',').filter(id => id !== '').map(Number);
    const element = document.getElementById('EditUser_SelectedEmpresas');

    for (let i = 0; i < element.options.length; i++) {
      element.options[i].selected = ids.includes(parseInt(element.options[i].value));
    }

    element.dispatchEvent(new Event('change', { bubbles: true }));

    if (element.classList.contains('select2-hidden-accessible')) {
      const event = new Event('select2:select', { bubbles: true, cancelable: true });
      element.dispatchEvent(event);
    }
  };

  const editUserButtons = document.querySelectorAll("[id$='-editUser']");
  editUserButtons.forEach(editButton => {
    editButton.addEventListener('click', () => handleEditUserModal(editButton));
  });

  checkAndShowSuccessAlert('successFlag', 'Borrado');
  checkAndShowSuccessAlert('newUserFlag', 'Creado');
  checkAndShowSuccessAlert('editUserFlag', 'Actualizado');

  const createNewUserForm = document.getElementById('createUserForm');
  const fv = FormValidation.formValidation(createNewUserForm, {
    fields: {
      'NewUser.Nombre': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese un nombre de usuario'
          },
          stringLength: {
            min: 2,
            max: 20,
            message: 'El nombre debe tener entre 6 y 20 caracteres'
          }
        }
      },
      'NewUser.Email': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese un correo electrónico'
          },
          emailAddress: {
            message: 'Por favor ingrese un correo válido'
          },
          stringLength: {
            max: 50,
            message: 'El correo electrónico no puede tener más de 50 caracteres'
          }
        }
      },
      'NewUser.Apellidos': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese los apellidos'
          }
        }
      },
      'NewUser.SelectedRole': {
        validators: {
          notEmpty: {
            message: 'Por favor seleccione un rol'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: function (field, ele) {
          return '.mb-6';
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton({
        button: '[type="submit"]'
      }),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  })
    .on('core.form.valid', function () {
      submitFormAndSetSuccessFlag(createNewUserForm, 'newUserFlag');
    })
    .on('core.form.invalid', function () {
      return;
    });

  const editUserForm = document.getElementById('editUserForm');
  const fv2 = FormValidation.formValidation(editUserForm, {
    fields: {
      'UpdateUser.Email': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese un correo electrónico'
          },
          emailAddress: {
            message: 'Por favor ingrese un correo válido'
          },
          stringLength: {
            max: 50,
            message: 'El correo electrónico no puede tener más de 50 caracteres'
          }
        }
      },
      'UpdateUser.Nombre': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese un nombre'
          },
          stringLength: {
            min: 3,
            max: 50,
            message: 'El nombre debe tener entre 3 y 50 caracteres'
          }
        }
      },
      'UpdateUser.Apellidos': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese los apellidos'
          },
          stringLength: {
            min: 3,
            max: 50,
            message: 'Los apellidos deben tener entre 3 y 50 caracteres'
          }
        }
      },
      'UpdateUser.SelectedRole': {
        validators: {
          notEmpty: {
            message: 'Por favor seleccione un rol'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: function (field, ele) {
          return '.mb-6';
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton({
        button: '[type="submit"]'
      }),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  })
    .on('core.form.valid', function () {
      submitFormAndSetSuccessFlag(editUserForm, 'editUserFlag');
    })
    .on('core.form.invalid', function () {
      return;
    });

  $('#userTable').DataTable({
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
      searchPlaceholder: 'Buscar Usuario',
      paginate: {
        next: '<i class="ti ti-chevron-right ti-sm"></i>',
        previous: '<i class="ti ti-chevron-left ti-sm"></i>'
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
            title: 'Datos de Usuarios',
            text: '<i class="ti ti-printer me-2"></i>Imprimir',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4],
              format: {
                body: function (data, row, column, node) {
                  return data;
                }
              }
            }
          },
          {
            extend: 'csv',
            title: 'Usuarios',
            text: '<i class="ti ti-file-text me-2"></i>CSV',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4]
            }
          },
          {
            extend: 'excel',
            title: 'Usuarios',
            text: '<i class="ti ti-file-spreadsheet me-2"></i>Excel',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4]
            }
          },
          {
            extend: 'pdf',
            title: 'Usuarios',
            text: '<i class="ti ti-file-text me-2"></i>PDF',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4]
            }
          },
          {
            extend: 'copy',
            title: 'Usuarios',
            text: '<i class="ti ti-copy me-2"></i>Copiar',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4]
            }
          }
        ]
      },
      {
        text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">Añadir Nuevo Usuario</span>',
        className: 'add-new btn btn-primary ms-2 ms-sm-0 waves-effect waves-light',
        attr: {
          'data-bs-toggle': 'offcanvas',
          'data-bs-target': '#createUserOffcanvas'
        }
      }
    ],
    responsive: true,
    rowReorder: {
      selector: 'td:nth-child(2)'
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
        targets: 1,
        responsivePriority: 4
      },
      {
        targets: 2,
        responsivePriority: 3
      },
      {
        targets: 3,
        responsivePriority: 9
      },
      {
        targets: 4,
        responsivePriority: 5
      },
      {
        targets: -1,
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
            var $content = $(data[2]);
            var userName = $content.find('[class^="user-name-full-"]').text();
            return 'Detalles de ' + userName;
          }
        }),
        type: 'column',
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col, i) {
            if (i < columns.length - 1) {
              return col.title !== ''
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
            }
            return '';
          }).join('');

          return data ? $('<table class="table mt-3"/><tbody />').append(data) : false;
        }
      }
    }
  });
})();

// Para cerrar el modal de edición al hacer clic en el botón
var editUserOffcanvas = $('#editUserOffcanvas');

// Evento para cerrar el offcanvas de edición cuando se abre
editUserOffcanvas.on('show.bs.offcanvas', function () {
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
