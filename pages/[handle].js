// import { useState } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LinkTree from '@/components/LinkTree'
import Link from 'next/link'
import SocialTree from '@/components/SocialTree'
import ShareButton from '@/components/ShareButton'

const Handle = () => {

const router = useRouter();
    const [data, setData] = useState({});
    const [userFound, setUserFound] = useState(false);

    const [social, setSocial] = useState({
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        github: ''
    })


    useEffect(()=>{
        if(router.query?.handle){
            fetch(`http://localhost:1000/get/${router.query.handle}`)
            .then(res=>res.json())
            .then(data=>{
                if (data.status==='error') return toast.error(data.error);
                if(data.status==='success'){
                    setData(data.userData);
                    setSocial(data.socials);
                    setUserFound(true);
                } 
            }).catch(err=>{
                console.log(err)
            })
        }
    }, [router.query])



    // useEffect(()=>{
    //     if(router.query?.handle){
    //         fetch(`http://localhost:1000/get/socials${router.query.handle}`)
    //         .then(res=>res.json())
    //         .then(data=>{
    //             if (data.status==='error') return toast.error(data.error);
    //             if(data.status==='success'){
    //                 setSocial(data.socials);
    //             } 
    //         }).catch(err=>{
    //             console.log(err)
    //         })
    //     }
    // }, [router.query])








  if(!userFound){
    return(
        // router.push('/apply');
    // linear gradient colour //
        // bg-gradient-to-r from-cyan-500 to-blue-500
        <div className='flex justify-center items-center h-screen '>
            <div className="not-found px-3 ">
                <h1 className='font-bold text-lg'>Ooops! it seems your card not registered yet.... </h1>                    
                 {/* <p>Nice try bruhh.....</p>  */}
                 Register yor nfc-card <Link className='bg-indigo-600 px-2 ml-2 text-white hover:bg-indigo-400 transition-all duration-500' href="/apply">HERE</Link>
                         
            </div>
        </div>
    )
  }

  return (
    <div >
        <ShareButton/>
        <LinkTree data={data} />
        <SocialTree social={social}/>
    </div>
  )

}




export default Handle



// export async function getStaticProps({params}){
//     const {slug} = params;
//     const res = await fetch()
// }