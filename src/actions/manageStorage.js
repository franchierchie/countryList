
export const manageStorage = () => {
  const storageSorting = localStorage.getItem('WorldRanks__sorting');
  const storageFilters = JSON.parse( localStorage.getItem('WorldRanks__filters') );

  if ( !storageSorting ) {
    localStorage.setItem('WorldRanks__sorting', 'population');
  }

  if ( !storageFilters ) {
    localStorage.setItem('WorldRanks__filters', JSON.stringify({ regions: [], status: [] }));
  }
}
