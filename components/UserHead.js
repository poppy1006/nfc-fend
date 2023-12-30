import React from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const UserHead = ({data}) => {

  const {name, role, avatar,handle, links} = data;
    
    const router = useRouter();
    const handleLogout = ()=> {
        localStorage.removeItem('LinkTreeToken');
        toast('Ok bye !')
        router.push('/login');
    }
  return (
    <>
      <header className='flex flex-row justify-between items-center'>
        <div className='flex flex-col md:flex-row p-5'>
        <button className='inline-flex w-full md:w-auto px-5 py-3 text-red-500 font-bold hover:text-red-700 hover:bg-red-100 rounded-md mb-3 border-2 border-red-400 '>
                <img src="/svg/card.svg" className='w-6 mr-3'></img>
                Edit Card
            </button>
            <button className='inline-flex w-full md:w-auto px-5 py-3 text-purple-500 font-bold hover:text-purple-700 hover:bg-purple-100 rounded-md mb-3 border-2 border-purple-400 md:ml-4 '>
                <img src="/svg/user.svg" className='w-6 mr-3'></img>
                Edit profile
            </button>
        </div>
        <div className='flex flex-row'>
            <div className='inline-flex mr-5 text-right items-center bg-gray-200 px-5 py-2 rounded-lg'>
                <div className='text-xs md:text-md flex flex-col flex-wrap'>
                    {/* <span className='font-bold'>{handle}</span> */}
                    <span className='font-bold'>{name}</span>
                    {/* <span>{role} Pack</span> */}
                    <span>{handle}</span>
                </div>
                <div className='user-img'>
                    <img className='w-10 ml-5' src={avatar}></img>
                </div>
            </div>
            <img className='w-6 mr-5 cursor-pointer  ' src="/svg/notify.svg" alt=''></img>
            <img className='w-6 mr-5 cursor-pointer  ' src="/svg/logout.svg" alt='' onClick={handleLogout}></img>
        </div>
      </header>
    
    </>
  )
}

export default UserHead