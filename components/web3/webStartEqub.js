import { useContext, useEffect } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import equbInfo from "../../ABI_ADDRESS/Equb/EqubABI.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";

const WebStartEqub = (EQUB_ADDRES) => {
  const { address, setLoader, setOpenModal, setToastNotifcation } =
    useContext(EqubContext);

  const equbFactoryInterface = new ethers.utils.Interface(equbInfo);

  const equbAddressContract = new Contract(EQUB_ADDRES, equbFactoryInterface);

  const {
    state: startEqubStatus,
    send: startEqubExecute,
    events: startEqubEvents,
  } = useContractFunction(equbAddressContract, "startEqub");

  useEffect(() => {
    if (startEqubStatus.status === "Mining") {
      setLoader(true);
      console.log("inside MINING");
    }
    if (startEqubStatus.status === "Success") {
      setLoader(false);
      setOpenModal(false);
      setToastNotifcation(true);
      console.log("inside SUCCESS");
    }
  });

  const useStartEqub = async () => {
    startEqubExecute();
  };
  return { useStartEqub };
};
export default WebStartEqub;
