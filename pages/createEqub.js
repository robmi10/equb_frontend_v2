import React, { useContext } from "react";
import { EqubContext } from "../components/context/context";
import { AiOutlineClose } from "react-icons/ai";

const ModalContentChild = ({ setOpenModal }) => {
  return (
    <div className="bg-white w-3/4 h-3/4 flex justify-center p-12 mt-4 rounded-md flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-medium">CREATE EQUB</span>
        <button onClick={() => setOpenModal(false)}>
          <AiOutlineClose />
        </button>
      </div>
      <form className="grid grid-cols-2 gap-4">
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
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="length"
            className="block text-lg font-medium text-gray-700"
          >
            Equb Length
          </label>
          <input
            type="date"
            id="length"
            name="length"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter the length of the equb (e.g., in days)"
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
            type="week"
            id="duration"
            name="duration"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter duration for each period (e.g., in days)"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="vrfcoordinator"
            className="block text-lg font-medium text-gray-700"
          >
            VRF Coordinator Address
          </label>
          <input
            type="text"
            id="vrfcoordinator"
            name="vrfcoordinator"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter the VRF Coordinator's Ethereum address"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="keyhash"
            className="block text-lg font-medium text-gray-700"
          >
            Key Hash
          </label>
          <input
            type="text"
            id="keyhash"
            name="keyhash"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter the key hash"
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
          />
        </div>

        <button className="border border-black w-24 h-12 p-2 rounded-md hover:bg-slate-100">
          Submit
        </button>
      </form>
    </div>
  );
};

const CreateEqub = () => {
  const { openModal, setOpenModal, modalContent, setModalContent } =
    useContext(EqubContext);

  const showModal = () => {
    setOpenModal(true);
    setModalContent(<ModalContentChild setOpenModal={setOpenModal} />);
  };

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
      </div>
    </div>
  );
};

export default CreateEqub;
