import React from 'react';
import ReactionItem from './ReactionItem';

const ReactionList = ({ reactions }) => {
  return reactions.edges.map(reaction => (
    <li key={reaction.node.id}><ReactionItem item={reaction.node} /></li>
  ));
};

export default ReactionList;
