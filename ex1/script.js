  

  document.getElementById('alumnoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var nombre = document.getElementById('nombre').value;
    var peso = parseInt(document.getElementById('peso').value);
    
    var tableId;
    if (peso < 40) {
      tableId = 'menos40Table';
    } else if (peso >= 40 && peso < 50) {
      tableId = 'entre40y50Table';
    } else if (peso >= 50 && peso < 60) {
      tableId = 'entre50y60Table';
    } else {
      tableId = 'mas60Table';
    }
    
    var table = document.getElementById(tableId);
    var row = table.insertRow(-1);
    var nombreCell = row.insertCell(0);
    var pesoCell = row.insertCell(1);
    nombreCell.innerHTML = nombre;
    pesoCell.innerHTML = peso;
    
    document.getElementById('nombre').value = '';
    document.getElementById('peso').value = '';
  });