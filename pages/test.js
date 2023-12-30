import React, { useState } from 'react';
import styles from '../styles/apply.module.css';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';

const Apply = () => {
  
  const router = useRouter();
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleCategoryChange = (e) =>{
    // e.preventDefault();
    setCategory(e.target.value) 
  }
  const handleRegister = (e)=>{
    e.preventDefault();
    if(!category) return toast.error('Select an account type  !!');

    

// Backend
fetch('http://localhost:1000/api/register', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    handle,
    email,
    password,
    category
  }),  
}).then(res => res.json())
.then(data=>{
  if (data.message==='success'){
    toast('Card registered successfully :-)')
    localStorage.setItem('LinkTreeToken',data.token);
    setSubmitted(true);
    router.push('/login');
    console.login(data.token)
  }
}).catch(err=>{
  toast.error('Try a different username !');
})


    // toast('You are registered')
  }
  return (
    <>
    <section className={styles.background + " min-h-screen flex justify-center items-center"}>
      <div className="main"> 
        <div className="content border-2 px-4 py-8 rounded-2xl shadow-lg ">
          <h1 className="text-2xl  font-bold text-center" >Register Now</h1>
          <p className='text-center text-gray-500'>Register your card here</p>
          <p className='text-center py-2 font-bold text-gray-500'>Lets start from here !</p>
          <form onSubmit={handleRegister} className='flex flex-col gap-4 text-lg mt-5' action="" >
            <span className='flex flex-row rounded-md focshadow-md border-2 px-3 py-1 us:outline-none'>
            <img className='w-8' src="/svg/num.svg" alt="" />
            <input value={handle} onChange={e=>setHandle(e.target.value)} className='focus:outline-none' type="number" placeholder='Enter Card Number'/>
              </span> 
              
            <input value={email} onChange={e=>setEmail(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none ' type="email" placeholder='Enter Email'/>
            <input value={password} onChange={e=>setPassword(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none ' type="password" placeholder='Enter password'/>

            <h5 className='text-sm text-center'>
              Account type:
            </h5>
            <span className="flex">
              <label className='flex flex-row me-3'>
                <input type="checkbox"  value="Creator" checked={category==='Creator'} onChange={handleCategoryChange}/>
                <p className='pl-2'>Creator</p>
              </label>
              <label className='flex flex-row me-3 '>
                <input type="checkbox" value="Agency" checked={category==='Agency'} onChange={handleCategoryChange}/>
                <p className='pl-2'>Agency</p>
              </label>
              <label className='flex flex-row me-3 '>
                <input type="checkbox" value="Brand" checked={category==='Brand'} onChange={handleCategoryChange}/>
                <p className='pl-2'>Brand</p>
              </label>
            </span>

            <input className='bg-indigo-600 text-white py-2 rounded-lg cursor-pointer' type="submit" value="Register" />
          
          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default Apply