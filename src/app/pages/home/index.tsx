import React, { Component } from 'react';
import './home.scss';

import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return(
            <div>Home</div>
        );
    }

    componentDidMount() {
        document.title = '';

    }

}
export default Home;
