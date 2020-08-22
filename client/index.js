console.log('this is index.js')

// ======= HELPER FUNCTION ======= //
function newElement(TYPE, PARENTID, IDorCLASS, IDorClassNAME) {
  // create
  const el = document.createElement(TYPE);
  // append
  if (PARENTID === 'body') document.body.appendChild(el);
  else document.getElementById(PARENTID).appendChild(el);
  // set attribute
  if (IDorClassNAME) el.setAttribute(IDorCLASS, IDorClassNAME)
  // return
  return el;
};

const button = document.querySelector('#submit-button');
const input = document.querySelector('#main-input');

// === Handle Click for Submitting Events === //
button.addEventListener('click', () => {
  console.log(input.value)
  fetch('/db', {
    method: 'POST',
    headers: {
      "Content-Type": "Application/JSON"
    },
    body: JSON.stringify({title: input.value})
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log('list item added: ', resp)
    })
    .catch(err => {
      console.log('error while posting to db', err);
    });
});

// === Create List Container === //
class List {
  constructor(data) { // gets the data from the GET request @16
    console.log('LIST')
    // Make the list element in the DOM
    const list = newElement('div', 'body', 'id', 'list')
    list.innerHTML = 'I am a list';

    const array = []
    array.map((el, i) => {

    })

    // Loop through data
    for (let i=0; i<data.length; i++){
      console.log('looping')
      new ListElement(data[i])
    }
  }
};

// === Create List Elements === //
class ListElement {
  constructor(obj) {
    console.log('LIST ELEMENT', obj)

    const listItem = newElement('div', 'list', 'class', 'list-item')
    listItem.innerHTML = obj.title
  }
};


// ======= GET-REQUEST FOR LIST DATA ======= //
async function loadList() {
  const data =
    await fetch('/db') // the params we use to load the page
    .then(resp => resp.json())
    .then(resp => {
      console.log('fetching:', resp)
      return resp
    })
    .catch(err => {
      console.log('error while fetching from db', err);
    });
  await new List(data);
};
loadList();
// const data = 
// fetch('/db') // the params we use to load the page
//   .then(resp => resp.json())
//   .then(resp => {
//     console.log('fetching:', resp)
//     return resp
//   })
//   .catch(err => {
//     console.log('error while fetching from db', err);
//   });
// const loadList = new List();