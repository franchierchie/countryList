
export const CountryInfoChip = ({ dataTitle, data }) => {
  return (
    <div className="info-tag">
      <p className="info-tag__title">{ dataTitle }</p>
      <div className="vr"></div>
      <p className="info-tag__data">{ data?.toLocaleString( undefined ) }</p>
    </div>
  )
}
