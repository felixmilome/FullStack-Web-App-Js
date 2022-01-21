import CartmodalRow from './CartmodalRow';

function CartModal({setshowCart}) {
    return (
        <div className="fixed p-4 sm:w-1/4 border-l-8 border-gray-200 w-2/3 mt-4 sm:mt-2 right-0 sm:right-2 top-20 h-full z-0 flex justify-center bg-gray-200">

            <div className="overflow-scroll">

                    {/* <div className="p-1 flex justify-center items-center rounded-full mx-4 mt-2 cursor-pointer hover:bg-gray-500 hover:text-white font-light text-gray-400 bg-gray-100"
                     onClick={ () => 
                        { setshowCart(false);}
                        }>
                        hide
                    </div> */}

            {/* Heading */}
           
                <div className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl hover:bg-cyan-500  bg-gray-100 items-center my-1 group">
                    <p className= "text-gray-500 text-center text-sm font-semibold group-hover:text-white">Cart</p> 
                </div>  


                <div className="text-center text-gray-700 font-bold rounded-md bg-p-2 items-center m-2 ">
                    Grand Total: USD 450 
                    <div className="text-white text-center rounded-full bg-cyan-600 hover:bg-cyan-400 cursor-pointer items-center p-1">
                        Pay
                    </div>
                </div>
            
                <div className= "mb-60 border-gray-200 border-t">
                    <CartmodalRow Src = "./assets/images/lilbaby.jpeg" Product= "Game of Thrones Book One By George RR White." Price="USD 200.50" Time= "6d ago"/>
                    <CartmodalRow Src = "./assets/images/khabilame.jpeg" Product= "Fish Documentary" Price="USD 45.00" Time= "1w ago"/>
                    <CartmodalRow Src = "./assets/images/beyonce.jpeg" Product= "Wallpapers by Picasso" Price="USD 3.00" Time= "2w ago"/>
                    <CartmodalRow Src = "./assets/images/jayz.jpeg" Product= "444 Album" Price="USD 9.99" Time= "2w"/>
                    <CartmodalRow Src = "./assets/images/lilbaby.jpeg" Product= "Malibu House Plans" Price="USD 6.50" Time= "20w ago"/>
                    <CartmodalRow Src = "./assets/images/khabilame.jpeg" Product= "Forex Trading Tips" Price="USD 35.00" Time= "21w ago"/>
                    <CartmodalRow Src = "./assets/images/beyonce.jpeg" Product= "Avengers Comic book" Price="USD 43.00" Time= "21w ago"/>
                    <CartmodalRow Src = "./assets/images/whitelogo.png" Product= "Coding for geeks E-book" Price="USD 79.00" Time= "2w ago"/>
                    <CartmodalRow Src = "./assets/images/tesla.png" Product= "Kids Pics" Price="USD 30.00" Time= "2w"/>
                    <CartmodalRow Src = "./assets/images/jolie.jpeg" Product= "Mona Lisa Theme" Price="USD 40.00" Time= "3m ago"/>
                    <CartmodalRow Src = "./assets/images/milome.jpeg" Product= "Wyatt Smith Biography" Price="USD 34.00" Time= "2h ago"/>
                
            </div>

            </div>

        </div>
    )
}

export default CartModal;
