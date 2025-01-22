import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

//staattinen html-sivusto tarjoillaan palvelimen juuressa
app.use('/', express.static('public'));

//middleware joka lukee json datan POST pyyntöjen rungosta (body)
app.use(express.json());

//end pointit/päätepisteet/reitti
//rest-apin resurssit tarjoillaan /api/-polun alla
app.get('/api/', (req, res) => {
  console.log('get-pyyntö juureen havaittuna');
  console.log('req.headers');
  console.log(req.url);
  res.send('Welcome to my REST API!');
});


// syötteen lukeminen reittiparametreista (route params)
app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  res.json({
    num1,
    num2,
    sum: num1 + num2,
  });
});

// syötteen lukeminen kyselyparametreista (query params)
app.get('/api/sum/', (req, res) => {
  console.log(req.query);
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  // testataan jos jompikumpi luvuista ei ole numero niin lähetetään
  // virhetilakoodi ja viesti json muodossa
  if(isNaN(num1) || isNaN(num2)) {
    res.status(400);
    res.json({
      num1,
      num2,
      error: 'Both parameters must be numbers!'
    });
    return;
  }
  res.json({
    num1,
    num2,
    sum: num1 + num2,
  });
});

//POST-pyynnön kösittely ja datan lukeminen pyynnön bodystä
app.post('/api/moro', (req, res) => {
  console.log(req.body);
  res.status(201);
  res.json({reply: 'No moro! ' + req.body.sender});
});

// TODO: lisää oma reitti ja toiminnallisuus omaa mielikuvitusta käyttäen!
// ensimmäisen viikon harkka ok, palautus oma/github

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});