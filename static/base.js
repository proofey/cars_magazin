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
                if(this.status === 200){
                    if(this.responseText === "follow added"){
                        followBtn[i].innerText = '💜'
                    }else if(this.responseText === "follow removed"){
                        followBtn[i].innerText = '🤍'
                    }
                }else{
                    window.location = 'login/'
                };
            };
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
            <h6 class="post-created">${posts[i].created}</h6>
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
    myPostsBtn.addEventListener('click', function(e){
        e.preventDefault();

        const url = myPostsBtn.getAttribute('href');
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function(){
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                postWall.innerHTML = ''
                myFollowsBtn.classList.remove('btn-selected');
                myPostsBtn.classList.add('btn-selected');
                for(let i = 0; i < posts.length; i++){
                    concatenateProfilePosts(postWall, posts, i);
                }
                followUnfollow();
                getRequestPagination(response, url);
            };
        };
        xhr.send();
    });

}




// shows only the posts that i follow


if(myFollowsBtn){
    myFollowsBtn.addEventListener('click', function(e){
        e.preventDefault();

        const url = myFollowsBtn.getAttribute('href');
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function(){
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                postWall.innerHTML = ''
                myPostsBtn.classList.remove('btn-selected');
                myFollowsBtn.classList.add('btn-selected');
                for(let i = 0; i < posts.length; i++){
                    concatenateProfilePosts(postWall, posts, i);
                }
                followUnfollow();
                getRequestPagination(response, url);
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
            <h6 class="post-created">${posts[i].created}</h6>
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
        resetSearchBtn.classList.remove('btn-selected');
        searchMenu.innerHTML = ''
        searchMenu.innerHTML = 
        `
        <button id="coupe-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#coupeModal">Coupe</button>
        <button id="model-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#modelModal">Model</button>
        <button id="fuel-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#fuelModal">Fuel</button>
        <button id="transmission-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#transmissionModal">Transmission</button>
        <button id="price-limit-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#priceLimitModal">Price Limit</button>
        <button id="location-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#locationModal">Location</button>
        <button id="year-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#yearModal">Minimum Year</button>
        `
    };
};


// Commonly used variables

const mainPagePostWall = document.getElementById('main-page-post-wall');
const resetSearchBtn = document.getElementById('reset-search-btn');

// Reset Searchbar

const searchMenu = document.getElementById('search-menu');

if(resetSearchBtn){
    resetSearchBtn.addEventListener('click', function(e){
        e.preventDefault();
        const url = resetSearchBtn.getAttribute('href');
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function(){
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                searchMenu.innerHTML = ''
                searchMenu.innerHTML = 
                `
                <button id="coupe-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#coupeModal">Coupe</button>
                <button id="model-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#modelModal">Model</button>
                <button id="fuel-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#fuelModal">Fuel</button>
                <button id="transmission-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#transmissionModal">Transmission</button>
                <button id="price-limit-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#priceLimitModal">Price Limit</button>
                <button id="location-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#locationModal">Location</button>
                <button id="year-modal-btn" type="button" class="btn mybtn" data-bs-toggle="modal" data-bs-target="#yearModal">Minimum Year</button>
                `
                resetSearchBtn.classList.remove('btn-selected');
                mainPagePostWall.innerHTML = ''
                ifNoResults(posts);
                for(let i = 0; i < posts.length; i++){
                    concatenateMainPagePosts(mainPagePostWall, posts, i)
                };
                followUnfollow();
                getRequestPagination(response, url);
            };
        };
        xhr.send();
    });
};





// Search by Coupe

const coupeSearchBtns = document.getElementsByClassName('coupe-search');
for(let i = 0; i < coupeSearchBtns.length; i++){
    coupeSearchBtns[i].addEventListener('click', function(e){
        e.preventDefault();

        const coupeModalBtn = document.getElementById('coupe-modal-btn');
        const coupeModal = document.getElementById('coupeModal');
        coupeModalBtn.classList.add('btn-selected');
        coupeModalBtn.removeAttribute('data-bs-target');
        resetSearchBtn.classList.add('btn-selected');
        let modal = bootstrap.Modal.getInstance(coupeModal);
        modal.hide();
        
        const url = coupeSearchBtns[i].getAttribute('href');
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function(){
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                mainPagePostWall.innerHTML = ''
                ifNoResults(posts);
                for(let i = 0; i < posts.length; i++){
                    coupeModalBtn.innerText = `Coupe: ${posts[i].coupe.type}`
                    concatenateMainPagePosts(mainPagePostWall, posts, i);
                };
                followUnfollow();
                getRequestPagination(response, url);
            };
        };
        xhr.send();
    });
}

// Search by Model

const modelForm = document.getElementById('model-form');
if(modelForm){
    modelForm.addEventListener('submit', function(e){
        e.preventDefault();
    
        const modelModalBtn = document.getElementById('model-modal-btn');
        const modelModal = document.getElementById('modelModal');
        modelModalBtn.classList.add('btn-selected');
        modelModalBtn.removeAttribute('data-bs-target');
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
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                modelModalBtn.innerText = `Model: ${data.get('model-input')}`
                mainPagePostWall.innerHTML = ''
                ifNoResults(posts);
                for(let i = 0; i < posts.length; i++){
                    concatenateMainPagePosts(mainPagePostWall, posts, i);
                }
                followUnfollow();
                postRequestPagination(response, url, data, token);
            };
        }
        xhr.send(data);
    });
    
};


// Search by Fuel

const fuelSearchBtns = document.getElementsByClassName('fuel-search');
for(let i = 0; i < fuelSearchBtns.length; i++){
    fuelSearchBtns[i].addEventListener('click', function(e){
        e.preventDefault();

        const fuelModalBtn = document.getElementById('fuel-modal-btn');
        const fuelModal = document.getElementById('fuelModal');
        fuelModalBtn.classList.add('btn-selected');
        fuelModalBtn.removeAttribute('data-bs-target');
        resetSearchBtn.classList.add('btn-selected');
        let modal = bootstrap.Modal.getInstance(fuelModal);
        modal.hide();

        const url = fuelSearchBtns[i].getAttribute('href');

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function(){
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                mainPagePostWall.innerHTML = ''
                ifNoResults(posts);
                for(let i = 0; i < posts.length; i++){
                    fuelModalBtn.innerText = `Fuel: ${posts[i].fuel.type}`
                    concatenateMainPagePosts(mainPagePostWall, posts, i);
                };
                followUnfollow();
                getRequestPagination(response, url);
            };
        };
        xhr.send();
    });
};

// Search by Transmission

const transmissionSearchBtns = document.getElementsByClassName('transmission-search');
for(let i = 0; i < transmissionSearchBtns.length; i++){
    transmissionSearchBtns[i].addEventListener('click', function(e){
        e.preventDefault();

        const transmissionModalBtn = document.getElementById('transmission-modal-btn');
        const transmissionModal = document.getElementById('transmissionModal');
        transmissionModalBtn.classList.add('btn-selected');
        transmissionModalBtn.removeAttribute('data-bs-target');
        resetSearchBtn.classList.add('btn-selected');
        let modal = bootstrap.Modal.getInstance(transmissionModal);
        modal.hide();

        const url = transmissionSearchBtns[i].getAttribute('href');

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function(){
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                mainPagePostWall.innerHTML = ''
                ifNoResults(posts);
                for(let i = 0; i < posts.length; i++){
                    transmissionModalBtn.innerText = `Transmission: ${posts[i].gearbox.type}`
                    concatenateMainPagePosts(mainPagePostWall, posts, i);
                };
                followUnfollow();
                getRequestPagination(response, url);
            };
        };
        xhr.send();
    });
};

// Search by Price Limit

const priceLimitForm = document.getElementById('price-limit-form');
if(priceLimitForm){
    priceLimitForm.addEventListener('submit', function(e){
        e.preventDefault();
    
        const priceLimitModalBtn = document.getElementById('price-limit-modal-btn');
        const priceLimitModal = document.getElementById('priceLimitModal');
        priceLimitModalBtn.classList.add('btn-selected');
        priceLimitModalBtn.removeAttribute('data-bs-target');
        resetSearchBtn.classList.add('btn-selected');
        let modal = bootstrap.Modal.getInstance(priceLimitModal);
        modal.hide();
        
        const data = new FormData(priceLimitForm);
        const url = priceLimitForm.getAttribute('action');
        const token = document.getElementsByName('csrfmiddleweartoken')[0];
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-CSRFToken', token);
        xhr.onload = function(){
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                priceLimitModalBtn.innerText = `Price Limit: ${data.get('price-limit-input')}`
                mainPagePostWall.innerHTML = ''
                ifNoResults(posts);
                for(let i = 0; i < posts.length; i++){
                    concatenateMainPagePosts(mainPagePostWall, posts, i);
                }
                followUnfollow();
                postRequestPagination(response, url, data, token);
            };
        }
        xhr.send(data);
    });
};


// Search by Location

const locationForm = document.getElementById('location-form');
if(locationForm){
    locationForm.addEventListener('submit', function(e){
        e.preventDefault();
    
        const locationModalBtn = document.getElementById('location-modal-btn');
        const locationModal = document.getElementById('locationModal');
        locationModalBtn.classList.add('btn-selected');
        locationModalBtn.removeAttribute('data-bs-target');
        resetSearchBtn.classList.add('btn-selected');
        let modal = bootstrap.Modal.getInstance(locationModal);
        modal.hide();
        
        const data = new FormData(locationForm);
        const url = locationForm.getAttribute('action');
        const token = document.getElementsByName('csrfmiddleweartoken')[0];
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-CSRFToken', token);
        xhr.onload = function(){
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                locationModalBtn.innerText = `Location: ${data.get('location-input')}`
                mainPagePostWall.innerHTML = ''
                ifNoResults(posts);
                for(let i = 0; i < posts.length; i++){
                    concatenateMainPagePosts(mainPagePostWall, posts, i);
                }
                followUnfollow();
                postRequestPagination(response, url, data, token);
            };
        }
        xhr.send(data);
    });
    
};


// Search by Minimum Year

const yearForm = document.getElementById('year-form');
if(yearForm){
    yearForm.addEventListener('submit', function(e){
        e.preventDefault();
    
        const yearModalBtn = document.getElementById('year-modal-btn');
        const yearModal = document.getElementById('yearModal');
        yearModalBtn.classList.add('btn-selected');
        yearModalBtn.removeAttribute('data-bs-target');
        resetSearchBtn.classList.add('btn-selected');
        let modal = bootstrap.Modal.getInstance(yearModal);
        modal.hide();
        
        const data = new FormData(yearForm);
        const url = yearForm.getAttribute('action');
        const token = document.getElementsByName('csrfmiddleweartoken')[0];
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-CSRFToken', token);
        xhr.onload = function(){
            if(this.status === 200){
                const response = JSON.parse(this.response);
                const posts = response.posts
                yearModalBtn.innerText = `Minimum Year: ${data.get('year-input')}`
                mainPagePostWall.innerHTML = ''
                ifNoResults(posts);
                for(let i = 0; i < posts.length; i++){
                    concatenateMainPagePosts(mainPagePostWall, posts, i);
                }
                followUnfollow();
                postRequestPagination(response, url, data, token);
            };
        }
        xhr.send(data);
    });
};

const paginationBtns = document.getElementsByClassName('pagination');
const paginationBox = document.getElementById('pagination-box');

// Pagination function for GET request


// Check if you are on main page or profile page 

function indicateWall(posts){
    if(mainPagePostWall){
        mainPagePostWall.innerHTML = ''
        ifNoResults(posts);
        for(let i = 0; i < posts.length; i++){
            concatenateMainPagePosts(mainPagePostWall, posts, i)
        };
    }else if(postWall){
        postWall.innerHTML = ''
        myFollowsBtn.classList.remove('btn-selected');
        myPostsBtn.classList.add('btn-selected');
        for(let i = 0; i < posts.length; i++){
            concatenateProfilePosts(postWall, posts, i);
        };
    };
};

function getRequestPagination(response, url){
    paginationBox.innerHTML = ''

    if(response.has_previous){
        const getFirst = document.createElement('a');
        const getPrevious = document.createElement('a');
        paginationBox.appendChild(getFirst);
        paginationBox.appendChild(getPrevious);
        getFirst.setAttribute('href', `${url}1`);
        getFirst.classList.add('pagination');
        getPrevious.classList.add('pagination');
        getPrevious.setAttribute('href', `${url}${response.previous_page_number}`);
        getFirst.innerText = '<< '
        getPrevious.innerText = 'Previous '

    };
    const currentPage = document.createElement('a');
    paginationBox.appendChild(currentPage);
    currentPage.setAttribute('href', `${url}${response.number}`);
    currentPage.classList.add('pagination');
    currentPage.innerText = `page ${response.number} of ${response.num_pages}`
    if(response.has_next){
        const getNext = document.createElement('a');
        const getLast = document.createElement('a');
        paginationBox.appendChild(getNext);
        paginationBox.appendChild(getLast);
        getNext.setAttribute('href', `${url}${response.next_page_number}`);
        getLast.setAttribute('href', `${url}${response.num_pages}`);
        getNext.classList.add('pagination');
        getLast.classList.add('pagination');
        getNext.innerText = ' Next'
        getLast.innerText = ' >>'
    };
    
    for(let i = 0; i < paginationBtns.length; i++){
        paginationBtns[i].addEventListener('click', function(e){
            e.preventDefault();

            const paginationUrl = paginationBtns[i].getAttribute('href');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', paginationUrl, true);
            xhr.onload = function(){
                if(this.status === 200){
                    const response =  JSON.parse(this.response);
                    const posts = response.posts
                    indicateWall(posts);
                    followUnfollow();
                    getRequestPagination(response, url);
                };
            };
            xhr.send();

        });
    }

};

// Pagination function for POST request

function postRequestPagination(response, url, data, token){
    paginationBox.innerHTML = ''
    
    if(response.has_previous){
        const getFirst = document.createElement('a');
        const getPrevious = document.createElement('a');
        paginationBox.appendChild(getFirst);
        paginationBox.appendChild(getPrevious);
        getFirst.setAttribute('href', `${url}1`);
        getFirst.classList.add('pagination');
        getPrevious.classList.add('pagination');
        getPrevious.setAttribute('href', `${url}${response.previous_page_number}`);
        getFirst.innerText = '<< '
        getPrevious.innerText = 'Previous '

    };
    const currentPage = document.createElement('a');
    paginationBox.appendChild(currentPage);
    currentPage.setAttribute('href', `${url}${response.number}`);
    currentPage.classList.add('pagination');
    currentPage.innerText = `page ${response.number} of ${response.num_pages}`
    if(response.has_next){
        const getNext = document.createElement('a');
        const getLast = document.createElement('a');
        paginationBox.appendChild(getNext);
        paginationBox.appendChild(getLast);
        getNext.setAttribute('href', `${url}${response.next_page_number}`);
        getLast.setAttribute('href', `${url}${response.num_pages}`);
        getNext.classList.add('pagination');
        getLast.classList.add('pagination');
        getNext.innerText = ' Next'
        getLast.innerText = ' >>'
    };


    for(let i = 0; i < paginationBtns.length; i++){
        paginationBtns[i].addEventListener('click', function(e){
            e.preventDefault();

            const paginationUrl = paginationBtns[i].getAttribute('href');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', paginationUrl, true);
            xhr.setRequestHeader('X-CSRFToken', token);
            xhr.onload = function(){
                if(this.status === 200){
                    const response =  JSON.parse(this.response);
                    const posts = response.posts

                    mainPagePostWall.innerHTML = ''
                    ifNoResults(posts);
                    for(let i = 0; i < posts.length; i++){
                        concatenateMainPagePosts(mainPagePostWall, posts, i)
                    };
                    followUnfollow();
                    postRequestPagination(response, url, data, token);
                };
            };
            xhr.send(data);

        });
    };
};

// Pagination function for the landing rendered page

function homePagePagination(){
    for(let i = 0; i < paginationBtns.length; i++){
        paginationBtns[i].addEventListener('click', function(e){
            e.preventDefault();

            const url = '/all-posts/'
            const paginationUrl = paginationBtns[i].getAttribute('href');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', paginationUrl, true);
            xhr.onload = function(){
                if(this.status === 200){
                    const response =  JSON.parse(this.response);
                    const posts = response.posts
                    indicateWall(posts);
                    followUnfollow();
                    getRequestPagination(response, url);
                };
            };
            xhr.send();
        });
    };
};
homePagePagination();

const profilePagitanionBtns = document.getElementsByClassName('profile-pagination');

function profilePagePagination(){
    for(let i = 0; i < profilePagitanionBtns.length; i++){
        profilePagitanionBtns[i].addEventListener('click', function(e){
            e.preventDefault();

            const url = '/my-posts/'
            const paginationUrl = profilePagitanionBtns[i].getAttribute('href');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', paginationUrl, true);
            xhr.onload = function(){
                if(this.status === 200){
                    const response =  JSON.parse(this.response);
                    const posts = response.posts
                    indicateWall(posts);
                    followUnfollow();
                    getRequestPagination(response, url);
                };
            };
            xhr.send();
        });
    };
};
profilePagePagination();