import React from 'react';
import { HiMiniUserGroup } from 'react-icons/hi2';

import Link from 'next/link';
import { useEthers } from '@usedapp/core';

const Navbar = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  return (
    <div className="w-3/4 justify-between pl-10 flex h-16 border-black items-center ">
      <Link className="w-32" href="/">
        <HiMiniUserGroup />
      </Link>
      <Link className="w-32" href="/exploreEqubs">
        EXPLORE EQUBS
      </Link>
      <Link className="w-32" href="/myEqubs">
        MY EQUBS
      </Link>
      <Link className="w-32" href="/createEqub">
        ADMIN
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
