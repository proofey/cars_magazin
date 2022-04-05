document.getElementById('registrationForm').addEventListener('submit', registration);

function registration(e){
    e.preventDefault()
    console.log("WORKS")
    
    var form = document.getElementById('registrationForm');
    var formError = document.getElementById('formError');
    var data = new FormData(form);
    var url = form.getAttribute('action');
    var token = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-CSRFToken', token);
    xhr.onload = function(){
        if(this.responseText == "SUCCESS"){
            formError.innerHTML = `<h6 style="color:green">Registration success.You can Log In</h6>`
            setTimeout(function(){
                window.location.replace('/login/')
            },3000)

            
        }else{
            formError.innerHTML = `<h6 style="color:red">Something went wrong...</h6>`
        }
    }
    xhr.send(data);
}