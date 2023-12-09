import BouncerLoader from '@/components/animation/bouncer';
import { GET_EQUB_CYCLE_INFO, GET_EQUB_CYCLE_PARTICIPANTS, GET_EQUB_DETAILS } from '@/components/apollo';
import { EqubContext } from '@/components/context/context';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { HiSignal } from 'react-icons/hi2';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { ethers } from 'ethers';
import WebJoinEqubCycle from '@/components/web3/webJoinEqubCycle';
import Timer from '@/components/helper/timer/timer';
import { useEthers } from '@usedapp/core';




const ModalContent = ({ setOpenModal, props, refetch }) => {
  const { collateralAmount, equbAddress, contributionAmount } = props
  console.log("props ->", props)
  const { useJoinEqubCycle } = WebJoinEqubCycle(equbAddress, refetch);
  const { loader } = useContext(EqubContext);

  let collateralAmountBN = ethers.utils.parseEther(collateralAmount);
  let contributionAmountBN = ethers.utils.parseEther(contributionAmount);
  let totalAmountBN = collateralAmountBN.add(contributionAmountBN);
  let totalAmount = ethers.utils.formatEther(totalAmountBN)

  console.log("totalAmount ->", totalAmount)
  console.log("contributionAmount ->", contributionAmount)

  let totalAmountClean = totalAmount.endsWith(".0")
    ? totalAmount.slice(0, -2)
    : totalAmount;

  const handleSubmit = async () => {
    event.preventDefault();
    try {

      await useJoinEqubCycle(totalAmountClean);
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
          <p >Are you sure to join the current cycle?</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="border flex justify-center items-center border-black w-48 h-12 rounded-md hover:bg-slate-100"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          CANCEL
        </button>
        <button
          className="border flex justify-center items-center border-black w-48 h-12 rounded-md hover:bg-slate-100"
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

const Equb = () => {
  const { setOpenModal, setModalContent } =
    useContext(EqubContext);
  const { account } = useEthers();


  const router = useRouter();
  const EqubParam = router.query.equbaddress

  console.log("EqubParam ->", EqubParam)


  const { data: equbCycleQuery, loading: equbCycleIsLoading, error: equbCycleError, refetch: refetchEqubCycleQuery } = useQuery(GET_EQUB_CYCLE_INFO, {
    variables: { equb: EqubParam, member: account },
  });

  const { data: equbDetailsQuery, loading: equbQueryDetailsIsLoading, error: equbDetailsQueryError, refetch: refetchEqubDetailsQuery } = useQuery(GET_EQUB_DETAILS, {
    variables: { equb: EqubParam },
  });
  const { data: equbDetailsParticipantsQuery, loading: equbDetailsParticipantsIsLoading, error: equbDetailsParticipantsQueryError, refetch: refetchEqubDetailsParticipantsQuery } = useQuery(GET_EQUB_CYCLE_PARTICIPANTS, {
    variables: { equb: EqubParam },
  });


  const checkIfDeadlinIsPassed = (deadline) => {
    const currentTime = new Date().getTime(); // Get current time in milliseconds

    return currentTime > deadline * 1000;
  }

  console.log("equbQuery -> ", equbCycleQuery)


  if (equbCycleError) return <> <p> Error...</p></>




  if (!equbCycleQuery || !equbDetailsQuery || !equbDetailsParticipantsQuery)
    return (
      <div className='h-screen flex justify-center items-center'>
        <BouncerLoader />
      </div>
    );

  console.log("equbCycleQuery ->", equbCycleQuery)


  const { cycleStatuses: equbsCycle } = equbCycleQuery
  const { equbs: equbsDetail } = equbDetailsQuery
  const { cycleParticipants: equbsParticipants } = equbDetailsParticipantsQuery

  const equbInfo = equbsDetail[0]

  console.log({ equbsDetail })
  console.log({ equbsCycle })
  console.log({ equbsParticipants })
  console.log("")

  const handleStartClick = (option) => {
    console.log("option ->", option)
    setOpenModal(true);
    setModalContent(
      <ModalContent setOpenModal={setOpenModal} props={option} refetch={[refetchEqubCycleQuery, refetchEqubDetailsParticipantsQuery, refetchEqubDetailsQuery]} />
    );
  };
  return (
    <>
      <div className="h-full   w-full flex justify-center">
        <div className="w-3/4 h-full flex flex-col space-y-10 p-10">
          <span className=" text-4xl font-semibold"> Equb Details</span>
          <span className="text-3xl font-medium">A dedicated space to view and manage your Equb details</span>

          {equbsDetail?.length > 0 && equbsCycle?.length > 0 && <div className="gap-8 flex flex-row">
            <div className="border rounded-md p-4 w-1/2 gap-4 flex flex-col">
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
                              {option.totalMembers?.toString()?.substr(0, 15)}
                            </span>
                          </div>

                          <div className="flex border p-2 justify-between">
                            <label className="font-bold">
                              CYCLE
                            </label>
                            <span >
                              {option.currentWeekOrMonth?.toString()?.substr(0, 15)}
                            </span>
                          </div>

                          <div className="flex border p-2 justify-between">
                            <label className="font-bold  ">
                              ENDED
                            </label>
                            <span >
                              {option.cycleJoins[option?.currentWeekOrMonth]?.isFinished ? <HiSignal color='green' size={20} /> : option.cycleJoins[option.currentWeekOrMonth]?.hasJoined ? <HiSignal color='yellow' size={20} /> : <HiSignal color='red' size={20} />}
                            </span>
                          </div>
                        </div>
                      </div>}
                    </div>
                  );
                })}
              </div>}
            </div>

            <div className="border rounded-md p-4 w-1/2 gap-4 flex flex-col">
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
                            <span>
                              {/* {ethers.utils.formatUnits(option.totalSum)} ETH */}
                            </span>
                          </div>

                          <div className="flex border p-2 justify-between">
                            <label className="font-bold text-md">
                              TVL
                            </label>
                            <span>
                              {/* {ethers.utils.formatUnits(option.totalSum * option.totalCycleAmtPlayers)} ETH */}
                            </span>
                          </div>

                          <div className="flex border p-2 justify-between">
                            <label className="font-bold text-md">
                              NEXT CYCLE
                            </label>
                            <span>
                              <Timer countDownTimeMs={Number(option.endTimeStamp)} />
                            </span>
                          </div>
                        </div>
                      </div>}
                    </div>
                  );
                })}
              </div>}
            </div>
          </div>}

          {(!equbsCycle?.length > 0) && <div className='w-full h-96 border flex justify-center items-center'>
            <div className='flex flex-col font-bold'>
              <h1>There is no member currently </h1>
              <h1>So be the first equb member </h1>
              <div className="flex pt-1 justify-start">
                {console.log("equbInfo ->", equbInfo)}
                <button className="border pt-2 border-black hover:bg-slate-100 w-full h-12 p-2 flex items-center justify-center"
                  onClick={() => { handleStartClick(equbInfo) }}
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
                        <div className='w-full justify-between flex'>
                          <div className="gap-3 flex flex-col">
                            <label className="font-bold">
                              DEADLINE
                            </label>
                            <span >
                              {checkIfDeadlinIsPassed(Number(option.joinCycleDeadline)) ? <Timer countDownTimeMs={Number(option.endTimeStamp)} hide={true} /> : <Timer countDownTimeMs={Number(option.joinCycleDeadline)} hide={true} />}
                            </span>
                          </div>
                          <div className="gap-2 flex flex-col">
                            <label className="font-bold  ">
                              CONTRIBUTIONS
                            </label>
                            <span >
                              {/* {ethers.utils.formatUnits(option.totalSum * option.totalCycleAmtPlayers)} ETH */}
                            </span>
                          </div>

                          <div className="gap-2 flex flex-col">
                            <label className="font-bold">
                              MEMBERS
                            </label>
                            <span >
                              {option.totalCycleAmtPlayers > 0 ? option.totalCycleAmtPlayers?.toString()?.substr(0, 15) : 0}
                            </span>
                          </div>



                          <div className="gap-2 flex flex-col">
                            <label className="font-bold">
                              STARTED
                            </label>
                            <span >
                              {checkIfDeadlinIsPassed(Number(option.joinCycleDeadline)) ? <AiFillCheckCircle color='green' size={20} /> : <AiFillCloseCircle color='red' size={20} />}
                            </span>
                          </div>
                          {console.log("option?.members ->", option.participants)}
                          {!option.participants.length > 0 && <div className="flex pt-1 justify-start">
                            <button className="border pt-2 border-black hover:bg-slate-100 w-full h-12 p-2 flex items-center justify-center"
                              onClick={() => { handleStartClick(equbInfo) }}
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

            {equbsParticipants.length > 0 && <span className="text-2xl font-medium">MEMBER'S LIST</span>}
            {equbsParticipants && equbsParticipants.length > 0 && <div >
              <div className="border rounded-md p-4 w-full flex flex-col gap-4">
                {equbsParticipants.map((option, index) => {
                  return (
                    <div className="gap-8">
                      {<div key={index}>
                        <div className='w-full justify-between flex items-center border p-4'>

                          <div className="gap-2 flex flex-col">
                            <label className="w-42 font-bold">
                              MEMBER
                            </label>
                            <span>
                              {option.participant?.toString()?.substr(0, 15)}
                            </span>
                          </div>
                          <div className="gap-2 flex flex-col">
                            <label className="font-bold">
                              CONTRIBUTED
                            </label>
                            <span className="w-full flex ">
                              {ethers.utils.formatUnits(option.contributed)} ETH
                            </span>
                          </div>

                          <div className="gap-2 flex flex-col">
                            <label className="font-bold  ">
                              Penalties
                            </label>
                            <span >
                              {option.penalties ? <AiFillCheckCircle color='green' size={20} /> : <AiFillCloseCircle color='red' size={20} />}
                            </span>
                          </div>

                          <div className="gap-2 flex flex-col justify-between">
                            <label className="font-bold">
                              Eliminated
                            </label>
                            <span className="w-full flex justify-center">
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