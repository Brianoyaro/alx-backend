const express = require('express');
import redis from 'redis';
const util = require('util');
const client = redis.createClient();

// promisify get operation
let get = util.promisify(client.get).bind(client);

client.on('connect', () => {
  console.log('Redis client connected to the server');
});
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err);
});

// listProducts array
const listProducts = [
	{'itemId': 1, 'itemName': 'Suitcase 250', 'initialAvailableQuantity': 4},
	{'itemId': 2, 'itemName': 'Suitcase 450', 'initialAvailableQuantity': 10},
	{'itemId': 3, 'itemName': 'Suitcase 650', 'initialAvailableQuantity': 2},
	{'itemId': 4, 'itemName': 'Suitcase 1050', 'initialAvailableQuantity': 5},
	{'itemId': 5, 'itemName': 'Suitcase 1155', 'initialAvailableQuantity': 0}];
function getItemById(id) {
  for (let product of listProducts) {
    if (product.itemId === id) {
      return product;
    }
  };
  return {};
}

// create app
const app = express();
app.listen(1245);

// GET /list_products
app.get('/list_products', (req, resp) => {
  resp.json(listProducts);
});

// functions that stock in redis
function reserveStockById(itemId, stock) {
  client.set(itemId, stock);
}
async function getCurrentReservedStockById(itemId) {
  let stock = await get(itemId);
  return stock;
}

// Poduct detail
app.get('/list_products/:itemId', (req, resp) => {
  let itemId = req.params.itemId;
  let stock = getCurrentReservedStockById(itemId);
  // what if instead of above line I use stock = getItemById(itemId) line 17
  if (Object.keys(stock).length === 0) {
    resp.json({"status":"Product not found"});
  } else {
    resp.json(stock);
  }
})

// reserve a product
app.get('/reserve_product/:itemId', (req, resp) => {
  let itemId = req.params.itemId;
  itemId = Number(itemId);
  let stock = getItemById(itemId);
  if (Object.keys(stock).length === 0) {
    resp.json('{status:Product not found}');
  }
  let numberOfItems = stock.initialAvailableQuantity;
  if (numberOfItems < 1) {
    resp.json(`{status:Not enough stock available,itemId:${itemId}}`);
  } else {
    reserveStockById(itemId, stock);
    resp.json(`{status:Reservation confirmed,itemId:${itemId}}`);
  }
});
