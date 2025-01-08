import { TableRow } from './';

export const Table = ({ countries }) => {
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
          countries.list.map(country => (
            <TableRow
              key={ country.cca3 }
              cca3={ country.cca3 }
              img={ country.flags.svg || country.flags.png }
              name={ country.name.common }
              population={ country.population }
              area={ country.area }
              continents={ country.continents } // array
            />
          ))
        }
      </tbody>
    </table>
  )
}
