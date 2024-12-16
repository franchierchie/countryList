import { useRef } from 'react';
import { RegionButton, StatusOption } from './';
import { useAsideFilters } from '../hooks';

const navigation = [
  {
    name: 'Population',
    value: 'population',
  },
  {
    name: 'Area (km²)',
    value: 'area',
  },
  {
    name: 'Name (A-Z)',
    value: 'nameAZ',
  },
  {
    name: 'Name (Z-A)',
    value: 'areaZA',
  },
]

export const AsideFilters = () => {

  const selectRef = useRef();
  const { isLoading, onChangeSorting, regions, sorting } = useAsideFilters( selectRef );
  
  return (
    <aside className="results__filters">
      <div className="sorting">
        <label htmlFor="sorting">Sort by</label>
        <select
          name="sorting"
          id="sorting"
          ref={ selectRef }
          onChange={ onChangeSorting }
          value={ sorting }
        >
          {
            navigation.map(nav => (
              <option key={ nav.value } value={ nav.value }>{ nav.name }</option>
            ))
          }
        </select>
      </div>

      <div className="region">
        <p>Region</p>

        <div className="region__option-wrapper">
          {
            ( !isLoading )
            && regions()?.map(region => (<RegionButton key={ region } region={ region } />))
          }
        </div>
      </div>

      <div className="status">
        <p>Status</p>

        <div className="region__option-wrapper">
          <StatusOption
            optionName="Member of the United Nations"
            optionValue="unMember"
          />

          <StatusOption
            optionName="Independent"
            optionValue="independent"
          />
        </div>
      </div>
    </aside>
  )
}
