import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault()

        const {email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
            console.error(error);
        }

        this.setState({ email: '', password: '' })
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="sign-in">
                <h2>У меня уже есть аккаунт</h2>
                <span>Войти с почтой и паролем</span>

                <form onSubmit={ this.handleSubmit }>
                    <FormInput 
                        name="email" 
                        type="email" 
                        value={this.state.email} 
                        label='email'
                        handleChange={this.handleChange}
                        required 
                    />
                    <FormInput 
                        name="password" 
                        type="password" 
                        value={this.state.password} 
                        label="password"
                        handleChange={this.handleChange}
                        required 
                    />
                    <div className="buttons">
                        <CustomButton type="submit"> Войти </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Войти с помощью Google</CustomButton>
                    </div>
                    
                </form>
            </div>
        ) 
    }
}

export default SignIn;