import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import equbInfo from "../../ABI_ADDRESS/Equb/EqubABI.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";
import handleMsgError from "../helper/errorMsg";

const WebEndEqub = (EQUB_ADDRES, refetch) => {
    const { address, setLoader, setOpenModal, setToastNotifcation } =
        useContext(EqubContext);

    console.log({ EQUB_ADDRES })
    const equbFactoryInterface = new ethers.utils.Interface(equbInfo);

    const equbAddressContract = new Contract(EQUB_ADDRES, equbFactoryInterface);

    const {
        state: endEqubStatus,
        send: endEqubExecute,
    } = useContractFunction(equbAddressContract, "endEqub");

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
        console.log("check endEqubStatus first ->", endEqubStatus)
        console.log("check errorHash ->", endEqubStatus)
        let errorCheck = endEqubStatus?.errorHash?.data
        console.log("errorCheck ->", errorCheck)
        if (errorCheck) {
            console.log("inside errorCheck here")
            const { name: decodedError } = equbFactoryInterface.parseError(errorCheck)
            console.log("decodedError ->", decodedError)
            const msgErr = handleMsgError(decodedError)
            console.log("msgErr ->", msgErr)
            setToastNotifcation({ title: "Error", desc: `${msgErr}`, status: "error" });
            setOpenModal(false);
        }

        if (endEqubStatus.status === "Mining") {
            setLoader(true);
        }
        if (endEqubStatus.status === "Error") {
            setLoader(true);
            setToastNotifcation({ title: "Error", desc: `${address} got error joining cycle`, status: "error" });
        }
        if (endEqubStatus.status === "Success") {
            setLoader(false);
            setOpenModal(false);
            setToastNotifcation({ title: "Equb", desc: `${address} joined cycle`, status: "success" });
            doRefetch()
        }
    });

    const useEndEqub = async () => {
        endEqubExecute();
    };
    return { useEndEqub };
};
export default WebEndEqub;
