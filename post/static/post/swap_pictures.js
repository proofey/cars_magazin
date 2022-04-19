const mainPicture = document.getElementById('mainPicture');
const postPicture = document.getElementsByClassName('post-picture');

for(let i = 0; i < postPicture.length; i++){
    postPicture[i].addEventListener('click', function(){
        mainPicture.innerHTML = ''
        mainPicture.innerHTML = postPicture[i].innerHTML
    });
}