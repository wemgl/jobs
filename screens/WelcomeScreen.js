import React, {Component} from "react";
import {AsyncStorage} from 'react-native';
import {AppLoading} from 'expo';
import Slides from "../components/Slides";

const SLIDE_DATA = [
    {text: 'Welcome to Job App', color: '#03A9F4'},
    {text: 'Use this to get a job', color: '#009688'},
    {text: 'Set your location, then swipe away', color: '#03A9F4'}
];

export default class WelcomeScreen extends Component {
    state = {token: null};

    async componentDidMount() {
        try {
            let token = await AsyncStorage.getItem('fb_token');
            if (token) {Map
                this.props.navigation.navigate('map');
                this.setState({token});
            } else {
                this.setState({token: false});
            }
        } catch (err) {
            console.log(err);
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    };

    render() {
        if (this.state.token === null) {
            return <AppLoading/>
        }

        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
        );
    }
}