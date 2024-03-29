import Link from 'next/link';
import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
import { GET_OWNER_EQUBS, GET_JOINED_EQUBS } from '@/components/apollo';
import { useEthers } from "@usedapp/core";
import { AiOutlineArrowRight } from 'react-icons/ai';
import { HiSignal } from 'react-icons/hi2';
import { AiOutlineClose } from 'react-icons/ai';
import BouncerLoader from '@/components/animation/bouncer';
import { EqubContext } from '@/components/context/context';
import WebJoinEqub from '@/components/web3/webJoinEqub';

const ModalJoinEqub = ({ setOpenModal, props, refetch }) => {
  const { collateralAmount, equbAddress } = props
  const { joinEqub } = WebJoinEqub(equbAddress, refetch);
  const { loader } = useContext(EqubContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await joinEqub(collateralAmount);
  };

  return (
    <div className="bg-white w-5/12 h-4/12 flex justify-center p-11 mt-4 rounded-md flex-col gap-4">
      <button onClick={() => setOpenModal(false)}>
        <AiOutlineClose />
      </button>
      <div>
        <div className="flex flex-col gap-1">
          <p >Do you want to join the equb with address</p>
          <p className=" font-bold">{equbAddress?.toString().substr(0, 14)}?</p>
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

const MyEqubs = () => {
  const { setOpenModal, setModalContent } =
    useContext(EqubContext);
  const { account } = useEthers();


  const shouldSkip = !account; // Determine based on your logic

  const { data: myEqubs, loading: myEqubsLoading, error: myEqubsError, refetch: refetchEqubQuery } = useQuery(GET_OWNER_EQUBS, {
    variables: { owner: account }, fetchPolicy: 'network-only', skip: shouldSkip,

  });
  const { data: joinedEqubs, loading: joinedEqubsLoading, error: joinedEqubsError, refetch: refetchJoinedEqubQuery } = useQuery(GET_JOINED_EQUBS, {
    variables: { member: account }, fetchPolicy: 'network-only', skip: shouldSkip,

  });

  if (myEqubsError || joinedEqubsError) return <> <p> Error...</p></>

  if (joinedEqubsLoading || myEqubsLoading)
    return (
      <div className='h-screen flex justify-center items-center'>
        <BouncerLoader />
      </div>
    );

  const handleJoinEqub = (option) => {
    setOpenModal(true);
    setModalContent(
      <ModalJoinEqub setOpenModal={setOpenModal} props={option} refetch={[refetchEqubQuery, refetchJoinedEqubQuery]} />,
    );
  };
  const { equbs: myEqubList } = myEqubs
  const { equbs: joinedEqubList } = joinedEqubs

  return (
    <div className="animate-fadeIn h-full w-full flex justify-center">
      <div className="md:w-3/4 h-full flex flex-col space-y-5 p-10">
        <div className='flex flex-col space-y-5 md:w-3/4  mb-12'>

          <span className="font-bold text-4xl">MyEqub Dashboard</span>
          <span className="font-medium text-3xl">
            Welcome to your personal equb dashboard.</span>
          <span className="font-medium text-2xl text-gray-400">Here you can monitor and manage the equbs you own and see the ones you have joined.</span>
        </div>

        {(!myEqubList.length > 0 && !joinedEqubList.length > 0) && (
          <div className='h-96 flex  font-medium text-3xl '>
            <h1>You currently haven not joined or created any Equbs</h1>
          </div>
        )}

        {myEqubList.length > 0 && <span className="text-xl">My Owned Equbs</span>}
        {myEqubList.length > 0 && <div className="border rounded-md p-8">
          {myEqubList.map((option, index) => {
            return (
              <div key={index}>
                {
                  <div key={index}>
                    <div className='w-full justify-between md:h-14 flex flex-col md:flex-row md:items-center p-12 border gap-4'>
                      <div className="flex flex-col justify-between h-14 gap-2">
                        <span className="md:w-36 font-bold">
                          EQUB
                        </span>

                        <span>
                          {option.equbAddress?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col justify-between h-14 gap-2">
                        <span className="font-bold">
                          OWNER
                        </span>
                        <span>
                          {option.owner?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 justify-between h-14 md:items-center">
                        <span className="font-bold">
                          MEMBERS
                        </span>
                        <span>
                          {option.totalEqubAmtPlayers?.toString()?.substr(0, 15)} - {option.totalMembers?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col md:items-center justify-between h-14">
                        <span className="font-bold ">
                          STARTED
                        </span>
                        <span >
                          {option.equbStarted ? <HiSignal color='green' size={20} /> : <HiSignal color='red' size={20} />}
                        </span>
                      </div>

                      <div className="flex flex-col md:items-center justify-between h-14">
                        <span className="font-bold ">
                          ENDED
                        </span>
                        <span>
                          {option.equbEnded ? <HiSignal color='green' size={20} /> : <HiSignal color='red' size={20} />}
                        </span>
                      </div>


                      {option.cycleMemberInfos.length > 0 ? <Link href="/equb/[equbaddress]" as={`/equb/${option.equbAddress}`}
                        className="md:w-2/12 md:p-2 flex justify-center"
                      >
                        <div className="flex items-center gap-2 w-full justify-between hover:border-b">
                          <span> GO TO EQUB</span>
                          <AiOutlineArrowRight />
                        </div>
                      </Link> : <button className="border pt-2 border-black hover:bg-slate-100 w-2/12 p-2 flex justify-center"
                        onClick={() => { handleJoinEqub(option) }}
                      >
                        JOIN EQUB
                      </button>}

                    </div>
                  </div>
                }
              </div>
            );
          })}
        </div>}

        {joinedEqubList.length > 0 && <span className="text-xl">Equbs Ive Joined</span>}
        {joinedEqubList.length > 0 && <div className="border rounded-md p-8">
          {joinedEqubList.map((option, index) => {
            return (
              <div key={index}>
                {
                  <div key={index}>
                    <div className='w-full justify-between md:h-14 flex flex-col md:flex-row md:items-center p-12 border gap-4'>
                      <div className="flex flex-col justify-between h-14 gap-2">
                        <span className="w-36 font-bold">
                          EQUB
                        </span>

                        <span>
                          {option.equbAddress?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col justify-between h-14 gap-2">
                        <span className="font-bold">
                          OWNER
                        </span>
                        <span>
                          {option.owner?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 justify-between h-14 md:items-center">
                        <span className="font-bold">
                          MEMBERS
                        </span>
                        <span>
                          {option.totalEqubAmtPlayers?.toString()?.substr(0, 15)} - {option.totalMembers?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col md:items-center justify-between h-14">
                        <span className="font-bold ">
                          STARTED
                        </span>
                        <span >
                          {option.equbStarted ? <HiSignal color='green' size={20} /> : <HiSignal color='red' size={20} />}
                        </span>
                      </div>

                      <div className="flex flex-col md:items-center justify-between h-14">
                        <span className="font-bold ">
                          ENDED
                        </span>
                        <span>
                          {option.equbEnded ? <HiSignal color='green' size={20} /> : <HiSignal color='red' size={20} />}
                        </span>
                      </div>

                      <Link href="/equb/[equbaddress]" as={`/equb/${option.equbAddress}`}
                        className="md:w-2/12 md:p-2 flex justify-center"
                      >
                        <div className="flex items-center gap-2 w-full justify-between hover:border-b">
                          <span> GO TO EQUB</span>
                          <AiOutlineArrowRight />
                        </div>
                      </Link>

                    </div>
                  </div>
                }
              </div>
            );
          })}
        </div>}
      </div>
    </div>
  )
}

export default MyEqubs