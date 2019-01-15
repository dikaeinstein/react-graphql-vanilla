const ADD_STAR = `
mutation ($repositoryId: ID!) {
  addStar(input: { starrableId: $repositoryId }) {
    starrable {
      viewerHasStarred
    }
  }
}
`;

export default ADD_STAR;
