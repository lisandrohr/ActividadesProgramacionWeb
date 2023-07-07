// Función para hacer una solicitud AJAX
function ajaxRequest(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText));
      } else {
        callback(new Error('Error: ' + xhr.status));
      }
    }
  };
  xhr.send(JSON.stringify(data));
}

// Función para agregar una actividad
function addActivity(activity) {
  ajaxRequest('POST', '/api/activities', { activity: activity }, function(error, response) {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Actividad agregada:', response);
      renderActivities();
    }
  });
}

// Función para eliminar una actividad
function deleteActivity(id) {
  ajaxRequest('DELETE', '/api/activities/' + id, null, function(error, response) {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Actividad eliminada:', response);
      renderActivities();
    }
  });
}

// Función para cargar y mostrar las actividades
function renderActivities() {
  ajaxRequest('GET', '/api/activities', null, function(error, response) {
    if (error) {
      console.error('Error:', error);
    } else {
      var activityList = document.getElementById('activity-list');
      activityList.innerHTML = '';

      response.activities.forEach(function(activity) {
        var li = document.createElement('li');
        li.textContent = activity;
        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function() {
          deleteActivity(activity.id);
        });
        
        li.appendChild(deleteButton);
        activityList.appendChild(li);
      });
    }
  });
}

// Evento de envío del formulario
document.getElementById('activity-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var activityInput = document.getElementById('activity');
  var activity = activityInput.value.trim();
  
  if (activity !== '') {
    addActivity(activity);
    activityInput.value = '';
  }
});

// Carga inicial de las actividades
renderActivities();
