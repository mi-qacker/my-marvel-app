import React from 'react';
import ReactDOM from 'react-dom';

import MarvelService from './services/MarvelService';
import App from './components/app/App';
import './style/style.scss';

const marvelService = new MarvelService();
marvelService
  .getAllCharacters()
  .then((res) =>
    res.data.results.forEach((element) => console.log(element.name))
  );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
