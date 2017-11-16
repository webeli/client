import axios from 'axios';

// Constants used to generate API routes.
const CHECK_PATH = '/auth/check';
const CREATE_PATH = '/auth/create';

// checkInvoke checks to see if a contract has been satisfied and the
// login attempt is complete.
const checkInvoke = (serverURI, token, callback) => {
  axios({
    method: 'get',
    url: generateURI(serverURI, CHECK_PATH),
    headers: {
      'Auth-JWT-Token': token
    },
  }).then(response => {
    var ok = validateCheckInvokeResponse(response);
    if (ok) {
      callback({
        token: response.data.token,
        transactionHash: response.data.transaction_hash,
      }, false);
    } else {
      callback({}, true);
    }
  }).catch(error => {
    callback({}, true);
  });
};

// createContract create a new contract so that the user can attempt
// to login.
const createContract = (serverURI, address, callback) => {
  axios({
    method: 'post',
    url: generateURI(serverURI, CREATE_PATH),
    data: {
      address: address,
    }
  }).then(response => {
    var ok = validateCreateContractResponse(response);
    if (ok) {
      callback({
        address: response.data.contract_address,
        expiresAt: response.data.expires_at,
        parameters: [
          response.data.alpha,
          response.data.beta
        ],
        token: response.data.token,
      }, false);
    } else {
      callback({}, true);
    }
  }).catch(error => {
    callback({}, true);
  });
};

const generateURI = (serverURI, path) => {
  return serverURI + path;
}

const validateCheckInvokeResponse = response => {
  if (!response.hasOwnProperty('data')) {
    return false;
  }

  if (!response.data.hasOwnProperty('token') || response.data.token === '') {
    return false;
  }

  if (!response.data.hasOwnProperty('transaction_hash') || response.data.transaction_hash === '') {
    return false;
  }

  return true;
};

const validateCreateContractResponse = response => {
  if (!response.hasOwnProperty('data')) {
    return false;
  }

  if (!response.data.hasOwnProperty('alpha') || response.data.alpha === '') {
    return false;
  }

  if (!response.data.hasOwnProperty('beta') || response.data.beta === '') {
    return false;
  }

  if (!response.data.hasOwnProperty('contract_address') || response.data.contract_address === '') {
    return false;
  }

  if (!response.data.hasOwnProperty('expires_at') || response.data.expires_at === '') {
    return false;
  }

  if (!response.data.hasOwnProperty('token') || response.data.token === '') {
    return false;
  }

  return true;
};

module.exports = {
  checkInvoke: checkInvoke,
  createContract: createContract,
};
