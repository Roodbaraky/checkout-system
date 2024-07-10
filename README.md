# Checkout System API - SpareRoom



## Contents
- [Checkout System API - SpareRoom](#checkout-system-api---spareroom)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Testing](#testing)
  - [Usage](#usage)
    - [Development](#development)
    - [Production](#production)
    - [Functionality](#functionality)


## Overview
This is a simple checkout system endpoint which handles various products and their respective prices, including special offers in accordance with the brief outlined [here](https://spareroom.github.io/recruitment/docs/cart-kata/):
```https://spareroom.github.io/recruitment/docs/cart-kata/``` 


## Installation
Clone the repository via:
```git clone https://github.com/Roodbaraky/checkout-system```

Install dependencies via:
```npm install```

## Testing
Tests can be run manually via:
```npm test```
OR
```npm run watch```
To use the '--watch' flag with Vitest.

Tests will also run automatically on commit via Husky.

Functions were first unit tested in isolation and then integration tested via the controller using a mock server and posting example carts to the endpoint.
Vitest was used for its seamless compatibility with TypeScript and similarity with the Jest testing framework.

## Usage
Create a .env file in the project directory with the desired port to run the server on:
```
//.env
PORT=3001
```
It will default to 3001 if absent.

### Development
Run the development server via:
```npm run dev```


### Production
Build for production:
```npm run build```
OR
```npm run clean```
To use the "--clean" flag with tsc.

This will transpile TypeScript code to JavaScript and export to the dist folder.
From here, run dist/app.js with a process manager of your choice e.g.:
```pm2 start dist/app.js```

### Functionality
The solution uses an endpoint at ```/cart/total``` which takes a cart/basket request body via POST, iterates through the cart items and mutlipies special and unit prices by quantity appropriately and returns a cumulative total.

Example cart: 
```
[
    {
      "code": "A",
      "quantity": 3
    },
    {
      "code": "B",
      "quantity": 3
    },
    {
      "code": "C",
      "quantity": 1
    },
    {
      "code": "D",
      "quantity": 2
    }
  ]
  ```

  Example response:
  ```
  {
    "total":284
  }
  ```

  Errors:
  ```
{
	"error": "Invalid cart data"
}
  ```
```
{
	"error": "Item/s not found"
}
```



It is loosely organised in the MVC architecture pattern, with the itemsData being imported from a JSON file, mimicking a database, where items could be added / removed, prices changed and special price offers removed / altered to suit business needs.

The controller function ```getCartTotal``` takes the request and first validates the cart to ensure it contains data in the correct format via the ```validateCart``` function, so that the 'database' is not unnecessarily queried with invalid cart properties, extra properties, incorrect datatypes etc. If the cart fails, this function will throw an error and return an appropriate error message.

If the cart is valid it is passed to the ```calculateCartTotal``` function which iterates through the cart, returning the cumulative total. If at any point an item code which is not present in the 'database' is passed, it throws an appropriate error which is returned.

