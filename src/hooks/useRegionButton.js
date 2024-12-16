import { useContext, useMemo } from 'react';
import { CountryContext } from '../context';
import { getFiltersStatus } from '../helpers';

export const useRegionButton = ( inputRef ) => {
  const { state, dispatch } = useContext( CountryContext );
  const { sorting, status, filters } = state;
  const memorizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  const onClickLabel = ( e ) => {
    if ( e.key === 'Enter' || e.key === ' ' ) {
      e.preventDefault(); // Prevent default space key scrolling
      inputRef.current.checked = !inputRef.current.checked;
    }
  }

  const handleInputClick = () => {
    const filtersArray = getFiltersStatus(inputRef.current.name, 'filters');

    if ( filtersArray.length > 0 ) {
      dispatch({
        type: 'filtering[custom]',
        payload: {
          regions: filtersArray,
          sortBy: sorting,
          statusOption: status,
        }
      });

      return;
    }

    dispatch({
      type: 'filtering[custom]',
      payload: {
        regions: [],
        sortBy: sorting,
      }
    });
  }

  return {
    sorting,
    status,
    filters,
    memorizedFilters,

    onClickLabel,
    handleInputClick,
  }
}
