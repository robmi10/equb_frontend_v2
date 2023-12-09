const handleMsgError = (errorMsg) => {
    switch (errorMsg) {
        case 'ToManyPlayers':
            return 'Too many players have already joined.';
        case 'CycleDurationIsNotOver':
            return 'The cycle duration is not yet over.';
        case 'EqubNotFinished':
            return 'The Equb has not finished yet.';
        case 'NoEligibleWinnerFound':
            return 'No eligible winner found.';
        case 'EqubNotStarted':
            return 'The Equb has not started yet.';
        case 'Nocollateral':
            return 'No collateral provided.';
        case 'JoinCycleReachedDeadline':
            return 'The deadline to join this cycle has passed.';
        case 'PotToSmall':
            return 'The pot is too small for the operation.';
        case 'TxFailed':
            return 'Transaction failed.';
        case 'NotOwner':
            return 'You are not the owner.';
        case 'NotEnoughMembers':
            return 'Not enough members to start the Equb.';
        case 'AlreadyExist':
            return 'You have already joined.';
        case 'NoContribution':
            return 'No contribution made.';
        case 'AlreadyFinished':
            return 'This cycle has already finished.';
        case 'NotJoinedCycle':
            return 'You have not joined the cycle.';
        case 'CycleIsFull':
            return 'The cycle is full and cannot accept more members.';
        case 'MemberAlreadyExists':
            return 'The member already exists';
        case 'IncorrectAmount':
            return 'Not the correct amount'
        default:
            return 'An unknown error occurred.';
    }
};

export default handleMsgError;
