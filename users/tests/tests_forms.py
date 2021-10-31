from django.http import response
from django.test import TestCase
from users.forms import CustomUserCreationForm,CustomUserChangeForm

# class MyTests(TestCase):
#     def tests_forms(self):
#         response = self.client.post("/users/forms",{'CustomUserCreationForm': 'CustomUserCreationForm'})
#         self.assertFormError(response, 'UserCreationForm', 'CustomUserCreationForm', 'wrong forms')
