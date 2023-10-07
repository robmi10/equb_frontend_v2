import React, { useContext, useEffect, useState } from "react";
import { EqubContext } from "../components/context/context";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineStatusOnline } from "react-icons/hi";

import WebCreateEqub from "../components/web3/webCreateEqub";
import BouncerLoader from "../components/animation/bouncer";
import Toast from "../components/Toast/toaster";
import WebStartEqub from "@/components/web3/webStartEqub";

const ModalContent = ({ setOpenModal, address }) => {
  const { useStartEqub } = WebStartEqub(address);
  const { loader,toastNotification } = useContext(EqubContext);

  const handleSubmit = () => {
    event.preventDefault();
    useStartEqub();
  };

  return (
    <div className="bg-white w-5/12 h-4/12 flex justify-center p-11 mt-4 rounded-md flex-col gap-4">
      <button onClick={() => setOpenModal(false)}>
        <AiOutlineClose />
      </button>
      <div>
        <div className="flex flex-col gap-1">
      <p >Do you want to start the equb with address</p>
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

const ModalContentChild = ({ setOpenModal }) => {
  const { loader } = useContext(EqubContext);
  const { useCreateEqubExecute } = WebCreateEqub();

  const [formInput, setformInput] = useState({
    totalMembers: "",
    length: "",
    collateral: "",
    amount: "",
    duration: "",
    durationType: "",
    subscriptionid: "",
  });

  const handleSubmit = () => {
    event.preventDefault();
    useCreateEqubExecute(formInput);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white w-3/4 h-3/4 flex justify-center p-12 mt-4 rounded-md flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-medium">CREATE EQUB</span>
        <button onClick={() => setOpenModal(false)}>
          <AiOutlineClose />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label
            htmlFor="members"
            className="block text-lg font-medium text-gray-700"
          >
            Total Members
          </label>
          <input
            type="number"
            id="members"
            name="members"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter total number of members"
            value={formInput.totalMembers}
            onChange={(e) => setformInput({ totalMembers: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="length"
            className="block text-lg font-medium text-gray-700"
          >
            Equb Length (in weeks)
          </label>
          <input
            type="number"
            id="length"
            name="length"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter the length of the equb (e.g., in weeks)"
            value={formInput.length}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="collateral"
            className="block text-lg font-medium text-gray-700"
          >
            Collateral Amount
          </label>
          <input
            type="number"
            id="collateral"
            name="collateral"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter the length of the equb (e.g., in days)"
            value={formInput.collateral}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-lg font-medium text-gray-700"
          >
            Contribution Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter the contribution amount for each member (e.g., in ETH)"
            value={formInput.amount}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-lg font-medium text-gray-700"
          >
            Duration of Each Period
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter duration for each period (e.g., in days-weeks-months)"
            value={formInput.duration}
            onChange={handleChange}
          />
          <select
            className="mt-2"
            id="durationType"
            name="durationType"
            onChange={handleChange}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="subscriptionid"
            className="block text-lg font-medium text-gray-700"
          >
            Subscription ID
          </label>
          <input
            type="number"
            id="subscriptionid"
            name="subscriptionid"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter the subscription ID"
            value={formInput.subscriptionid}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="border flex justify-center items-center border-black w-48 h-12 rounded-md hover:bg-slate-100"
        >
          {!loader ? "Create New Equb" : <BouncerLoader />}
        </button>
      </form>
    </div>
  );
};

const CreateEqub = () => {
  const { setOpenModal, ownerEqubAddress, toastNotification, setModalContent } =
    useContext(EqubContext);

  const showModal = () => {
    setOpenModal(true);
    setModalContent(<ModalContentChild setOpenModal={setOpenModal} />);
  };

  const handleStartClick = (address) => {
    setOpenModal(true);
    setModalContent(
      <ModalContent setOpenModal={setOpenModal} address={address} />
    );
  };

  useEffect(() => {
    console.log("Toast Notification Value: ", toastNotification);

    console.log({ ownerEqubAddress });
  }, [ownerEqubAddress]);
  if (!ownerEqubAddress) return false;

  return (
    <div className="h-screen w-full p-20">
      <div className="w-full h-full flex flex-col space-y-10 p-20">
        <span className=" text-4xl font-semibold"> Start Your Own Equb</span>
        <span className="text-2xl font-medium">
          Creating an equb is straightforward. Set your terms, invite members,
          and manage your savings collaboratively.
        </span>
        <button
          onClick={showModal}
          className=" border border-black w-2/12 p-5 rounded-md hover:bg-slate-100"
        >
          Create New Equb
        </button>

        <span className="text-2xl">Equbs Awaiting Activation</span>
        <div>
          {ownerEqubAddress.map((option, index) => {
            return (
              <div className="pt-5 pb-5 gap-8">
                <div key={index} className="w-full justify-between flex items-center">
                  <span>
                    <HiOutlineStatusOnline />
                  </span>
                  <span className="w-36">
                    {option.equbAddress?.toString()?.substr(0, 15)}
                  </span>
                  <span className="w-36">
                    {option.owner?.toString()?.substr(0, 15)}
                  </span>
                  <button
                    onClick={() => {
                      handleStartClick(option.equbAddress);
                    }}
                    className="border border-black rounded-md hover:bg-slate-100 w-2/12 p-2"
                  >
                    START EQUB
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {toastNotification && (
        <Toast
          title={"Equb created."}
          description={`New Equb is created.`}
          status={"success"}
          duration={4000}
          isClosable={true}
        />
      )}
    </div>
  );
};

export default CreateEqub;
