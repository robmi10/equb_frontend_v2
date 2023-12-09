import gql from 'graphql-tag';

export const GET_MEMBER_EQUBS = gql`
  query GetNotMemberEqubs($member: String!) {  
    cycleMemberInfos(
      where: {member: $member}
    ) {
      id
      member
      owner
      equb {
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
        totalCycleAmtPlayers
        totalEqubAmtPlayers
      }
    }
  }
`;

export const GET_NOT_OWNER_AND_MEMBER_EQUBS = gql`
  query GetExploreEqubs($member: String!) {   
    cycleMemberInfos(
      where: {or: [{member_not: $member}, {owner_not: $member}]}
    ) {
      id
      member
      owner
      equb {
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
        totalCycleAmtPlayers
        totalEqubAmtPlayers
      }
    }
  }
`;

export const GET_JOINED_EQUBS = gql`
query GetJoinedEqubs($member: String!) {
        equbs(
          where: {cycleMemberInfos_: {member: $member}}
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
          totalCycleAmtPlayers
          totalEqubAmtPlayers
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
          totalEqubAmtPlayers
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
      collateralAmount
      contributionAmount
      equbAddress
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

export const GET_EQUB_CYCLE_PARTICIPANTS = gql`
  query GetCycleParticipants($equb: String!){
      cycleParticipants(where: {equb: $equb}) {
        id
        participant
        participatedCycle
        cycleId
        participant
        participatedCycle
        contributed
        penalties
      }
  }
`

export const GET_EQUB_CYCLE_INFO = gql`
  query GetCycleInfo($equb: String!, $member: String!){
    cycleStatuses(where: {equb: $equb}) {
      id
      winner
      totalCycleAmtPlayers
      startTimeStamp
      joinCycleDeadline
      isFinished
      totalSum
      endTimeStamp
      joinCycleDeadline
      cycleId
      equb
      participants(where: {participant: $member}) {
        cycleId
        participant
        participatedCycle
        penalties
      }
    }
  }
`
