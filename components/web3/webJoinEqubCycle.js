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
    const equbFactoryInterface = new ethers.utils.Interface(equbInfo);
    const equbAddressContract = new Contract(EQUB_ADDRES, equbFactoryInterface);

    const {
        state: joinEqubCycleStatus,
        send: joinEqubCycleExecute,
        events: joinEqubCycleEvents
    } = useContractFunction(equbAddressContract, "joinAndContributeCycle");

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
        let errorCheck = joinEqubCycleStatus?.errorHash?.data
        if (errorCheck) {
            const { name: decodedError } = equbFactoryInterface.parseError(errorCheck)
            const msgErr = handleMsgError(decodedError)
            setToastNotifcation({ title: "Error", desc: `${msgErr}`, status: "error" });
            setOpenModal(false);
        }

        if (joinEqubCycleStatus.status === "Mining") {
            setLoader(true);
        }
        if (joinEqubCycleStatus.status === "Error") {
            setLoader(true);
            setToastNotifcation({ title: "Error", desc: `${address} got error joining cycle`, status: "error" });
        }
        if (joinEqubCycleStatus.status === "Success") {
            let cycleIndex = joinEqubCycleEvents[0].args._cycleIndex
            let member = joinEqubCycleEvents[0].args._member

            setLoader(false);
            setOpenModal(false);
            setToastNotifcation({ title: "Cycle", desc: `${member?.toString()?.substr(0, 15)} joined ${cycleIndex}th-cycle`, status: "success" });
            doRefetch()
        }
    });

    const joinEqubCycle = async (amountInEther) => {
        joinEqubCycleExecute({ value: amountInEther });
    };
    return { joinEqubCycle };
};
export default WebJoinEqubCycle;
