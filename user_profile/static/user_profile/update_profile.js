const updateProfileForm = document.getElementById('update-profile-form');
updateProfileForm.addEventListener('submit', function(e){
    e.preventDefault();

    const url = updateProfileForm.getAttribute('action');
    const token = document.getElementsByName('csrfmidleweartoken');
    const data = new FormData(updateProfileForm);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onload = function(){
        if(this.response === 'Updated'){
            const messageBox = document.getElementById('message-box');
            const message = document.createElement('h1');
            messageBox.appendChild(message);
            message.classList.add('message-success')
            message.innerText = 'Profile Updated'
            setTimeout(function(){
                window.location = '/profile/'
            },800)
        }
    }
    xhr.send(data);
});