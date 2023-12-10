const uploadButton = document.querySelector('.csv-block__button');
const reloadButton = document.querySelector('.new-data__button');
const fileInput = document.querySelector('.csv-file__input');
const mainScreen = document.getElementById('main-screen');
const dataScreen = document.getElementById('data-screen');
const dataTableBody = document.getElementById('data-body');

let data = [];

window.addEventListener('load', () => {
  const storedData = localStorage.getItem('csvData');
  if (storedData) {
    data = JSON.parse(storedData);
    data.forEach(displayDataInTable);
    dataScreen.style.display = 'flex';
    mainScreen.style.display = 'none';
  }
});

fileInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (file && file.name.endsWith('.csv')) {
    const fileRead = new FileReader();
    fileRead.addEventListener('load', (evt) => {
      const csvData = evt.target.result;
      processData(csvData);
      dataScreen.style.display = 'flex';
      mainScreen.style.display = 'none';
      localStorage.setItem('csvData', JSON.stringify(data));
    });
    fileRead.readAsText(file, 'windows-1251');
  }
  else {
    const errorMessage = document.querySelector('.error-block');
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 2000);
  }
})

uploadButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  fileInput.click();
});

reloadButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  data = [];
  dataTableBody.innerHTML = '';
  dataScreen.style.display = 'none';
  mainScreen.style.display = 'block';
});

function processData(csvData) {
  const rows = csvData.split('\n');
  for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(',');
    const item = {
      name: columns[0],
      phone: columns[1],
      email: columns[2],
      bday: columns[3],
      address: columns[4],
    };
    data.push(item);
    displayDataInTable(item);
  }
}

function displayDataInTable(item) {
  const row = document.createElement('tr');
  for (const key in item) {
    const cell = document.createElement('td');
    cell.textContent = item[key];
    row.appendChild(cell);
  }
  dataTableBody.appendChild(row);
}

