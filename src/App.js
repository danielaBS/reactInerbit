import React from 'react';

import Routes from './routes/Routes';

import { createBrowserHistory } from "history";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const history = createBrowserHistory({
    basename: "dashboard"
  }) 

  return (
    <>
      <Routes history= {history}/>
    </>
    
  );
}

export default App;
