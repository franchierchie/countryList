import { useContext, useEffect, useRef } from 'react';
import { CountriesContext } from '../context/CountriesContext';
import { setFiltersArray } from '../actions';

export const StatusFilters = ({ statusOption, sortingValue }) => {

  const { filters, setFilterNSorting } = useContext( CountriesContext );
  const inputRef = useRef();

  const handleClick = () => {
    const newFiltersrAray = setFiltersArray({ type: 'status', value: inputRef.current.value });
    setFilterNSorting( newFiltersrAray, sortingValue );
  }

  useEffect(() => {
    const isChecked = () => {
      const filtersArrayStorage = JSON.parse( localStorage.getItem('WorldRanks__filters') );
      inputRef.current.checked = filtersArrayStorage.status.some(filterOption => filterOption === inputRef.current.name);
    }

    isChecked();
  }, [filters]);

  return (
    <label
      tabIndex="0"
      role="button"
      htmlFor={ statusOption.value }
    >
      <input
        ref={ inputRef }
        type="checkbox"
        id={ statusOption.value }
        name={ statusOption.value }
        value={ statusOption.value }
        onClick={ handleClick }
      />
      
      { statusOption.text }
    </label>
  )
}
