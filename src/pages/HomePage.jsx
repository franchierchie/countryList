import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CountriesContext } from '../context/CountriesContext';
import { useForm } from '../hooks';
import { getCountriesBySearch } from '../actions';

import { AsideFilters, Table } from '../components';

export const HomePage = () => {
  const { countries, setFilterNSorting } = useContext( CountriesContext );
  const { searchText, onInputChange } = useForm({ searchText: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const trimmedInputValue = searchText.toLocaleLowerCase().trim()
    const results = getCountriesBySearch( trimmedInputValue, countries.list );
    const sortingStorage = localStorage.getItem('WorldRanks__sorting');
    const filtersStorage = JSON.parse( localStorage.getItem('WorldRanks__filters') );

    if ( trimmedInputValue <= 0 ) {
      setFilterNSorting( filtersStorage, sortingStorage );
    } else {
      setFilterNSorting( filtersStorage, sortingStorage, results )
    }

  }, [ searchText ]);

  return (
    <div className="page-wrapper">
      <div className="logo-wrapper" onClick={() => navigate('/')}>
        <img src="/Logo.svg" alt="company logo" />
      </div>

      <div className="container home-container">
        <header>
          <p className="results">
            Found { countries.list.length } countries
          </p>

          <form onSubmit={( e ) => { e.preventDefault() } }>
            <label htmlFor="searchInput">
              <img src="/Search.svg" alt="Search bar" />

              <input
                type="search"
                id="searchInput"
                placeholder="Search by Name, Region, Subregion"
                autoComplete="off"
                name="searchText"
                value={ searchText }
                onChange={ onInputChange }
              />
            </label>
          </form>
        </header>

        <main>
          <AsideFilters />

          <div className="table-wrapper">
            <Table countries={ countries } />
          </div>
        </main>
      </div>
    </div>
  )
}
