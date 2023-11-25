fetch('http://localhost:3000/stocks')
.then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Process the list of stocks received from the server
    console.log('List of available stocks:', data.stockSymbols);
  })
  .catch(error => {
    console.error('Error fetching stocks:', error);
  });

function fetchStockData(symbol) {
  fetch(`http://localhost:3000/stocks/${symbol}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process the stock data received from the server
      console.log(`Data for ${symbol}:`, data);
    })
    .catch(error => {
      console.error(`Error fetching data for ${symbol}:`, error);
    });
    }