const express = require('express');
const cors = require('cors');
const path = require('path');
const stocks = require('./stocks');

const app = express();
app.use(cors()); // enables different port connections for FE and BE
app.use(express.static(path.join(__dirname, 'static')));

app.get('/stocks', async (res) => {
  try {
    const stockSymbols = await stocks.getStocks();
    res.send({ stockSymbols });
  } catch (error) {
    console.error('Error getting stock symbols:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req;
  try {
    const data = await stocks.getStockPoints(symbol, new Date());
    res.send(data);
  } catch (error) {
    console.error('Error getting stock points:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
// generic error handler
app.use((err, res) => {
  console.error('Error:', err.message);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => console.log('Server is running!'));
