function observeZonaOneInsertion() {
  const zonaOne = document.querySelector('.zona-1');
  zonaOne.addEventListener('DOMNodeInserted', (event) => {
    if (event.target.getAttribute('draggable') === 'true') {
      const selectColumn = event.target.id
      console.log(selectColumn)
      blokOne.item.push(selectColumn)
    }
  });
}
const blokObservZon = {
  item: [],
};


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

  // const keys = Object.keys(users[0])
  // keys.forEach(key => {
  //   const $item = document.createElement('div');
  //   $item.id = key
  //   $item.innerHTML = key
  //   $item.setAttribute('draggable', 'true')

  //   $zonaTwo.appendChild($item)
  //   $dropContainer.append($zonaOne, $zonaTwo)

  //   $zonaOne.ondragover = allowDrop;
  //   $zonaTwo.ondragover = allowDrop;

  //   $zonaOne.ondrop = drop;
  //   $zonaTwo.ondrop = drop;

  //   $item.ondragstart = drag;

  // })

//   function allowDrop(event) {
//     event.preventDefault()
//   }
//   function drag(event) {
//     event.dataTransfer.setData('id', event.target.id)
//   }
//   function drop(event) {
//     let itemId = event.dataTransfer.getData('id');
//     event.target.append(document.getElementById(itemId))
//   }

// }

function renderTable(users) {

  const keyUsers = Object.keys(users[0])
  let selectColumns = [...keyUsers]

  const table = document.createElement("table");
  const headerRow = table.insertRow();

  for (let field of selectColumns) {
    const headerCell = document.createElement("th");
    headerCell.innerHTML = field;
    headerRow.appendChild(headerCell);
  }

  const body = table.createTBody();

  users.forEach(function (rowData) {
    const row = body.insertRow();
    selectColumns.forEach(function (field) {
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

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    renderTable(users);
    renderDragDrop(users);
    observeZonaOneInsertion()
  });
