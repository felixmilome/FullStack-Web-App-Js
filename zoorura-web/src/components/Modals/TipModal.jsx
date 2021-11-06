function TipModal() {
    return (
        <div className="relative">
       <div className= "absolute bottom-4 lg:bottom-4 left-8 sm:p-1 sm:left-20 z-40 flex bg-transparent items-center justify-center">
            <div className="font-mono flex items-center space-x-3 w-full rounded-r-full rounded-tl-full opacity-80 m-1 p-0.5 bg-gradient-to-r from-cyan-300 to-teal-700 font-bold text-lg text-teal-300">
                <div className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= "items-center flex justify-center border-4 border-gray-700 group-hover:border-cyan-600 rounded-full h-9 w-9">
                        1
                    </div>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= " items-center flex justify-center border-4 border-gray-700 group-hover:border-cyan-600 rounded-full h-9 w-9">
                        5
                    </div>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= "items-center flex justify-center border-4 border-gray-700 group-hover:border-cyan-600 rounded-full h-9 w-9">
                        10
                    </div>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= "items-center flex justify-center border-4 border-gray-700 group-hover:border-teal-600 rounded-full h-9 w-9">
                        25
                    </div>
                </div>
                <div className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= "items-center flex justify-center border-4 border-gray-700 group-hover:border-teal-600 rounded-full h-9 w-9">
                        50
                    </div>
                </div>
        
            </div>
        </div>
        </div>
    )
}

export default TipModal;
