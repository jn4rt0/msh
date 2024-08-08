document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const submitBtn = document.getElementById('submitBtn');
  const eligibilityInput = document.getElementById('eligibility');
  const rankSelect = document.getElementById('rank');
  const lastExamDateInput = document.getElementById('lastExamDate');
  
  function calculateEligibility() {
    const rank = parseInt(rankSelect.value);
    const lastExamDate = new Date(lastExamDateInput.value);
    const today = new Date();
    const yearDifference = today.getFullYear() - lastExamDate.getFullYear();
    const monthDifference = today.getMonth() - lastExamDate.getMonth();
    const totalMonths = (yearDifference * 12) + monthDifference;

    let eligibility = 'TIDAK LAYAK';
    if (yearDifference >= rank + 1) {
      eligibility = 'LAYAK';
    }

    eligibilityInput.value = eligibility;
    submitBtn.disabled = eligibility !== 'LAYAK';
  }

  rankSelect.addEventListener('change', calculateEligibility);
  lastExamDateInput.addEventListener('change', calculateEligibility);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const data = {
      memberNumber: document.getElementById('memberNumber').value,
      fullName: document.getElementById('fullName').value,
      birthPlace: document.getElementById('birthPlace').value,
      birthDate: document.getElementById('birthDate').value,
      rank: rankSelect.value,
      lastExamDate: lastExamDateInput.value,
      eligibility: eligibilityInput.value
    };

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += Object.keys(data).join(",") + "\n";
    csvContent += Object.values(data).join(",") + "\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  if (document.getElementById('recordsTable')) {
    fetch('data.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        const rows = lines.slice(1);

        const tableBody = document.querySelector('#recordsTable tbody');
        rows.forEach(row => {
          if (row.trim() === '') return;
          const cells = row.split(',');
          const tr = document.createElement('tr');
          cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
          });
          tableBody.appendChild(tr);
        });
      });
  }
});

