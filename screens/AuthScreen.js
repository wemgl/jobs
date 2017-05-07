import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }
    
    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        return <View/>;
    }
}

const mapStateToProps = ({auth}) => {
    const {token} = auth;
    return {token}
};

export default connect(mapStateToProps, actions)(AuthScreen);