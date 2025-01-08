
export const setFiltersArray = ( newFilter ) => {
  const { type, value } = newFilter;

  const filtersArray = JSON.parse( localStorage.getItem('WorldRanks__filters') );
  const isSelectedFilters = filtersArray.regions.some(valueOption => valueOption === value );
  const isSelectedStatus = filtersArray.status.some(valueOption => valueOption === value );

  // if it's not selected, we add it
  if ( !isSelectedFilters && type === 'regions' ) {
    const newFiltersArray = { regions: [ ...filtersArray.regions, value  ], status: [...filtersArray.status] };
    localStorage.setItem( 'WorldRanks__filters' , JSON.stringify( newFiltersArray ) );
    return newFiltersArray;

  } else if ( !isSelectedStatus && type === 'status' ) {
    const newFiltersArray = { regions: [...filtersArray.regions], status: [ ...filtersArray.status, value ] };
    localStorage.setItem( 'WorldRanks__filters' , JSON.stringify( newFiltersArray ) );
    return newFiltersArray;
  }

  // if it's selected, we remove it
  if ( type === 'regions' ) {
    const newFiltersArray = {
      regions: [ ...filtersArray.regions ].filter(valueOption => valueOption !== value ),
      status: [...filtersArray.status],
    }
    localStorage.setItem( 'WorldRanks__filters' , JSON.stringify( newFiltersArray ) );
    return newFiltersArray;

  } else {
    const newFiltersArray = {
      regions: [...filtersArray.regions],
      status: [ ...filtersArray.status ].filter(valueOption => valueOption !== value ),
    }
    localStorage.setItem( 'WorldRanks__filters' , JSON.stringify( newFiltersArray ) );
    return newFiltersArray;
  }

}
