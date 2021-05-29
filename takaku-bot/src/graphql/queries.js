/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLineBotRequest = /* GraphQL */ `
  query GetLineBotRequest($id: ID!) {
    getLineBotRequest(id: $id) {
      id
      LineID
      UserID
      UserName
      LineUserName
      Images
      Status
      repliedAt
      createdAt
      updatedAt
    }
  }
`;
export const listLineBotRequests = /* GraphQL */ `
  query ListLineBotRequests(
    $filter: ModelLineBotRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLineBotRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        LineID
        UserID
        UserName
        LineUserName
        Images
        Status
        repliedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
