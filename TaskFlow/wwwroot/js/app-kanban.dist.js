/**
 * App Kanban
 */

'use strict';

let users = [];

async function loadUsers() {
  try {
    users = userData || [];
    console.log('Usuarios cargados:', users);
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
}

function showCreateWorkItemModal() {
  const statusOptions = Object.entries({
    0: 'Pendiente',
    1: 'En Progreso',
    2: 'Completado'
  }).map(([value, text]) => `<option value="${value}">${text}</option>`).join('');

  const userOptions = users.map(user =>
    `<option value="${user.id}">${user.name}</option>`
  ).join('');

  Swal.fire({
    title: 'Crear Nueva Tarea',
    html: `
      <form id="createWorkItemForm" class="text-start">
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input type="text" class="form-control" id="title" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Descripción</label>
          <textarea class="form-control" id="description" rows="3" required></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Estado</label>
          <select class="form-select" id="status" required>
            ${statusOptions}
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Asignar a</label>
          <select class="form-select" id="assignedUserId" required>
            <option value="">Seleccionar usuario...</option>
            ${userOptions}
          </select>
        </div>
      </form>
    `,
    width: '600px',
    showCancelButton: true,
    confirmButtonText: 'Crear',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-secondary'
    },
    preConfirm: () => {
      const form = document.getElementById('createWorkItemForm');
      if (!form.checkValidity()) {
        form.reportValidity();
        return false;
      }

      const workItem = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: parseInt(document.getElementById('status').value),
        assignedUserId: parseInt(document.getElementById('assignedUserId').value)
      };

      return createWorkItem(workItem);
    }
  });
}

async function createWorkItem(workItem) {
  try {
    const response = await fetch('/Apps/Kanban', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value
      },
      body: JSON.stringify(workItem)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear la tarea');
    }

    const result = await response.json();
    await Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'La tarea se ha creado correctamente',
      timer: 2000
    });

    window.location.reload();
    return result;
  } catch (error) {
    Swal.showValidationMessage(`Error: ${error.message}`);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  // Cargar usuarios al inicio
  await loadUsers();

  const kanbanWrapper = document.querySelector('.kanban-wrapper');
  console.log('Datos del kanban:', kanbanData);

  const kanbanConfig = {
    element: '.kanban-wrapper',
    gutter: '12px',
    widthBoard: '250px',
    dragItems: true,
    boards: kanbanData || [],
    dragBoards: false,
    click: function(el) {
      const itemId = el.getAttribute('data-eid');
      const board = kanbanData.find(board =>
        board.item.some(item => item.id === parseInt(itemId))
      );
      const item = board.item.find(item => item.id === parseInt(itemId));

      Swal.fire({
        title: item.title,
        html: `
          <div class="mt-3">
            <div class="mb-3">
              <h6 class="mb-1">Descripción:</h6>
              <p>${item.description || 'Sin descripción'}</p>
            </div>

            <div class="mb-3">
              <h6 class="mb-1">Detalles:</h6>
              <p><strong>ID:</strong> ${item.id}</p>
              <p><strong>Estado:</strong> ${item.status}</p>
              <p><strong>Asignado a:</strong> ${item.assignedUserName || 'Sin asignar'}</p>
            </div>

            <div class="mb-3">
              <h6 class="mb-1">Fechas:</h6>
              <p><strong>Creado:</strong> ${new Date(item.createdAt).toLocaleString()}</p>
              <p><strong>Actualizado:</strong> ${new Date(item.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        `,
        width: '600px',
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'kanban-detail-modal',
          content: 'p-0',
          header: 'border-bottom'
        }
      });
    },
    itemTemplate: function(item) {
      console.log('Renderizando item:', item);
      return `
        <div class="kanban-item" data-eid="${item.id}" style="min-height: 200px; margin-bottom: 15px; cursor: pointer;">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="mb-2 w-100">
              <h5 class="mb-1">${item.title}</h5>
              <div class="badge bg-label-primary">ID: ${item.id}</div>
              <div class="badge bg-label-info">Status: ${item.status}</div>
            </div>

            <div class="description mb-2 w-100">
              <p class="mb-2 text-truncate">${item.description || 'Sin descripción'}</p>
            </div>

            <div class="assignment-info w-100">
              <div class="mb-1">
                <i class="ti ti-user me-1"></i>
                <span>${item.assignedUserName || 'Sin asignar'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  };

  try {
    const kanban = new jKanban(kanbanConfig);
    console.log('Kanban inicializado correctamente:', kanban);
  } catch (error) {
    console.error('Error al inicializar Kanban:', error);
  }
});
