import React, { Component } from 'react';
import './perfil.scss';

import { Link } from 'react-router-dom';

class Perfil extends Component {
    render() {
        return(
            <div>Perfil</div>
        );
    }

    componentDidMount() {
        document.title = '';

    }

}
export default Perfil;
