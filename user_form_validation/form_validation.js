class Validator{
    static REQUIRED = 'REQUIRED';
    static MIN_LENGTH = 'MIN_LENGTH';
    static NUMBER_FORMAT = 'NUMBER_FORMAT'; 
    static EMAIL_FORMAT = 'EMAIL_FORMAT';

    // To call the static method we do not need to create an instance or object of the class
    static createValidations(formGroup) {
        formGroup.validations.forEach(validator => {
            if(validator === this.REQUIRED) {
                if(formGroup.value === '' ) {
                    formGroup.addError({
                        field: formGroup.id,
                        message: `${formGroup.id} cannot be empty`
                    });
                }                
            }
            if(validator === this.NUMBER_FORMAT) {
                let regx = /^[6-9]\d{9}$/ ;
                if(formGroup.value !== '' && !regx.test(formGroup.value)) {
                    formGroup.addError({
                        field: formGroup.id,
                        message: `${formGroup.id} should be valid number`,
                    });
                }
            }
            if(validator === this.EMAIL_FORMAT) {
                let regx = /\S+@\S+\.\S+/;
                if(formGroup.value !== '' && !regx.test(formGroup.value)) {
                    formGroup.addError({
                        field: formGroup.id,
                        message: `${formGroup.id} should be valid`,
                    });
                }
            }
        });        
    }
}

class FormGroup{
    constructor(id, validations) {
        this._id = id;
        this._validations = validations;
        this._value;
        this._errors = [];
    }

    get id() {
        return this._id;
    }

    get value() {
        this._value = document.getElementById(this._id).value.trim();
        return this._value;
    }

    get validations() {
        return this._validations;
    }

    get errors() {
        return this._errors;
    }

    addError(error) {
        this._errors.push(error);
    }

    removeErrors() {
        this._errors = [];
    }
}

class Form{

    constructor(formId) {
        this._form = document.getElementById(formId);
        this._form.addEventListener('submit', this.formHandler.bind(this));
        this._formGroups = [];
    }

    createFormGroups(formGroup) {
        this._formGroups = formGroup;
    }

    clearErrors() {
        this._formGroups.forEach((formGroup) => formGroup.removeErrors());
    }

    createErrorElem(id, error) {
        const inputElem = document.getElementById(id);
        const element = document.createElement("div");
        element.setAttribute("class","error");
        element.innerText = error;
        inputElem.insertAdjacentHTML('afterend', element.outerHTML);
    }

    clear() {
        const errorElems = document.querySelectorAll('.error');
        errorElems.forEach(errorElem => errorElem.remove());
    }

    displayErrors() {
        this.clear();
        this._formGroups.forEach(formGroup => {
            formGroup._errors.forEach(error => {
                this.createErrorElem(formGroup._id, error.message);
            });
        });
    }

    formHandler(event) {
        event.preventDefault(); // prevent default submit functionality for validation cheking
        this.clearErrors();
        this._formGroups.forEach((formGroup) => {
            Validator.createValidations(formGroup);
        });
        this.displayErrors();
    }
}

const form = new Form('registerForm');
form.createFormGroups([
    new FormGroup('name', [Validator.REQUIRED]),
    new FormGroup('mobile', [Validator.REQUIRED, Validator.NUMBER_FORMAT]),
    new FormGroup('email', [Validator.REQUIRED, Validator.EMAIL_FORMAT]),
    new FormGroup('password', [Validator.REQUIRED])
]);