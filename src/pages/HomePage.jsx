import React from 'react';
import SearchRepo from '../components/SearchRepo';

function HomePage({ history }) {
  return (
    <div>
      <div className='container'>
        <div className='title-container'>
          <h1 className='title'>GitHub Repo</h1>
          <h1 className='title'>Search</h1>
        </div>
        <SearchRepo history={history} />
      </div>
    </div>
  );
}

export default HomePage;
