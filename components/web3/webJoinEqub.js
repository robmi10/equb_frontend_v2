import { useContext, useEffect } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import equbInfo from "../../ABI_ADDRESS/Equb/EqubABI.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";

const WebJoinEqub = (EQUB_ADDRES, refetch) => {
  const { address, setLoader, setOpenModal, setToastNotifcation } =
    useContext(EqubContext);

  console.log({ EQUB_ADDRES })
  const equbFactoryInterface = new ethers.utils.Interface(equbInfo);

  const equbAddressContract = new Contract(EQUB_ADDRES, equbFactoryInterface);

  const {
    state: joinEqubStatus,
    send: joinEqubExecute,
  } = useContractFunction(equbAddressContract, "joinEqub");

  useEffect(() => {
    if (joinEqubStatus.status === "Mining") {
      setLoader(true);
    }
    if (joinEqubStatus.status === "Error") {
      setLoader(true);
      setToastNotifcation({ title: "Error", desc: `${address} got error joining equb`, status: "error" });
    }
    if (joinEqubStatus.status === "Success") {
      setLoader(false);
      setOpenModal(false);
      setToastNotifcation({ title: "Equb", desc: `${address} joined equb`, status: "success" });
      refetch()
    }
  });

  const useJoinEqub = async (amountInEther) => {
    joinEqubExecute({ value: amountInEther });
  };
  return { useJoinEqub };
};
export default WebJoinEqub;
