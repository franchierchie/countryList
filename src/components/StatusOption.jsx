import { useContext, useEffect, useMemo, useRef } from 'react';
import { CountryContext } from '../context';
import { getFiltersStatus } from '../helpers';

export const StatusOption = ({ optionName, optionValue }) => {

  const { state, dispatch } = useContext( CountryContext );
  const inputRef = useRef();
  const { sorting, filters, status } = state;
  const memorizedStatus = useMemo(() => status, [JSON.stringify(status)]);

  const onClick = ( e ) => {
    if ( e.key === 'Enter' || e.key === ' ' ) {
      e.preventDefault(); // Prevent default space key scrolling
      inputRef.current.checked = !inputRef.current.checked;
    }
  }
  
  useEffect(() => {
    const isChecked = () => {
      const statusArrayStorage = JSON.parse( localStorage.getItem('status') ) || [];
      inputRef.current.checked = statusArrayStorage.some(statusOption => statusOption === inputRef.current.name);
    }

    isChecked();
  }, [memorizedStatus]);

  const handleClick = () => {
    const statusArray = getFiltersStatus(inputRef.current.id, 'status');

    if ( statusArray.length >= 0 ) {
      dispatch({
        type: 'filtering[custom]',
        payload: {
          regions: filters,
          sortBy: sorting,
          statusOption: statusArray,
        }
      });

      return;
    }

    dispatch({
      type: 'filtering[custom]',
      payload: {
        regions: filters,
        sortBy: sorting,
      }
    });
  }

  return (
    <div className="region__option">
      <input
        ref={ inputRef }
        type="checkbox"
        id={ optionValue }
        name={ optionValue }
        onKeyDown={ onClick }
        onChange={ handleClick }
      />
      <label htmlFor={ optionValue }>{ optionName }</label>
    </div>
  )
}
