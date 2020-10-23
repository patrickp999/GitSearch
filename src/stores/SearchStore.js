import { createContext } from 'react';
import axios from 'axios';
import { observable, action, runInAction, computed, decorate } from 'mobx';

class SearchStore {
  repoResults = [];
  loading = false;

  getResults = async (query, sortBy) => {
    this.loading = true;
    this.repoResults = [];
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
        repositories.data.items.forEach((repo) => {
          this.repoResults.push(repo);
        });
        this.loading = false;
      });
    } catch (error) {
      runInAction('load repos error', () => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  // Does not mutate state, action not required
  getDetails = async (repoId) => {
    let result = this.repoResults.find((repo) => repo.id == repoId);
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
}

decorate(SearchStore, {
  repoResults: observable,
  loading: observable,
  getDetails: observable,
  getLanguageOptions: observable,
  languageOptions: computed,

  getResults: action,
});

export default createContext(new SearchStore());
