'use strict'

import { Errors, ValidatorModule } from "../../modules/validation.js";

const validator = new ValidatorModule;

export class SignInFormComponent {
    constructor({ el = document.body } = {}) {
        this._el = el;
    }

    render() {
        const data = { 
            headerForm: "Sign In",
            action: "/sign_in",
            method: "POST",
            classForm: "form__sign_in",
            fields: [
                { name: 'Email', type: 'email', className: 'form__input', errId: 'email_error' },
                { name: 'Password', type: 'password', className: 'form__input', errId: 'password_error' },
                { name: 'Sign In', type: 'submit', className: 'form__button' },
            ],
        };
        const template = window.fest['js/components/Form/Form.tmpl'](data);
        this._el.innerHTML += template;

        this._form = this._el.getElementsByClassName('form__sign_in')[0];
        this._form.addEventListener('submit', function() {
            this._submitForm(event)
        }.bind(this, event));
    }
    
    _submitForm(event) {
        event.preventDefault();

        this._email = this._form["Email"].value;
        this._password = this._form["Password"].value;

        const validators = [
            { 
                func: validator.validateEmail, 
                parameter: this._email, 
                errors: [Errors.email.id, Errors.email.wrongFormat]
            },
            { 
                func: validator.validatePassword, 
                parameter: this._password, 
                errors: [Errors.password.id, Errors.password.wrongFormat] 
            },
        ];

        let validateCounter = 0;
        for (let i = 0; i < validators.length; i++) {
            if (!validators[i].func(validators[i].parameter)) {
                validator.addError(this._form, validators[i].errors[0], validators[i].errors[1]);
            } else {
                validator.addError(this._form, validators[i].errors[0]);
                validateCounter++;
            }
        }

        if (validateCounter == validators.length) {
            // POST
            console.log("Validated!");
        }
    }
}