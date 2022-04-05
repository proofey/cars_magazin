document.getElementById('loginForm').addEventListener('submit', login);

function login(e){
    e.preventDefault();

    var form = document.getElementById('loginForm');
    var formError = document.getElementById('formError');
    var url = form.getAttribute('action');
    var data = new FormData(form);
    var token = document.querySelector('[name=csrfmiddlewaretoken]').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-CSRFToken', token);
    xhr.onload = function(){
        if(this.responseText == "GOOD"){
            window.location.replace('/');
        }else{
            formError.innerHTML = `<h6 style="color:red;">Please enter a correct username and password.Note that both fields may be case-sensitive.</h6>`;
        }
    }

    xhr.send(data);
}
