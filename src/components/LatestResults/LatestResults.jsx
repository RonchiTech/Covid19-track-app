import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../../UI/Cards/Cards';
import ConfirmedLogo from '../../assets/images/confirmed.svg';
import RecoveredLogo from '../../assets/images/recovered.png';
import CriticalLogo from '../../assets/images/critical.svg';
import DeadLogo from '../../assets/images/dead.svg';
const LatestResults = () => {
  const [results, setResults] = useState({});
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/totals',
      headers: {
        'x-rapidapi-key': '14f13eef1bmshbb8ed92c27c1b82p144eb7jsnb0ca4f81a223',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data[0]);
        setResults(response.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <section>
      <p style={{ fontSize: '1.2rem', width: '80%', margin: '0 auto' }}>
        World's Latest Total Results as of:{' '}
        <span style={{ fontWeight: 'bold' }}>{results.lastUpdate}</span>
      </p>
      <div className="CardsContainer">
        <Cards src={ConfirmedLogo} title="Confirmed" data={results.confirmed} />
        <Cards src={RecoveredLogo} title="Recovered" data={results.recovered} />
        <Cards src={CriticalLogo} title="Critical" data={results.critical} />
        <Cards src={DeadLogo} title="Deaths" data={results.deaths} />
      </div>
    </section>
  );
};
export default LatestResults;
