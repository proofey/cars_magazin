$(document).ready(function(){
    $('#registrationModal').modal('show');
    $('#loginModal').modal('show');
});

// active navbar
var currentLocation = location.href;
var navLink = document.querySelectorAll('.nav-link');
var navLenght = navLink.length;
for(let i=0; i<navLenght; i++){
    if(navLink[i].href === currentLocation){
        navLink[i].classList.add('active-tab');
    }
}


//shows follow/unfollow Icon 

function followUnfollow(){
    const followBtn = document.getElementsByClassName('followBtn');
    for(let i = 0; i < followBtn.length; i++){
        const url = followBtn[i].getAttribute('href');
        followBtn[i].addEventListener('click', function(e){
            e.preventDefault();
        
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function(){
                if(this.responseText === "follow added"){
                    followBtn[i].innerText = '💜'
                }else if(this.responseText === "follow removed"){
                    followBtn[i].innerText = '🤍'
                }
            }
            xhr.send();
        });
    
    };
};
followUnfollow();



// -------------------------------------------------------------------
// ------------------------- PROFILE JAVASCRIPT ----------------------
// -------------------------------------------------------------------


// Concatenate the posts result on Profile page

function concatenateProfilePosts(postWall, posts, i){
    postWall.innerHTML += 
    `<div class="profile-post">
        <div class="row">
            <h6 class="post-created">Created</h6>
            <a class="followBtn" href="/follow-unfollow/${posts[i].pk}">${posts[i].result}</a>
            <a class='post-link' href="/post-details/${posts[i].pk}">
                <div class="post-image">
                    <img class='post-thumbnail' src="${posts[i].main_picture}">
                </div>
                <h4 class="mt-3 ms-2 pot">${posts[i].model}</h4>
                <hr>
                <h3 class="ms-2 text-success">${posts[i].price}$</h3>
                <h5 class="ms-2 pot">${posts[i].year_made}, ${posts[i].fuel.type}, ${posts[i].mileage}km</h5>
                <h6 class="ms-2 mt-2 pot">${posts[i].more_info}</h6>
            </a>
        </div>
    </div>
    `
};


// Commonly used variables

const profilePost = document.querySelector('profile-post');
const postWall = document.getElementById('postWall');
const myPostsBtn = document.getElementById('myPosts');
const myFollowsBtn = document.getElementById('myFollows');

// Adds selected when you visit the Profile page

if(myPostsBtn){
    myPostsBtn.classList.add('btn-selected');
}

// Displays only my posts in my Profile

if(myPostsBtn){
    myPostsBtn.addEventListener('click', function(){

        const xhr = new XMLHttpRequest();
        xhr.open("GET", '/my-posts', true);
        xhr.onload = function(){
            if(this.status === 200){
                const posts = JSON.parse(this.response);
                postWall.innerHTML = ''
                myFollowsBtn.classList.remove('btn-selected');
                myPostsBtn.classList.add('btn-selected');
                for(let i = 0; i < posts.length; i++){
                    concatenateProfilePosts(postWall, posts, i);
                }
                followUnfollow();
            };
        };
        xhr.send();
    });

}




// shows only the posts that i follow


if(myFollowsBtn){
    myFollowsBtn.addEventListener('click', function(){

        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/my-follows', true);
        xhr.onload = function(){
            const posts = JSON.parse(this.response)
            if(this.status === 200){
                postWall.innerHTML = ''
                myPostsBtn.classList.remove('btn-selected');
                myFollowsBtn.classList.add('btn-selected');
                for(let i = 0; i < posts.length; i++){
                    concatenateProfilePosts(postWall, posts, i);
                }
                followUnfollow();
            }
        }
        xhr.send();
    });
}

// ------------------------------------------------------------------------------
// ---------------------------- SEARCH JAVASCRIPTS ------------------------------
// ------------------------------------------------------------------------------


// Concatenate the posts result on the main page

function concatenateMainPagePosts(mainPagePostWall, posts, i){
    mainPagePostWall.innerHTML += 
    `<div class="post">
        <div class="row">
            <h6 class="post-created">Created</h6>
            <a class="followBtn" href="/follow-unfollow/${posts[i].pk}">${posts[i].result}</a>
            <a class='post-link' href="/post-details/${posts[i].pk}">
                <div class="post-image">
                    <img class='post-thumbnail' src="${posts[i].main_picture}">
                </div>
                <h4 class="mt-3 ms-2 pot">${posts[i].model}</h4>
                <hr>
                <h3 class="ms-2 text-success">${posts[i].price}$</h3>
                <h5 class="ms-2 pot">${posts[i].year_made}, ${posts[i].fuel.type}, ${posts[i].mileage}km</h5>
                <h6 class="ms-2 mt-2 pot">${posts[i].more_info}</h6>
            </a>
        </div>
    </div>
    `
};

// Displays "No Results" if search didnt match any post

function ifNoResults(posts){
    if(posts.length < 1){
        const noResult = document.createElement('h1');
        noResult.innerText = 'No results.Try with different search...'
        mainPagePostWall.appendChild(noResult);
    };
};


// Commonly used variables

const mainPagePostWall = document.getElementById('main-page-post-wall');
const resetSearchBtn = document.getElementById('reset-search-btn');

// Search by Coupe

const coupeSearchBtns = document.getElementsByClassName('coupe-search');
for(let i = 0; i < coupeSearchBtns.length; i++){
    coupeSearchBtns[i].addEventListener('click', function(e){
        e.preventDefault();

        const coupeModalBtn = document.getElementById('coupe-modal-btn');
        const coupeModal = document.getElementById('coupeModal');
        coupeModalBtn.classList.add('btn-selected');
        resetSearchBtn.classList.add('btn-selected');
        let modal = bootstrap.Modal.getInstance(coupeModal);
        modal.hide();
        
        const url = coupeSearchBtns[i].getAttribute('href');
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function(){
            const posts = JSON.parse(this.response);
            if(this.status === 200){
                mainPagePostWall.innerHTML = ''
                ifNoResults(posts);
                for(let i = 0; i < posts.length; i++){
                    coupeModalBtn.innerText = posts[i].coupe.type
                    concatenateMainPagePosts(mainPagePostWall, posts, i);
                };
                followUnfollow();
            };
        };
        xhr.send();
    });
}

// Search by Model

const modelForm = document.getElementById('model-form');
modelForm.addEventListener('submit', function(e){
    e.preventDefault();

    const modelModalBtn = document.getElementById('model-modal-btn');
    const modelModal = document.getElementById('modelModal');
    modelModalBtn.classList.add('btn-selected');
    resetSearchBtn.classList.add('btn-selected');
    let modal = bootstrap.Modal.getInstance(modelModal);
    modal.hide();
    
    const data = new FormData(modelForm);
    const url = modelForm.getAttribute('action');
    const token = document.getElementsByName('csrfmiddleweartoken')[0];
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-CSRFToken', token);
    xhr.onload = function(){
        const posts = JSON.parse(this.response);
        if(this.status === 200){
            modelModalBtn.innerText = data.get('model-input');
            mainPagePostWall.innerHTML = ''
            ifNoResults(posts);
            for(let i = 0; i < posts.length; i++){
                concatenateMainPagePosts(mainPagePostWall, posts, i);
            }
            followUnfollow();
        };
    }
    xhr.send(data);
});

