/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLineBotRequest = /* GraphQL */ `
  mutation CreateLineBotRequest(
    $input: CreateLineBotRequestInput!
    $condition: ModelLineBotRequestConditionInput
  ) {
    createLineBotRequest(input: $input, condition: $condition) {
      id
      LineID
      UserID
      UserName
      LineUserName
      Images
      Status
      createdAt
      repliedAt
      updatedAt
    }
  }
`;
export const updateLineBotRequest = /* GraphQL */ `
  mutation UpdateLineBotRequest(
    $input: UpdateLineBotRequestInput!
    $condition: ModelLineBotRequestConditionInput
  ) {
    updateLineBotRequest(input: $input, condition: $condition) {
      id
      LineID
      UserID
      UserName
      LineUserName
      Images
      Status
      createdAt
      repliedAt
      updatedAt
    }
  }
`;
export const deleteLineBotRequest = /* GraphQL */ `
  mutation DeleteLineBotRequest(
    $input: DeleteLineBotRequestInput!
    $condition: ModelLineBotRequestConditionInput
  ) {
    deleteLineBotRequest(input: $input, condition: $condition) {
      id
      LineID
      UserID
      UserName
      LineUserName
      Images
      Status
      createdAt
      repliedAt
      updatedAt
    }
  }
`;
