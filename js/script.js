const profileInformation = document.querySelector(".overview");
const username = "vjards";
const repoList = document.querySelector(".repo-list");
const reposContainer = document.querySelector(".repos");
const repoDatabase = document.querySelector(".repo-data")
const repoGalleryButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

//FETCHING GITHUB PROFILE
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
   //FETCHING GITHUBS REPO FUNCTION CALLBACK
   gitRepos(username);
};

//FETCHING GITHUB REPOS
const gitRepos = async function(username){
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    //REPO INFO FUNCTION CALLBACK
    repoInfo(repoData);
};

//REPO INFORMATION
const repoInfo = function(repos){
  filterInput.classList.remove("hide");
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML=`<h3> ${repo.name}</h3>`;
    repoList.append(repoItem);  
    }
};

//CLICK EVENT FOR REPO BUTTONS
repoList.addEventListener("click",function(e){
  if (e.target.matches("h3")){
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

//FETCH SPECIFIC REPO INFORMATION
const getRepoInfo = async function(repoName){
  const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoStatus = await fetchRepoInfo.json();
  //console.log(repoStatus);

  //FETCH LANGAUGE DATA
  const fetchLanguages = await fetch (repoStatus.languages_url);
  const languageData = await fetchLanguages.json();
  //console.log(languageData);

  //LANGUAGES ARRAY
  const languages =[];
  for(const language in languageData){
   languages.push(language);
  }
  //console.log(languages)

  displayRepoInfo(repoStatus, languages);
};

// DISPLAY INDIVIDUAL REPO INFORMATION
const displayRepoInfo = function(repoStatus, languages){
  repoDatabase.innerHTML ="";
  repoDatabase.classList.remove("hide");
  reposContainer.classList.add("hide");
  repoGalleryButton.classList.remove("hide");

  
  const div = document.createElement("div");
  div.innerHTML =`
  <h3>Name: ${repoStatus.name}</h3>
    <p>Description: ${repoStatus.description}</p>
    <p>Default Branch: ${repoStatus.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoStatus.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `
  //repo-data class
  repoDatabase.append(div);
  
};

//CLICK EVENT FOR "BACK TO GALLERY" REPO BUTTON
  repoGalleryButton.addEventListener("click", function(){
  reposContainer.classList.remove("hide");
  repoDatabase.classList.add("hide");
  repoGalleryButton.classList.add("hide");
});

//DYNAMIC SEARCH BAR
filterInput.addEventListener("input", function(e){
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchText.toLowerCase();

  for (const repo of repos){
    const repoLowerText = repo.innerText.toLowerCase();
    if(repoLowerText.includes(searchLowerText)){
      repo.classList.remove("hide");
    }else{
      repo.classList.add("hide");
    }
  }
});