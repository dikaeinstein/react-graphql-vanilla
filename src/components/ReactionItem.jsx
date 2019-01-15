import React from 'react';

const ReactionItem = ({ item }) => (
  <div>
    <small key={item.id}>{item.content}</small>
  </div>
);

export default ReactionItem;
