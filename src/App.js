import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './UI/Cards/Cards';
import ConfirmedLogo from './assets/images/confirmed.svg';
import RecoveredLogo from './assets/images/recovered.png';
import CriticalLogo from './assets/images/critical.svg';
import DeadLogo from './assets/images/dead.svg';
import axios from 'axios';
const App = () => {
  const [country, setCountry] = useState(null);
  const [results, setResults] = useState({ country: null });
  // const [searchingCountry, setSearchingCountry] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

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

  const SearchCountry = () => {
    if (country) {
      const options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country',
        params: { name: country },
        headers: {
          'x-rapidapi-key':
            '14f13eef1bmshbb8ed92c27c1b82p144eb7jsnb0ca4f81a223',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data[0]);

          if (!response.data[0]) {
            setErrorMessage('Country not found...');
          } else {
            setResults(response.data[0]);
            setErrorMessage(null);
          }
        })
        .catch(function (error) {
          console.error(error);
          setErrorMessage(
            'An error occured. Please try again in a few seconds.'
          );
        });
    } else if (country === '') {
      const options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/totals',
        headers: {
          'x-rapidapi-key':
            '14f13eef1bmshbb8ed92c27c1b82p144eb7jsnb0ca4f81a223',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data[0]);
          setResults(response.data[0]);
          setErrorMessage(null);
        })
        .catch(function (error) {
          console.error(error);
          setErrorMessage(
            'An error occured. Please try again in a few seconds.'
          );
        });
    }
  };
  let display;
  if (results) {
    display = (
      <>
        <p style={{ fontSize: '1.2rem', width: '80%', margin: '0 auto' }}>
          <span style={{ fontWeight: 'bold' }}>
            {results.country ? results.country : "World's"}
          </span>{' '}
          Latest Total Results as of:{' '}
          <span style={{ fontWeight: 'bold' }}>{results.lastUpdate}</span>
        </p>
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
      </>
    );
    if (errorMessage) {
      display = (
        <div>
          <h2 style={{ color: 'pink' }}>{errorMessage}</h2>
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
