import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { ErrorBoundary } from './shared/ErrorBoundary';
import { CountriesProvider } from './context/CountriesProvider';
import { CountryPage, HomePage } from './pages';

export const WorldRanksApp = ({ getCountries }) => {

  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<p>⚠️Something went wrong. Please, refresh the page.</p>}>
        <CountriesProvider getCountries={ getCountries }>
          <Suspense fallback={<p>⏳Loading...</p>}>

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:id" element={<CountryPage />} />

              <Route path="/*" element={<Navigate to="/CountryPage" />} />
            </Routes>
            
          </Suspense>
        </CountriesProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
