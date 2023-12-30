import React, { useState } from 'react';
import styles from '../styles/apply.module.css';
import {toast} from 'react-toastify';
import Link from 'next/link';
import { data } from 'autoprefixer';
import { useRouter } from 'next/router';

const Apply = () => {


    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  const handleLogin = (e)=>{
    e.preventDefault();

    // toast('Logging in ...')

    // ###clear text fields after login#####

    // setEmail('');
    // setPassword('');

    

    // BACKEND
    fetch('https://nfc-bend.cyclic.app/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      
    }).then(res => res.json())
    .then(data=>{
      if(data.status==='success'){
        toast('You are logged in');
        localStorage.setItem('LinkTreeToken', data.token);
        router.push('/dashboard');
      }
      if(data.status==='not found'){
        toast.error('user not found');
      }
    }).catch(err=>{
      console.log(err);
    })

  }
  return (
    <>
    <section className={styles.background + " min-h-screen flex justify-center items-center"}>
      <div className="main"> 
        <div className="content border-2 px-4 py-8 rounded-2xl shadow-lg ">
          <h1 className="text-2xl  font-bold text-center" >Log In</h1>
          <p className='text-center text-gray-500'>Lets setup your card</p>
          <p className='text-center py-2 font-bold text-gray-500'>Enter your credentials here !</p>
        <form onSubmit={handleLogin} className='flex flex-col gap-4 text-lg mt-5' action="" >
           
        <span className='flex flex-row rounded-md focshadow-md border-2 px-3 py-1 us:outline-none'>
            <img className='w-8' src="/svg/email.svg" alt="" />
            <input value={email} onChange={e=>setEmail(e.target.value)} className='rounded-md focus:outline-none ' type="email" placeholder='Enter Email'/>
        </span> 

        <span className='flex flex-row rounded-md focshadow-md border-2 px-3 py-1 us:outline-none'>
            <img className='w-8' src="/svg/pass.svg" alt="" />
            <input value={password} onChange={e=>setPassword(e.target.value)} className='rounded-md focus:outline-none ' type="password" placeholder='Enter password'/>
        </span> 

<br></br>
            
        <input className='bg-indigo-600 text-white py-2 rounded-lg cursor-pointer ' type="submit" value="Login" />
          
        </form>
        <br></br>
          <h4 className='text-center font-bold text-gray-500'>New here <br></br><Link href="/">get your card now !</Link></h4>
        </div>
      </div>
    </section>
    </>
  )
}

export default Apply