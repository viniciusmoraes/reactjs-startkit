import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';

class UserItem extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        // @ts-ignore
        if (!this.props.user) {
            this.setState({loading: true});
        }
      // @ts-ignore
        this.props.firebase
            // @ts-ignore
            .user(this.props.match.params.id)
            .on('value', (snapshot: any) => {
              // @ts-ignore
                this.props.onSetUser(
                    snapshot.val(),
                    // @ts-ignore
                    this.props.match.params.id,
                );

                this.setState({loading: false});
            });
    }

    componentWillUnmount() {
        // @ts-ignore
        this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail = () => {
        // @ts-ignore
        this.props.firebase.doPasswordReset(this.props.user.email);
    };

    render() {
        // @ts-ignore
        const {user} = this.props;
        // @ts-ignore
        const {loading} = this.state;
        // @ts-ignore
        const paramID = this.props.match.params.id;

        return (
            <div>
                <h2>User ({paramID})</h2>
                {loading && <div>Loading ...</div>}

                {user && (
                    <div>
                      <span>
                        <strong>ID:</strong> {user.uid}
                      </span>
                      <span>
                        <strong>E-Mail:</strong> {user.email}
                      </span>
                      <span>
                        <strong>Username:</strong> {user.username}
                      </span>
                      <span>
                        <button type="button" onClick={this.onSendPasswordResetEmail}>
                          Send Password Reset
                        </button>
                      </span>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any, props: any) => ({
    user: (state.userState.users || {})[props.match.params.id],
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetUser: (user: any, uid: any) => dispatch({type: 'USER_SET', user, uid}),
});

// @ts-ignore
export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(UserItem);
