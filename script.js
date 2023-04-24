function renderDragDrop(users) {  
  const $dropContainer = document.querySelector('.drop-container');

  const $zonaOne = document.createElement('div');
  $zonaOne.classList.add("zona-1");

  const $zonaTwo = document.createElement('div');
  $zonaTwo.classList.add("zona-2");
  
  const keys = Object.keys(users[0]);
  keys.forEach(key => {
    const $item = document.createElement('div');
    $item.id = key;
    $item.innerHTML = key;
    $item.draggable = true;
    $item.ondragstart = event => {
      event.dataTransfer.setData('id', event.target.id)
    };
      $zonaTwo.appendChild($item);
  });
  
  $dropContainer.append($zonaOne, $zonaTwo);

  $dropContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  $dropContainer.addEventListener('drop', (event) => {
    const itemId = event.dataTransfer.getData('id');
    event.target.appendChild(document.getElementById(itemId));
  });

  }

  


  let newSelectColumns = ['name','username','company',];
  console.log(newSelectColumns)

function renderTable(users) {
  const table = document.createElement("table");
  const headerRow = table.insertRow();
  
  for (let field of newSelectColumns) {
    const headerCell = document.createElement("th");
    headerCell.innerHTML = field;
    headerRow.appendChild(headerCell);
  }

  const body = table.createTBody();

  users.forEach(function (rowData) {
    const row = body.insertRow();
    newSelectColumns.forEach(function (field) {
      const cell = row.insertCell();
      cell.innerHTML = rowData[field];

      if (field === 'company') {
        cell.innerHTML = rowData.company.name
      }
      if (field === 'address') {
        cell.innerHTML = rowData.address.city
      }
    });
  });

  document.body.appendChild(table);

  const $dropContainer = document.querySelector('.drop-container');
  $dropContainer.addEventListener('drop', (event) => {
    const itemId = event.dataTransfer.getData('id'); 
    newSelectColumns.push(itemId)
  })
  
}

function buttonHandler(users) {
  const $dropContainer = document.querySelector('.drop-container')
  const $dragButton = document.createElement('button');
  $dragButton.classList.add('drag-button');
  $dragButton.addEventListener('click', buttonHandler)
  $dragButton.innerHTML = 'Apply'
  $dropContainer.appendChild($dragButton)

  function buttonHandler () {
    const table = document.querySelector('table')
    table.remove()
    renderTable(users)
  }
}


fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    renderTable(users);
    renderDragDrop(users);
    buttonHandler(users)

  });
