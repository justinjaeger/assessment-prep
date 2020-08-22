/*
  This application generates a list generated from a MongoDB database
  Allows client to type in an input field and submit, where it then appears in the list
*/

// ======================== //
// === HELPER FUNCTIONS === //
// ======================== //

function newElement(TYPE, PARENTID, IDorCLASS, IDorClassNAME) {
  const el = document.createElement(TYPE); // create
  if (PARENTID === 'body') document.body.appendChild(el); // append
  else document.getElementById(PARENTID).appendChild(el);
  if (IDorClassNAME) el.setAttribute(IDorCLASS, IDorClassNAME) // set attribute
  return el; // return
};

// ====================== //
// === EVENT HANDLERS === //
// ====================== //

const input = document.querySelector('#main-input'); // Main input field
const button = document.querySelector('#submit-button'); // Submit button

/*
  When clicked, sends a POST request to the server with the input in the body
  ... accessed as req.body.title
*/
button.addEventListener('click', () => {
  console.log(input.value)
  fetch('/db', {
    method: 'POST',
    headers: { "Content-Type": "Application/JSON" },
    body: JSON.stringify({ title: input.value })
  })
    .then(resp => resp.json())
    .then(resp => console.log('list item added: ', resp))
    .catch(err => console.log('error while posting to db', err));
});

// ====================== //
// === CONSTRUCT LIST === //
// ====================== //

/* 
  Creates a list container in the DOM
  Populates the list container with the list items from the data - an array of objects
*/

class ListContainer {
  constructor(data) {

    const list = newElement('div', 'body', 'id', 'list');
    data.map(el => new ListItem(el));
  }
};

/* 
  Creates individual list elements in the DOM
  Uses the data to get the title // our input // as inner html
*/

class ListItem {
  constructor(obj) {

    const listItem = newElement('div', 'list', 'class', 'list-item');
    listItem.innerHTML = obj.title;
  }
};

// =============================== //
// === GET DATA AND BUILD LIST === //
// =============================== //

/* 
  Makes a GET request to the server
  Server responds with all of the data in an array of objects
  Generate the list based on the data
*/

async function loadList() {
  const data =
  await fetch('/db')
    .then(resp => resp.json())
    .then(resp => { return resp })
    .catch(err => console.log('error while fetching from db', err));

  await new ListContainer(data);
};

loadList();