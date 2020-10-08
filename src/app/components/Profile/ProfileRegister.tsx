import React, {Component} from 'react';
import {compose} from 'recompose';
import {withAuthorization, withEmailVerification} from '../Session';
import {Link, withRouter} from 'react-router-dom';
import * as ROLES from '../../constants/roles';
import {withFirebase} from '../Firebase';
import * as ROUTES from "../../constants/routes";



const ProfileRegisterPage = () => (
    <div>
        <h2>Cadastrar o profile.</h2>
        <ProfileRegisterForm/>
    </div>
);

const INITIAL_STATE = {
    isActiveProfile: null,
    isSubmitting: false,
    error: null,
};


class ProfileRegisterBase extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {...INITIAL_STATE};

    }


    componentWillUnmount() {
        // @ts-ignore
        this.props.firebase.messages().off();
    }

    onGetUserInfo() {
        const getUser = localStorage.getItem('authUser');

        return JSON.parse(getUser as string);
    }

    componentDidMount() {
        const stateUser = this.onGetUserInfo();

        this.setState(stateUser);
       
    }

   render() {
   	return (
           <section> ===== Profile Register ===== </section>
	);
   }
}

const condition = (authUser: any) =>
    authUser && !!authUser.roles[ROLES.ADMIN];

const ProfileRegisterForm = withRouter(withFirebase(ProfileRegisterBase));

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(ProfileRegisterPage);

export { ProfileRegisterForm };

