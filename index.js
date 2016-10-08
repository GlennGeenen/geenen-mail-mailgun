'use strict';

const Wreck = require('wreck');

let apiKey;
let endpoint;

const configure = function (options, callback) {

  apiKey = options.options.apiKey,
  endpoint = options.options.domain;
  callback();
};

const getAuthorizationHeader = function () {

  const authentication = new Buffer(`api:${apiKey}`);
  return `Basic ${authentication.toString('base64')}`;
};

const getPayload = function (options) {

  let payload = `from=${encodeURIComponent(options.from)}`;
  payload += `&to=${encodeURIComponent(options.recipients)}`;
  payload += `&subject=${encodeURIComponent(options.subject)}`;
  if (options.html) {
    payload += `&html=${encodeURIComponent(options.html)}`;
  }
  if (options.text) {
    payload += `&text=${encodeURIComponent(options.text)}`;
  }
  return payload;
};

const sendMail = function (options, callback) {

  const wreckOptions = {
    headers: {
      Authorization: getAuthorizationHeader(),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    payload: getPayload(options),
    json: true
  };

  const url = `https://api.mailgun.net/v3/${endpoint}/messages`;
  Wreck.post(url, wreckOptions, (err, response, responsePayload) => {

    if (err) {
      return callback(err);
    }

    if (response.statusCode >= 400) {
      return callback(new Error(responsePayload.message));
    }

    return callback();
  });
};

module.exports = {
  configure,
  sendMail
};
