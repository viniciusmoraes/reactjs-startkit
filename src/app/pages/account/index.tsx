import React, { Component } from 'react';
import './account.scss';

import { Link } from 'react-router-dom';

class Account extends Component {
    render() {
        return(
            <div>Account</div>
        );
    }

    componentDidMount() {
        document.title = '';

    }

}
export default Account;
