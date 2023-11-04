import gql from 'graphql-tag';

export const GET_ALL_EQUBS = gql`
{
  equbs {
    id
    equbStarted
    equbLength
    equbEnded
    equbAddress
    durationOfEachPeriod
    owner
    timeStamp
    totalMembers
    collateralAmount
    contributionAmount
  }
}
`;

export const GET_JOINED_EQUBS = gql`
query GetJoinedEqubs($equb: String!) {
        equbs(
          where: {cycleMemberInfos_: {member: $equb}}
        ) {
          id
          equbStarted
          equbLength
          equbEnded
          equbAddress
          durationOfEachPeriod
          owner
          timeStamp
          totalMembers
          collateralAmount
          contributionAmount
        }
      }
`;


export const GET_OWNER_EQUBS = gql`
      query GetEqubCreateds($owner: String!) {
        equbs(where: { owner: $owner }) {
          id
          equbAddress
          owner
          equbStarted
          totalMembers
          equbEnded
          equbLength
          contributionAmount
          collateralAmount
          durationOfEachPeriod
        }
      }
    `;

export const GET_EQUBS_INFO = gql`
      query GetEqubInfo($equb: String!) {
        equbs(where: { equbAddress: $equb }) {
          contributionAmount
          collateralAmount
          currentWeekOrMonth
          currentWinner
          equbAddress
          equbEnded
          equbLength
          equbStarted
          id
          owner
          timeStamp
          totalMembers
          durationOfEachPeriod
          cycleEnded
        }
      }
    `;

export const GET_MY_INACTIVATED_EQUBS = gql`
    query GetEqubInfo($owner: String!, $equbStarted: Boolean!) {
      equbs(where: {owner: $owner, equbStarted: $equbStarted}) {
        contributionAmount
        collateralAmount
        currentWeekOrMonth
        currentWinner
        equbAddress
        equbEnded
        equbLength
        equbStarted
        id
        owner
        timeStamp
        totalMembers
        durationOfEachPeriod
        cycleEnded
      }
    }
  `;



