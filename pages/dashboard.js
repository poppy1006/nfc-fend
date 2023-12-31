import React, {useEffect, useState} from 'react'
import LinkBox from '../components/LinkBox.js'
import MyHead from '../components/UserHead.js'
import UserHead from '../components/UserHead.js'
import {toast} from 'react-toastify'



export const dashboard = () => {

  const [data, setData] = useState({});

  useEffect(()=>{
    if(!localStorage.getItem('LinkTreeToken')) return window.location.href = "/login";

// BACKEND //

    // 
    fetch('http://localhost:1000/data/dashboard', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('LinkTreeToken'),
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.status==='error') return toast.error(('Error happened'));
      setData(data.userData);
      localStorage.setItem('userHandle', data.userData.handle);
      toast.success(data.message)
    }).catch(err=>{
      console.log(err);
    })

  }, [])


  return (
    <>
      <div className=''>
        
        <UserHead data={data}/>
        <main>
          <section className='grid md:grid-cols-2 xl:grid-cols-4 gap-5'>
            <LinkBox lbTitle="Links" lbNumber={data.links} lbSvg="url" lbTheme="red"/>
            <LinkBox lbTitle="Growth" lbNumber="30%" lbSvg="growth" lbTheme="blue"/>
            <LinkBox lbTitle="Links" lbNumber="12" lbSvg="email" lbTheme="red"/>
            <LinkBox lbTitle="Growth" lbNumber="30%" lbSvg="ig" lbTheme="blue"/>
          </section>
          <section>

          </section>
        </main>
      </div>

    </>
  )
}



export default dashboard