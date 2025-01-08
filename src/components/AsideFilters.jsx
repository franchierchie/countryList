import { useContext, useState } from 'react';
import { CountriesContext } from '../context/CountriesContext';
import { RegionFilters, StatusFilters } from './';

const regionsArray = ['Americas', 'Antarctica', 'Africa', 'Asia', 'Europe', 'Oceania'];
const status = [
  {
    value: 'unMember',
    text: 'Member of the United Nations',
  },
  {
    value: 'independent',
    text: 'Independent',
  },
];
const sorting = [
  {
    name: 'Population',
    value: 'population',
  },
  {
    name: 'Area (km²)',
    value: 'area',
  },
  {
    name: 'Name (A-Z)',
    value: 'nameAZ',
  },
  {
    name: 'Name (Z-A)',
    value: 'nameZA',
  },
];

export const AsideFilters = () => {
  const { setFilterNSorting } = useContext( CountriesContext );
  const sortingStorage = localStorage.getItem('WorldRanks__sorting');
  const filtersStorage = JSON.parse( localStorage.getItem('WorldRanks__filters') );

  const [sortingSelectedValue, setSortingSelectedValue] = useState( sortingStorage );

  const onChangeSorting = ( sortingValue ) => {
    const newSortingValue = sortingValue.target.value
    localStorage.setItem('WorldRanks__sorting', newSortingValue);

    // update the state for the <select> value property
    setSortingSelectedValue( newSortingValue );

    setFilterNSorting( filtersStorage, newSortingValue );
  }

  return (
    <aside>
      <div className="search-filter">
        <p className="search-filter__title">Sort by</p>
          <select name="sorting" id="sorting" value={ sortingSelectedValue } onChange={ onChangeSorting }>
          {
            sorting.map(navOption => (
              <option key={ navOption.value } value={ navOption.value }>{ navOption.name }</option>
            ))
          }
        </select>
      </div>

      <div className="search-filter">
        <p className="search-filter__title">Region</p>

        <div className="region-container">
          {
            regionsArray.map(regionOption => (
              <RegionFilters
                key={ regionOption }
                regionOption={ regionOption }
                sortingValue={ sortingSelectedValue }
              />
            ))
          }
        </div>
      </div>

      <div className="search-filter">
        <p className="search-filter__title">Status</p>

        <div className="status-wrapper">
          {
            status.map(statusOption => (
              <StatusFilters
                key={ statusOption.value }
                statusOption={ statusOption }
                sortingValue={ sortingSelectedValue }
              />
            ))
          }
        </div>
      </div>
    </aside>
  )
}
