/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLineBotRequests = /* GraphQL */ `
  mutation CreateLineBotRequests(
    $input: CreateLineBotRequestsInput!
    $condition: ModelLineBotRequestsConditionInput
  ) {
    createLineBotRequests(input: $input, condition: $condition) {
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
export const updateLineBotRequests = /* GraphQL */ `
  mutation UpdateLineBotRequests(
    $input: UpdateLineBotRequestsInput!
    $condition: ModelLineBotRequestsConditionInput
  ) {
    updateLineBotRequests(input: $input, condition: $condition) {
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
export const deleteLineBotRequests = /* GraphQL */ `
  mutation DeleteLineBotRequests(
    $input: DeleteLineBotRequestsInput!
    $condition: ModelLineBotRequestsConditionInput
  ) {
    deleteLineBotRequests(input: $input, condition: $condition) {
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
