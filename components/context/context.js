import React from "react";
import { createContext, useState, useEffect } from "react";

export const EqubContext = createContext();

const EqubProvider = ({ children }) => {
  const [address, setAddress] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    console.log("openModal change", openModal);
    console.log("modalContent change", modalContent);
  }, [openModal, modalContent]);

  return (
    <EqubContext.Provider
      value={{
        address,
        setAddress,
        openModal,
        setOpenModal,
        modalContent,
        setModalContent,
      }}
    >
      {children}
      {openModal && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center">
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
