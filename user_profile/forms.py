from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User
from django import forms
from . models import Profile


class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class LoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['username', 'password']


class UpdateProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        exclude = ['user', 'post_follows']
        widgets = {
            'first_name': forms.TextInput(attrs={'placeholder':'This Field Is Required'}),
            'last_name': forms.TextInput(attrs={'placeholder':'This Field Is Required'}),
            'phone_number': forms.TextInput(attrs={'placeholder':'This Field Is Required'})
        }