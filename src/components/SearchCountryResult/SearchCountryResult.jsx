import React, { useState } from 'react';
import Card from '../../UI/Cards/Card';
import axios from 'axios';
import ConfirmedLogo from '../../assets/images/confirmed.svg';
import RecoveredLogo from '../../assets/images/recovered.png';
import CriticalLogo from '../../assets/images/critical.svg';
import DeadLogo from '../../assets/images/dead.svg';
import ResultInformation from '../ResultInformation/ResultInformation';
const SearchCountryResult = ({ country, countrySearch }) => {
  const [results, setResults] = useState({});
  const [countryName, ] = useState(country);
  countrySearch(() => {
    if (countryName) {
      const options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country',
        params: { name: countryName },
        headers: {
          'x-rapidapi-key':
            '14f13eef1bmshbb8ed92c27c1b82p144eb7jsnb0ca4f81a223',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setResults(response.data[0]);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  });
  return (
    <section>
      <ResultInformation date={results.lastUpdate} country={results.country} />
      <div className="CardsContainer">
        <Card src={ConfirmedLogo} title="Confirmed" data={results.confirmed} />
        <Card src={RecoveredLogo} title="Recovered" data={results.recovered} />
        <Card src={CriticalLogo} title="Critical" data={results.critical} />
        <Card src={DeadLogo} title="Deaths" data={results.deaths} />
      </div>
    </section>
  );
};
export default SearchCountryResult;
