let input = document.querySelector(".get-repos input"),
  button = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data");

button.onclick = function () {
  getRepos();
};

function getRepos() {
  input.value == ""
    ? (reposData.innerHTML = "<span>Pleas Write Github Username.</span>")
    : fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response) => response.json())

        .then((repositories) => {
          reposData.innerHTML = "";

          repositories.forEach((repo) => {
            // main div
            let mainDiv = document.createElement("div");
            // repo name text
            let repoName = document.createTextNode(repo.name);
            // append text to main div
            mainDiv.appendChild(repoName);
            // stars text
            let stars = document.createElement("span");
            stars.textContent = `Stars ${repo.stargazers_count}`;
            // append stars to mainDiv
            mainDiv.appendChild(stars);
            // url a
            let repoUrl = document.createElement("a");
            repoUrl.textContent = "Visit";
            repoUrl.setAttribute("target", "_blank");
            repoUrl.href = `https://github.com/${input.value}/${repo.name}`;
            // append a to mainDiv
            mainDiv.appendChild(repoUrl);
            // append main div to container
            reposData.appendChild(mainDiv);

            mainDiv.className = "repo-box";
          });
        });
}
