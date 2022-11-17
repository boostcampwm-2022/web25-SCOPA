import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { CheckLogin } from 'common';
import App from './App';

import './reset.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <CheckLogin>
          <App />
        </CheckLogin>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
