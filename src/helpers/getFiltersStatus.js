
export const getFiltersStatus = ( newValue, localStorageValue = '' ) => {
  const valuesArray = JSON.parse( localStorage.getItem( localStorageValue ) );
  const isSelected = valuesArray.some(valueOption => valueOption === newValue);

  if ( !isSelected ) {
    const newValuesArray = [ ...valuesArray, newValue ];
    localStorage.setItem( localStorageValue , JSON.stringify( newValuesArray ) );
    return newValuesArray;
  }

  const newValuesArray = valuesArray.filter(valueOption => valueOption !== newValue);
  localStorage.setItem( localStorageValue , JSON.stringify( newValuesArray ) );
  return newValuesArray;
}
