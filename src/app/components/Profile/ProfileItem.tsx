import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import ContentEditable from "react-contenteditable";
import {withFirebase} from '../Firebase';
import Gallery from "../Common/Gallery";
import ImageUploader from 'react-images-upload';

import '../../styles/profile-item.scss';
import {Link} from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
    loading: false,
    profile: {},
    user: ''
}

class ProfileItemPage extends Component {
    contentEditable: any;

    constructor(props: {} | Readonly<{}>) {
        super(props);

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
        const condicionIsClient = stateUser.roles.ADMIN === 'ADMIN';
        // @ts-ignore
        this.setState({ user: stateUser, isClient: condicionIsClient });

       
    
    }


    BtnEditar = (props: any) => {
        console.log(props);
        return <div>BtnEditar</div>;
    }

    render() {
        // @ts-ignore
        const { isClient, user, profile, loading } = this.state;

        if (loading && isClient) {
            // @ts-ignore
            return(
            	<section> ===== isClient ===== </section>
            );
        } else {
            return (
                <section> ===== noisClient ===== </section>
            );
        }

    }
}

const mapStateToProps = (state: any, props: any) => ({
    
});

const mapDispatchToProps = (dispatch: any) => ({
    
});

// @ts-ignore
export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(ProfileItemPage);
