

export const PostFormTagSearch = ({diariesData, setdiariesData, tag, tagArray, tagObjArray, setTagObjArray, setTagArray}) => {
  console.log(tag);
  console.log(tagObjArray);
  console.log(diariesData);
    return (
    <div className='flex items-center space-x-1 shadow-md bg-gray-300 rounded-md p-1 m-1'>
    <p>@{tag.userName}</p>
    <div onClick={ ()=>{

       setTagObjArray(tagObjArray.filter((tagObj)=> tagObj !== tag));

    //    setTagArray(tagArray.filter((tagItem)=> tagItem !== tag._id));
       
        setdiariesData({
            ...diariesData,
             tags:diariesData.tags.filter((tagItem)=> tagItem !== tag._id)
            });
    }} 
        
        className="p-1 bg-gray-400 cursor-pointer text-gray-200 rounded-md hover:bg-gray-600 items-center">
        <p>x</p>
    </div>
   
</div>    
  )
}

