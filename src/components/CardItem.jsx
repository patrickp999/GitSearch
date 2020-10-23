import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faKeyboard, faUser } from '@fortawesome/free-solid-svg-icons';

function CardItem({ repo, showAvatar = false, showDescription = false }) {
  return (
    <Fragment>
      {showAvatar ? (
        <img
          className='card--image'
          src={repo.owner?.avatar_url}
          alt={repo.owner?.login + ' avatar'}
        />
      ) : null}
      <div>
        <h2 className='card--name'>{repo.name}</h2>
        <p>
          <FontAwesomeIcon className='card--icon' icon={faUser} />
          {repo.owner?.login}
        </p>
        <p>
          <FontAwesomeIcon className='card--icon' icon={faStar} />
          {repo.stargazers_count}
        </p>
        <p>
          <FontAwesomeIcon className='card--icon' icon={faKeyboard} />
          {repo.language}
        </p>
        {showDescription ? (
          <p className='card--desc'>{repo.description}</p>
        ) : null}
      </div>
    </Fragment>
  );
}

export default CardItem;
