import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountryContext } from '../context';

export const Table = () => {

  const { state, dispatch } = useContext( CountryContext );
  const navigate = useNavigate();

  const { isLoading, countryList } = state;

  const handleClick = ( country ) => {
    dispatch({
      type: 'active[country]',
      payload: country,
    });
    localStorage.setItem('activeCountry', JSON.stringify( country ));
    navigate(`/country/${ country.cca3 }`);
  }

  if ( isLoading ) {
    return (<div>Loading...</div>);
  }

  return (
    <table role="table" className="results__content">
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader">Flag</th>
          <th role="columnheader">Name</th>
          <th role="columnheader">Population</th>
          <th role="columnheader">Area (km²)</th>
          <th role="columnheader">Region</th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        {
          ( !isLoading )
            && countryList?.map((country) => (
              <tr role="row" key={ country.name.common } onClick={ () => handleClick( country ) }>
                <td role="cell"><img src={`${ country.flags.svg }`} alt={`${ country.name.common } flag`} /></td>
                <td role="cell">{ country.name.common }</td>
                <td role="cell">{ new Intl.NumberFormat().format( country.population ) }</td>
                <td role="cell">{ new Intl.NumberFormat().format( country.area ) }</td>
                <td role="cell">{ country.region }</td>
              </tr>
            ))
        }
      </tbody>
    </table>
  )
}
