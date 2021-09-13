# Form validation using Object Oriented Programming

![Registration-Form](form_validation.png)

Implement using Classes like Validator, FormGroup, Form. We can use this reusable code for many forms.
Only the bellow code is required to call the Form reusable code.

```
const form = new Form('registerForm');
form.createFormGroups([
    new FormGroup('name', [Validator.REQUIRED]),
    new FormGroup('mobile', [Validator.REQUIRED, Validator.NUMBER_FORMAT]),
    new FormGroup('email', [Validator.REQUIRED, Validator.EMAIL_FORMAT]),
    new FormGroup('password', [Validator.REQUIRED])
]);
```
