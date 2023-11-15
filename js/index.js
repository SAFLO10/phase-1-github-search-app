const form = document.getElementById('searchForm');
const resultsContainer = document.getElementById('results');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Search for users
    searchUsers(username);
});

function searchUsers(username) {
    const userSearchEndpoint = `https://api.github.com/search/users?q=${username}`;

    fetch(userSearchEndpoint)
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => console.error('Error:', error));
}

function displayUsers(users) {
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" style="width: 50px; height: 50px;">
            <p>Username: ${user.login}</p>
            <p><a href="${user.html_url}" target="_blank">Profile Link</a></p>
        `;
        userDiv.addEventListener('click', () => {
            getUserRepos(user.login);
        });
        resultsContainer.appendChild(userDiv);
    });
}
function getUserRepos(username) {
    const userReposEndpoint = `https://api.github.com/users/${username}/repos`;

    fetch(userReposEndpoint)
        .then(response => response.json())
        .then(data => {
            displayRepos(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayRepos(repos) {
    resultsContainer.innerHTML = '<h2>Repositories:</h2>';
    if (repos.length === 0) {
        resultsContainer.innerHTML += '<p>No repositories found.</p>';
    } else {
        const repoList = document.createElement('ul');
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.textContent = repo.name;
            repoList.appendChild(repoItem);
        });
        resultsContainer.appendChild(repoList);
    }
}