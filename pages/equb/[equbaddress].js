import { EqubContext } from '@/components/context/context';
import React, { useContext } from 'react'

const ModalContent = ({ setOpenModal, address }) => {
  const { useJoinEqub } = WebJoinEqub(address);
  const { loader,toastNotification } = useContext(EqubContext);

  const handleSubmit = () => {
    event.preventDefault();
    // useJoinEqub();
  };

  return (
    <div className="bg-white w-5/12 h-4/12 flex justify-center p-11 mt-4 rounded-md flex-col gap-4">
      <button onClick={() => setOpenModal(false)}>
        <AiOutlineClose />
      </button>
      <div>
        <div className="flex flex-col gap-1">
      <p >Do you want to join the equb with address</p>
      <p className=" font-bold">{address.toString().substr(0,14)}?</p>
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
          description={`Equb with ${address.toString().substr(0,14)} started.`}
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

    const handleStartClick = (address) => {
      setOpenModal(true);
      setModalContent(
        <ModalContent setOpenModal={setOpenModal} address={address} />
      );
    };
  return (
    <div className="h-screen w-full p-10">
    <div className="w-full h-full flex flex-col space-y-10 p-10">
      <span className=" text-4xl font-semibold"> Equb Details</span>
      <span className="text-2xl font-medium">Equb [Name/ID] A dedicated space to view, manage, and discuss your Equb details</span>       
        <div className="gap-8 flex flex-row">
          <div className="border rounded-md p-4 w-1/2 gap-4 flex flex-col">
        {ownerEqubAddress?.length > 0 && <span className="text-2xl font-medium">Current Status</span>}
        {ownerEqubAddress &&  <div >
          {ownerEqubAddress.map((option, index) => {
            return (
              <div className="gap-8">
                {option.equbStarted && <div key={index}>
                <div className='w-full justify-between flex flex-col'> 
                <div className="flex  ">
                  <label className="w-36 font-bold  ">
                  Total Members
                  </label>
                  <span className="w-36 ">
                    {option.equbAddress?.toString()?.substr(0, 15)}
                  </span>
                </div>
                
                <div className="flex  ">
                  <label className="w-36 font-bold  ">
                  Next Contribution
                  </label>
                  <span className="w-36 ">
                    {option.owner?.toString()?.substr(0, 15)}
                  </span>
                </div>

                <div className="flex  ">
                  <label className="w-36 font-bold  ">
                  Current Cycle
                  </label>
                  <span className="w-36 ">
                    {option.totalMembers?.toString()?.substr(0, 15)}
                  </span>
                </div>

                <div className="flex  ">
                  <label className="w-36 font-bold  ">
                  Equb Status
                  </label>
                  <span className="w-36 ">
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
                  {ownerEqubAddress?.length > 0 && <span className="text-2xl font-medium">Financial Details</span>}
                  {ownerEqubAddress &&  <div>
          {ownerEqubAddress.map((option, index) => {
            return (
              <div className="gap-8">
                {option.equbStarted && <div key={index}>
                <div className='w-full justify-between flex flex-col'> 
                <div className="flex ">
                  <label className="w-36 font-bold  ">
                  Contribution
                  </label>
                  <span className="w-36 ">
                    {option.equbAddress?.toString()?.substr(0, 15)}
                  </span>
                </div>
                
                <div className="flex ">
                  <label className="w-36 font-bold  ">
                  Total Value
                  </label>
                  <span className="w-36 ">
                    {option.owner?.toString()?.substr(0, 15)}
                  </span>
                </div>

                <div className="flex ">
                  <label className="w-36 font-bold  ">
                  Next Payout Estimate
                  </label>
                  <span className="w-36 ">
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

        <div className="border rounded-md p-4 w-full mb-8 flex flex-col gap-4">
        {ownerEqubAddress?.length > 0 && <span className="text-2xl font-medium">Cycle Status</span>}
        {ownerEqubAddress &&  <div >
          {ownerEqubAddress.map((option, index) => {
            return (
              <div className="gap-8">
                {option.equbStarted && <div key={index}>
                <div className='w-full justify-between flex items-center'> 

                  <div className="gap-2 flex flex-col">
                  <label className="w-42 font-bold  ">
                  Current Cycle Number
                  </label>
                  <span>
                    {option.equbAddress?.toString()?.substr(0, 15)}
                  </span>
                    </div>
                  <div className="gap-2 flex flex-col">
                  <label className="font-bold  ">
                  Cycle Start Date
                  </label>
                  <span>
                    {option.equbAddress?.toString()?.substr(0, 15)}
                  </span>
                  </div>
                  
                  <div className="gap-2 flex flex-col">
                  <label className="font-bold  ">
                  Cycle End Date
                  </label>
                  <span >
                    {option.equbAddress?.toString()?.substr(0, 15)}
                  </span>
                    </div>

                    <div className="gap-2 flex flex-col">
                  <label className="font-bold  ">
                  Contributions Received
                  </label>
                  <span >
                    {option.equbAddress?.toString()?.substr(0, 15)}
                  </span>
                    </div>

                    <div className="gap-2 flex flex-col">
                  <label className="font-bold">
                  Members Yet to Contribute
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
          <div className="w-full flex pt-2 justify-start">
           <button className="border pt-2 border-black rounded-md hover:bg-slate-100 w-2/12 p-2 flex justify-center"
                  onClick={ () => {handleStartClick(option.equbAddress)}}
                 >
                    JOIN CYCLE
                  </button>
                  </div>
        </div>}
        </div>

                      

        <div className="border rounded-md p-4 w-full flex flex-col gap-4">
        {ownerEqubAddress?.length > 0 && <span className="text-2xl font-medium">Members' List</span>}
        {ownerEqubAddress &&  <div >
          {ownerEqubAddress.map((option, index) => {
            return (
              <div className="gap-8">
                {option.equbStarted && <div key={index}>
                <div className='w-full justify-between flex items-center'> 
                  
                <div className="gap-2 flex flex-col">
                  <label className="w-42 font-bold  ">
                  Member Address
                  </label>
                  <span>
                    {option.equbAddress?.toString()?.substr(0, 15)}
                  </span>
                    </div>
                  <div className="gap-2 flex flex-col">
                  <label className="font-bold  ">
                  Contribution Status
                  </label>
                  <span>
                    {option.equbAddress?.toString()?.substr(0, 15)}
                  </span>
                  </div>
                  
                  <div className="gap-2 flex flex-col">
                  <label className="font-bold  ">
                  Total Contributions Made
                  </label>
                  <span >
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