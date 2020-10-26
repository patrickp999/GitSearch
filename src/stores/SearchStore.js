import { createContext } from 'react';
import axios from 'axios';
import { observable, action, runInAction, computed, decorate } from 'mobx';

/*
Mobx state store. Here the github API is called. The results are stored 
and compoents can 'subscribe' to the store. If an observed value changes 
the coponents subscribing will be notified. Values can also be computed 
from stored state. 
  */

class SearchStore {
  repoResults = [];
  loading = false;
  noResults = false;
  filterBy = 'Any';
  sortBy = '';
  query = '';

  setQuery = (query) => {
    this.query = query;
  };

  getResults = async (query, sortBy) => {
    this.loading = true;
    this.repoResults = [];
    this.noResults = false;
    try {
      const repositories = await axios.get(
        'https://api.github.com/search/repositories',
        {
          params: {
            q: query,
            sort: sortBy,
          },
        }
      );
      runInAction('loading repos', () => {
        if (!repositories.data.items.length) this.noResults = true;
        repositories.data.items.forEach((repo) => {
          this.repoResults.push(repo);
        });
        this.loading = false;
      });
    } catch (error) {
      runInAction('load repos error', () => {
        this.loading = false;
        this.noResults = true;
      });
      console.log(error);
    }
  };

  // Does not mutate state, action not required
  getDetails = async (repoId) => {
    let result = this.repoResults.find((repo) => repo.id.toString() === repoId);
    return result;
  };

  // Computed value from reults
  get languageOptions() {
    let languages = { Any: 'Any' };
    // Get the available languages from results
    this.repoResults.forEach((repo) => {
      if (repo.language) {
        languages = { ...languages, [repo.language]: repo.language };
      }
    });
    return languages;
  }

  getLanguageOptions = () => {
    return this.languageOptions;
  };

  setFilterBy = (filter) => {
    this.filterBy = filter;
  };

  setSortBy = (selectedOption) => {
    this.sortBy = selectedOption;
  };
}

decorate(SearchStore, {
  repoResults: observable,
  loading: observable,
  getDetails: observable,
  getLanguageOptions: observable,
  noResults: observable,
  filterBy: observable,
  sortBy: observable,
  query: observable,
  languageOptions: computed,

  getResults: action,
  setFilterBy: action,
  setSortBy: action,
  setQuery: action,
});

export default createContext(new SearchStore());
