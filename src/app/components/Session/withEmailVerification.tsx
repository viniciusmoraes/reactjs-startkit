import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';

const needsEmailVerification = (authUser: { emailVerified: any; providerData: any[]; }) =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider => provider.providerId)
        .includes('password');

const withEmailVerification = (Component: any) => {
    class WithEmailVerification extends React.Component {
        constructor(props: {} | Readonly<{}>) {
            super(props);

            this.state = {isSent: false};
        }

        onSendEmailVerification = () => {
            // @ts-ignore
            this.props.firebase
                .doSendEmailVerification()
                .then(() => this.setState({isSent: true}));
        };

        render() {
            // @ts-ignore
            const { isSent } = this.state;

            // @ts-ignore
            return needsEmailVerification(this.props.authUser) ? (
                <div>
                    {isSent ? (
                        <p>
                            E-Mail confirmation sent: Check you E-Mails (Spam folder
                            included) for a confirmation E-Mail. Refresh this page
                            once you confirmed your E-Mail.
                        </p>
                    ) : (
                        <p>
                            Verify your E-Mail: Check you E-Mails (Spam folder
                            included) for a confirmation E-Mail or send another
                            confirmation E-Mail.
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={this.onSendEmailVerification}
                        disabled={isSent}
                    >
                        Send confirmation E-Mail
                    </button>
                </div>
            ) : (
                <Component {...this.props} />
            );
        }
    }

    const mapStateToProps = (state: { sessionState: { authUser: any; }; }) => ({
        authUser: state.sessionState.authUser,
    });

    // @ts-ignore
    return compose(withFirebase, connect(mapStateToProps),)(WithEmailVerification);
};

export default withEmailVerification;
