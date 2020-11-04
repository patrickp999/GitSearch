import React, { Fragment, useContext } from 'react';
import { polyfill } from 'es6-promise';
import { observer } from 'mobx-react-lite';
import SearchStore from '../stores/SearchStore';
import Spinner from '../components/Spinner';
import CardItem from '../components/CardItem';
import Select from '../components/Select';

polyfill(); // ES6 promise polyfill for older browsers

function SearchRepo({ history }) {
  const searchStore = useContext(SearchStore);
  /* Methods and state from the store
     Most of these persist between routes so making them
     available form the store allows that. */
  const {
    repoResults,
    loading,
    noResults,
    getResults,
    languageOptions,
    getLanguageOptions,
    setFilterBy,
    filterBy,
    setQuery,
    query,
    sortBy,
    setSortBy,
  } = searchStore;
  const sortbyOptions = {
    '': 'Best Match', // Sets the initial sort options
    stars: 'Stars',
  };

  const search = (e) => {
    e.preventDefault();
    setFilterBy('Any'); // Reset the filter when search is clicked
    getResults(query, sortBy);
    getLanguageOptions(); // The app programatically gathers the available languages from the results
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
        <button className='button' type='submit' disabled={loading}>
          Search
        </button>
        {loading ? (
          <div style={{ margin: 'auto' }}>
            <Spinner />
          </div>
        ) : null}
      </form>
      <div className='card-list'>
        {noResults ? (
          <div className='card'>
            <p className='card--desc'>No Results</p>
          </div>
        ) : (
          repoResults
            .filter((
              repo // Filter the results if language is selected
            ) => (filterBy === 'Any' ? repo : repo.language === filterBy))
            .map((repo) => (
              <div
                key={repo?.id}
                className='card'
                onClick={() => history.push(`/details/${repo.id}`)}
              >
                <CardItem repo={repo} />
              </div>
            ))
        )}
      </div>
    </Fragment>
  );
}

export default observer(SearchRepo); // Mobx HOC to observe from store
