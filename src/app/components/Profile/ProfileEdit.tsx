import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';

class ProfileEditPage extends Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {

        return (
            <div>profile edit page</div>
        );
    }
}

const mapStateToProps = (state: any, props: any) => ({
   
});

const mapDispatchToProps = (dispatch: any) => ({
    
});

// @ts-ignore
export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(ProfileEditPage);
