import { useEffect, useState } from 'react';
import Map from './components/Map';
import './App.css';
import CountryInfo from './components/CountryInfo';

function App() {
  const [ipData, setIpData] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [status, setStatus] = useState('loading'); // loading, error, success

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_API_KEY}`);
        if (!res.ok) throw new Error('Fetching IP data failed');

        const data = await res.json();
        // console.log(data);
        setIpData(data);

        const countryCode = data.location.country;

        const resCountry = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        if (!resCountry.ok) throw new Error('Fetching Country data failed');
        const dataCounty = await resCountry.json();
        setCountryData(dataCounty[0]);

        setStatus('success');
      } catch (error) {
        console.log(error);
        setStatus('error');
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);
  // console.log(countryData);

  return (
    <>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Something went wrong 🤷</p>}
      {status === 'success' && (
        <>
          <h1 className='text-xl text-white'>Your IP address: {ipData.ip}</h1>
          <Map lat={ipData.location.lat} lng={ipData.location.lng} />
          <CountryInfo countryData={countryData} />
        </>
      )}
    </>
  );
}

export default App;
