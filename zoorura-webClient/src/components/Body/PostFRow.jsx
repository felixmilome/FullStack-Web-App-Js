function PostFRow({platform, sizing, Icon}) {
    return (
        <div className= "items-center px-2">
           <div className="flex">
                <div className="m-auto">
                        {Icon && <Icon size={sizing}/>}
                </div>
           </div>
            <div>
            <p className="p-1 text-xs">{platform}</p>
            </div>
        </div>
    )
}

export default PostFRow;
