import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import equbInfo from "../../ABI_ADDRESS/Equb/EqubABI.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";
import handleMsgError from "../helper/errorMsg";

const WebJoinEqubCycle = (EQUB_ADDRES, refetch) => {
    const { address, setLoader, setOpenModal, setToastNotifcation } =
        useContext(EqubContext);

    console.log({ EQUB_ADDRES })
    const equbFactoryInterface = new ethers.utils.Interface(equbInfo);

    const equbAddressContract = new Contract(EQUB_ADDRES, equbFactoryInterface);

    const {
        state: joinEqubCycleStatus,
        send: joinEqubCycleExecute,
    } = useContractFunction(equbAddressContract, "joinEqubCycle");

    useEffect(() => {
        console.log("check joinEqubCycleStatus first ->", joinEqubCycleStatus)
        console.log("check errorHash ->", joinEqubCycleStatus)
        let errorCheck = joinEqubCycleStatus?.errorHash?.data
        console.log("errorCheck ->", errorCheck)
        if (errorCheck) {
            console.log("inside errorCheck here")
            const { name: decodedError } = equbFactoryInterface.parseError(errorCheck)
            console.log("decodedError ->", decodedError)
            const msgErr = handleMsgError(decodedError)
            console.log("msgErr ->", msgErr)
            setToastNotifcation({ title: "Error", desc: `${msgErr}`, status: "error" });
        }

        if (joinEqubCycleStatus.status === "Mining") {
            setLoader(true);
        }
        if (joinEqubCycleStatus.status === "Error") {
            setLoader(true);
            // const decodedError = equbFactoryInterface.parseError()
            // console.log(`Transaction failed: ${decodedError.name}`)

            console.log("check joinEqubCycleStatus second ->", joinEqubCycleStatus)

            setToastNotifcation({ title: "Error", desc: `${address} got error joining cycle`, status: "error" });
        }
        if (joinEqubCycleStatus.status === "Success") {
            setLoader(false);
            setOpenModal(false);
            setToastNotifcation({ title: "Cycle", desc: `${address} joined cycle`, status: "success" });
            refetch()
        }
    });

    const useJoinEqubCycle = async (amountInEther) => {
        joinEqubCycleExecute({ value: amountInEther });
    };
    return { useJoinEqubCycle };
};
export default WebJoinEqubCycle;
