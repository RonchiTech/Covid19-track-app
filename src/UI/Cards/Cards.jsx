import React from 'react';
import './Cards.css';
const cards = ({ title, data, src }) => {
  const numberWithCommas = (x) => {
    if (!x) {
      return;
    } else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };
  return (
    <div className="Cards">
      <div className='ImageContainer'>
        <img src={src} alt={title} />
      </div>

      <h2>{title}</h2>
      <p>{numberWithCommas(data)}</p>
    </div>
  );
};
export default cards;
