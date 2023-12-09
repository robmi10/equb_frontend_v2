import { useContext, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import equbInfo from "../../ABI_ADDRESS/Equb/EqubABI.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";
import handleMsgError from "../helper/errorMsg";

const WebContributeEqub = (EQUB_ADDRES, refetch) => {
    const { setLoader, setOpenModal, setToastNotifcation } =
        useContext(EqubContext);


    console.log({ EQUB_ADDRES })
    const equbFactoryInterface = new ethers.utils.Interface(equbInfo);

    const equbAddressContract = new Contract(EQUB_ADDRES, equbFactoryInterface);

    const {
        state: contributeEqubStatus,
        send: contributeEqubExecute,
    } = useContractFunction(equbAddressContract, "contribute");

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
        let errorCheck = contributeEqubStatus?.errorHash?.data
        if (errorCheck) {
            console.log("inside errorCheck here")
            const { name: decodedError } = equbFactoryInterface.parseError(errorCheck)
            console.log("decodedError ->", decodedError)
            const msgErr = handleMsgError(decodedError)
            console.log("msgErr ->", msgErr)
            setToastNotifcation({ title: "Error", desc: `${msgErr}`, status: "error" });
            setOpenModal(false);
        }
        if (contributeEqubStatus.status === "Mining") {
            setLoader(true);
        }
        if (contributeEqubStatus.status === "Error") {
            setLoader(true);
            setToastNotifcation({ title: "Error", desc: `got error joining equb`, status: "error" });
        }
        if (contributeEqubStatus.status === "Success") {
            setLoader(false);
            setOpenModal(false);
            setToastNotifcation({ title: "Equb", desc: `contributed to cycle`, status: "success" });
            doRefetch()
        }
    });

    const useContributeEqub = async (amountInEther) => {
        contributeEqubExecute({ value: amountInEther });
    };
    return { useContributeEqub };
};
export default WebContributeEqub;
