import { countriesApi } from '../api/countriesApi';
import { sortCountries } from './sortCountries';

export const getCountries = async() => {
  const res = await countriesApi.get('/all');
  return res.data;
}
