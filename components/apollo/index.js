import gql from 'graphql-tag';

export const GET_ALL_EXPLORE_EQUBS = gql`
  query GetExploreEqubs($member: String!) {
      equbs(
        where: {cycleMemberInfos_: {member_not_contains: $member}, owner_not: $member}
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
    query GetEqubInactivated($owner: String!, $equbStarted: Boolean!) {
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

export const GET_EQUB_DETAILS = gql`
  query GetEqubDetails($equb: String!) {
    equbs(where: {equbAddress: $equb}) {
      totalMembers
      currentWeekOrMonth
      cycleJoins {
        id
        member
        timestamp
      }
    }
  }
`;

export const GET_EQUB_FINANCIAL_DETAILS = gql`
      query GetFinancialDetails($equb: String!) {
        equbs(where: {equbAddress: $equb}) {
          contributionAmount
          collateralAmount
          currentWeekOrMonth
          contributions {
            totalsum
            id
          }
        }
      }
  `;

export const GET_EQUB_CYCLE_DETAILS = gql`
  query GetCycleDetails($equb: String!) {
    equbs(where: {equbAddress: $equb}) {
      contributionAmount
      collateralAmount
      contributions {
        totalsum
        id
      }
    }
  }
`;
