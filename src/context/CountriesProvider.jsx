import { use, useState } from 'react';
import { CountriesContext } from './CountriesContext';
import { filterCountries, manageStorage, sortCountries } from '../actions';

export const CountriesProvider = ({ children, getCountries }) => {

  const originalCountries = use(getCountries);

  const [countries, setCountries] = useState({
    list: sortCountries('population', originalCountries),
    filtersArray: { regions: [], status: [] },
    sorting: 'population',
    active: null,
  });

  manageStorage();

  const setActiveCountry = ( activeCountry ) => {
    setCountries({
      ...countries,
      active: activeCountry,
    });
  }

  // results = search results (search input)
  const setFilterNSorting = ( filters, sorting, results = [] ) => {
    let filterCountryList;

    // if the user searched someting, the results of that search gets sorted and filtered
    // Otherwise it just gets sorted an filtered
    if ( results.length === 0 ) {
      filterCountryList = filterCountries(filters, originalCountries);
    } else {
      filterCountryList = filterCountries(filters, results);
    }

    const sortedNFilteredCountryList = sortCountries(sorting, filterCountryList);

    setCountries(prevState => {
      return {
        ...prevState,
        list: sortedNFilteredCountryList,
        filtersArray: { regions: filters.regions, status: filters.status },
        sorting,
      }
    });
  }

  return (
    <CountriesContext.Provider value={{ countries, setActiveCountry, setFilterNSorting }}>
      { children }
    </CountriesContext.Provider>
  )
}
