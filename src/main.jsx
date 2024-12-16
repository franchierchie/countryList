import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CountryProvider } from './context';
import { WorldRanksApp } from './WorldRanksApp.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CountryProvider>
      <BrowserRouter>
        <WorldRanksApp />
      </BrowserRouter>
    </CountryProvider>
  </StrictMode>,
)
