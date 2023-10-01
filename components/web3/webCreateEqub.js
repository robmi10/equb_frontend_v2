import { useContext, useEffect } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import equbFactoryInfo from "../../ABI_ADDRESS/EqubFactory/EqubFactoryABI.json";
import leaderInfo from "../../constants/Leader.json";
import { ethers } from "ethers";
import { EqubContext } from "../context/context";
import { Contract } from "@ethersproject/contracts";

const webCreateEqub = () => {
  const { address, setExecute, setOpenModal } = useContext(EqubContext);
  const { account } = useEthers();
  const equbFactoryAddress = EqubFactoryAddress;
  const equbFactoryInterface = new ethers.utils.Interface(equbFactoryInfo.abi);

  const equbFactoryAddressContract = new Contract(
    equbFactoryAddress,
    equbFactoryInterface
  );

  const {
    state: executeStatus,
    send: daoGovernanceExecute,
    events: executeEvents,
  } = useContractFunction(equbFactoryAddressContract, "execute");

  useEffect(() => {
    if (executeStatus.status === "Success") {
      setOpenModal("loading");
      setExecute({
        executeId: proposalId,
        executer: account,
      });
    }
  }, [executeStatus, address]);

  const useExecute = async (reason) => {
    let encodedCreatedLeader = new ethers.utils.Interface(leaderInfo.abi);
    let functionDataLeader = encodedCreatedLeader.encodeFunctionData(
      "createLeader",
      [leaderAddress]
    );
    const descriptionHash = ethers.utils.id(reason);
    daoGovernanceExecute(
      [leaderAddress],
      [0],
      [functionDataLeader],
      descriptionHash
    );
  };
  return { useExecute };
};
export default webCreateEqub;
