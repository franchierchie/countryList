
export const CountryInfoRow = ({ title, info }) => {
  return (
    <div className="info-row">
      <p className="info-row__title">{ title }</p>
      <p className="info-row__data">{ info }</p>
    </div>
)
}
