import { HiMiniUserGroup } from 'react-icons/hi2';
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram, AiOutlineReddit } from 'react-icons/ai';

export const Footer = () => {

    return (
        <div className="flex justify-center pt-96">
            <div className='flex flex-row w-3/4 p-12 justify-around h-64'>
                <HiMiniUserGroup />
                <div className="flex p-2 flex-col gap-4">
                    <span className='font-bold'>
                        LINKS
                    </span>
                    <span className='hover:text-gray-400 cursor-pointer'>
                        HOME
                    </span>
                    <span className='hover:text-gray-400 cursor-pointer'>
                        EXPLORE EQUBS
                    </span>
                    <span className='hover:text-gray-400 cursor-pointer'>
                        MY EQUBS
                    </span>
                </div>
                <div className="flex p-2 flex-col gap-4">
                    <span className='font-bold'>
                        FAQ
                    </span>
                    <span className='hover:text-gray-400 cursor-pointer'>
                        CONTACT
                    </span>
                </div>
                <div className="flex p-2 flex-col gap-4">
                    <span className='font-bold'>
                        SOCIAL MEDIA
                    </span>
                    <span className='cursor-pointer'>
                        <BsFacebook />
                    </span>
                    <span className='cursor-pointer'>
                        <AiFillInstagram />
                    </span>
                    <span className='cursor-pointer'>
                        <AiOutlineReddit />
                    </span>
                </div>
            </div>
        </div>
    )
}