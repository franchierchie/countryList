
export const sortCountries = ( sortBy, countries ) => {
  const list = [...countries].sort((a, b) => {
    switch ( sortBy ) {
      case 'population':
        return b.population - a.population;
      case 'area':
        return b.area - a.area;
      case 'nameAZ':
        return a.name.common.localeCompare(b.name.common);
      case 'nameZA':
        return b.name.common.localeCompare(a.name.common);
      default:
        return 0; // No sorting
    }
  });

  return list;
}
