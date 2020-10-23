import React, { Fragment, useState, useContext } from 'react';
import { polyfill } from 'es6-promise';
import { observer } from 'mobx-react-lite';
import SearchStore from '../stores/SearchStore';
import Spinner from '../components/Spinner';
import CardItem from '../components/CardItem';
import Select from '../components/Select';

polyfill(); // ES6 promise polyfill for older browsers

function SearchRepo({ history }) {
  const searchStore = useContext(SearchStore);
  const {
    repoResults,
    loading,
    getResults,
    languageOptions,
    getLanguageOptions,
  } = searchStore;
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('Any');
  const sortbyOptions = {
    '': 'Best Match',
    stars: 'Stars',
  };

  const search = (e) => {
    e.preventDefault();
    getResults(query, sortBy);
    getLanguageOptions();
  };

  return (
    <Fragment>
      <form className='form' onSubmit={search}>
        <label className='label' htmlFor='query'>
          Search Repositories
        </label>
        <input
          className='input'
          type='text'
          name='query'
          placeholder='i.e. React Apps'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='select-options'>
          <div>
            <label className='label' htmlFor='sort'>
              Sort By
            </label>
            <Select
              value={sortBy}
              options={sortbyOptions}
              selectName={'sort'}
              handleSelected={setSortBy}
            />
          </div>
          <div>
            <label className='label' htmlFor='language'>
              Filter By Language
            </label>
            <Select
              value={filterBy}
              options={languageOptions}
              selectName={'language'}
              handleSelected={setFilterBy}
            />
          </div>
        </div>
        <button className='button' type='submit' disabled={loading || !query}>
          Search
        </button>
        {loading ? (
          <div style={{ margin: 'auto' }}>
            <Spinner />
          </div>
        ) : null}
      </form>
      <div className='card-list'>
        {repoResults
          .filter((repo) =>
            filterBy === 'Any' ? repo : repo.language === filterBy
          )
          .map((repo) => (
            <div
              key={repo?.id}
              className='card'
              onClick={() => history.push(`/details/${repo.id}`)}
            >
              <CardItem repo={repo} />
            </div>
          ))}
      </div>
    </Fragment>
  );
}

export default observer(SearchRepo); // Mobx HOC to observe from store
