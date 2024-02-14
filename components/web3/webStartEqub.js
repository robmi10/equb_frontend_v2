import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
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
      let owner = startEqubEvents[0].args._owner
      setToastNotifcation({ title: "Equb", desc: `Equb has been started by ${owner?.toString()?.substr(0, 15)}`, status: "success" });
      refetch();
    }
  });

  const startEqub = async () => {
    startEqubExecute();
  };
  return { startEqub };
};
export default WebStartEqub;
