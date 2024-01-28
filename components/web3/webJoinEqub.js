import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import equbInfo from "../../ABI_ADDRESS/Equb/EqubABI.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";
import handleMsgError from "../helper/errorMsg";

const WebJoinEqub = (EQUB_ADDRES, refetch) => {
  const { address, setLoader, setOpenModal, setToastNotifcation } =
    useContext(EqubContext);

  const equbFactoryInterface = new ethers.utils.Interface(equbInfo);

  const equbAddressContract = new Contract(EQUB_ADDRES, equbFactoryInterface);

  const {
    state: joinEqubStatus,
    send: joinEqubExecute,
    events: joinEqubEvents
  } = useContractFunction(equbAddressContract, "joinEqub");

  const doRefetch = async () => {
    try {
      for (const refetchFn of refetch) {
        await refetchFn();
      }
    } catch (error) {
      console.error("Error during refetch:", error);
    }
  };

  useEffect(() => {
    let errorCheck = joinEqubStatus?.errorHash?.data
    if (errorCheck) {
      console.log("errorCheck join cycle ->", errorCheck)
      const { name: decodedError } = equbFactoryInterface.parseError(errorCheck)
      const msgErr = handleMsgError(decodedError)
      console.log("check msgErr ->", msgErr)
      setToastNotifcation({ title: "Error", desc: `${msgErr}`, status: "error" });
      setOpenModal(false);
    }
    if (joinEqubStatus.status === "Mining") {
      setLoader(true);
    }
    if (joinEqubStatus.status === "Error") {
      let member = joinEqubEvents[0].args._member
      setLoader(true);
      setToastNotifcation({ title: "Error", desc: `${member} got error joining equb`, status: "error" });
    }
    if (joinEqubStatus.status === "Success") {
      let member = joinEqubEvents[0].args._member
      setLoader(false);
      setOpenModal(false);
      setToastNotifcation({ title: "Equb", desc: `${member?.toString()?.substr(0, 15)} joined equb`, status: "success" });
      doRefetch()
    }
  });

  const useJoinEqub = async (amountInEther) => {
    joinEqubExecute({ value: amountInEther });
  };
  return { useJoinEqub };
};
export default WebJoinEqub;
