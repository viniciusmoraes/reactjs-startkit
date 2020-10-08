import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgetForm/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event: any) => {
        // @ts-ignore
      const {email} = this.state;
      //@ts-ignore
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
            })
            .catch((error: any) => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        // @ts-ignore
      const {email, error} = this.state;

        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <button disabled={isInvalid} type="submit">
                    Reset My Password
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink};
