import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

const withAuthentication = (Component: any) => {
  class WithAuthentication extends React.Component {
    constructor(props: {} | Readonly<{}>) {
      super(props);

      //@ts-ignore
      this.props.onSetAuthUser(JSON.parse(localStorage.getItem('authUser')),);
    }

    componentDidMount() {
      //@ts-ignore
      this.listener = this.props.firebase.onAuthUserListener(
          (authUser: any) => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
            //@ts-ignore
          this.props.onSetAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          //@ts-ignore
          this.props.onSetAuthUser(null);
        },
      );
    }

    componentWillUnmount() {
      //@ts-ignore
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = (dispatch: any) => ({
    onSetAuthUser: (authUser: any) =>
      dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  // @ts-ignore
  return compose(withFirebase, connect(null, mapDispatchToProps,),)(WithAuthentication);
};

export default withAuthentication;
