/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLineBotRequests = /* GraphQL */ `
  query GetLineBotRequests($id: ID!) {
    getLineBotRequests(id: $id) {
      id
      LineID
      LineUserName
      Images
      Status
      createdAt
      updatedAt
    }
  }
`;
export const listLineBotRequestss = /* GraphQL */ `
  query ListLineBotRequestss(
    $filter: ModelLineBotRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLineBotRequestss(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        LineID
        LineUserName
        Images
        Status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
