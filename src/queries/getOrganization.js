const GET_ORGANIZATION = `
  query GetOrganization {
    organization(login: "the-road-to-learn-react") {
      name,
      url
    }
  }
`;

export default GET_ORGANIZATION;
