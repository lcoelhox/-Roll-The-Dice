import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ListRecords from './pages/ListRecords';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ MainPage } />
          <Route exact path="/records" component={ ListRecords } />
        </Switch>
    </BrowserRouter>
  );
}

export default App;