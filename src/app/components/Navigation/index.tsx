import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

// @ts-ignore
const Navigation = ({authUser}) =>
    authUser ? (
        <NavigationAuth authUser={authUser}/>
    ) : (
        <NavigationNonAuth/>
    );

// @ts-ignore
const NavigationAuth = ({authUser}) => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
        )}
        {!!authUser.roles[ROLES.ADMIN] && (
            <li>
                <Link to={ROUTES.PROFILE}>Profile</Link>
            </li>
        )}
        <li>
            <SignOutButton/>
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
);

const mapStateToProps = (state: { sessionState: { authUser: any; }; }) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
