const inputBox = document.querySelector("input");
const button = document.querySelector("button");
const DATA =[{id:"bio"},
    {id:"name"},
    {id:"twitter_username"},
    {id:"followers"},
    {id:"avatar_url",isImage:true}
    ]
button.addEventListener("click",async(event)=>{
    event.preventDefault();

   const userName = inputBox.value;
   try {
    const result = await fetchData(userName);
    DATA.forEach((item)=>{fillData({...item,data:result[item.id]})});
   } catch (error) {
    alert(error)
   }})
async function fetchData(username) {
    const result = await fetch(`https://api.github.com/users/${username}`);
    if(result.ok){
    return result.json();
    }
    else{
        return Promise.reject(new Error("This user is not found"));
    } 
}

const fillData = (obj)=>{
    const element = document.querySelector(`#${obj.id}`);
    if(!obj.isImage){
    element.textContent=obj.data;}
    else{   
    element.src=obj.data;
    } 
}
