let newSelectColumns = ['name', 'username', 'company', 'email'];
const $dropContainer = document.querySelector('.drop-container');


function renderDragDrop(users) {
  const $zonaOne = document.createElement('div');
  $zonaOne.classList.add("zona-1");

  const $zonaTwo = document.createElement('div');
  $zonaTwo.classList.add("zona-2");
  
  const keys = Object.keys(users[0]);
  keys.forEach(key => {
    const $item = document.createElement('div');

    const $buttonItem = document.createElement('button')
    $buttonItem.id = "button-item"
    $buttonItem.innerHTML = "Delete"

    $item.id = key;
    $item.innerHTML = key;
    $item.draggable = true;
    $item.ondragstart = event => {
      event.dataTransfer.setData('id', event.target.id)
    };

    $item.appendChild($buttonItem)
    $zonaTwo.appendChild($item);

    $buttonItem.addEventListener('click', handlerButtonItem)});
    function handlerButtonItem(el){
      const itemId = this.parentNode.id
      newSelectColumns.push(itemId)
      $zonaOne.insertAdjacentHTML('beforeend', `<div id="${itemId}" draggable="true">${itemId}</div>`)
      this.parentNode.remove(this)
    }

  $dropContainer.append($zonaOne, $zonaTwo);

  $dropContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  $dropContainer.addEventListener('drop', (event) => {
    const itemId = event.dataTransfer.getData('id');
    event.target.appendChild(document.getElementById(itemId));
    newSelectColumns.push(itemId)
  });


}

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
}

function buttonHandler(users) {
  const $dragButton = document.createElement('button');
  $dragButton.classList.add()
  $dragButton.addEventListener('click', buttonHandler)
  $dragButton.innerHTML = 'Apply'
  $dropContainer.appendChild($dragButton)

  function buttonHandler() {
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
    newSelectColumns = [];
  });
