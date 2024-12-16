import { useContext } from 'react';
import { CountryContext } from '../context';

export const useAsideFilters = ( selectRef ) => {
  const { state, dispatch } = useContext( CountryContext );
  const { isLoading, sorting } = state;

  const regions = () => {
    const countryListStorage = JSON.parse( localStorage.getItem('countryList') );
    const regionsArray = countryListStorage.map(country => country.region);
    return [...new Set(regionsArray)]; // Set to filter unique values
  }

  const onChangeSorting = () => {
    localStorage.setItem('sorting', selectRef.current.value );

    dispatch({
      type: 'filtering[custom]',
      payload: {
        regions: [],
        sortBy: selectRef.current.value,
      }
    });
  }

  return {
    isLoading,
    sorting,

    regions,
    onChangeSorting,
  }
}
