import React, { useContext } from "react";
import { EqubContext } from "../context/context";

const Modal = ({ children }) => {
  const { openModal, setOpenModal } = useContext(EqubContext);
  if (!openModal) {
    return null;
  }
  return <div className="w-screen bg-black h-screen blur-lg"> {children}</div>;
};
export default Modal;
