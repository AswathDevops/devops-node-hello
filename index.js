const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

// Create a Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom metric
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests to /',
});
register.registerMetric(httpRequestCounter);

// Route: Increment metric
app.get('/', (req, res) => {
  httpRequestCounter.inc();
  res.send('Hello how are you!');
});

// Proper Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});