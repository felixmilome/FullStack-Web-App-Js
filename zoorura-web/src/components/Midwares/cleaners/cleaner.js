//IG
export const urIg = (urInput) => {

    let trim = urInput.trim();
    let result1 =trim.replace(/\/tv\//gi, "/embed/");
    let result2 = result1.replace(/\/reel\//gi, "/embed/");
    let result3 = result2.replace(/\/p\//gi, "/embed/");
    let result4 = result3.replace(/\?utm_medium=copy_link/gi, "");
    let resultFinal = result4.replace(/\?utm_source=ig_web_copy_link/gi, "");

    return resultFinal;

}
//TIKTOK
export const urTk = (urInput) => {

    let trim = urInput.trim();
    let result = trim.split('/video/');
    let result2 = result[1];
    let str1 = "https://www.tiktok.com/embed/";
    let str2 = result2;
    let resultFinal = str1.concat(str2);

    return resultFinal;
}
//YOUTB
export const urYt = (urInput) => {

    let trim = urInput.trim();
    let result1 = trim.replace(/youtu.be/gi, "www.youtube.com");
    let result2 = result1.replace(/watch\?v\=/gi, "embed/");
    let resultFinal = result2.substring(0, 41);

    return resultFinal;

}
//FB
export const urFb = (urInput) => {

    let repl = urInput.replace(/https:\/\//gi, "");
    let htp = repl.replace(/\//gi, "%2F");
    let trim = htp.trim();
    let str1 = "https://www.facebook.com/plugins/post.php?height=200&href=https%3A%2F%2F";
    let str2 = trim;
    let res = str1.concat(str2);
    let ending = "%2F&show_text=false&width=200&"
    let finalResult = res.concat(ending);

    return finalResult;
}
//REDDIT
export const urFb = (urInput) => {

    let stru = urInput.replace(/reddit/gi, "redditmedia");
    let str2 = stru.replace(/\?utm_source=share&utm_medium=web2x&context=3/gi, ""); 
    let str3 = str2.concat('?');   
    let utm = "utm_source=share&utm_medium=web2x&context=3"; 
    let finalResult = str3.concat(utm);

    return finalResult;
}


  // if(urInput.includes('video')){
    //     let trim = urInput.trim();
    //     let str1 = "https://www.facebook.com/plugins/video.php?href=";
    //     let str2 = trim;
    //     let resultFinal = str1.concat(str2);
    //     return resultFinal;
       
    // }else if (urInput.includes('photo')){
        // let trim = urInput.trim();
        // let str1 = "https://www.facebook.com/plugins/post.php?href=";
        // let str2 = trim;
        // let resultFinal = str1.concat(str2);
        // return resultFinal;
    // }