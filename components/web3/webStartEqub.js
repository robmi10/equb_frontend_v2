import { useContext, useEffect } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import equbInfo from "../../ABI_ADDRESS/Equb/EqubABI.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";

const WebStartEqub = (EQUB_ADDRES, refetch) => {
  const { setLoader, setOpenModal, setToastNotifcation, toastNotification } =
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
    }
    if (startEqubStatus.status === "Error" && !toastNotification) {
      setToastNotifcation({ title: "Equb", desc: "Equb started", status: "error" });
    }
    if (startEqubStatus.status === "Success" && !toastNotification) {
      setLoader(false);
      setOpenModal(false);
      setToastNotifcation({ title: "Equb", desc: "Equb started", status: "success" });
      console.log("toastNotification -> ", toastNotification)
      refetch();
    }
  });

  const useStartEqub = async () => {
    startEqubExecute();
  };
  return { useStartEqub };
};
export default WebStartEqub;
