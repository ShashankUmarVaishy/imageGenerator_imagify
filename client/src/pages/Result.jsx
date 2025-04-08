import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
const Result = () => {

  const [image,setImage]=useState(assets.sample_img_2);
  const [isImageLoaded,setIsImageLoaded]=useState(false);
  const [loading,setLoading]=useState(false);
  const [input,setInput]=useState('');
  const {generateImage}=useContext(AppContext)



  const onSubmitHandler=async(e)=>{
    //created after making backend
      e.preventDefault();
      setLoading(true);

      if(input){
        const image=await generateImage(input);
        if(image){
          setIsImageLoaded(true);
          setImage(image);
        }
      }
      setLoading(false);
  }



  return (
    <motion.form 
      initial={{opacity:0.2,y:50}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      onSubmit={onSubmitHandler} action="" className='flex flex-col min-h-[90vh] justify-center items-center' >
      <div>
      <div className="relative ">
        <img src={image}className='max-w-sm rounded ' alt="" />
        <span className={`absolute  bg-blue-500 ${loading?'w-full transition-all duration-[10s]': 'w-0'} bottom-0 left-0 h-1  `  }/>
      </div>
      <p className={!loading? 'hidden' : 'block'} >Loading . . . </p>
    </div>

    {/* when the image is not loaded  */}
    {!isImageLoaded && <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
      <input
        onChange={e=>setInput(e.target.value)}
        value={input}
        type="text" className='flex-1 bg-transparent placeholder-color outline-none ml-8 max-sm:w-20' placeholder='Describe what you want to generate' />
      <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full '>Generate </button>
    </div>
    }   
    {/* when the image is loaded  */}
    {isImageLoaded && <div className="flex flex-wrap gap-2 justify-center text-white text-s p-0.5 mt-10 rounded-full">
          <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer  '>
            Generate Another
          </p>
          <a className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer  ' download href={image} >
            Download
          </a>
        </div>
    }



    

    </motion.form>
  )
}

export default Result
