import { EqubContext } from '@/components/context/context';
import Link from 'next/link';
import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
import { GET_OWNER_EQUBS, GET_JOINED_EQUBS } from '@/components/apollo';
import { useEthers } from "@usedapp/core";
import { AiOutlineArrowRight } from 'react-icons/ai';

const MyEqubs = () => {
  const { allEqubs } =
    useContext(EqubContext)
  const { account } = useEthers();

  if (!account) return false
  console.log({ account })
  const { data: myEqubs, loading: myEqubsLoading, error: myEqubsError } = useQuery(GET_OWNER_EQUBS, {
    variables: { owner: account },
  });
  const { data: joinedEqubs, loading: joinedEqubsLoading, error: joinedEqubsError } = useQuery(GET_JOINED_EQUBS, {
    variables: { equb: account },
  });

  if (myEqubsError || joinedEqubsError) return <> <p> Error...</p></>

  if (joinedEqubsLoading || myEqubsLoading) return <> <p> Loading...</p></>

  const { equbs: myEqubList } = myEqubs
  const { equbs: joinedEqubList } = joinedEqubs

  console.log({ myEqubs })
  console.log({ joinedEqubList })
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="w-3/4 h-full flex flex-col space-y-5 p-10">
        <div className='flex flex-col space-y-5 w-3/4  mb-12'>

          <span className="font-bold text-4xl">MyEqub Dashboard</span>
          <span className="font-medium text-3xl">
            Welcome to your personal equb dashboard.</span>
          <span className="font-medium text-2xl text-gray-400">Here you can monitor and manage the equbs you own and see the ones you've joined.</span>
        </div>

        {myEqubList.length > 0 && <span className="text-xl">My Owned Equbs</span>}
        {myEqubList.length > 0 && <div className="border rounded-md p-4 flex flex-col gap-4">
          {myEqubList.map((option, index) => {
            return (
              <div>
                {option.equbStarted &&
                  <div key={index} >
                    <div className='w-full justify-between flex items-center p-4 border'>
                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Equb Address
                        </span>

                        <span className="w-36 ">
                          {option.equbAddress?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Owner
                        </span>
                        <span className="w-36 ">
                          {option.owner?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Total Members
                        </span>
                        <span className="w-36 ">
                          {option.totalMembers?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Equb Started
                        </span>
                        <span className="w-36 ">
                          {option.equbStarted?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Equb Ended
                        </span>
                        <span className="w-36">
                          {option.equbEnded?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <Link href="/equb/[equbaddress]" as={`/equb/${option.equbAddress}`}
                        className=" w-2/12 p-2 flex justify-center"
                      >
                        <div className="flex items-center gap-4 hover:border-b">
                          <span> GO TO EQUB</span>
                          <AiOutlineArrowRight />
                        </div>
                      </Link>

                    </div>
                  </div>
                }
              </div>
            );
          })}
        </div>}

        {joinedEqubList.length > 0 && <span className="text-xl">Equbs I've Joined</span>}
        {joinedEqubList.length > 0 && <div className="border rounded-md p-4">
          {joinedEqubList.map((option, index) => {
            return (
              <div className="gap-8">
                {option.equbStarted &&
                  <div key={index} >
                    <div className='w-full justify-between flex items-center p-4 border'>
                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Equb Address
                        </span>

                        <span className="w-36 ">
                          {option.equbAddress?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Owner
                        </span>
                        <span className="w-36 ">
                          {option.owner?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Total Members
                        </span>
                        <span className="w-36 ">
                          {option.totalMembers?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Equb Started
                        </span>
                        <span className="w-36 ">
                          {option.equbStarted?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="w-36 font-bold  ">
                          Equb Ended
                        </span>
                        <span className="w-36">
                          {option.equbEnded?.toString()?.substr(0, 15)}
                        </span>
                      </div>

                      <Link href="/equb/[equbaddress]" as={`/equb/${option.equbAddress}`}
                        className=" w-2/12 p-2 flex justify-center"
                      >
                        <div className="flex items-center gap-4 hover:border-b">
                          <span> GO TO EQUB</span>
                          <AiOutlineArrowRight />
                        </div>
                      </Link>

                    </div>
                  </div>
                }
              </div>
            );
          })}
        </div>}
      </div>

    </div>
  )
}

export default MyEqubs