document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("activityForm");
    const activityList = document.getElementById("activityList");
    let activities = [];
  
    // Cargar actividades al cargar la página
    loadActivities();
  
    // Agregar evento submit al formulario
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevenir el envío del formulario
      const activityInput = document.getElementById("activity");
      const timeInput = document.getElementById("time");
      const dateInput = document.getElementById("date");
      const activity = activityInput.value;
      const time = timeInput.value;
      const date = dateInput.value;
  
      if (activity && time && date) {
        const activityId = activityInput.getAttribute("data-id");
  
        if (activityId) {
          // Editar actividad existente
          updateActivity(activity, time, date, activityId);
        } else {
          // Agregar nueva actividad
          addActivity(activity, time, date);
        }
  
        activityInput.value = ""; // Limpiar el campo de actividad
        timeInput.value = ""; // Limpiar el campo de tiempo
        dateInput.value = ""; // Limpiar el campo de fecha
        activityInput.removeAttribute("data-id"); // Limpiar el atributo de ID
      }
    });

    // Función para cargar las actividades desde la API
    function loadActivities() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/activities", true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      activities = JSON.parse(xhr.responseText);
      renderActivities();
    }
  };
  xhr.send();
}

// Función para guardar una nueva actividad en la API
function addActivity(activity, time, date) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `http://localhost:3000/api/activities/`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    if (xhr.status === 200) {
      loadActivities(); // Recargar las actividades después de guardar
    }
  };
  const newActivity = {activity, time, date };
  xhr.send(JSON.stringify(newActivity));
}

// Función para actualizar una actividad existente en la API
function updateActivity(activity, time, date, id) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `http://localhost:3000/api/activities/${id}`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function() {
    if (xhr.status === 200) {
      loadActivities(); // Recargar las actividades después de actualizar
    }
  };
  const updatedActivity = {activity, time, date, id }; // Agregar el ID en el objeto
  xhr.send(JSON.stringify(updatedActivity));
}


// Función para eliminar una actividad de la API
function deleteActivity(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `http://localhost:3000/api/activities/${id}`, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      loadActivities(); // Recargar las actividades después de eliminar
    }
  };
  xhr.send();
}

    // Función para renderizar las actividades
    function renderActivities() {
      activityList.innerHTML = "";
      activities.forEach(function(activity) {
        renderActivity(activity);
      });
    }
  
    // Función para renderizar una actividad
    function renderActivity(activity) {
      const li = document.createElement("li");
      li.innerHTML = `
        ${activity.activity} - ${activity.time} - ${activity.date}
        <button class="editButton" data-id="${activity.id}">Editar</button>
        <button class="deleteButton" data-id="${activity.id}">Eliminar</button>
      `;
     
  activityList.appendChild(li);
  
  const editButton = li.querySelector(".editButton");
  const deleteButton = li.querySelector(".deleteButton");
  
  editButton.addEventListener("click", function() {
    const activityInput = document.getElementById("activity");
    const timeInput = document.getElementById("time");
    const dateInput = document.getElementById("date");
    activityInput.value = activity.activity;
    timeInput.value = activity.time;
    dateInput.value = activity.date;
    activityInput.setAttribute("data-id", activity.id);
  });
  
  deleteButton.addEventListener("click", function() {
    const activityId = activity.id; // Obtener el ID de la actividad
    deleteActivity(activityId);

  });
}})