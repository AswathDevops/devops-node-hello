const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

// Create a Registry and collect default metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom metric: count HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests to /',
});

register.registerMetric(httpRequestCounter);

// Normal app route
app.get('/', (req, res) => {
  httpRequestCounter.inc(); // increment counter
  res.send("Hello Ajeesh Nitish Rajesh , Coimbatore la meet panniduvoma? on July 19!");
});

// ✅ Proper /metrics route
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});