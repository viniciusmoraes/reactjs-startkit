import React, {Component} from 'react';
import './Gallery.scss';
import {compose} from "recompose";
import {withFirebase} from "../../Firebase";
import {connect} from "react-redux";
import ImageGallery from 'react-image-gallery';

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

class Gallery extends Component {
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
        // @ts-ignore
        const images = this.props.images;
        return (
            <div>
                <ImageGallery items={images} />
            </div>
        );
    }
}

const mapStateToProps = (state: any, props: any) => ({
    //user: (state.userState.users || {})[props.match.params.id],
});

const mapDispatchToProps = (dispatch: any) => ({
    //onSetUser: (user: any, uid: any) => dispatch({type: 'USER_SET', user, uid}),
});

// @ts-ignore
export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(Gallery);
