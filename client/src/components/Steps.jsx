import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'
const Steps = () => {
  return (
    <motion.div
      initial={{opacity:0,y:100}}
      transition={{duration:0.5}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
    >
      <h1 className=' text-center text-3xl sm:text-4xl font-semibold mb-2  '>How it works</h1>
      <p className=' text-center text-lg text-gray-600 mb-8 '>Transform Words Into Stunning Images</p>
      <div className="">
        {stepsData.map((item,index)=>(
            <div className="flex  items-center gap-4 p-5 px-8 
            mb-4  bg-white/20 shadow-lg border rounded-lg border-gray-500 cursor-pointer hover:scale-[1.02] transition-all duration-300 " key={index} >
                <img w={40} src={item.icon} alt="" />
                <div className="">
                    <h2 className='font-medium text-xl'>{item.title}</h2>
                    <p className='' >{item.description}</p>
                </div>
            </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps
