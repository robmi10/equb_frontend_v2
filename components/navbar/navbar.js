import React, { useContext } from 'react';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

import Link from 'next/link';
import { useEthers } from '@usedapp/core';
import { EqubContext } from '../context/context';

const Navbar = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const { modal, setModal } = useContext(EqubContext);

  return (
    <>
      <div className="hidden md:flex w-3/4 justify-between pl-10 flex h-16 border-black items-center ">
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
      {!modal && <RxHamburgerMenu size={30} className='absolute top-4 md:hidden right-4' onClick={() => {
        setModal(true)
      }} />
      }
      {modal && <div className="flex md:hidden flex-col w-full justify-between p-20 flex h-full border-black justify-center items-center fixed bg-white">
        <IoIosClose size={30} className='absolute top-4 right-4' onClick={() => {
          setModal(false)
        }} />
        <Link className="w-44 justify-center flex text-xl font-medium" href="/" onClick={() => {
          setModal(false)
        }}>
          <HiMiniUserGroup />
        </Link>
        <Link className="w-44 justify-center flex text-xl font-medium" href="/exploreEqubs" onClick={() => {
          setModal(false)
        }}>
          EXPLORE EQUBS
        </Link>
        <Link className="w-44 justify-center flex text-xl font-medium" href="/myEqubs" onClick={() => {
          setModal(false)
        }}>
          MY EQUBS
        </Link>
        <Link className="w-44 justify-center flex text-xl font-medium" href="/createEqub" onClick={() => {
          setModal(false)
        }}>
          ADMIN
        </Link>

        {!account ? (
          <button className="w-44 justify-center flex text-xl font-medium" onClick={activateBrowserWallet}>
            CONNECT
          </button>
        ) : (
          <button className="w-44 justify-center flex text-xl font-medium" onClick={deactivate}>
            {account?.toString()?.substr(0, 10)}
          </button>
        )}
      </div>}
    </>

  );
};

export default Navbar;
