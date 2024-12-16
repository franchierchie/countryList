
export const manageFilteringSorting = ( countryListStorage, action ) => {
  const { regions, statusOption, sortBy } = action.payload;
  let filteredCountries;

  if (regions.length === 0) {
    // If no regions are selected, use the default country list
    filteredCountries = countryListStorage;
  } else {
    // Filter countries based on selected regions
    filteredCountries = countryListStorage.filter(country =>
      country.continents.some(continent => regions.includes(continent)) ||
      regions.includes(country.region)
    );
  }

  // Filter countries by status (Member of the United Nations or Independent)
  if ( statusOption ) {
    const both = statusOption.length === 2;
    if ( both ) {
      filteredCountries = filteredCountries.filter(
        country => (
          country.unMember    === true &&
          country.independent === true
        ));
    } else {
      if ( statusOption.indexOf('unMember') > -1 ) {
        filteredCountries = filteredCountries.filter(country => country.unMember === true);
      }
      if ( statusOption.indexOf('independent') > -1 ) {
        filteredCountries = filteredCountries.filter(country => country.independent === true);
      }
    }
  }

  // Sorting
  const sortedCountries = filteredCountries?.sort((a, b) => {
    switch (sortBy) {
      case 'population' || "population":
        return b.population - a.population;
      case 'area' || "area":
        return b.area - a.area;
      case 'nameAZ' || "nameAZ":
        return a.name.common.localeCompare(b.name.common);
      case 'areaZA' || "areaZA":
        return b.name.common.localeCompare(a.name.common);
      default:
        return 0; // No sorting
    }
  });

  return {
    countryList: sortedCountries,
    filters: regions,
    sorting: sortBy,
    status: statusOption || [],
  };
}
