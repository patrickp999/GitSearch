import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SearchStore from '../stores/SearchStore';
import CardItem from '../components/CardItem';

function DetailsPage({ match, history }) {
  const searchStore = useContext(SearchStore);
  const { getDetails } = searchStore;
  const [selectedRepo, setSelectedRepo] = useState({
    id: '',
    name: '',
    description: '',
    stargazers_count: '',
    owner: {
      login: '',
      avatar_url: '',
    },
    html_url: '',
  });

  useEffect(() => {
    if (match.params.id) {
      getDetails(match.params.id).then((repo) => setSelectedRepo({ ...repo }));
    }
    // If page is refreshed and data is lost navigate back to home page
    if (selectedRepo.id === undefined) {
      history.push('/');
    }
  }, [getDetails, match.params.id, history, selectedRepo.id]);

  return (
    <div className='container'>
      <button
        className='button'
        type='button'
        onClick={() => history.push('/')}
      >
        Go Back
      </button>
      <div className='card--details'>
        <CardItem repo={selectedRepo} showAvatar showDescription />
      </div>
    </div>
  );
}

export default observer(DetailsPage);
