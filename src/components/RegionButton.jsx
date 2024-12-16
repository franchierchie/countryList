import { useEffect, useRef } from 'react';
import { useRegionButton } from '../hooks';

export const RegionButton = ({ region }) => {

  const inputRef = useRef();
  const { handleInputClick, memorizedFilters, onClickLabel } = useRegionButton( inputRef );

  useEffect(() => {
    const isChecked = () => {
      const filtersArrayStorage = JSON.parse( localStorage.getItem('filters') ) || [];
      inputRef.current.checked = filtersArrayStorage.some(filterOption => filterOption === inputRef.current.name);
    }

    isChecked();
  }, [memorizedFilters]);
  
  return (
    <div className="region__option">
      <label
        tabIndex="0"
        role="button"
        htmlFor={ region }
        onKeyDown={ onClickLabel }
      >
        { region.charAt(0).toUpperCase() + region.slice(1) }
      </label>
      <input
        ref={ inputRef }
        type="checkbox"
        id={ region }
        name={ region }
        onClick={ handleInputClick }
      />
    </div>
  )
}
