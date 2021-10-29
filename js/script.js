const profileInformation = document.querySelector(".overview");
const username = "vjards";

//GITHUB PROFILE
const gitHubProfile = async function(){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);

    //display user info function callback
    displayUserInfo(data);
};
//async function callback
gitHubProfile();


//DISPLAY USER INFO FUNCTION
const displayUserInfo = function(data){
   const div = document.createElement("div");
   div.classList.add("user-info");
   div.innerHTML = `
   <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
   `;
   profileInformation.append(div);
};