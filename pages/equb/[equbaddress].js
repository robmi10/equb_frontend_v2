import { GET_EQUBS_INFO } from '@/components/apollo';
import { EqubContext } from '@/components/context/context';
import WebJoinEqub from '@/components/web3/webJoinEqub';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const ModalContent = ({ setOpenModal, props }) => {
  const { collateralAmount, equbAddress } = props

  const { useJoinEqub } = WebJoinEqub(equbAddress);
  const { loader, toastNotification } = useContext(EqubContext);

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
      {toastNotification && (
        <Toast
          title={`Equb started.`}
          description={`Equb with ${address.toString().substr(0, 14)} started.`}
          status={"success"}
          duration={4000}
          isClosable={true}
        />
      )}
    </div>
  );
};

const Equb = () => {
  const { setOpenModal, ownerEqubAddress, toastNotification, setModalContent } =
    useContext(EqubContext);

  const router = useRouter();
  const EqubParam = router.query.equbaddress

  console.log("EqubParam ->", EqubParam)


  const { data: equbQuery, loading: equbQueryIsLoading, error: equbQueryError } = useQuery(GET_EQUBS_INFO, {
    variables: { equb: EqubParam },
  });

  if (equbQueryError) return <> <p> Error...</p></>

  if (equbQueryIsLoading) return <> <p> Loading...</p></>

  console.log("equbQuery -> ", equbQuery)
  const { equbs } = equbQuery

  const handleStartClick = (option) => {
    console.log("option ->", option)
    setOpenModal(true);
    setModalContent(
      <ModalContent setOpenModal={setOpenModal} props={option} />
    );
  };
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="w-3/4 h-full flex flex-col space-y-10 p-10">
        <span className=" text-4xl font-semibold"> Equb Details</span>
        <span className="text-3xl font-medium">Equb [Name/ID] A dedicated space to view, manage, and discuss your Equb details</span>
        <div className="gap-8 flex flex-row">
          <div className="border rounded-md p-4 w-1/2 gap-4 flex flex-col">
            {equbs?.length > 0 && <span className="text-2xl font-medium">Status</span>}
            {equbs && <div >
              {equbs.map((option, index) => {
                return (
                  <div className="gap-8">
                    {option.equbStarted && <div key={index}>
                      <div className='w-full justify-between flex flex-col gap-4'>
                        <div className="flex border p-2 justify-between">
                          <label className="font-bold">
                            Total Members
                          </label>
                          <span>
                            {option.equbAddress?.toString()?.substr(0, 15)}
                          </span>
                        </div>

                        <div className="flex border p-2 justify-between ">
                          <label className="font-bold  ">
                            Next Contribution
                          </label>
                          <span>
                            {option.owner?.toString()?.substr(0, 15)}
                          </span>
                        </div>

                        <div className="flex border p-2 justify-between">
                          <label className="font-bold">
                            Current Cycle
                          </label>
                          <span >
                            {option.totalMembers?.toString()?.substr(0, 15)}
                          </span>
                        </div>

                        <div className="flex border p-2 justify-between">
                          <label className="font-bold  ">
                            Equb Status
                          </label>
                          <span >
                            {option.equbStarted?.toString()?.substr(0, 15)}
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
            {equbs?.length > 0 && <span className="text-2xl font-medium">Financial Details</span>}
            {equbs && <div>
              {equbs.map((option, index) => {
                return (
                  <div className="gap-8">
                    {option.equbStarted && <div key={index}>
                      <div className='w-full justify-between flex flex-col gap-4'>
                        <div className="flex border p-2 justify-between">
                          <label className=" font-bold  ">
                            Contribution
                          </label>
                          <span>
                            {option.equbAddress?.toString()?.substr(0, 15)}
                          </span>
                        </div>

                        <div className="flex border p-2 justify-between">
                          <label className=" font-bold  ">
                            Total Value
                          </label>
                          <span>
                            {option.owner?.toString()?.substr(0, 15)}
                          </span>
                        </div>

                        <div className="flex border p-2 justify-between">
                          <label className=" font-bold  ">
                            Next Payout Estimate
                          </label>
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
            {equbs && <div >
              {equbs.map((option, index) => {
                return (
                  <div className="gap-8">
                    {option.equbStarted && <div key={index}>
                      <div className='w-full justify-between flex items-center'>
                        <div className="gap-2 flex flex-col">
                          <label className="font-bold  ">
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
                    {option.equbStarted && <div key={index}>
                      <div className='w-full justify-between flex items-center border p-4'>

                        <div className="gap-2 flex flex-col">
                          <label className="w-42 font-bold  ">
                            MEMBER
                          </label>
                          <span>
                            {option.equbAddress?.toString()?.substr(0, 15)}
                          </span>
                        </div>
                        <div className="gap-2 flex flex-col">
                          <label className="font-bold  ">
                            CONTRIBUTED
                          </label>
                          <span>
                            {option.equbAddress?.toString()?.substr(0, 15)}
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

                        <div className="gap-2 flex flex-col">
                          <label className="font-bold">
                            Eliminated
                          </label>
                          <span >
                            {option.equbAddress?.toString()?.substr(0, 15)}
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
  )
}

export default Equb