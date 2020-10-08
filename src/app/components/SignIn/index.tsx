import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm/>
        <SignInGoogle/>
        <SignInFacebook/>
        <SignInTwitter/>
        <PasswordForgetLink/>
        <SignUpLink/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event: any) => {
        // @ts-ignore
        const {email, password} = this.state;
        // @ts-ignore
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                // @ts-ignore
                this.props.history.push(ROUTES.HOME);
            })
            .catch((error: any) => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = (event: any) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        // @ts-ignore
      const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInGoogleBase extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {error: null};
    }

    onSubmit = (event: any) => {
        // @ts-ignore
        this.props.firebase
            .doSignInWithGoogle()
            // @ts-ignore
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                // @ts-ignore
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.user.displayName,
                    email: socialAuthUser.user.email,
                    roles: {},
                });
            })
            .then(() => {
                this.setState({error: null});
                // @ts-ignore
                this.props.history.push(ROUTES.HOME);
            })
            .catch((error: any) => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({error});
            });

        event.preventDefault();
    };

    render() {
        // @ts-ignore
      const {error} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Google</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInFacebookBase extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {error: null};
    }

    onSubmit = (event: any) => {
        // @ts-ignore
        this.props.firebase
            .doSignInWithFacebook()
            .then((socialAuthUser: any) => {
                // Create a user in your Firebase Realtime Database too
                // @ts-ignore
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.additionalUserInfo.profile.name,
                    email: socialAuthUser.additionalUserInfo.profile.email,
                    roles: {},
                });
            })
            .then(() => {
                this.setState({error: null});
              // @ts-ignore
                this.props.history.push(ROUTES.HOME);
            })
            .catch((error: any) => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({error});
            });

        event.preventDefault();
    };

    render() {
        // @ts-ignore
      const {error} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Facebook</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInTwitterBase extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {error: null};
    }

    onSubmit = (event: any) => {
        // @ts-ignore
        this.props.firebase
            .doSignInWithTwitter()
            .then((socialAuthUser: any) => {
                // Create a user in your Firebase Realtime Database too
                // @ts-ignore
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.additionalUserInfo.profile.name,
                    email: socialAuthUser.additionalUserInfo.profile.email,
                    roles: {},
                });
            })
            .then(() => {
                this.setState({error: null});
                // @ts-ignore
                this.props.history.push(ROUTES.HOME);
            })
            .catch((error: any) => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({error});
            });

        event.preventDefault();
    };

    render() {
        // @ts-ignore
      const {error} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Twitter</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

// @ts-ignore
const SignInForm = compose(withRouter, withFirebase,)(SignInFormBase);

// @ts-ignore
const SignInGoogle = compose(withRouter, withFirebase,)(SignInGoogleBase);

// @ts-ignore
const SignInFacebook = compose(withRouter, withFirebase,)(SignInFacebookBase);

// @ts-ignore
const SignInTwitter = compose(withRouter, withFirebase,)(SignInTwitterBase);

export default SignInPage;

export {SignInForm, SignInGoogle, SignInFacebook, SignInTwitter};