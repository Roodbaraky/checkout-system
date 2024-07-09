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
  - [Contributions](#contributions)
  - [License](#license)


## Overview
This is a simple checkout system which handles various products and their respective prices, including special offers in accordance with the brief outlined [here](https://spareroom.github.io/recruitment/docs/cart-kata/):
```https://spareroom.github.io/recruitment/docs/cart-kata/``` 


## Installation
Clone the repository via:
```git clone https://github.com/Roodbaraky/checkout-system```

Install dependencies via:
```npm install```

## Testing
Tests can be run manually via:
```npm test```

Tests will also run automatically on commit via Husky.

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

## Contributions


## License

