import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../UI/Cards/Card';
import ConfirmedLogo from '../../assets/images/confirmed.svg';
import RecoveredLogo from '../../assets/images/recovered.png';
import CriticalLogo from '../../assets/images/critical.svg';
import DeadLogo from '../../assets/images/dead.svg';
import ResultInformation from '../ResultInformation/ResultInformation';
const LatestResults = () => {
  const [results, setResults] = useState({});
  const [error, setError] = useState(null);
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
        setError('An Error occured! Please try again in a few seconds');
      });
  }, []);
  let display = (
    <section>
      <ResultInformation date={results.lastUpdate} />
      <div className="CardsContainer">
        <Card src={ConfirmedLogo} title="Confirmed" data={results.confirmed} />
        <Card src={RecoveredLogo} title="Recovered" data={results.recovered} />
        <Card src={CriticalLogo} title="Critical" data={results.critical} />
        <Card src={DeadLogo} title="Deaths" data={results.deaths} />
      </div>
    </section>
  );
  if (error) {
    display = (
      <div>
        <h2 style={{color: 'red', textAlign: 'center'}}>An Error Occured. Please try again in a few seconds...</h2>
      </div>
    );
  }
  return display;
};
export default LatestResults;
