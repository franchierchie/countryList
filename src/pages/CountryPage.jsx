import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CountriesContext } from '../context/CountriesContext';
import { getCountryBycca3 } from '../actions';
import { CountryInfoChip, CountryInfoRow, NeighbouringCountry } from '../components';

export const CountryPage = () => {

  const { countries, setActiveCountry } = useContext( CountriesContext );
  const navigate = useNavigate();
  const { id:cca3 } = useParams();
  const { list, active } = countries;

  const handleNavClick = () => {
    setActiveCountry( null );
    navigate('/')
  }

  useEffect(() => {
    const country = getCountryBycca3( cca3, list );
    setActiveCountry( country );
  }, [ cca3 ]);

  return (
    <div className="page-wrapper">
      <div className="logo-wrapper" onClick={ handleNavClick }>
        <img src="./Logo.svg" alt="company logo" />
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        <img src="./Expand_down.svg" alt="back button" />
      </button>

      <div className="container country-container">
        <header className="main-info-container">
          <div className="image-wrapper">
            <img
              src={ active?.flags?.svg || active?.flags?.png }
              alt={ active?.flags?.alt || `Flag of ${ active?.name.common }` }
            />
          </div>

          <div className="name-container">
            <h1>{ active?.name?.common }</h1>
            <h2>{ active?.name?.official }</h2>
          </div>

          <div className="info-tags-container">
            <CountryInfoChip
              dataTitle="Population"
              data={ active?.population }
            />

            <CountryInfoChip
              dataTitle="Area (km²)"
              data={ active?.area }
            />
          </div>
        </header>

        <main>
          <div className="info-row-container">
            <CountryInfoRow
              title="Capital"
              info={ active?.capital ? active?.capital.join(', ') : 'No capital' }
            />
            <CountryInfoRow title="Subregion" info={ active?.subregion } />
            <CountryInfoRow
              title="Language"
              info={ active?.languages ? Object.values( active?.languages ).join(', ') : 'No languages' }
            />
            <CountryInfoRow
              title="Currencies"
              info={ active?.currencies ? Object.values(active.currencies).map(currency => currency.name).join(', ') : 'No currencies' }
            />
            <CountryInfoRow
              title="Continents"
              info={ active?.continents ? active?.continents.join(', ') : 'No capital' }
            />
          </div>
        </main>

        <footer className="info-container">
          <p className="info-container__title">Neighbouring Countries</p>

          <div className="neighbouring-countries-contianer">
            {
              active?.borders?.map(neighbourCountry => (
                <NeighbouringCountry
                  key={ neighbourCountry }
                  cca3={ neighbourCountry }
                  list={ list }
                />
              ))
            }
          </div>
        </footer>
      </div>
    </div>
  )
}
