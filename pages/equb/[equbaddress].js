import BouncerLoader from '@/components/animation/bouncer';
import { GET_EQUBS_INFO, GET_EQUB_DETAILS, GET_EQUB_FINANCIAL_DETAILS } from '@/components/apollo';
import { EqubContext } from '@/components/context/context';
import WebJoinEqub from '@/components/web3/webJoinEqub';
import { useQuery } from '@apollo/client';
import { Toast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { HiSignal } from 'react-icons/hi2';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { ethers } from 'ethers';
import WebJoinEqubCycle from '@/components/web3/webJoinEqubCycle';




const ModalContent = ({ setOpenModal, props, refetch }) => {
  const { collateralAmount, equbAddress } = props

  const { useJoinEqubCycle } = WebJoinEqubCycle(equbAddress, refetch);
  const { loader } = useContext(EqubContext);

  const handleSubmit = () => {
    event.preventDefault();
    useJoinEqubCycle(collateralAmount);
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
  const { setOpenModal, toastNotification, setModalContent } =
    useContext(EqubContext);

  const router = useRouter();
  const EqubParam = router.query.equbaddress

  console.log("EqubParam ->", EqubParam)


  const { data: equbQuery, loading: equbQueryIsLoading, error: equbQueryError, refetch: refetchEqubQuery } = useQuery(GET_EQUBS_INFO, {
    variables: { equb: EqubParam },
  });

  const { data: equbDetailsQuery, loading: equbQueryDetailsIsLoading, error: equbDetailsQueryError, refetch: refetchEqubDetailsQuery } = useQuery(GET_EQUB_DETAILS, {
    variables: { equb: EqubParam },
  });

  const { data: equbFinancialsQuery, loading: equbQueryFinancialsIsLoading, error: equbFinancialsQueryError, refetch: refetchEqubFinancialsQuery } = useQuery(GET_EQUB_FINANCIAL_DETAILS, {
    variables: { equb: EqubParam },
  });


  console.log("equbDetailsQueryError ->", equbDetailsQueryError)

  console.log("equbQuery -> ", equbQuery)

  console.log("equbQueryError ->", equbQueryError)

  if (equbQueryError) return <> <p> Error...</p></>




  if (equbQueryIsLoading || !equbQuery || !equbDetailsQuery || !equbFinancialsQuery)
    return (
      <div className='h-screen flex justify-center items-center'>
        <BouncerLoader />
      </div>
    );

  console.log({ equbDetailsQuery })

  const { equbs } = equbQuery
  const { equbs: equbsDetail } = equbDetailsQuery
  const { equbs: equbsFinancials } = equbFinancialsQuery

  console.log({ equbs })
  console.log({ equbsDetail })
  console.log({ equbsFinancials })

  const handleStartClick = (option) => {
    console.log("option ->", option)
    setOpenModal(true);
    setModalContent(
      <ModalContent setOpenModal={setOpenModal} props={option} refetch={refetchEqubQuery} />
    );
  };
  return (
    <>
      <div className="h-full   w-full flex justify-center">
        <div className="w-3/4 h-full flex flex-col space-y-10 p-10">
          <span className=" text-4xl font-semibold"> Equb Details</span>
          <span className="text-3xl font-medium">A dedicated space to view and manage your Equb details</span>
          <div className="gap-8 flex flex-row">
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
                              STATUS
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
              {equbsFinancials?.length > 0 && <span className="text-2xl font-medium">FINANCIAL DETAILS</span>}
              {<div>
                {equbsFinancials.map((option, index) => {
                  return (
                    <div className="gap-8">
                      {<div key={index}>
                        <div className='w-full justify-between flex flex-col gap-4'>
                          <div className="flex border p-2 justify-between">
                            <label className=" font-bold  ">
                              COLLATERAL
                            </label>
                            <span>
                              {ethers.utils.formatUnits(option.collateralAmount)} ETH
                            </span>
                          </div>

                          <div className="flex border p-2 justify-between">
                            <label className="font-bold text-md">
                              TVL
                            </label>
                            <span>
                              {option.contributions[option.currentWeekOrMonth]?.totalSum > 0 ? ethers.utils.formatUnits(option.contributions[option.currentWeekOrMonth]?.totalSum, 'ether') : 0}
                            </span>
                          </div>

                          <div className="flex border p-2 justify-between">
                            <label className="font-bold text-md">
                              NEXT CYCLE
                            </label>
                            {console.log("check option -> ", option)}
                            <span>
                              {option.totalMembers?.toString()?.substr(0, 15)}
                            </span>
                          </div>
                        </div>
                      </div>}
                    </div>
                  );
                })}
              </div>}
            </div>
          </div>

          <div>

            {equbs?.length > 0 && <span className="text-2xl font-medium">CYCLE</span>}
            <div className="border rounded-md p-4 w-full mb-8 flex flex-col gap-4 mt-4">
              {<div >
                {equbs.map((option, index) => {
                  return (
                    <div className="gap-8">
                      {<div key={index}>
                        <div className='w-full justify-between flex items-center'>
                          <div className="gap-2 flex flex-col">
                            <label className="font-bold">
                              LENGTH
                            </label>
                            <span>
                              {option.equbAddress?.toString()?.substr(0, 15)}
                            </span>
                          </div>
                          <div className="gap-2 flex flex-col">
                            <label className="font-bold  ">
                              CONTRIBUTIONS
                            </label>
                            <span >
                              {option.equbAddress?.toString()?.substr(0, 15)}
                            </span>
                          </div>

                          <div className="gap-2 flex flex-col">
                            <label className="font-bold">
                              TOTAL MEMBERS
                            </label>
                            <span >
                              {option.equbAddress?.toString()?.substr(0, 15)}
                            </span>
                          </div>

                          <div className="gap-2 flex flex-col">
                            <label className="font-bold">
                              STARTED
                            </label>
                            <span >
                              {option.equbAddress?.toString()?.substr(0, 15)}
                            </span>
                          </div>

                          <div className="flex pt-1 justify-start">
                            <button className="border pt-2 border-black hover:bg-slate-100 w-full p-2 flex justify-center"
                              onClick={() => { handleStartClick(option) }}
                            >
                              JOIN CYCLE
                            </button>
                          </div>
                        </div>
                      </div>}
                    </div>
                  );
                })}

              </div>}
            </div>

            {equbs?.length > 0 && <span className="text-2xl font-medium">MEMBER'S LIST</span>}
            <div className="border rounded-md p-4 w-full flex flex-col gap-4">
              {equbs && <div >
                {equbs.map((option, index) => {
                  return (
                    <div className="gap-8">
                      {<div key={index}>
                        <div className='w-full justify-between flex items-center border p-4'>

                          <div className="gap-2 flex flex-col">
                            <label className="w-42 font-bold">
                              MEMBER
                            </label>
                            <span>
                              {option.equbAddress?.toString()?.substr(0, 15)}
                            </span>
                          </div>
                          <div className="gap-2 flex flex-col">
                            <label className="font-bold">
                              CONTRIBUTED
                            </label>
                            <span className="w-full flex justify-center">
                              {option.equbEnded ? <AiFillCheckCircle color='green' size={20} /> : <AiFillCloseCircle color='red' size={20} />}
                            </span>
                          </div>

                          <div className="gap-2 flex flex-col">
                            <label className="font-bold  ">
                              Penalties
                            </label>
                            <span >
                              {option.equbAddress?.toString()?.substr(0, 15)}
                            </span>
                          </div>

                          <div className="gap-2 flex flex-col justify-between">
                            <label className="font-bold">
                              Eliminated
                            </label>
                            <span className="w-full flex justify-center">
                              {option.equbEnded ? <AiFillCheckCircle color='green' size={20} /> : <AiFillCloseCircle color='red' size={20} />}

                            </span>
                          </div>

                        </div>
                      </div>}
                    </div>
                  );
                })}
              </div>}
            </div>
          </div>
        </div>
      </div>
      {toastNotification && (
        <Toast
          title={toastNotification.title}
          description={toastNotification.desc}
          status={toastNotification.status}
          duration={4000}
          isClosable={true}
        />
      )}
    </>
  )
}

export default Equb