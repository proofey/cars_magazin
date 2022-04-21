const profilePost = document.querySelector('profile-post');
const myPostsBtn = document.getElementById('myPosts');
const postWall = document.getElementById('postWall');

myPostsBtn.addEventListener('click', function(){

    const xhr = new XMLHttpRequest();
    xhr.open("GET", '/my-posts', true);
    xhr.onload = function(){
        if(this.status === 200){
            const posts = JSON.parse(this.response);
            console.log(posts)
            postWall.innerHTML = ''
            for(let i = 0; i < posts.length; i++){
                postWall.innerHTML += `
                <div class="profile-post">
                    <div class="row">
                        <h6 class="post-created">Created</h6>
                        <a class="followBtn" href="/follow-unfollow/${posts[i].pk}">${posts[i].follow_logo}</a>
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
        };
    };
    xhr.send();
});
