import { EqubContext } from '@/components/context/context';
import Link from 'next/link';
import React, { useContext } from 'react'

const MyEqubs = () => {
  const { setOpenModal, ownerEqubAddress, toastNotification, setModalContent } =
    useContext(EqubContext);

  return (
    <div className="h-screen w-full p-10">
      <div className="w-full h-full flex flex-col space-y-10 p-10">
        <span className=" text-4xl font-semibold"> MyEqub Dashboard</span>
        <span className="text-2xl font-medium">
        Welcome to your personal equb dashboard. Here you can monitor and manage the equbs you own and see the ones you've joined.        </span>
        {ownerEqubAddress.length > 0 && <span className="text-2xl">🏠 My Owned Equbs</span>}
        {ownerEqubAddress &&  <div className="border rounded-md p-4">
          {ownerEqubAddress.map((option, index) => {
            return (
              <div className="gap-8">
                {option.equbStarted && <div key={index}>
                <div className='w-full justify-between flex items-center'> 
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
                      <span className="w-36 ">
                    {option.equbEnded?.toString()?.substr(0, 15)}
                      </span>
                    </div>    

                           
                    <div className="flex flex-col gap-2">
                  <span className="w-36 font-bold  ">
                  Equb Length
                      </span>
                      <span className="w-36 ">
                    {option.equbLength?.toString()?.substr(0, 15)}
                      </span>
                    </div>    
          
                  <Link  href="/equb/[equbaddress]" as={`/equb/${option.equbAddress}`}           
                    className="border border-black rounded-md hover:bg-slate-100 w-2/12 p-2 flex justify-center"
                  >
                    GO TO EQUB
                    </Link>
                  
                </div>
                </div>}
              </div>
            );
          })}
        </div>}

        {ownerEqubAddress.length > 0 && <span className="text-2xl">🤝 Equbs I've Joined</span>}
        {ownerEqubAddress &&  <div className="border rounded-md p-4">
        {ownerEqubAddress.map((option, index) => {
            return (
              <div className="gap-8">
                {option.equbStarted && <div key={index}>
                <div className='w-full justify-between flex items-center'> 
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
                      <span className="w-36 ">
                    {option.equbEnded?.toString()?.substr(0, 15)}
                      </span>
                    </div>    

                           
                    <div className="flex flex-col gap-2">
                  <span className="w-36 font-bold  ">
                  Equb Length
                      </span>
                      <span className="w-36 ">
                    {option.equbLength?.toString()?.substr(0, 15)}
                      </span>
                    </div>    
          
                  <Link  href="/equb/[equbaddress]" as={`/equb/${option.equbAddress}`}           
                    className="border border-black rounded-md hover:bg-slate-100 w-2/12 p-2 flex justify-center"
                  >
                    GO TO EQUB
                    </Link>
                  
                </div>
                </div>}
              </div>
            );
          })}
        </div>}
      </div>
    
    </div>
  )
}

export default MyEqubs