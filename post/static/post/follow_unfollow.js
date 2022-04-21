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

}