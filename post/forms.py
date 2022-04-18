from django.forms import CheckboxSelectMultiple, ModelForm
from . models import Post


class PostForm(ModelForm):
    class Meta:
        model = Post
        exclude = ['author']

        widgets = {
            'extras': CheckboxSelectMultiple()
        }
