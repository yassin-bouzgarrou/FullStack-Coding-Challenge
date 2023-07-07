import t from './my-app/screens'


const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/account/20111946/favorite';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer 07c1b86f9670b68ff33569c9f863c6b2'
  },
  body: JSON.stringify({media_type: 'movie', media_id: 550, favorite: true})
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));



  const axios = require('axios');


axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });