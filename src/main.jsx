import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { getCountries } from './actions';
import { WorldRanksApp } from './WorldRanksApp';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorldRanksApp getCountries={ getCountries() } />
  </StrictMode>,
)
