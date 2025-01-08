import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CountriesContext } from '../context/CountriesContext';

export const TableRow = ({ country, cca3, img, name, population, area, continents }) => {

  const { setActiveCountry } = useContext( CountriesContext );
  const navigate = useNavigate();

  const handleClick = () => {
    setActiveCountry( country );
    navigate(`/${ cca3 }`);
  }

  return (
    <tr role="row" onClick={ handleClick }>
      <td role="cell"><img src={ img } alt={`Flag of ${name}`} /></td>
      <td role="cell">{ name }</td>
      <td role="cell">{ population.toLocaleString( undefined ) }</td>
      <td role="cell">{ area.toLocaleString( undefined ) }</td>
      <td role="cell">{ continents }</td>
    </tr>
  )
}
