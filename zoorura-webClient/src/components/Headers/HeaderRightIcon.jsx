function HeaderRightIcon({Icon, badge }) {
    return (
        <div className= "transition delay-100 p-2 h-10 w-10 rounded-full text-gray-500 cursor-pointer hover:text-cyan-300 hover:bg-gray-700 relative group">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6"/>
            <small className="transition delay-300 text-xs absolute top-0 right-0 bg-yellow-500 text-white font-semibold group-hover:bg-gray-700  rounded-full border-2 border-gray-200 h-5 w-5 text-center">{badge}</small>
        </div>
       
    )
}

export default HeaderRightIcon;