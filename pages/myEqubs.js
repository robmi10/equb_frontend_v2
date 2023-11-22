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

const ModalContent = ({ setOpenModal, props, refetch }) => {
  const { collateralAmount, equbAddress } = props

  const { useJoinEqub } = WebJoinEqub(equbAddress, refetch);
  const { loader } = useContext(EqubContext);

  const handleSubmit = () => {
    event.preventDefault();
    useJoinEqub(collateralAmount);
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


  if (!account) return false
  console.log({ account })
  const { data: myEqubs, loading: myEqubsLoading, error: myEqubsError, refetch: refetchEqubQuery } = useQuery(GET_OWNER_EQUBS, {
    variables: { owner: account },
  });
  const { data: joinedEqubs, loading: joinedEqubsLoading, error: joinedEqubsError } = useQuery(GET_JOINED_EQUBS, {
    variables: { equb: account },
  });

  if (myEqubsError || joinedEqubsError) return <> <p> Error...</p></>

  if (joinedEqubsLoading || myEqubsLoading)
    return (
      <div className='h-screen flex justify-center items-center'>
        <BouncerLoader />
      </div>
    );

  const handleStartClick = (option) => {
    setOpenModal(true);
    setModalContent(
      <ModalContent setOpenModal={setOpenModal} props={option} refetch={refetchEqubQuery} />,
    );
  };
  const { equbs: myEqubList } = myEqubs
  const { equbs: joinedEqubList } = joinedEqubs

  console.log({ myEqubList })
  console.log({ joinedEqubList })

  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-3/4 h-full flex flex-col space-y-5 p-10">
        <div className='flex flex-col space-y-5 w-3/4  mb-12'>

          <span className="font-bold text-4xl">MyEqub Dashboard</span>
          <span className="font-medium text-3xl">
            Welcome to your personal equb dashboard.</span>
          <span className="font-medium text-2xl text-gray-400">Here you can monitor and manage the equbs you own and see the ones you've joined.</span>
        </div>

        {myEqubList.length > 0 && <span className="text-xl">My Owned Equbs</span>}
        {myEqubList.length > 0 && <div className="border rounded-md p-8">
          {myEqubList.map((option, index) => {
            return (
              <div>
                {
                  <div key={index}>
                    <div className='w-full justify-between h-14 flex items-center p-12 border'>
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

                      <div className="flex flex-col gap-2 justify-between h-14 items-center">
                        <span className="font-bold">
                          TOTAL MEMBERS
                        </span>
                        <span>
                          {option.totalMembers?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-between h-14">
                        <span className="font-bold ">
                          STARTED
                        </span>
                        <span >
                          {option.equbStarted ? <HiSignal color='green' size={20} /> : <HiSignal color='red' size={20} />}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-between h-14">
                        <span className="font-bold ">
                          ENDED
                        </span>
                        <span>
                          {option.equbEnded ? <HiSignal color='green' size={20} /> : <HiSignal color='red' size={20} />}
                        </span>
                      </div>


                      <button className="border pt-2 border-black hover:bg-slate-100 w-2/12 p-2 flex justify-center"
                        onClick={() => { handleStartClick(option) }}
                      >
                        JOIN EQUB
                      </button>

                    </div>
                  </div>
                }
              </div>
            );
          })}
        </div>}

        {joinedEqubList.length > 0 && <span className="text-xl">Equbs I've Joined</span>}
        {joinedEqubList.length > 0 && <div className="border rounded-md p-8">
          {joinedEqubList.map((option, index) => {
            return (
              <div>
                {
                  <div key={index}>
                    <div className='w-full justify-between h-14 flex items-center p-12 border'>
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

                      <div className="flex flex-col gap-2 justify-between h-14 items-center">
                        <span className="font-bold">
                          TOTAL MEMBERS
                        </span>
                        <span>
                          {option.totalMembers?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-between h-14">
                        <span className="font-bold ">
                          STARTED
                        </span>
                        <span >
                          {option.equbStarted ? <HiSignal color='green' size={20} /> : <HiSignal color='red' size={20} />}
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-between h-14">
                        <span className="font-bold ">
                          ENDED
                        </span>
                        <span>
                          {option.equbEnded ? <HiSignal color='green' size={20} /> : <HiSignal color='red' size={20} />}
                        </span>
                      </div>

                      <Link href="/equb/[equbaddress]" as={`/equb/${option.equbAddress}`}
                        className=" w-2/12 p-2 flex justify-center"
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