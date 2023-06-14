document.getElementById('savings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateInterest();
  });
  
  function calculateInterest() {
    var initialAmount = parseFloat(document.getElementById('initial-amount').value);
    var monthlyDeposit = 250.00;
    var interestRate = 0.0125; // 1.25%
    var totalAmount = initialAmount;
    
    var resultTable = document.getElementById('result');
    resultTable.innerHTML = '<tr><th>Mes</th><th>Monto acumulado</th></tr>';
    
    for (var month = 1; month <= 12; month++) {
      totalAmount += monthlyDeposit;
      totalAmount += totalAmount * interestRate;
      
      var row = document.createElement('tr');
      var monthCell = document.createElement('td');
      monthCell.textContent = 'Mes ' + month;
      row.appendChild(monthCell);
      
      var amountCell = document.createElement('td');
      amountCell.textContent = totalAmount.toFixed(2) + ' Bs.';
      row.appendChild(amountCell);
      
      resultTable.appendChild(row);
    }
  }