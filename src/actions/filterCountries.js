
export const filterCountries = ( filtersObject, countryList ) => {
  const { regions, status } = filtersObject;

  let filteredCountries;

  if ( regions.length === 0 && status.length === 0 ) {
    // If no filters are selected, use the default country list
    filteredCountries = countryList;
  } else {
    // Filter countries based on selected regions
    filteredCountries = countryList.filter(country => {
      if ( regions.length === 0 ) return countryList;

      return country.continents.some(continent => regions.includes(continent)) ||
      regions.includes(country.region)
    });
  }

  // Filter countries by status (Member of the United Nations or Independent)
  if ( status.length > 0 ) {
    const both = status.length === 2;
    if ( both ) {
      filteredCountries = filteredCountries.filter(
        country => (
          country.unMember    === true &&
          country.independent === true
        ));
    } else {
      if ( status.indexOf('unMember') > -1 ) {
        filteredCountries = filteredCountries.filter(country => country.unMember === true);
      }
      if ( status.indexOf('independent') > -1 ) {
        filteredCountries = filteredCountries.filter(country => country.independent === true);
      }
    }
  }

  return filteredCountries;
}
