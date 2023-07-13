document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("vehicleForm");
  const vehicleList = document.getElementById("vehicleList");
  let vehicles = [];

  loadVehicles();

  form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    const ownerInput = document.getElementById("owner");
    const vehicleInput = document.getElementById("vehicle");
    const maintenanceSelect = document.getElementById("maintenance");
    const owner = ownerInput.value;
    const vehicle = vehicleInput.value;
    const maintenance = maintenanceSelect.value;

    if (owner && vehicle && maintenance) {
      const vehicleId = vehicleInput.getAttribute("data-id");

      if (vehicleId) {
        updateVehicle(owner, vehicle, maintenance, vehicleId);
      } else {
        addVehicle(owner, vehicle, maintenance);
      }

      ownerInput.value = "";
      vehicleInput.value = "";
      maintenanceSelect.value = "preventivo";
      vehicleInput.removeAttribute("data-id"); 
    }
  });

  function loadVehicles() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://lisandrohr.com//api/vehicles", true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        vehicles = JSON.parse(xhr.responseText);
        renderVehicles();
      }
    };
    xhr.send();
  }

  function addVehicle(owner, vehicle, maintenance) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://lisandrohr.com//api/vehicles/`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
      if (xhr.status === 200) {
        loadVehicles(); 
      }
    };
    const newVehicle = {owner, vehicle, maintenance };
    xhr.send(JSON.stringify(newVehicle));
  }

  function updateVehicle(owner, vehicle, maintenance, id) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://lisandrohr.com//api/vehicles/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
      if (xhr.status === 200) {
        loadVehicles();
      }
    };
    const updatedVehicle = {owner, vehicle, maintenance, id }; 
    xhr.send(JSON.stringify(updatedVehicle));
  }

  function deleteVehicle(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://lisandrohr.com//api/vehicles/${id}`, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        loadVehicles(); 
      }
    };
    xhr.send();
  }

  function renderVehicles() {
    vehicleList.innerHTML = "";
    vehicles.forEach(function(vehicle) {
      renderVehicle(vehicle);
    });
  }

  function renderVehicle(vehicle) {
    const li = document.createElement("li");
    li.innerHTML = `
      ${vehicle.owner} - ${vehicle.vehicle} - ${vehicle.maintenance}
      <button class="editButton" data-id="${vehicle.id}">Editar</button>
      <button class="deleteButton" data-id="${vehicle.id}">Eliminar</button>
    `;
    vehicleList.appendChild(li);

    const editButton = li.querySelector(".editButton");
    const deleteButton = li.querySelector(".deleteButton");

    editButton.addEventListener("click", function() {
      const ownerInput = document.getElementById("owner");
      const vehicleInput = document.getElementById("vehicle");
      const maintenanceSelect = document.getElementById("maintenance");
      ownerInput.value = vehicle.owner;
      vehicleInput.value = vehicle.vehicle;
      maintenanceSelect.value = vehicle.maintenance;
      vehicleInput.setAttribute("data-id", vehicle.id);
    });

    deleteButton.addEventListener("click", function() {
      deleteVehicle(vehicle.id);
    });
  }
})
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(function(){
    preloader.style.display = 'none';
  }, 1500);
});
