import { useContext, useEffect, useRef } from 'react';
import { CountriesContext } from '../context/CountriesContext';
import { setFiltersArray } from '../actions';


export const RegionFilters = ({ regionOption, sortingValue }) => {

  const { filters, setFilterNSorting } = useContext( CountriesContext );
  const inputRef = useRef();

  const handleClick = ( newFilter ) => {
    const newFiltersrAray = setFiltersArray({ type: 'regions', value: newFilter.target.name });
    setFilterNSorting( newFiltersrAray, sortingValue );
  }

  useEffect(() => {
    const isChecked = () => {
      const filtersArrayStorage = JSON.parse( localStorage.getItem('WorldRanks__filters') );
      inputRef.current.checked = filtersArrayStorage.regions.some(filterOption => filterOption === inputRef.current.name);
    }

    isChecked();
  }, [filters]);

  return (
    <label
      tabIndex="0"
      role="button"
      htmlFor={ regionOption.toLowerCase() }
    >
      { regionOption }
      <input
        ref={ inputRef }
        type="checkbox"
        id={ regionOption.toLowerCase() }
        name={ regionOption }
        onClick={ handleClick }
      />
    </label>
  )
}
