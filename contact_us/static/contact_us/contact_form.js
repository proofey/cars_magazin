const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e){
   e.preventDefault();
   
   const url = contactForm.getAttribute('action');
   const data = new FormData(contactForm);
   const messageBox = document.getElementById('message-box');
   const xhr = new XMLHttpRequest();
   xhr.open('POST', url, true);
   xhr.onload = function(){
       if(this.status === 200){
           const sent = document.createElement('h3');
           sent.textContent = 'Message sent'
           sent.classList.add('message-success');
           messageBox.appendChild(sent);
           setTimeout(function(){
               window.location = '/contact-us/'
           },2000)
       };
   };
   xhr.send(data);
});