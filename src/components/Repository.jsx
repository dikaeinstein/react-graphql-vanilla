import React from 'react';
import ReactionList from './ReactionList';

const Repository = ({
  repository, handleFetchMoreIssues, handleStarRepository,
}) => (
  <div>
    <p>
      <strong>In Repository:</strong>
      <a href={repository.url}>{repository.name}</a>
    </p>
    <button
      type="button"
      onClick={() =>
        handleStarRepository(repository.id, repository.viewerHasStarred)
      }
    >
      {repository.stargazers.totalCount}
      {' '}
      {repository.viewerHasStarred ? 'Unstar' : 'Star'}
    </button>
    <ul>
      {repository.issues.edges.map(issue => (
        <li key={issue.node.id}>
          <h3><a href={issue.node.url}>{issue.node.title}</a></h3>
          <h4>Reactions</h4>
          <ul>{<ReactionList reactions={issue.node.reactions} />}</ul>
        </li>))}
    </ul>
    {repository.issues.pageInfo.hasNextPage && (
      <button onClick={handleFetchMoreIssues}>More</button>
    )}
  </div>
);

export default Repository;
