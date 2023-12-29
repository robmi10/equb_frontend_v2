import BouncerLoader from '@/components/animation/bouncer';
import { GET_EQUB_CYCLE_INFO, GET_EQUB_CYCLE_PARTICIPANTS, GET_EQUB_DETAILS, GET_EQUB_MEMBERS_INFO } from '@/components/apollo';
import { EqubContext } from '@/components/context/context';
import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { HiSignal } from 'react-icons/hi2';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { ethers } from 'ethers';
import WebJoinEqubCycle from '@/components/web3/webJoinEqubCycle';
import Timer from '@/components/helper/timer/timer';
import { useEthers } from '@usedapp/core';
import WebEndEqub from '@/components/web3/webEndEqub';
import { EqubCycleItem } from './equbtimecheck';

const ModalContentEndEqub = ({ setOpenModal, props, refetch }) => {
    const { equbAddress } = props
    const { useEndEqub } = WebEndEqub(equbAddress, refetch);
    const { loader } = useContext(EqubContext);

    const handleSubmit = async () => {
        event.preventDefault();
        try {

            await useEndEqub();
        } catch (error) {
            console.error("Error in executing functions", error);
        }
    };

    return (
        <div className="bg-white w-5/12 h-4/12 flex justify-center p-11 mt-4 rounded-md flex-col gap-4">
            <button onClick={() => setOpenModal(false)}>
                <AiOutlineClose />
            </button>
            <div>
                <div className="flex flex-col gap-1">
                    <p >Are you sure you wan't to end the equb?</p>
                </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-4">
                <button
                    className="border flex justify-center items-center border-black md:w-48 h-12 rounded-md hover:bg-slate-100"
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    CANCEL
                </button>
                <button
                    className="border flex justify-center items-center border-black md:w-48 h-12 rounded-md hover:bg-slate-100"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    {" "}
                    {!loader ? "Confirm" : <BouncerLoader />}
                </button>
            </div>

        </div>
    );
};

const ModalContentJoinEqub = ({ setOpenModal, props, refetch }) => {
    const { equbAddress, contributionAmount } = props
    const { useJoinEqubCycle } = WebJoinEqubCycle(equbAddress, refetch);
    const { loader } = useContext(EqubContext);

    const handleSubmit = async () => {
        event.preventDefault();
        try {

            await useJoinEqubCycle(contributionAmount);
        } catch (error) {
            console.error("Error in executing functions", error);
        }
    };

    return (
        <div className="bg-white md:w-5/12 h-4/12 flex justify-center p-11 mt-4 rounded-md flex-col gap-4">
            <button onClick={() => setOpenModal(false)}>
                <AiOutlineClose />
            </button>
            <div>
                <div className="flex flex-col gap-1">
                    <p >Are you sure to join the current cycle?</p>
                </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row gap-4 md:gap-4">
                <button
                    className="border flex justify-center items-center border-black md:w-48 h-12 rounded-md hover:bg-slate-100"
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    CANCEL
                </button>
                <button
                    className="border flex justify-center items-center border-black md:w-48 h-12 rounded-md hover:bg-slate-100"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    {" "}
                    {!loader ? "Confirm" : <BouncerLoader />}
                </button>
            </div>

        </div>
    );
};



const Equb = ({ ...props }) => {
    const { setOpenModal, setModalContent } =
        useContext(EqubContext);
    const { account } = useEthers();
    const { cycleId, equbAddress } = props

    const { data: equbDetailsQuery, loading: equbQueryDetailsIsLoading, error: equbDetailsQueryError, refetch: refetchEqubDetailsQuery } = useQuery(GET_EQUB_DETAILS, {
        variables: { equb: equbAddress, currentWeekOrMonth: cycleId },
    });

    const { data: equbCycleQuery, loading: equbCycleIsLoading, error: equbCycleError, refetch: refetchEqubCycleQuery } = useQuery(GET_EQUB_CYCLE_INFO, {
        variables: { equb: equbAddress, member: account, cycleId: cycleId },
    });

    const { data: equbMembersQuery, loading: equbMembersIsLoading, error: equbMembersQueryError, refetch: refetchEqubMembersQuery } = useQuery(GET_EQUB_MEMBERS_INFO, {
        variables: { equb: equbAddress },
    });


    if (equbCycleError || equbMembersQueryError || equbDetailsQueryError) return <> <p> Error...</p></>
    if (equbQueryDetailsIsLoading || equbCycleIsLoading || equbMembersIsLoading)
        return (
            <div className='h-screen flex justify-center items-center'>
                <BouncerLoader />
            </div>
        );

    const { cycleStatuses: equbsCycle } = equbCycleQuery
    const { equbs: equbsDetail } = equbDetailsQuery
    const { playerRewardeds: playerRewardedsList } = equbMembersQuery
    const equbInfo = equbsDetail[0]
    const { allCycleEnded, equbEnded } = equbInfo
    const handleEndEqub = (option) => {
        setOpenModal(true);
        setModalContent(
            <ModalContentEndEqub setOpenModal={setOpenModal} props={option} refetch={[refetchEqubCycleQuery, refetchEqubDetailsQuery, refetchEqubMembersQuery]} />
        );
    };

    const handleJoinEqub = (option) => {
        setOpenModal(true);
        setModalContent(
            <ModalContentJoinEqub setOpenModal={setOpenModal} props={option} refetch={[refetchEqubCycleQuery, refetchEqubDetailsQuery, refetchEqubMembersQuery]} />
        );
    };

    const playerRewardsAndPenalties = playerRewardedsList.reduce((acc, item) => {
        if (acc[item.member]) {
            acc[item.member].contributionAmount =
                Number(acc[item.member].contributionAmount) + Number(item.contributionAmount);
            acc[item.member].penalties = Math.max(
                Number(acc[item.member].penalties), Number(item.penalties)
            );

            acc[item.member].hasBeenRewarded =
                acc[item.member].hasBeenRewarded || item.hasBeenRewarded;
        } else {
            acc[item.member] = { ...item };
        }
        return acc;
    }, {});

    const playerRewardsAndPenaltiesList = Object.values(playerRewardsAndPenalties);
    return (
        <>
            <div className="h-full  w-full flex justify-center">
                <div className="md:w-3/4 h-full flex flex-col space-y-10 p-10">
                    <span className="text-4xl font-semibold"> Equb Details</span>
                    <span className="text-3xl font-medium">A dedicated space to view and manage your Equb details</span>

                    {equbsDetail?.length > 0 && equbsCycle?.length > 0 && <div className="gap-8 flex flex-col md:flex-row">
                        <div className="border rounded-md p-4 md:w-1/2 gap-4 flex flex-col">
                            {equbsDetail?.length > 0 && <span className="text-2xl font-medium">STATUS</span>}
                            {<div >
                                {equbsDetail.map((option, index) => {
                                    return (
                                        <div className="gap-8">
                                            {<div key={index}>
                                                <div className='w-full justify-between flex flex-col gap-4'>
                                                    <div className="flex border p-2 justify-between">
                                                        <label className="font-bold">
                                                            TOTAL MEMBERS
                                                        </label>
                                                        <span>
                                                            {option.totalMembers}
                                                        </span>
                                                    </div>

                                                    <div className="flex border p-2 justify-between">
                                                        <label className="font-bold">
                                                            CYCLE
                                                        </label>
                                                        <span >
                                                            {option.currentWeekOrMonth}
                                                        </span>
                                                    </div>

                                                    <div className="flex border p-2 justify-between">
                                                        <label className="font-bold  ">
                                                            ENDED
                                                        </label>
                                                        <span >
                                                            {option.equbEnded ? <HiSignal color='green' size={20} /> : option.cycleJoins[option.currentWeekOrMonth]?.hasJoined ? <HiSignal color='yellow' size={20} /> : <HiSignal color='red' size={20} />}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    );
                                })}
                            </div>}
                        </div>

                        <div className="border rounded-md p-4 md:w-1/2 gap-4 flex flex-col">
                            {equbsCycle?.length > 0 && <span className="text-2xl font-medium">FINANCIAL DETAILS</span>}
                            {<div>
                                {equbsCycle.map((option, index) => {
                                    return (
                                        <div className="gap-8">
                                            {<div key={index}>
                                                <div className='w-full justify-between flex flex-col gap-4'>
                                                    <div className="flex border p-2 justify-between">
                                                        <label className=" font-bold  ">
                                                            COLLATERAL
                                                        </label>
                                                        {option.totalSum && <span>
                                                            {ethers.utils.formatUnits(option.totalSum)} ETH
                                                        </span>}
                                                    </div>

                                                    <div className="flex border p-2 justify-between">
                                                        <label className="font-bold text-md">
                                                            TVL
                                                        </label>
                                                        <span>
                                                            {option?.totalSum > 0 ? ethers.utils.formatUnits(option?.totalSum) : 0} ETH
                                                        </span>
                                                    </div>

                                                    <div className="flex border p-2 justify-between">
                                                        <label className="font-bold text-md">
                                                            NEXT CYCLE
                                                        </label>
                                                        <span>
                                                            <EqubCycleItem refetch={[refetchEqubCycleQuery, refetchEqubDetailsQuery, refetchEqubMembersQuery]} time={option.endTimeStamp} />                                                        </span>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    );
                                })}
                            </div>}
                        </div>
                    </div>}

                    {allCycleEnded && !equbEnded && <div className='w-full  flex items-start justify-center flex-col gap-4'>
                        <button onClick={() => { handleEndEqub(equbInfo) }}
                            className="border pt-2 border-black hover:bg-slate-100 w-1/4 h-12 p-2 flex items-center justify-center">END EQUB</button>
                    </div>}

                    {(!equbsCycle?.length > 0) && <div className='w-full h-96 border flex justify-center items-center'>
                        <div className='flex flex-col font-bold'>
                            <h1>There is no member currently </h1>
                            <h1>So be the first equb member </h1>
                            <div className="flex pt-1 justify-start">
                                <button className="border pt-2 border-black hover:bg-slate-100 w-full h-12 p-2 flex items-center justify-center"
                                    onClick={() => { handleJoinEqub(equbInfo) }}
                                >
                                    JOIN CYCLE
                                </button>
                            </div>
                        </div>
                    </div>}

                    <div>
                        {equbsCycle?.length > 0 && <span className="text-2xl font-medium">CYCLE</span>}
                        {equbsCycle?.length > 0 && <div >
                            <div className="border rounded-md p-4 w-full mb-8 flex flex-col gap-4 mt-4">
                                {equbsCycle.map((option, index) => {
                                    return (
                                        <div className="gap-8">
                                            {<div key={index}>
                                                <div className='w-full justify-between flex flex-col md:flex-row'>
                                                    {<div className="gap-3 flex flex-col">
                                                        <label className="font-bold">
                                                            DEADLINE
                                                        </label>
                                                        <span >
                                                            <EqubCycleItem refetch={[refetchEqubCycleQuery, refetchEqubDetailsQuery, refetchEqubMembersQuery]} time={option.joinCycleDeadline} hide={true} />
                                                        </span>
                                                    </div>}
                                                    {option.totalSum && <div className="gap-2 flex flex-col">
                                                        <label className="font-bold  ">
                                                            CONTRIBUTIONS
                                                        </label>
                                                        <span >
                                                            {option?.totalSum > 0 ? ethers.utils.formatUnits(option?.totalSum) : 0} ETH
                                                        </span>
                                                    </div>}

                                                    <div className="gap-2 flex flex-col">
                                                        <label className="font-bold">
                                                            MEMBERS
                                                        </label>
                                                        <span >
                                                            {option.totalCycleAmtPlayers > 0 ? option.totalCycleAmtPlayers : 0}
                                                        </span>
                                                    </div>



                                                    <div className="gap-2 flex flex-col">
                                                        <label className="font-bold">
                                                            STARTED
                                                        </label>
                                                        <EqubCycleItem refetch={[refetchEqubCycleQuery, refetchEqubDetailsQuery, refetchEqubMembersQuery]} time={option.startTimeStamp} check={true} />
                                                    </div>
                                                    {!option.participants.length > 0 && <div className="flex pt-1 justify-start">
                                                        <button className="border pt-2 border-black hover:bg-slate-100 w-full h-12 p-2 flex items-center justify-center"
                                                            onClick={() => { handleJoinEqub(equbInfo) }}
                                                        >
                                                            JOIN CYCLE
                                                        </button>
                                                    </div>}
                                                </div>
                                            </div>}
                                        </div>
                                    );
                                })}

                            </div>
                        </div>}

                        {playerRewardsAndPenaltiesList.length > 0 && <span className="text-2xl font-medium">MEMBER'S LIST</span>}
                        {playerRewardsAndPenaltiesList && playerRewardsAndPenaltiesList.length > 0 && <div >
                            <div className="border rounded-md p-4 w-full flex flex-col gap-4">
                                {playerRewardsAndPenaltiesList.map((option, index) => {
                                    return (
                                        <div className="gap-8">
                                            {<div key={index}>
                                                <div className='w-full justify-between flex flex-col md:flex-row md:items-center border p-4 gap-4 md:gap-0'>

                                                    <div className="gap-2 flex flex-col">
                                                        <label className="w-42 font-bold">
                                                            MEMBER
                                                        </label>
                                                        <span>
                                                            {option.member?.toString()?.substr(0, 15)}
                                                        </span>
                                                    </div>
                                                    <div className="gap-2 flex flex-col">
                                                        <label className="font-bold">
                                                            CONTRIBUTED
                                                        </label>
                                                        <span className="w-full flex ">
                                                            {ethers.utils.formatUnits(option.contributionAmount)} ETH
                                                        </span>
                                                    </div>

                                                    <div className="gap-2 flex flex-col justify-between">
                                                        <label className="font-bold">
                                                            REWARDED
                                                        </label>
                                                        <span className="w-full flex md:justify-center">
                                                            {option.hasBeenRewarded ? <AiFillCheckCircle color='green' size={20} /> : <AiFillCloseCircle color='red' size={20} />}

                                                        </span>
                                                    </div>


                                                    <div className="gap-2 flex flex-col">
                                                        <label className="font-bold  ">
                                                            PENALTIES
                                                        </label>
                                                        <span >
                                                            {option.penalties} / 2
                                                        </span>
                                                    </div>

                                                    <div className="gap-2 flex flex-col justify-between">
                                                        <label className="font-bold">
                                                            ELIMINATED
                                                        </label>
                                                        <span className="w-full flex md:justify-center">
                                                            {option.penalties >= 2 ? <AiFillCheckCircle color='green' size={20} /> : <AiFillCloseCircle color='red' size={20} />}

                                                        </span>
                                                    </div>

                                                </div>
                                            </div>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Equb