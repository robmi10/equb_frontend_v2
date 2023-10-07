import { useEthers } from "@usedapp/core";
import React from "react";
import { createContext, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export const EqubContext = createContext();

const EqubProvider = ({ children }) => {
  const { account } = useEthers();
  const [address, setAddress] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const [createEqubStatus, setCreateEqubStatus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [toastNotification, setToastNotifcation] = useState(false);
  const [ownerEqubAddress, setOwnerEqubAddress] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {}, [openModal, modalContent, toastNotification]);

  //Fetch all equbs from owner

  useEffect(() => {
    if (account && !ownerEqubAddress) {
      console.log("run getOwnerEqbus");
      getOwnerEqbus(account);
    }
  }, [account, ownerEqubAddress]);

  const getOwnerEqbus = async () => {
    try {
      await fetch("api/fetchOwnerEqubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerAddress: account,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          const { data } = result.data;
          console.log({ resultCheckNow: data?.equbCreateds });
          setOwnerEqubAddress(data?.equbCreateds);

          console.log({ ownerEqubAddress });
        });
    } catch (error) {
      console.error({ error });
    }
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
