import React from 'react'
import Navbar from '../components/Navbar'
import Profile from '../assets/profile-1.jpg'

const Incorrectresult = () => {
  return (
    <>
    <Navbar/>
    <div className='  h-[90vh] px-6 flex justify-center items-center'>
        <div className='  p-2    rounded-2xl bg-gradient-to-br from-blue-600 to-purple-500 '>
            <div className='flex flex-col p-2  items-center   h-full rounded-2xl bg-white '>
            <div className=' mt-2 text-xl font-semibold'>
                Unmatched Details
            </div>
            <div className=' w-full flex flex-row '>
                <div className=' w-[50%] flex flex-col'>
                    <div className=' '>
                        <img src={Profile} alt=''/>
                    </div>
                </div>
                <div className=' w-[50%] flex flex-col justify-around items-start px-12'>
                    <div>
                        {`Name: Hars kumr Jain      (Pan Card)`}
                    </div>
                    <div>
                    {`DOB: 14/03/2003      (Pan Card)`}
                    </div>
                    <div>
                    {`AadharNo: 5674283765867589      (Aadhar Card)`}
                    </div>
                </div>

            </div>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default Incorrectresult
