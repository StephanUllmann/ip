export default function CountryInfo({ countryData }) {
  const date = new Date();
  const currentTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(
    2,
    '0'
  )} - ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  console.log(currentTime);
  return (
    <div>
      <img src={countryData.flags.png} alt={countryData.flags.alt} className='w-20' />
      <p>You are in {countryData.name.common}</p>
      <p>
        Neighbours are:{' '}
        <div className='flex gap-3'>
          {countryData.borders.map((border) => (
            <p key={border}>{border}</p>
          ))}
        </div>
      </p>
      <p>It's {currentTime}</p>
    </div>
  );
}
