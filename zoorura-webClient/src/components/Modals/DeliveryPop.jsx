
export const DeliveryPop = ({message}) => {

  

    return (
        <div className="fixed top-60 left-0 z-50 flex justify-center  w-full bg-transparent">
                        <div className="m-auto bg-gray-700 py-4 rounded-full px-20 flex justify-center fixed z-40  text-center font-bold text-white">
                           <p> {message} </p>
                        </div>
        </div>
    )
}