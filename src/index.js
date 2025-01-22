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
  res.json({
    num1,
    num2,
    sum: num1 + num2,
  });
});

//POST-pyynnön kösittely ja datan lukeminen pyynnön bodystä
app.post('/api/moro', (req, res) => {
  console.log(req.body);
  res.json({reply: 'No moro! ' + req.body.sender});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});