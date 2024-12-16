
export const getCountries = async() => {
  const resp = await fetch('https://restcountries.com/v3.1/all');
  if ( !resp ) {
    throw new Error('Failed to fetch countries');
  }

  return await resp.json();
}
