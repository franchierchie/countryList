import { useNavigate } from 'react-router';
import { getCountryBycca3 } from '../actions';

export const NeighbouringCountry = ({ cca3, list }) => {
  const navigate = useNavigate();
  const country = getCountryBycca3( cca3, list );

  return (
    <div className="neighbouring-countries-card" onClick={() => navigate(`/${ country.cca3 }`)}>
      <div className="flag-wrapper">
        <img
          src={ country?.flags?.svg || country?.flags?.png }
          alt={ country?.flags?.alt || `Flag of ${ country?.name?.common }` }
        />
      </div>
      <p>{ country?.name?.common }</p>
    </div>
  )
}
