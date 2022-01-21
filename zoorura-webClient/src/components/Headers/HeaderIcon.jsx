function HeaderIcon({Icon, active}) {
    return (
        <div className= "flex items-center cursor-pointer md:px-6 sm:h-14 md:hover:bg-gray-100 rounded-full active:border-blue-500 group">

            <Icon className={`h-5 text-center text-gray-500 sm:h-6 mx-auto group-hover:text-blue-500 ${active && "text-blue-500"}`}/>
        </div>
    )
}

export default HeaderIcon;
