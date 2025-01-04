export const Post = async (url, options) => {
  let output = {};

    const response = await fetch(url, options);
    console.log(response)
    output =await response.json();
    console.log(output)

    
    
  return output;
};
