import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

class UserList extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        // @ts-ignore
        if (!this.props.users.length) {
            this.setState({loading: true});
        }

      // @ts-ignore
        this.props.firebase.users().on('value', snapshot => {
             // @ts-ignore
            this.props.onSetUsers(snapshot.val());

            this.setState({loading: false});
        });
    }

    componentWillUnmount() {
        // @ts-ignore
        this.props.firebase.users().off();
    }

    render() {
        // @ts-ignore
        const {users} = this.props;
        // @ts-ignore
        const {loading} = this.state;

        return (
            <div>
                <h2>Users</h2>
                {loading && <div>Loading ...</div>}
                <ul>
                    {users.map((user: any) => (
                        <li key={user.uid}>
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
                            <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                              Details
                            </Link>
                          </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    users: Object.keys(state.userState.users || {}).map(key => ({
        ...state.userState.users[key],
        uid: key,
    })),
});

const mapDispatchToProps = (dispatch: any) => ({
    onSetUsers: (users: any) => dispatch({type: 'USERS_SET', users}),
});

// @ts-ignore
export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(UserList);
