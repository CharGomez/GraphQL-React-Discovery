import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import ApolloClient from 'apollo-client';
import { ApolloProvider} from 'react-apollo';

import App from './components/App'
import ProjectList from './components/ProjectList';
import ProjectCreate from './components/ProjectCreate';
import ProjectDetail from './components/ProjectDetail';

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={ProjectList} />
          <Route path="projects/new" component={ProjectCreate} />
          <Route path="projects/:id" component={ProjectDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#mainEstimation')
);
