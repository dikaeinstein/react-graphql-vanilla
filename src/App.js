import React, { Component } from 'react';
import axios from 'axios';
import Organization from './components/Organization';
import { GET_ISSUES_OF_REPOSITORY, ADD_STAR, REMOVE_STAR } from './queries';
import {
  resolveIssuesQuery, resolveAddStarMutation,
  resolveRemoveStarMutation,
} from './queries/queryHelpers';
import './App.css';

const TITLE = 'React GraphQL GitHub Client';

const axiosGithubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      path: 'the-road-to-learn-react/the-road-to-learn-react',
      organization: null,
      errors: null,
    };
    this.fetchFromGithub = this.fetchFromGithub.bind(this);
    this.addStarToRepository = this.addStarToRepository.bind(this);
    this.unStarRepository = this.unStarRepository.bind(this);
  }

  componentDidMount() {
    this.fetchFromGithub(this.state.path);
  }

  handleChange = event => {
    this.setState({ path: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchFromGithub(this.state.path);
  };

  async fetchFromGithub(path, cursor) {
    const [organization, repository] = path.split('/');
    const response = await axiosGithubGraphQL.post('', {
      query: GET_ISSUES_OF_REPOSITORY,
      variables: { organization, repository, cursor },
    });
    this.setState(resolveIssuesQuery(response, cursor));
  }

  handleFetchMoreIssues = () => {
    const {
      endCursor,
    } = this.state.organization.repository.issues.pageInfo;

    this.fetchFromGithub(this.state.path, endCursor);
  };

  async addStarToRepository(repositoryId) {
    const response = await axiosGithubGraphQL.post('', {
      query: ADD_STAR,
      variables: { repositoryId },
    });
  
    this.setState(resolveAddStarMutation(response));
  }

  async unStarRepository(repositoryId) {
    const response = await axiosGithubGraphQL.post('', {
      query: REMOVE_STAR,
      variables: { repositoryId },
    });

    this.setState(resolveRemoveStarMutation(response));
  }

  handleStarRepository = (repositoryId, viewerHasStarred) => {
    if (viewerHasStarred) {
      this.unStarRepository(repositoryId);
      return;
    }
    this.addStarToRepository(repositoryId);
  };


  render() {
    const { path, organization } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com/
          </label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.handleChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>
        <hr/>
        {organization
          ? <Organization
              organization={organization}
              handleFetchMoreIssues={this.handleFetchMoreIssues}
              handleStarRepository={this.handleStarRepository}
            />
          : <p>No information yet...</p>}
      </div>
    );
  }
}

export default App;
