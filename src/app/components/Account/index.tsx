import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {withAuthorization, withEmailVerification} from '../Session';
import {withFirebase} from '../Firebase';
import {PasswordForgetForm} from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const SIGN_IN_METHODS = [
    {
        id: 'password',
        provider: null,
    },
    {
        id: 'google.com',
        provider: 'googleProvider',
    },
    {
        id: 'facebook.com',
        provider: 'facebookProvider',
    },
    {
        id: 'twitter.com',
        provider: 'twitterProvider',
    },
];

// @ts-ignore
const AccountPage = ({authUser}) => (
    <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm/>
        <PasswordChangeForm/>
        <LoginManagement authUser={authUser}/>
    </div>
);

class LoginManagementBase extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            activeSignInMethods: [],
            error: null,
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {
        //@ts-ignore
        this.props.firebase.auth
            //@ts-ignore
            .fetchSignInMethodsForEmail(this.props.authUser.email)
            .then((activeSignInMethods: any) =>
                this.setState({activeSignInMethods, error: null}),
            )
            .catch((error: any) => this.setState({error}));
    };

    onSocialLoginLink = (provider: string | number) => {
        //@ts-ignore
        this.props.firebase.auth.currentUser
            //@ts-ignore
            .linkWithPopup(this.props.firebase[provider])
            .then(this.fetchSignInMethods)
            .catch((error: any) => this.setState({error}));
    };

    onDefaultLoginLink = (password: any) => {
        //@ts-ignore
        const credential = this.props.firebase.emailAuthProvider.credential(
            //@ts-ignore
            this.props.authUser.email,
            password,
        );

        //@ts-ignore
        this.props.firebase.auth.currentUser
            .linkAndRetrieveDataWithCredential(credential)
            .then(this.fetchSignInMethods)
            .catch((error: any) => this.setState({error}));
    };

    onUnlink = (providerId: any) => {
        //@ts-ignore
        this.props.firebase.auth.currentUser
            .unlink(providerId)
            .then(this.fetchSignInMethods)
            .catch((error: any) => this.setState({error}));
    };

    render() {
        // @ts-ignore
        const {activeSignInMethods, error} = this.state;

        return (
            <div>
                Sign In Methods:
                <ul>
                    {SIGN_IN_METHODS.map(signInMethod => {
                        const onlyOneLeft = activeSignInMethods.length === 1;
                        const isEnabled = activeSignInMethods.includes(
                            signInMethod.id,
                        );

                        return (
                            <li key={signInMethod.id}>
                                {signInMethod.id === 'password' ? (
                                    <DefaultLoginToggle
                                        //@ts-ignore
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onDefaultLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                ) : (
                                    <SocialLoginToggle
                                        onlyOneLeft={onlyOneLeft}
                                        isEnabled={isEnabled}
                                        signInMethod={signInMethod}
                                        onLink={this.onSocialLoginLink}
                                        onUnlink={this.onUnlink}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
                {error && error.message}
            </div>
        );
    }
}

// @ts-ignore
const SocialLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink,}) =>
    isEnabled ? (
        <button
            type="button"
            onClick={() => onUnlink(signInMethod.id)}
            disabled={onlyOneLeft}
        >
            Deactivate {signInMethod.id}
        </button>
    ) : (
        <button
            type="button"
            onClick={() => onLink(signInMethod.provider)}
        >
            Link {signInMethod.id}
        </button>
    );

class DefaultLoginToggle extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {passwordOne: '', passwordTwo: ''};
    }

    onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        //@ts-ignore
        this.props.onLink(this.state.passwordOne);
        this.setState({passwordOne: '', passwordTwo: ''});
    };

    onChange = (event: { target: { name: any; value: any; }; }) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        // @ts-ignore
        const {onlyOneLeft, isEnabled, signInMethod, onUnlink,} = this.props;

        // @ts-ignore
        const {passwordOne, passwordTwo} = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return isEnabled ? (
            <button
                type="button"
                onClick={() => onUnlink(signInMethod.id)}
                disabled={onlyOneLeft}
            >
                Deactivate {signInMethod.id}
            </button>
        ) : (
            <form onSubmit={this.onSubmit}>
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                />

                <button disabled={isInvalid} type="submit">
                    Link {signInMethod.id}
                </button>
            </form>
        );
    }
}

const LoginManagement = withFirebase(LoginManagementBase);

const mapStateToProps = (state: { sessionState: { authUser: any; }; }) => ({
    authUser: state.sessionState.authUser,
});

const condition = (authUser: any) => !!authUser;

// @ts-ignore
export default compose(connect(mapStateToProps), withEmailVerification, withAuthorization(condition),)(AccountPage);
