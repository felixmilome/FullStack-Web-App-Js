import {CreditCardIcon} from '@heroicons/react/outline';
import {useState} from 'react';



export const Wallet = () => {

    const[deposit, setDeposit] = useState(true);
    const[mpesa, setMpesa] = useState(true);

  return (
    <div className='fixed top-32 sm:top-24 w-full flex items-center h-screen  text-gray-800 overflow-scroll'>
        <div className='w-11/12 m-auto space-y-3 max-h-screen pb-80 overflow-scroll'>
            <div className='space-y-3 rounded-xl text-gray-100 p-6 text-xl text-center font-bold h-fit bg-gray-900 w-full sm:w-1/3 m-auto'>
                <div className='flex justify-center text-sm items-center space-x-2'>
                <CreditCardIcon className='h-8 w-8  text-gray-800 bg-gray-100 rounded-full p-1'/>
                    <p>Wallet Balance: (in zoobux)</p>
                </div>
                <div>
                    <p className='text-5xl text-gray-400'>245.56 ZBX</p>
                    <p className='text-sm font-light'>Usd 23 | Kshs 260 | Tzs 2000 | Ugx 50000 </p>
                </div>
            </div>

            <div className=' rounded-md p-2 text-xl flex justify-center  font-bold h-fit bg-gray-100 w-full sm:w-1/3 m-auto'>
                <div className='space-y-2'> 

                    <div className='flex m-3 text-sm items-center justify-center space-x-0.5 cursor-pointer'>
                         <div onClick={()=>setMpesa(true)} className={`${mpesa === true && 'bg-green-400 text-gray-100'} w-32 flex justify-center flex items-center border-gray-300  hover:bg-gray-800 hover:text-gray-100 border p-1 rounded-md`}>
                            <img src="./assets/images/mpesa.png" alt="DP" className="p-0.5 rounded-full h-7 w-7 "/>
                            <p>M-Pesa</p>
                        </div>

                        <div onClick={()=>setMpesa(false)} className={`${mpesa === false && 'bg-blue-400 text-gray-100'} w-32 flex justify-center flex text-sm items-center border-gray-300 ${mpesa===false && 'bg-gray-800 text-gray-100'} hover:bg-gray-800 hover:text-gray-100 border p-1 rounded-md cursor-pointer`}>
                            <img src="./assets/images/paypal.png" alt="DP" className="p-0.5 rounded-full h-7 w-7 "/>
                            <p>Paypal</p>
                        </div>
                        
                    </div>

                    <div className='flex text-xs items-center justify-center space-x-0.5 cursor-pointer'>

                        
                        {mpesa===true &&
                            <>
                                <div onClick={()=>setDeposit(true)}  className={`${deposit === true && ' bg-green-400 text-gray-100'} w-24 flex justify-center text-center flex items-center border-gray-400 hover:bg-gray-800 hover:text-gray-100 border px-3 p-1 rounded-full cursor-pointer`}>
                                    <p>Deposit</p>
                                </div>

                                <div onClick={()=>setDeposit(false)} className={`${deposit === false &&  ' bg-green-400 text-gray-100'} w-24 flex justify-center text-center flex tems-center border-gray-400 hover:bg-gray-800 hover:text-gray-100 border px-3 p-1 rounded-full cursor-pointer`}>
                                    <p>Withdraw</p>
                                </div>
                            </>
                        }
                        {mpesa===false &&
                            <>
                                <div onClick={()=>setDeposit(true)}  className={`${deposit === true && ' bg-blue-400 text-gray-100'} w-24 flex justify-center text-center flex items-center border-gray-400 hover:bg-gray-800 hover:text-gray-100 border px-3 p-1 rounded-full cursor-pointer`}>
                                    <p>Deposit</p>
                                </div>

                                <div onClick={()=>setDeposit(false)} className={`${deposit === false &&  ' bg-blue-400 text-gray-100'} w-24 flex justify-center text-center flex tems-center border-gray-400 hover:bg-gray-800 hover:text-gray-100 border px-3 p-1 rounded-full cursor-pointer`}>
                                    <p>Withdraw</p>
                                </div>
                            </>
                        }
                        
                    </div>

                    {/* MPESA============ */}

                   {mpesa===true &&
                   
                   <div className='text-center space-y-2'>
                        
                        <img src="./assets/images/mpesa.png" alt="DP" className="m-auto p-0.5 rounded-full h-7 w-7 "/>

                       {deposit ===true &&
                       
                       <div className='  space-y-2 p-2 rounded-md'> 
                       
                          
                            <p className='text-sm'>DEPOSIT to Zoorura Wallet:</p> 
                            <p className='text-sm font-light'>M-Pesa Number:</p> 
                            <input type='number' placeholder='Enter M-Pesa Number' className='w-48 bg-gray-200 py-2 px-4 text-sm rounded-full'/>
                            <p className='text-sm font-light'>Amount:</p> 
                            <input type='number' placeholder='Kshs 200-100,000' className='w-48 bg-gray-200 py-2 px-4 text-sm rounded-full'/>
                            
                            <div className='m-auto w-48 text-green-500 text-sm p-2 rounded-full border border-green-500'>
                                <p>Deposit</p>
                            </div>
                        </div> }
                    
                        {deposit ===false &&
                        
                        <div className='  space-y-2 p-2 rounded-md'> 
                          
                            <p className='text-sm'>WITHDRAW from Zoorura Wallet:</p> 
                            <p className='text-sm font-light'>M-Pesa Number:</p> 
                            <input type='number' placeholder='Enter M-Pesa Number' className='w-48 bg-gray-200 py-2 px-4 text-sm rounded-full'/>
                            <p className='text-sm font-light'>Amount:</p> 
                            <input type='number' placeholder='Kshs 200-100,000' className='w-48 bg-gray-200 py-2 px-4 text-sm rounded-full'/>
                            
                            <div className='m-auto w-48 text-green-500 text-sm p-2 rounded-full border border-green-500'>
                                <p>Withdraw</p>
                            </div>
                        </div>}

                    </div>}


                    {/* PAYPAL============ */}

                    {mpesa ===false &&
                    
                    <div className='text-center space-y-2'>

                    <img src="./assets/images/paypal.png" alt="DP" className="m-auto p-0.5 rounded-full h-7 w-7 "/>

                        {deposit ===true &&
                        
                        <div className='  space-y-2 p-2 rounded-md'> 
                          
                            <p className='text-sm'>DEPOSIT to Zoorura Wallet:</p> 
                            <p className='text-sm font-light'>Paypal Email:</p> 
                            <input type='email' placeholder='Enter Paypal Email' className='w-48 bg-gray-200 py-2 px-4 text-sm rounded-full'/>
                            <p className='text-sm font-light'>Amount:</p> 
                            <input type='number' placeholder='Kshs 200-100,000' className='w-48 bg-gray-200 py-2 px-4 text-sm rounded-full'/>
                            
                            <div className='m-auto w-48 text-blue-500 text-sm p-2 rounded-full border border-blue-500'>
                                <p>Deposit</p>
                            </div>
                        </div>}
                    
                        {deposit ===false &&
                        
                        <div className='  space-y-2 p-2 rounded-md'> 
                          
                            <p className='text-sm'>WITHDRAW from Zoorura Wallet:</p> 
                            <p className='text-sm font-light'>Paypal Email:</p> 
                            <input type='email' placeholder='Enter Paypal Email' className='w-48 bg-gray-200 py-2 px-4 text-sm rounded-full'/>
                            <p className='text-sm font-light'>Amount:</p> 
                            <input type='number' placeholder='Kshs 200-100,000' className='w-48 bg-gray-200 py-2 px-4 text-sm rounded-full'/>
                            
                            <div className='m-auto w-48 text-blue-500 text-sm p-2 rounded-full border border-blue-500'>
                                <p>Withdraw</p>
                            </div>
                        </div>}

                    </div>}


                   
                    
                    
                
                  
                </div>
            </div>
        </div>


    </div>
  )
}

