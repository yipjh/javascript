const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawLineChart(stockData, color) {
  const timestamps = stockData.map(point => new Date(point.timestamp).getTime());
  const values = stockData.map(point => point.value);

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  
  const xScale = canvas.width / (timestamps[timestamps.length - 1] - timestamps[0]);
  const yScale = canvas.height / (maxValue - minValue);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // x-axis label
  ctx.fillStyle = 'black';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Time', canvas.width / 2, canvas.height - 10);

  // y-axis label
  ctx.save();
  ctx.translate(10, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Value', 0, 0);
  ctx.restore();

  // title of graph
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Available Stocks', canvas.width / 2, 20);

  // segments the axes
  for (let i = 0; i < timestamps.length; i++) {
    const x = (timestamps[i] - timestamps[0]) * xScale;
    drawLine([x, canvas.height - 5], [x, canvas.height + 5], 'black');
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
  }

  const numTicks = 5; 

  for (let i = 0; i <= numTicks; i++) {
      const y = canvas.height - i * (canvas.height / numTicks);
      drawLine([5, y], [15, y], 'black');
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
  }

  for (let i = 0; i < timestamps.length - 1; i++) {
    const x1 = (timestamps[i] - timestamps[0]) * xScale;
    const y1 = canvas.height - (values[i] - minValue) * yScale;

    const x2 = (timestamps[i + 1] - timestamps[0]) * xScale;
    const y2 = canvas.height - (values[i + 1] - minValue) * yScale;

    drawLine([x1, y1], [x2, y2], color);
  }
}
/*
// established constants for iteration when drawing all stocks however does not work
const stockSymbols = ['MSFT', 'AAPL', 'FB', 'EA', 'IBM'];
const colors = ['blue', 'green', 'red', 'purple', 'orange'];
*/

// fetches data of a specific stock whilst assigning a colour to line chart
function fetchAndDrawStock(symbol, color) {
  return fetch(`http://localhost:3000/stocks/${symbol}`)
      .then(response => response.json())
      .then(stockData => drawLineChart(stockData, color))
      .catch(error => console.error(`Error fetching stock data for ${symbol}:`, error));
}
/*
// use a loop to fetch and draw each stock sequentially however does not work.
function fetchAndDrawAllStocks() {
  let promiseChain = Promise.resolve();

  stockSymbols.forEach((symbol, index) => {
      promiseChain = promiseChain.then(() => fetchAndDrawStock(symbol, colors[index]));
  });

  promiseChain.then(() => {
      console.log('All charts drawn');
  });
}
*/
fetchAndDrawStock('EA', 'green');
