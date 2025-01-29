// mock data for simple API (tilapäistä testidataa)
const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Applesiini'},
  {id: 3, name: 'Porkkana'},
  {id: 4, name: 'Mandariini'},
];

//kaikkien itemien haku
const getItems = (req, res) => {
  res.json(items);
};

// itemin haku ID:n perusteella
const getItemById = (req, res) => {
  console.log('getItemById', req.params.id);
  const item = items.find((item) => item.id == req.params.id);
  console.log('item found: ', item);
  // jos item löytyi eli arvo ei ole undefined
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({message: 'Item not found.'});
  }
};

//itemien lisääminen
const postItem = (req, res) => {
  console.log('addItem request body', req.body);
  // jos pyyntö sisältää name-ominaisuuden, lisätään uusi asia
  // items-taulukkoon
  if (req.body.name) {
    // generoidaan ID numero uudelle asialle
    // (yhtä suurempi kuin viimeisin)
    const latestId = items[items.length-1].id
    // luodaan uusi asia olio ja lisätään se items-taulukkoon
    const newItem = {id: latestId + 1, name: req.body.name};
    items.push(newItem);
    res.status(201);
    return res.json({message: 'Item added.'});
  }
  res.status(400);
  return res.json({message: 'Request is missing name property.'});
};

const deleteItem = (req, res) => {
  const index = items.findIndex(item => item.id == req.params.id);
  if (index === -1) {
    // example how to send only the status code (still valid http response)
    return res.sendStatus(404);
  }
  const deletedItems = items.splice(index, 1);
  console.log('deleteItem:', deletedItems);
  res.json({deleted_item: deletedItems[0]});
  // or successful response without any content
  // res.sendStatus(204);
};

const putItem = (req, res) => {
  const modifiedItems = items.map(obj => {
    if (obj.id === 2) {
      return { ...obj, name: "modify" };
    }
    return obj;
  })
  const index = items.findIndex(item => item.id == req.params.id);
  // not found
  if (index === -1) {
    return res.sendStatus(404);
  }
  // bad request
  if (!req.body.name) {
    return res.status(400).json({error: "item name missing"});
  }
  items[index].name = req.body.name;
  res.json({updated_item: items[index]});
  console.log(modifiedItems);
};

// TODO: lisää users.js, ks. materiaali
// TODO: Dummy kirjautuminen käyttäjä ja salasana

export {getItems, getItemById, postItem, deleteItem, putItem};