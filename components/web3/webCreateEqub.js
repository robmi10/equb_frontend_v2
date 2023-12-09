import { useContext, useEffect } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import equbFactoryInfo from "../../ABI_ADDRESS/EqubFactory/EqubFactoryABI.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";
import { EQUB_FACTORY_ADDRESS } from "../../ABI_ADDRESS/address";
import Web3 from "web3";

const WebCreateEqub = (refetch) => {
  const { loader, setLoader, setOpenModal, setToastNotifcation, toastNotification } =
    useContext(EqubContext);
  const { account } = useEthers();
  const equbFactoryInterface = new ethers.utils.Interface(equbFactoryInfo);


  const equbFactoryAddressContract = new Contract(
    EQUB_FACTORY_ADDRESS,
    equbFactoryInterface
  );

  const {
    state: createEqubStatus,
    send: createEqubExecute,
    events: createEqubEvents,
  } = useContractFunction(equbFactoryAddressContract, "createEqub");

  useEffect(() => {
    if (createEqubStatus.status === "Mining" && !loader) {
      setLoader(true);
      console.log("inside MINING");
    }
    if (createEqubStatus.status === "Error" && !toastNotification) {
      setToastNotifcation({ title: "Equb", desc: "Equb created", status: "error" });
    }
    if (createEqubStatus.status === "Success" && !toastNotification) {
      let hexNumber = createEqubEvents[0].args[8]
      let firstNumber = createEqubEvents[0].args[8].toString()
      let number = createEqubEvents[0].args[8].toNumber()


      console.log("createEqubEvents[0].args ->", createEqubEvents[0].args)
      console.log("hexNumber ->", hexNumber)
      console.log("firstNumber ->", firstNumber)
      console.log("number ->", number)


      console.log("createEqubEvents -> ", createEqubEvents)
      setLoader(false);
      setOpenModal(false);
      setToastNotifcation({ title: "Equb", desc: "Equb created", status: "success" });
      console.log(" toastNotification ->", toastNotification)
      refetch()
      console.log("inside SUCCESS");
    }
  });

  const useCreateEqubExecute = async (formInput) => {
    console.log({ formInput });
    const {
      totalMembers,
      length,
      collateral,
      amount,
      duration,
      durationType,
      subscriptionid,
      joinCycleDeadlineDuration
    } = formInput;

    console.log("durationType ->", durationType)
    console.log("length ->", length)
    console.log("duration", duration)
    console.log("joinCycleDeadlineDuration ->", joinCycleDeadlineDuration)

    const secondsPerMinute = 60; // 60 seconds
    const secondsPerDay = 86400; // 24 hours * 60 minutes * 60 seconds
    const secondsPerWeek = 604800; // 7 days * 24 hours * 60 minutes * 60 seconds
    let durationInSeconds;
    let equbEndTimestamp;
    let equbCycleDeadline;

    let _collateral = Web3.utils.toWei(collateral, "ether");
    let _amount = Web3.utils.toWei(amount, "ether");

    let vrfcoordinator = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed";
    let keyhash =
      "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f";
    // const equbEndTimestamp = Number(length) * secondsPerWeek
    // const equbCycleDeadline = Number(joinCycleDeadlineDuration) * secondsPerDay

    switch (durationType) {
      case "minutes":
        durationInSeconds = Number(duration) * secondsPerMinute;
        equbEndTimestamp = Number(length) * secondsPerMinute;
        equbCycleDeadline = Number(joinCycleDeadlineDuration) * secondsPerMinute;
        break;
      case "days":
        durationInSeconds = Number(duration) * secondsPerDay;
        equbEndTimestamp = Number(length) * secondsPerDay;
        equbCycleDeadline = Number(joinCycleDeadlineDuration) * secondsPerDay;
        break;
      case "weeks":
        durationInSeconds = Number(duration) * secondsPerWeek;
        equbEndTimestamp = Number(length) * secondsPerWeek;
        equbCycleDeadline = Number(joinCycleDeadlineDuration) * secondsPerWeek;
        break;
      default:
        console.error("Invalid duration type");
        break;
    }

    console.log({ length })
    console.log({ duration })
    console.log({ account })
    console.log({ secondsPerMinute })
    console.log({ durationInSeconds })
    console.log({ equbEndTimestamp })
    console.log({ equbCycleDeadline })
    console.log({ subscriptionid })
    createEqubExecute(
      totalMembers,
      equbEndTimestamp,
      _collateral,
      _amount,
      durationInSeconds,
      equbCycleDeadline,
      vrfcoordinator,
      keyhash,
      Number(subscriptionid),
      account
    );
  };
  return { useCreateEqubExecute };
};
export default WebCreateEqub;
