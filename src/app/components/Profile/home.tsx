import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {compose} from 'recompose';

import {withAuthorization, withEmailVerification} from '../Session';
import { ProfileRegisterPage, ProfileItemPage, ProfileEditPage } from '../Profile';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const ProfileHomePage = () => (
    <div>
        <h1>Home Profile Page</h1>

        <Switch>
            <Route exact path={ROUTES.PROFILE_REGISTER} component={ProfileRegisterPage} />
            <Route path={ROUTES.PROFILE_DETAILS} component={ProfileItemPage} />
            <Route exact path={ROUTES.PROFILE_EDIT} component={ProfileEditPage} />
        </Switch>
    </div>
);

const condition = (authUser: any) =>
    authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(ProfileHomePage);
