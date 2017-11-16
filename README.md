<p align="center">
  <img 
    src="https://res.cloudinary.com/vidsy/image/upload/v1509658596/circle19_viaray.gif" 
    width="300px"
  >
</p>

<h1 align="center">client</h1>

<p align="center">
  Javascript library for interacting with <a href="https://github.com/blockauth">BlockAuth</a> server.
</p>

<p align="center">
  <a href="https://github.com/blockauth/client/releases">
    <img src="https://img.shields.io/github/tag/blockauth/client.svg?style=flat">
  </a>
</p>

## What?

- Javascript library.
- Interacts with BlockAuth [server](https://github.com/blockauth/server).
- Create a new login attempt.
- Check if an attempt has been successful.

## Setup

Before using the library, please read the [whitepaper](https://github.com/blockauth/documentation/blob/master/WHITEPAPER.md)
and check out the [demo](http://demo.blockauth.cc) to get an understanding of how BlockAuth works.

Then install the library:

```
npm install --save blockauth-client
```

## Usage

The library can carry out two operations:

1. Create a new login attempt.
1. Verify that the login attempt has been successful.

Both of these actions will send HTTP requests to the API provided by the BlockAuth [server](https://github.com/blockauth/server).

### Creating a Login Attempt

```js
import BlockAuth from 'blockauth-client';

BlockAuth.createContract(serverURI, address, (contract, error) => {
  if (error) {
    // An error occured!
  }
  console.log(contract);
});
```

This function expects:

- `serverURI` - full URI of your BlockAuth [server](https://github.com/blockauth/server).
- `address` - NEO public address of user.
- `callback` - function that will be called when the action has completed.

The `callback` function will handed:

- `contract` - object holding data about the new login attempt.
- `error` - boolean stating if there was an error.

The `contract` object has a number of fields:

- `address` - smart contract address.
- `expiresAt` - UNIX timestamp of when the login attempt will expire.
- `parameters` - array of [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)s that are to be used by the user when invoking the smart contract.
- `token` - [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) token for checking if the login attempt was successful.

Display the contract address and parameters to the user, and ask them to invoke the smart contract before the login attempt expires.

### Verifying a Login Attempt

```js
import BlockAuth from 'blockauth-client';

BlockAuth.checkInvoke(serverURI, token, (data, error) => {
  if (error) {
    // An error occured!
  }
  console.log(data);
});
```

This function expects:

- `serverURI` - full URI of your BlockAuth [server](https://github.com/blockauth/server).
- `token` - [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) token returned when creating the login attempt.
- `callback` - function that will be called when the action has completed.

The `callback` function will handed:

- `data` - object holding data about if a successful login attempt.
- `error` - boolean stating if there was an error.

The `data` object has a number of fields:

- `token` - [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token) token to be used for logged in experience.
- `transactionHash` - NEO transaction hash of the users smart contract invocation.

Regularly call this function until either the login attempt was successful or it expires. 

On success, you are handed a JWT token which you should store in the browser, and use to prove the identity of 
the user when they carry out actions on your website.

---

<p align="center">
  Check out the BlockAuth <a href="http://demo.blockauth.cc">Demo</a>.
  <br>
  🔐
</p>