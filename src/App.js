import React, { useState } from 'react';
import './App.css';
import LatestResult from './components/LatestResults/LatestResults';
import Card from './UI/Cards/Card';
import ConfirmedLogo from './assets/images/confirmed.svg';
import RecoveredLogo from './assets/images/recovered.png';
import CriticalLogo from './assets/images/critical.svg';
import DeadLogo from './assets/images/dead.svg';
import ResultInformation from './components/ResultInformation/ResultInformation';
import axios from 'axios';
const App = () => {
  const [country, setCountry] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);
  const SearchCountry = () => {
    const options = {
      method: 'GET',
      url: 'https://covid-19-data.p.rapidapi.com/country',
      params: { name: country },
      headers: {
        'x-rapidapi-key': '14f13eef1bmshbb8ed92c27c1b82p144eb7jsnb0ca4f81a223',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setResults(response.data[0]);
        setError(false);
      })
      .catch(function (error) {
        console.error(error);
        setError(true);
      });
  };
  let display = <LatestResult />;
  if (!country) {
    display = <LatestResult />;
  }

  if (!!results) {
    display = (
      <section>
        <ResultInformation
          date={results.lastUpdate}
          country={results.country}
        />
        <div className="CardsContainer">
          <Card
            src={ConfirmedLogo}
            title="Confirmed"
            data={results.confirmed}
          />
          <Card
            src={RecoveredLogo}
            title="Recovered"
            data={results.recovered}
          />
          <Card src={CriticalLogo} title="Critical" data={results.critical} />
          <Card src={DeadLogo} title="Deaths" data={results.deaths} />
        </div>
      </section>
    );
    if (error) {
      display = (
        <div>
          <h2>Country not found...</h2>
        </div>
      );
    }
  }

  return (
    <>
      <main className="Main">
        <h1>Covid-19 Track App</h1>
        <div style={{ width: '80%', margin: '0 auto 30px auto' }}>
          <input
            type="text"
            placeholder="Search Country..."
            onChange={(e) => setCountry(e.target.value)}
          />
          <button onClick={SearchCountry}>Search</button>
        </div>
        {display}
      </main>
    </>
  );
};

export default App;
