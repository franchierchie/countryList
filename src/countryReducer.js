import { manageFilteringSorting } from './helpers';

const countryListStorage = JSON.parse( localStorage.getItem('countryList') );

export const countryReducer = (state = [], action) => {
  switch ( action.type ) {
    case 'loading[true]':
      return {
        ...state,
        isLoading: true,
      }

    case 'loading[false]':
      return {
        ...state,
        isLoading: false,
      }

    case 'active[country]':
      return {
        ...state,
        activeCountry: action.payload,
      }

    case 'search[country]': // action.payload === String (Name, Region or Subregion)
      action.payload = action.payload.toLocaleLowerCase().trim();

      return {
        ...state,
        filters: [],
        status: [],
        countryList: countryListStorage.filter(
          country => (
            country.name?.common?.toLocaleLowerCase().includes( action.payload ) ||
            country.region?.toLocaleLowerCase().includes( action.payload ) ||
            country.subregion?.toLocaleLowerCase().includes( action.payload )
          )
        ),
      }
      
    case 'filtering[custom]':
    const { countryList, filters, sorting, status } = manageFilteringSorting(countryListStorage, action);

      return {
        ...state,
        countryList,
        filters,
        sorting,
        status,
      };
  
    default:
      return state;
  }
}
