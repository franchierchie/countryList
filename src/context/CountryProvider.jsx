import { useReducer } from 'react';
import { CountryContext } from './';
import { countryReducer } from '../CountryReducer';

const init = () => {
  const countryList =   JSON.parse( localStorage.getItem('countryList') );
  const activeCountry = JSON.parse( localStorage.getItem('activeCountry') );
  const sorting =       localStorage.getItem('sorting');
  const filters =       JSON.parse( localStorage.getItem('filters') );
  const status =        JSON.parse( localStorage.getItem('status') );
  
  return {
    isLoading: true,
    countryList,
    activeCountry,
    sorting,
    filters,
    status,
  }
}

export const CountryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countryReducer, [], init);

  return (
    <CountryContext.Provider value={{ state, dispatch }}>
      { children }
    </CountryContext.Provider>
  )
}