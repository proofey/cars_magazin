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


// Displays only my posts in my Profile

const profilePost = document.querySelector('profile-post');
const postWall = document.getElementById('postWall');
const myPostsBtn = document.getElementById('myPosts');

if(myPostsBtn){
    myPostsBtn.addEventListener('click', function(){

        const xhr = new XMLHttpRequest();
        xhr.open("GET", '/my-posts', true);
        xhr.onload = function(){
            if(this.status === 200){
                const posts = JSON.parse(this.response);
                postWall.innerHTML = ''
                for(let i = 0; i < posts.length; i++){
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
                }
                followUnfollow();
            };
        };
        xhr.send();
    });

}




// shows only the posts that i follow

const myFollowsBtn = document.getElementById('myFollows');

if(myFollowsBtn){
    myFollowsBtn.addEventListener('click', function(){

        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/my-follows', true);
        xhr.onload = function(){
            const posts = JSON.parse(this.response)
            if(this.status === 200){
                postWall.innerHTML = ''
                for(let i = 0; i < posts.length; i++){
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
                }
                followUnfollow();
            }
        }
        xhr.send();
    });
}
