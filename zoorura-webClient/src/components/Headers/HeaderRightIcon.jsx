function HeaderRightIcon({LgIcon, Icon, badge, active }) {
    return (
        <div className={`flex justify-center items-center transition delay-100 p-2 shadow-md  border border-cyan-400 m-0.5 ${active === false && 'bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-cyan-600'} h-12 w-12 rounded-full cursor-pointer hover:text-cyan-300  hover:bg-gray-900 dark:hover:bg-cyan-900 ${active === true && 'bg-gray-700 dark:bg-cyan-900 text-teal-400'} relative group`}>
            {Icon && <Icon className="h-5 w-5 group-hover:text-teal-400"/>}
            {LgIcon&& <LgIcon className={`transition delay-300 h-10 w-10  ${active === false && 'text-cyan-700'} dark:group-hover:text-teal-400 ${active === true && ' text-teal-300'}`}/>}
            {badge > 0 && <small className="transition delay-300 text-xs absolute top-0 right-0 bg-yellow-500 text-white group-hover:bg-gray-900  rounded-full border-2 border-gray-200 dark:border-gray-800 h-5 w-5 text-center">{badge}</small>}
        </div>
       
    )
}

export default HeaderRightIcon;