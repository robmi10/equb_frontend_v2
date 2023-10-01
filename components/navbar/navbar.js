import React, { useContext } from "react";
import { BiSolidUser } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import { EqubContext } from "../context/context";
import { useEthers } from "@usedapp/core";

const Navbar = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  return (
    <div className="w-screen  justify-around flex h-16 border-b border-black items-center">
      <Link className="w-32" href="/">
        <AiFillHome />
      </Link>
      <Link className="w-32" href="/">
        Explore Equbs
      </Link>
      <Link className="w-32" href="/">
        My Equbs
      </Link>

      {!account ? (
        <button className="w-32" onClick={activateBrowserWallet}>
          CONNECT
        </button>
      ) : (
        <button className="w-32" onClick={deactivate}>
          {account?.toString()?.substr(0, 10)}
        </button>
      )}
    </div>
  );
};

export default Navbar;
