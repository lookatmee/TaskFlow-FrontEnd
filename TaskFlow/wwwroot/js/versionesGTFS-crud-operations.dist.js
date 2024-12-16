// Función para manejar el modal "Editar Versión" usando Offcanvas
const handleEditVersionModal = editButton => {
  // Obtener detalles de la versión desde la tabla
  const versionId = editButton.id.split('-')[0]; // Extraer el ID de la versión del botón
  const versionDescripcion = document.getElementById(`${versionId}-editVersion`).parentElement.parentElement.children[2].innerText;
  const versionFechaInicio = document.getElementById(`${versionId}-editVersion`).parentElement.parentElement.children[3].innerText;
  const versionEstado = document.getElementById(`${versionId}-editVersion`).parentElement.parentElement.children[4].innerText;

  // Asignar los valores extraídos a los campos del formulario
  const editForm = document.getElementById('editVersionForm');
  setFormAttributes(editForm, versionId, 'EditOrUpdate'); // Establecer el handler y el ID

  // Asignar valores a los campos del formulario
  document.getElementById('EditVersion_Descripcion').value = versionDescripcion;
  document.getElementById('EditVersion_FechaInicio').value = formatDateToInput(versionFechaInicio); // Convertir la fecha al formato yyyy-MM-dd
  document.getElementById('EditVersion_Estado').value = versionEstado; // Seleccionar el estado correcto
};

// Función para dar formato a la fecha al estilo del input 'date' (yyyy-MM-dd)
function formatDateToInput(fecha) {
  const [day, month, year] = fecha.split('/'); // Dividir la fecha "dd/MM/yyyy"
  return `${year}-${month}-${day}`; // Devolverla en el formato que requiere el input 'date'
}

// Función para establecer atributos del formulario, incluyendo la ruta y la acción
function setFormAttributes(form, versionId, handler) {
  const routeAttribute = 'asp-route-id'; // Atributo usado para enviar la ID de la versión
  setElementAttributes(form, routeAttribute, versionId); // Establece el ID de la versión en el formulario
  form.action = `/GTFS/Versions/VersionCRUD?handler=${handler}&id=${versionId}`; // Define la acción del formulario
}

// Función para asignar atributos a un elemento
function setElementAttributes(element, attribute, value) {
  element.setAttribute(attribute, value);
}

// Función para mostrar un mensaje de éxito utilizando Sweet Alert después de una operación
function showSuccessAlert(message) {
  var name = message[0].toUpperCase() + message.slice(1);
  Swal.fire({
    title: name,
    text: `Versión ${message} con éxito!`, // Texto que indica el éxito de la operación
    icon: 'success',
    confirmButtonText: 'Ok',
    customClass: {
      confirmButton: 'btn btn-success waves-effect waves-light'
    }
  });
}

// Validación del formulario de edición
(function () {
  const editVersionForm = document.getElementById('editVersionForm');

  const fv = FormValidation.formValidation(editVersionForm, {
    fields: {
      'UpdateVersion.DescripcionVersion': {
        validators: {
          notEmpty: {
            message: 'Por favor ingrese una descripción'
          },
          stringLength: {
            min: 3,
            max: 255,
            message: 'La descripción debe tener entre 3 y 255 caracteres'
          }
        }
      },
      'UpdateVersion.FechaInicioVersion': {
        validators: {
          notEmpty: {
            message: 'Por favor seleccione una fecha de inicio'
          },
          date: {
            format: 'YYYY-MM-DD',
            message: 'La fecha no es válida'
          }
        }
      },
      'UpdateVersion.SelectedEstado': {
        validators: {
          notEmpty: {
            message: 'Por favor seleccione un estado'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: function (field, ele) {
          return '.mb-6'; // Clase usada en los divs de cada campo
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton({
        button: '[type="submit"]'
      }),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  })
    .on('core.form.valid', function () {
      // Si los campos son válidos, envía el formulario
      submitFormAndSetSuccessFlag(editVersionForm, 'editVersionFlag');
    })
    .on('core.form.invalid', function () {
      // Si los campos no son válidos, no hacer nada
      return;
    });

  // Verificar y mostrar mensajes de éxito después de cargar la página
  checkAndShowSuccessAlert('editVersionFlag', 'actualizada');
})();

// Función para enviar el formulario y establecer la bandera de éxito
function submitFormAndSetSuccessFlag(form, flagName) {
  form.submit(); // Envía el formulario
  sessionStorage.setItem(flagName, 'true'); // Establece la bandera de éxito en sessionStorage
}

// Función para verificar y mostrar un mensaje de éxito cuando se completa la edición
function checkAndShowSuccessAlert(flagName, successMessage) {
  const flag = sessionStorage.getItem(flagName);
  if (flag === 'true') {
    showSuccessAlert(successMessage); // Muestra el mensaje de éxito
    sessionStorage.removeItem(flagName); // Elimina la bandera después de mostrar el mensaje
  }
}

// Añadir eventos a los botones de edición
const editVersionButtons = document.querySelectorAll("[id$='-editVersion']");
editVersionButtons.forEach(editButton => {
  editButton.addEventListener('click', () => handleEditVersionModal(editButton));
});
