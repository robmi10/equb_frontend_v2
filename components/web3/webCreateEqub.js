import { useContext, useEffect } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import equbFactoryInfo from "../../ABI_ADDRESS/EqubFactory/EqubFactoryABI.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";
import { EQUB_FACTORY_ADDRESS } from "../../ABI_ADDRESS/address";
import Web3 from "web3";

const webCreateEqub = () => {
  const { address, setLoader, setOpenModal, setToastNotifcation } =
    useContext(EqubContext);
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
    if (createEqubStatus.status === "Mining") {
      setLoader(true);
      console.log("inside MINING");
    }
    if (createEqubStatus.status === "Success") {
      setLoader(false);
      setOpenModal(false);
      setToastNotifcation(true);
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
    } = formInput;

    let _collateral = Web3.utils.toWei(collateral, "ether");
    let _amount = Web3.utils.toWei(amount, "ether");

    let startDate = new Date(); // Current date
    let endDate = new Date(startDate);
    let timestamp = Math.floor(endDate.getTime() / 1000);
    console.log({ _collateral });
    console.log({ endDate });
    console.log({ timestamp });

    let vrfcoordinator = "0x7a1bac17ccc5b313516c5e16fb24f7659aa5ebed";
    let keyhash =
      "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f";

    console.log({ vrfcoordinator });
    console.log({ keyhash });

    switch (durationType) {
      case "days":
        endDate.setDate(startDate.getDate() + parseInt(duration));
        break;
      case "weeks":
        endDate.setDate(startDate.getDate() + 7 * parseInt(duration));
        break;
      case "months":
        endDate.setMonth(startDate.getMonth() + parseInt(duration));
        break;
      default:
        console.error("Invalid duration type");
        break;
    }

    createEqubExecute(
      totalMembers,
      length,
      _collateral,
      _amount,
      timestamp,
      vrfcoordinator,
      keyhash,
      subscriptionid
    );
  };
  return { useCreateEqubExecute };
};
export default webCreateEqub;
