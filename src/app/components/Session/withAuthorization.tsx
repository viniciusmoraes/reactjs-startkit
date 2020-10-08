import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = (condition: any) => (Component: any) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      // @ts-ignore
      this.listener = this.props.firebase.onAuthUserListener(
          (authUser: any) => {
          if (!condition(authUser)) {
            // @ts-ignore
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () =>
            // @ts-ignore
            this.props.history.push(ROUTES.SIGN_IN),
      );
    }

    componentWillUnmount() {
      //@ts-ignore
      this.listener();
    }

    render() {
      // @ts-ignore
      return condition(this.props.authUser) ? (<Component {...this.props} />) : null;
    }
  }

  const mapStateToProps = (state: { sessionState: { authUser: any; }; }) => ({
    authUser: state.sessionState.authUser,
  });

  // @ts-ignore
  return compose(withRouter, withFirebase, connect(mapStateToProps),)(WithAuthorization);
};

export default withAuthorization;
