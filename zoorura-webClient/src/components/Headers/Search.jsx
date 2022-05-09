
import {SearchIcon} from '@heroicons/react/outline';
import { useState } from 'react';
import {BsPeople, BsFillFileEarmarkPostFill} from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import {BeatLoader, DotLoader} from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import {headSearchAction} from '../Midwares/rdx/actions/searchActions.js';
import {Link} from 'react-router-dom';



export const Search = () => {
 const [searchOptions, setSearchOptions] = useState(false);
 const [searchAll, setSearchAll] = useState(true);
 const [searchDisplay, setSearchDisplay] = useState('all');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [searchData, setSearchData]= useState({term:'', type:'all'})
 const dispatch = useDispatch()
 const searchResults = useSelector((state) => state.headSearchReducer);

    // const debounce = (cb, delay = 1000) => {
    //  let timeout
    //  return (...args) => {
    //      clearTimeout(timeout)
    //      timeout = setTimeout (() => {
    //          cb (...args)
    //      }, delay)
    //      }
    // }
 

 const handleSearch = (e) => {

   setSearchData({...searchData, term:e.target.value?.replace('@', '')?.trim()});
   const searchDataObj = {term:e.target.value?.replace('@', '')?.trim(), type:'all'};

    if(searchDataObj.term?.length>0){
        setSearchDisplay('all');
        (setLoading(true));
        setSearchOptions(true);
        setError('');
        setSearchAll(true);
        dispatch(headSearchAction(searchDataObj, setLoading, setError));
    } else{
        return;
    }

 }


 

  return (

    <div className='flex w-full  items-center'>
     
                        
       {/* {searchOptions === false &&
        <div onClick={(e)=>{

           
            handleSearch(e);
           
        }} className="p-1 sm:p-3 bg-cyan-400 hover:bg-cyan-600 rounded-full items:center">
            <SearchIcon  className= 'h-6 text-white'/>
            
        </div>
        } */}
        {/* {searchOptions === true &&
        <div  className="p-1 sm:p-3 bg-gray-300 rounded-full items:center">
            <SearchIcon  className= 'h-6 text-white'/>
            
        </div>
        } */}
        <input onChange={(e)=>{
           
            handleSearch(e);
        }}  className =" w-full sm:w-1/2 dark:border-gray-600 dark:bg-black rounded-full  h-7 md:inline-flex p-4 items-center outline-none font-light placeholder-gray-400 dark:placeholder-cyan-400"
        type="text"
        placeholder="Search Zoorura"/>

    {searchOptions &&
        <>
        
            
                <div className= 'items-center fixed  top-24 sm:top-16 text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 z-40 shadow-md h-fit lg:w-1/4 w-fit rounded-b-md p-5'>
                
                

                <OutsideClickHandler     
                    onOutsideClick={() => {
                        setSearchOptions(false);
                    }}>
                    <div className='flex justify-start'>
                        {searchAll === true && 
                         <OutsideClickHandler     
                         onOutsideClick={() => {
                             setSearchAll(false);
                         }}>
                        <button className= 'flex border dark:border-gray-600 dark:bg-gray-900  dark:border-gray-200 items-center m-1 space-x-2 px-3 py-1 rounded hover:shadow-md bg-gray-600  text-gray-100  cursor-pointer'>
                    
                            <p>All</p> 

                        </button>
                        </OutsideClickHandler>
                        }

                        {searchAll ===false && 
                        <button onClick={()=>{
                            setSearchAll(true);
                            setSearchDisplay('all');
                            }} className= 'flex border border-gray-300 dark:border-gray-900  items-center m-1 space-x-2 px-3 py-1 rounded hover:shadow-md hover:bg-gray-900  hover:text-gray-100 dark:hover:bg-gray-900   bg-gray-100 dark:bg-transparent cursor-pointer'>
                    
                            <p>All</p> 

                        </button>
                        }
            
                        <button onClick={()=>setSearchDisplay('posts')} className= 'flex border text-gray-600 dark:text-gray-200 border-gray-300  bg-transparent dark:focus:border-gray-600  dark:border-gray-900 focus:bg-gray-600 dark:focus:bg-gray-900 focus:text-gray-100 items-center m-1 space-x-2 px-3 py-1 rounded hover:shadow-md hover:bg-gray-900 hover:text-gray-100  cursor-pointer'>
                            <div><BsFillFileEarmarkPostFill size={20}/></div>
                            <p>Posts</p>      
                        </button>
                        <button onClick={()=>setSearchDisplay('people')} className= 'flex border text-gray-600 dark:text-gray-200 border-gray-300  bg-transparent dark:focus:border-gray-600  dark:border-gray-900 focus:bg-gray-600 dark:focus:bg-gray-900 focus:text-gray-100 items-center m-1 space-x-2 px-3 py-1 rounded hover:shadow-md hover:bg-gray-900 hover:text-gray-100  cursor-pointer'>
                            <div><BsPeople size={20}/></div>
                            <p>People</p>      
                        </button>
                        
                    </div>
                    <div style={{wordBreak: 'break-word'}} className='flex max-h-screen  max-w-full  text-gray-400 overflow-scroll justify-center'>
                       {loading ===true &&
                       <div>
                           <BeatLoader size={20} color='white' loading/>
                       </div>}
                       {

                       }
                        <div>
                        {/* Post & all Results */}
                        {loading ===false && searchDisplay !=='people' &&
                        <>
                               {
                       
                                searchResults?.diaryResult.map((diary) =>(
                                    <Link to ={`/DiaryLink/${diary._id}`}>
                                        <div   key={diary._id} className='cursor-pointer p-1 dark:hover:text-gray-200  hover:text-gray-800'>
                                            <p>{diary.title}</p>  
                                        </div>
                                    </Link>

                                ))
                                } 
                            
                                  {/* Post error Message */}
                                  {searchResults.message==='NoPost' && searchDisplay ==='posts' &&

                                        <div  className=' p-1'>
                                        <p>No Posts found for {searchData.term}</p>  
                                        </div>

                                    } 
                    
                        </>}
                                     {/* People & all Results */}
                        {loading ===false && searchDisplay !=='posts' &&
                        <>
                               {
                       
                                searchResults?.peopleResult.map((person) =>(
                                    <Link to ={`/Portfolios/${person.userName}`}>
                                        <div key={person._id} className='cursor-pointer p-1 dark:hover:text-gray-200  hover:text-gray-800'>
                                            <p>@{person.userName}</p>  
                                        </div>
                                    </Link>

                                ))
                                } 
                                
                                  {/* Person error Message */}
                                  {searchResults.message==='NoPerson' && searchDisplay ==='people' &&

                                    <div  className='p-1  '>
                                        <p>No People found for {searchData.term}</p>  
                                    </div>

                                    }
                    
                        </>}  
                         {/* All error Message */}
                         {searchResults.message==='NoTerm' && loading ===false &&

                            <div  className='p-1'>
                            <p>No Results found for {searchData.term}</p>  
                            </div>

                            }
                        </div>
                    </div>

                    </OutsideClickHandler>

                 
                    
                
                </div>
               
        
        </>
        
        }

   
    </div>
    
  )
}
