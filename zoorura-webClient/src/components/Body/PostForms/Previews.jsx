import VideoPlayer from 'react-video-js-player';


import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';



// export const MediaForm = ({Url}) => {
//     return (
//         <div className='max-h-screen w-4/5 bg-gray-200 p-1'>
//             <div className= "z-10 h-full w-full">     
//                 <iframe src={Url}
//                     allow="fullscreen" width="100%" height='400' >
//                 </iframe> 
//             </div> 
//         </div>
//     )
// } 

export const AudioForm = ({Url, DP}) => {
    return (
        <div className='max-h-screen w-4/5 bg-gray-200 p-1'>
            <div className= "z-10 h-full w-full">     
                {/* <iframe src={Url}
                    allow="fullscreen" width="100%" height='400' >
                </iframe>  */}
                {/* <AudioPlayer poster = {DP}
                    src={Url}
                /> */}
                  <video src={Url} poster= {DP} controls controlsList="nodownload">
                </video>
            </div> 
        </div>
    )
}
export const VideoFrame = ({Url}) => {
    return (
        <div className='max-h-screen w-4/5 bg-gray-200 p-1'>
            <div className= "z-10 h-full w-full"> 
            <VideoPlayer src={Url}/>    
            </div> 
        </div>
    )
}
export const VideoForm = ({Url, DP}) => {
    return (
        <div className='flex justify-center max-h-screen w-11/12 bg-black p-1 py-4'>
            <div className= "flex m-auto bg-gray-800 z-10 h-full w-full"> 
            {/* <VideoPlayer src={Url}
            onLoad= {(console.log(Url))}/>     */}
                {/* <iframe src={Url}
                    allow="fullscreen" width="100%" height='400' >
                </iframe>  */}
                 <video className= "m-auto" src={Url} poster={DP} controls controlsList="nodownload">
                </video>
            </div> 
        </div>
    )
}
export const PdfForm = ({Url}) => {
    return (
        <div className='relative max-h-screen w-4/5 bg-gray-200 p-1'>
            <div className= "z-10 h-full w-full"> 
                
                <iframe src={Url}
                     width="100%" height='400' >
                </iframe> 
               
            </div> 
        </div>
    )
}
export const PicFrame = ({Url}) => {
    return (
        <div className='max-h-screen w-4/5 bg-gray-200 p-1'>
            <div className= "z-10 h-full w-full">     
                <img src= {Url} className="object-container h-full w-full"/>
            </div> 
        </div>
    )
}
export const PicForm = ({Url}) => {
    return (
        <div className='max-h-screen w-4/5 bg-gray-200 p-1'>
            <div className= "z-10 h-full w-full">     
                <img src= {Url} className="object-container h-full w-full"/>
            </div> 
        </div>
    )
}


export const YtForm = ({Url}) => { 
    return (
        <>
            <iframe className= "z-10" growth="HaskellandPythonLibratriesLibraryk
            bsgfuyefsu763297032097987-77" decoder="zooruraJavaDecoder6565438zz66" 
            title=""
            width="100%" height="400"
            src={Url}
                //src="https://www.youtube.com/embed/dmFwB0WEEDY"
                //title="Zoorura Decode-Embed-Embed Class u820783644982369ybhhvdjgjdfbjhbfjbjfhbjCode976796976969697697Title976789698608698686876hjvhgvhgvchgcvhjvvjgvjv55557687876y"
                frameborder="0"
                    allow="accelerometer;
                    autoplay; ZooruraPythonPackvhgvchgcvhgchgchdh; 
                    ZooruraJavaFile5756892739785236hgjsdgjv
                    sjhvjsdvjsvdj678973296293ghjsdgjhgjhsdgjh.Codex; 
                    clipboard-write;
                    encrypted-media; gyroscope;
                    picture-in-picture" allowfullscreen='true'>
            </iframe>
        </>
    )
}


export const IgForm = ({Url}) => {
    return (
        <>
            <iframe className= "z-10"
            src={Url}
            //src="https://www.instagram.com/reel/CWLrjRQIEnu/embed"
                                width="360" height="500" frameborder="0" 
                                scrolling="yes" allowtransparency="false">
            </iframe> 
        </>
    )
}
export const TkForm = ({Url}) => {
    return (
        <>
            <iframe className= "z-10"
            src={Url} 
            //src="https://www.tiktok.com/embed/7029346062158662913"
             width="290" height="590" frameborder="0"
                                scrolling="no" 
                                allowtransparency="true"
                                allowfullscreen="true" >
            </iframe>
        </>
    )
}

export const TwForm = ({Url}) => {
    
    let src= Url
    const Source = "data:text/html;charset=utf-8,%3Cblockquote%20class%3D%22twitter-tweet%22%3E%%3Ca%20href%3D%22" + src + "%3Fref_src%3Dtwsrc%255Etfw%22%3E%3C/a%3E%3C/blockquote%3E%0A%3Cscript%20async%20src%3D%22https%3A//platform.twitter.com/widgets.js%22%20charset%3D%22utf-8%22%3E%3C/script%3E%0A%3Cstyle%3Ehtml%7Boverflow%3Ascroll%20%21important%3B%7D%3C/style%3E";
    return (

        <>
            <iframe className= "z-10" width="100%" height="600" 
                data-tweet- 
                src={Source}>
            </iframe>
        </>
    )
}

export const SnForm = ({Url}) => {

    let src= Url
    const Source = "https://w.soundcloud.com/player/?url=https%3A" + src + "/&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false";

    return (
      
             <iframe className= "z-10" width="100%" height="100%" scrolling="no" frameborder="no" 
                src={Source}>
            </iframe>
       
    )
}
export const PnForm = ({Url}) => {
    return (
        <>
            <iframe className= "z-10" src={Url}
            //src="https://assets.pinterest.com/ext/embed.html?id=601652831476506808"
             height="500" width="300" frameborder="0" scrolling="yes" sandbox ></iframe>
        </>
    )
}
export const RdForm = ({Url}) => {

    
    return (
        <>
            <iframe className= "z-10" id="reddit-embed" 
            src={Url}
             sandbox="allow-scripts allow-same-origin allow-popups"
               height="450" width="100%" scrolling="yes">
            </iframe>
        </>
    )
}
export const FbForm = ({Url}) => {

    
    return (
        <>
           <iframe className= "z-10" height="450" width="100%"
           src ={Url}
           //src="https://www.facebook.com/plugins/video.php?height=200&href=https%3A%2F%2Fwww.facebook.com%2FWeruTV%2Fvideos%2F612650889857740%2F&show_text=false&width=200&" width= "350" height="350" 
                scrolling="yes" frameborder="0" 
                allowfullscreen="true" 
                allow="autoplay; clipboard-write;
                encrypted-media; picture-in-picture;
                web-share">
            </iframe>
        </>
    )
}
export const DrForm = ({Url}) => {

    
    return (
        <>
        <iframe className="z-10" src ={Url}
        //src="https://drive.google.com/file/d/1tzuAapoVoHeKYCJoNo877mkuA06OzaZk/preview"
             width="100%" height="400" allow="autoplay" allowfullscreen="true">
        </iframe>
        </>
    )
}
export const TchForm = ({Url}) => {

    
    return (
        <>
         <iframe className="z-10" src ={Url}
         //src="https://player.twitch.tv/?channel=diegosaurs&parent=localhost:3000"
             frameborder="0" allowfullscreen="true" scrolling="no"
              height="400" width="100%">
        </iframe> 
        </>
    )
}
export const WpForm = ({Url}) => {

    
    return (
        <>
       <iframe className="z-10" src ={Url}
       //src="https://themillenialnews.wordpress.com/2021/11/05/the-shivering-truth/"
            height="400" width="100%" title="Iframe Example">
        </iframe>
        </>
    )
}
















