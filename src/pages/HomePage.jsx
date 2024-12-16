import { useContext, useEffect } from 'react';
import { CountryContext } from '../context';
import { useForm } from '../hooks';

import { AsideFilters, Table } from '../components';

export const HomePage = () => {

  const { state, dispatch } = useContext( CountryContext );
  const { countryList, filters, sorting, status } = state;
  const { searchText, onInputChange } = useForm({ searchText: '' });

  useEffect(() => {
    dispatch({
      type: 'filtering[custom]',
      payload: {
        regions: filters,
        sortBy: sorting,
        statusOption: status,
      }
    });
  }, [ searchText.length === 0 ]);

  const onSearchSubmit = ( e ) => {
    e.preventDefault();
    if ( searchText.length === 0 ) return;

    localStorage.setItem('filters', '[]');
    localStorage.setItem('status', '[]');
    localStorage.setItem('sorting', sorting);
    dispatch({
      type: 'search[country]',
      payload: searchText,
    });
  }

  return (
    <main className="home-page">
      <header>
        <p className="results__number">
          Found { countryList?.length } countries
        </p>

        <form onSubmit={ onSearchSubmit }>
          <label className="input-wrapper" htmlFor="search">
            <img src="../Search.svg" alt="Search icon" />

            <input
              type="text"
              id="search"
              placeholder="Search by Name, Region, Subregion"
              name="searchText"
              autoComplete="off"
              value={ searchText }
              onChange={ onInputChange }
            />
          </label>
        </form>
      </header>

      <div className="results__container">
        <AsideFilters />

        <Table />
      </div>

    </main>
  )
}
