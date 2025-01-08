
export const getCountriesBySearch = ( searchValue, countryList ) => {
  return countryList.filter(
    country => (
      country.name?.common?.toLocaleLowerCase().includes( searchValue ) ||
      country.region?.toLocaleLowerCase().includes( searchValue ) ||
      country.subregion?.toLocaleLowerCase().includes( searchValue )
    )
  )
}
