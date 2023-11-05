import { EqubContext } from '@/components/context/context';
import React, { useContext, useState } from 'react';
import WebJoinEqub from '@/components/web3/webJoinEqub';
import { AiOutlineClose, AiOutlineArrowRight } from 'react-icons/ai';
import { ethers } from 'ethers';
import BouncerLoader from '@/components/animation/bouncer';
import { useQuery } from '@apollo/client';
import { GET_ALL_EXPLORE_EQUBS } from '@/components/apollo';
import { Toast } from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

const ModalContent = ({ setOpenModal, props, refetch }) => {
  const { collateralAmount, equbAddress } = props;
  const { useJoinEqub } = WebJoinEqub(equbAddress, refetch);
  const { loader } = useContext(EqubContext);

  const handleSubmit = () => {
    event.preventDefault();
    useJoinEqub(collateralAmount);
  };

  return (
    <div className="bg-white w-5/12 h-4/12 flex justify-center p-11 mt-4 rounded-md flex-col gap-4">
      <button onClick={() => setOpenModal(false)}>
        <AiOutlineClose />
      </button>
      <div>
        <div className="flex flex-col gap-1">
          <p>Do you want to join the equb with address</p>
          <p className=" font-bold">{equbAddress.toString().substr(0, 14)}?</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="border flex justify-center items-center border-black w-48 h-12 rounded-md hover:bg-slate-100"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          CANCEL
        </button>
        <button
          className="border flex justify-center items-center border-black w-48 h-12 rounded-md hover:bg-slate-100"
          onClick={() => {
            handleSubmit();
          }}
        >
          {' '}
          {!loader ? 'Confirm' : <BouncerLoader />}
        </button>
      </div>
    </div>
  );
};

const ExploreEqubs = () => {
  const { setOpenModal, toastNotification, setModalContent } =
    useContext(EqubContext);
  const { account } = useEthers();

  const { data, loading, error, refetch } = useQuery(GET_ALL_EXPLORE_EQUBS, {
    variables: { member: account }
  });

  const [searchFilter, setSearchFilter] = useState('');
  if (loading)
    return (
      <div className='h-screen flex justify-center items-center'>
        <BouncerLoader />
      </div>
    );
  if (!data) return false;
  const { equbs } = data;
  console.log('apollo data -> ', data);
  const searchList = equbs.filter(
    (option) =>
      option.totalMembers.includes(searchFilter) ||
      option.equbAddress.includes(searchFilter) ||
      option.owner.includes(searchFilter),
  );

  const handleStartClick = (option) => {
    setOpenModal(true);
    setModalContent(
      <ModalContent setOpenModal={setOpenModal} props={option} refetch={refetch} />,
    );
  };

  const handleFilter = (e) => {
    setSearchFilter(e.target.value);
  };

  const getDate = (timeStamp) => {
    const unixTimestamp = timeStamp;
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-3/4 h-full flex flex-col space-y-10 p-10 ">
        <div className="flex flex-col space-y-5 w-3/4  mb-12 ">
          <span className="font-bold text-4xl">Explore Equbs</span>
          <span className="font-medium text-3xl">
            Discover various Equbs tailored to different preferences and needs.
          </span>
          <span className=" font-medium text-2xl text-gray-400">
            Whether you're looking for a small group, large pools, short cycles,
            or specific themes, you'll find an Equb that fits.
          </span>
        </div>
        {searchList.length > 0 && (
          <span className="font-medium text-lg">Search Different Equbs</span>
        )}

        <input
          type="text"
          id="members"
          name="members"
          className="p-2 w-full border rounded-md"
          placeholder="Enter Equb name, owner, or keyword..."
          value={searchFilter}
          onChange={handleFilter}
        />

        {searchList && (
          <div>
            {searchList.map((option, index) => {
              return (
                <div className="gap-8">
                  {option.equbStarted && (
                    <div key={index}>
                      <div className="w-full justify-between flex items-center border p-5 rounded-md">
                        <div className="flex flex-col gap-2">
                          <span className="w-36 font-bold  ">Equb Address</span>

                          <span className="w-36 ">
                            {option.equbAddress?.toString()?.substr(0, 15)}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <span className="w-36 font-bold  ">
                            Total Members
                          </span>
                          <span>
                            {option.totalMembers?.toString()?.substr(0, 15)}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <span className="w-36 font-bold  ">Equb Length</span>
                          <span >
                            {getDate(
                              option.durationOfEachPeriod,
                              option.totalMembers,
                            )}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <span className="w-42 font-bold  ">
                            Contribution Amount
                          </span>
                          <div>
                            <span>
                              {ethers.utils.formatUnits(
                                option.contributionAmount,
                                'ether',
                              )}
                            </span>
                            MATIC
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <span className="w-36 font-bold  ">
                            Collateral Amount
                          </span>
                          <div>
                            <span className="w-36 ">
                              {ethers.utils.formatUnits(
                                option.collateralAmount,
                                'ether',
                              )}
                            </span>
                            MATIC
                          </div>
                        </div>

                      </div>
                      <div class="flex justify-end">
                        <button
                          className="border-b flex items-center gap-4 border-black hover:bg-slate-50 w-2/12 p-2 mb-8 justify-center"
                          onClick={() => {
                            handleStartClick(option);
                          }}
                        >
                          <p>JOIN EQUB</p>
                          <AiOutlineArrowRight />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {toastNotification && (
        <Toast
          title={toastNotification.title}
          description={toastNotification.desc}
          status={toastNotification.status}
          duration={4000}
          isClosable={true}
        />
      )}
    </div>
  );
};

export default ExploreEqubs;
