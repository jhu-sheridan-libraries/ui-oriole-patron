import React from 'react';
import ReactDOM from 'react-dom';
import TagResourceList from '../components/TagResourceList';

const elements = document.getElementsByClassName('oriole-database-list')
for (const element of elements) {
  const list = <TagResourceList key={element.getAttribute('data-oriole-id')} tag={element.getAttribute('data-oriole-subject')} />;
  ReactDOM.render(list, element);
}
