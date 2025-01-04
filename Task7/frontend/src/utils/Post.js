export const Postreq=async(url,options)=>{
    let output={}
    try {
        const response=await fetch(url,options);
        output=await response.json()
    } catch (error) {
        console.log(error)
    }
    console.log(output)
    return output;

}