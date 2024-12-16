import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { CountryContext } from './context';
import { getCountries } from './helpers';
import { CountryPage, HomePage } from './pages';

export const WorldRanksApp = () => {
  const { dispatch } = useContext( CountryContext );
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async() => {
      dispatch({ type: 'loading[true]' });
      try {
        const cachedCountries = JSON.parse( localStorage.getItem('countryList') );
        const filtersArray =    JSON.parse( localStorage.getItem('filters') );
        const sorting =         localStorage.getItem('sorting');
        const statusArray =     JSON.parse( localStorage.getItem('status') );

        if ( cachedCountries ) {
          dispatch({
            type: 'filtering[custom]',
            payload: {
              regions: filtersArray,
              sortBy: sorting,
              statusOption: statusArray,
            }
          });
        } else {
          const countries = await getCountries();

          localStorage.setItem('countryList', JSON.stringify( countries ));
          localStorage.setItem('sorting', 'population');
          localStorage.setItem('activeCountry', '{}');
          localStorage.setItem('filters', '[]');
          localStorage.setItem('status', '[]');

          dispatch({
            type: 'filtering[custom]',
            payload: {
              regions: [],
              sortBy: 'population',
            }
          });
        }

      } catch (error) {
        console.log( error );
        setError(error.message);
      } finally {
        dispatch({ type: 'loading[false]' });
      }
    }

    fetchCountries();
  }, []);

  if ( error ) return <div>Error: { error }</div>

  return (
    <>
      <div className="logo" onClick={() => navigate('/')}>
        <img src="../Logo.svg" alt="World Ranks logo" />
      </div>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/country/:id' element={<CountryPage />} />

        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}
