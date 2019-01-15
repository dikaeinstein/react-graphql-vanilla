const GET_REPOSITORY_OF_ORGANIZATION = `
{
  organization(login: "the-road-to-learn-react") {
    name
    url
    repository(name: "the-road-to-learn-react") {
      name
      url
    }
  }
}
`;

export default GET_REPOSITORY_OF_ORGANIZATION;
