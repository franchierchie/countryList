import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountryContext } from '../context';

export const CountryPage = () => {

  const { state, dispatch } = useContext( CountryContext );
  const navigate = useNavigate();
  const { activeCountry, countryList } = state;

  const neighbouringCountriesArray = ( !!activeCountry.borders )
    ? activeCountry?.borders.map((borderCountry) => countryList.find((country) => country.cca3 === borderCountry ))
    : [];

  const handleClick = ( country ) => {
    dispatch({
      type: 'active[country]',
      payload: country,
    });
    localStorage.setItem('activeCountry', JSON.stringify( country ));
    navigate(`/country/${ country.cca3 }`);
  }

  return (
    <main className="country-page">
      <header>
        <img className="country-flag" src={ activeCountry.flags?.svg } alt={`Flag of ${activeCountry.name?.official}`} />

        <div className="country-name">
          <h1>{ activeCountry.name?.common }</h1>
          <p>{ activeCountry.name?.official }</p>
        </div>

        <div className="country-info">
          <div className="country-info__container">
            <p>Population</p>
            <div className="divider"></div>
            <p>{ new Intl.NumberFormat().format( activeCountry?.population ) }</p>
          </div>

          <div className="country-info__container">
            <p>Area (km²)</p>
            <div className="divider"></div>
            <p>{ new Intl.NumberFormat().format( activeCountry?.area ) }</p>
          </div>
        </div>
      </header>

      <div className="country-info__container">
        <div className="country-info__data">
          <p className="category">Capital</p>
          <p className="info">{ activeCountry.capital ? activeCountry.capital.join(', ') : 'No capital' }</p>
        </div>

        <div className="country-info__data">
          <p className="category">Subregion</p>
          <p className="info">{ activeCountry?.subregion }</p>
        </div>

        <div className="country-info__data">
          <p className="category">Language</p>
          <p className="info">{ activeCountry.languages ? Object.values(activeCountry.languages).join(', ') : 'No languages' }</p>
        </div>

        <div className="country-info__data">
          <p className="category">Currencies</p>
          <p className="info">{ activeCountry.currencies ? Object.values(activeCountry.currencies).map(currency => currency.name).join(', ') : 'No currencies' }</p>
        </div>

        <div className="country-info__data">
          <p className="category">Continents</p>
          <p className="info">{ activeCountry.continents ? activeCountry.continents.join(', ') : 'No continents' }</p>
        </div>
      </div>

      <footer>
        <p className="title">Neighbouring Countries</p>

        <div className="neighbouring-country__container">

          {
            neighbouringCountriesArray.map((neighbouringCountry) => (
              <div
                key={ neighbouringCountry.cca3 }
                className="neighbouring-country"
                onClick={() => handleClick( neighbouringCountry )}
              >
                <img
                  src={ neighbouringCountry.flags.svg }
                  alt={ neighbouringCountry.flags.alt || `Flag of ${ neighbouringCountry.name.common }`}
                />
                <p>{ neighbouringCountry.name.common }</p>
              </div>
            ))
          }


        </div>
      </footer>
    </main>
  )
}
