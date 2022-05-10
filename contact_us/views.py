from django.http import HttpResponse
from django.shortcuts import render
from . forms import ContactForm


def contact_us(request):
    form = ContactForm()
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            get_user = form.save(commit=False)
            get_user.user = request.user
            get_user.save()
            return HttpResponse('Message Sent')
    return render(request, 'contact_us/contact_us.html', {
        'form': form
    })
