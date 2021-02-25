import React from 'react';

const ResultInformation = ({ date, country }) => {
  return (
    <p style={{ fontSize: '1.2rem', width: '80%', margin: '0 auto' }}>
      <span style={{ fontWeight: 'bold' }}>{country || "World's"}</span> Latest
      Total Results as of: <span style={{ fontWeight: 'bold' }}>{date}</span>
    </p>
  );
};
export default ResultInformation;
