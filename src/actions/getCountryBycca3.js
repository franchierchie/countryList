
export const getCountryBycca3 = ( cca3, countryList ) => {
  const country = countryList.filter( country => country.cca3 === cca3 );
  return country[0];
}
