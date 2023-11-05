import { useEthers } from "@usedapp/core";
import React from "react";
import { createContext, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export const EqubContext = createContext();

const EqubProvider = ({ children }) => {
  const [address, setAddress] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const [createEqubStatus, setCreateEqubStatus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [toastNotification, setToastNotifcation] = useState(false);
  const [ownerEqubAddress, setOwnerEqubAddress] = useState(false);
  const [allEqubs, setAllEqubs] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const modalClass = twMerge(
    "w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300",
    openModal ? "opacity-100" : "opacity-0"
  );

  return (
    <EqubContext.Provider
      value={{
        address,
        setAddress,
        openModal,
        setOpenModal,
        modalContent,
        setModalContent,
        createEqubStatus,
        setCreateEqubStatus,
        loader,
        setLoader,
        toastNotification,
        setToastNotifcation,
        ownerEqubAddress,
        setOwnerEqubAddress,
        allEqubs, setAllEqubs
      }}
    >
      {children}
      {openModal && (
        <div className={modalClass}>
          <button
            onClick={closeModal}
            className="transition ease-in-out delay-150 absolute top-2 right-2 text-xl bg-slate-300"
          ></button>
          {modalContent}
        </div>
      )}
    </EqubContext.Provider>
  );
};

export default EqubProvider;
