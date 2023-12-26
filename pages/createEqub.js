import React, { useContext, useEffect, useState } from "react";
import { EqubContext } from "../components/context/context";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineStatusOnline } from "react-icons/hi";
import WebCreateEqub from "../components/web3/webCreateEqub";
import BouncerLoader from "../components/animation/bouncer";
import WebStartEqub from "@/components/web3/webStartEqub";
import { useEthers } from "@usedapp/core";
import { GET_MY_INACTIVATED_EQUBS } from "@/components/apollo";
import { useQuery } from "@apollo/client";

const ModalStartEqub = ({ setOpenModal, address, refetch }) => {
  const { useStartEqub } = WebStartEqub(address, refetch);
  const { loader } = useContext(EqubContext);

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      await useStartEqub();
      setToaster(true)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="bg-white w-5/12 h-4/12 flex justify-center p-11 mt-4 rounded-md flex-col gap-4">
      <button onClick={() => setOpenModal(false)}>
        <AiOutlineClose />
      </button>
      <div>
        <div className="flex flex-col gap-1">
          <p >Do you want to start the equb with address</p>
          <p className=" font-bold">{address.toString().substr(0, 14)}?</p>
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

const ModalCreateEqub = ({ setOpenModal, refetch }) => {
  const { loader } = useContext(EqubContext);

  const { useCreateEqubExecute } = WebCreateEqub(refetch);

  const defaultFormValues = {
    totalMembers: "",
    length: "",
    collateral: "",
    amount: "",
    duration: "",
    durationType: "minutes",
    subscriptionid: "",
    joinCycleDeadlineDuration: ""
  };

  const [formInput, setformInput] = useState({
    totalMembers: "",
    length: "",
    collateral: "",
    amount: "",
    duration: "",
    durationType: "minutes",
    subscriptionid: "",
    joinCycleDeadlineDuration: ""
  });

  const handleSubmit = () => {
    event.preventDefault();
    useCreateEqubExecute(formInput);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformInput((prevData) => ({
      ...defaultFormValues,
      ...prevData,
      [name]: value,
    }));
    console.log("formInput ->", formInput)
  };

  return (
    <div className="bg-white md:w-3/4 overflow-auto h-4/5 md:h-3/4 md:flex justify-center p-4 md:p-12 md:mt-4 rounded-md flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-medium">CREATE EQUB</span>
        <button onClick={() => setOpenModal(false)}>
          <AiOutlineClose />
        </button>
      </div>
      <form onSubmit={handleSubmit} >
        <div className="grid md:grid-cols-2 md:gap-4">
          <div className="mb-4 mt-4 md:mt-0">
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
              Equb Length (in weeks or minutes)
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
              placeholder="Enter the contribution amount for each member (e.g., in ETH)"
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
              placeholder="Enter duration for each period (e.g., in days-weeks)"
              value={formInput.duration}
              onChange={handleChange}
            />
            <select
              className="mt-2"
              id="durationType"
              name="durationType"
              defaultValue="minutes"
              onChange={handleChange}
            >
              <option value="minutes">Minutes</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="joinCycleDeadlineDuration"
              className="block text-lg font-medium text-gray-700"
            >
              Cycle Deadline (in days or minutes)
            </label>
            <input
              type="number"
              id="joinCycleDeadlineDuration"
              name="joinCycleDeadlineDuration"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter the length of the cycle deadline (e.g., in weeks)"
              value={formInput.joinCycleDeadlineDuration}
              onChange={handleChange}
            />
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

        </div>
        <button
          type="submit"
          className="border flex justify-center items-center border-black w-48 h-12 rounded-md hover:bg-slate-100 mt-4"
        >
          {!loader ? "Create New Equb" : <BouncerLoader />}
        </button>
      </form>
    </div>
  );
};

const CreateEqub = () => {
  const { setOpenModal, toastNotification, setModalContent } =
    useContext(EqubContext);
  const { account } = useEthers();

  const { data: myActiveEqubsQuery, loading: myActiveEqubsQueryLoading, error: myActiveEqubsQueryError, refetch } = useQuery(GET_MY_INACTIVATED_EQUBS, {
    variables: { owner: account, equbStarted: false },
  });

  if (myActiveEqubsQueryError) return <> <p> Error...</p></>

  console.log("inside create toastNotification ->", toastNotification)

  if (myActiveEqubsQueryLoading)
    return (
      <div className='h-screen flex justify-center items-center'>
        <BouncerLoader />
      </div>
    );

  const { equbs: myActiveEqubList } = myActiveEqubsQuery

  const handleCreateEqub = () => {
    setOpenModal(true);
    setModalContent(<ModalCreateEqub setOpenModal={setOpenModal} refetch={refetch} />);
  };

  const handleStartEqub = (address) => {
    setOpenModal(true);
    setModalContent(
      <ModalStartEqub setOpenModal={setOpenModal} address={address} refetch={refetch} />
    );
  };

  return (
    <div className="h-full w-full flex justify-center">
      <div className="md:w-3/4 h-full flex flex-col space-y-10 p-10">
        <span className="text-4xl font-bold md:text-5xl">Start Your Own Equb</span>
        <span className="font-medium text-2xl text-gray-400">
          Creating an equb is straightforward. Set your terms, invite members,
          and manage your savings collaboratively.
        </span>
        <button
          onClick={handleCreateEqub}
          className="border border-black md:w-4/12 p-5 rounded-md hover:bg-slate-100"
        >
          Create New Equb
        </button>

        {myActiveEqubList && <div>
          {myActiveEqubList.length > 0 && <span className="text-xl">Equbs Awaiting Activation</span>}

          {myActiveEqubList.map((option, index) => {
            return (
              <div className="pt-6 pb-12">
                {!option.equbStarted && <div key={index} className="w-full justify-between flex items-center border-b">
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
                      handleStartEqub(option.equbAddress);
                    }}
                    className="border bg-black text-white rounded-md w-2/12 p-2"
                  >
                    START EQUB
                  </button>
                </div>}
              </div>
            );
          })}
        </div>}
      </div>

    </div>
  );
};

export default CreateEqub;
