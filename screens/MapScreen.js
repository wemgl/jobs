import React, {Component} from "react";
import {MapView} from "expo";
import {View, ActivityIndicator} from "react-native";

export default class MapScreen extends Component {
    state = {
        isMapLoaded: false,
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    };

    componentDidMount() {
        this.setState({isMapLoaded: true});
    }

    onRegionChangeComplete = region => this.setState({region});

    render() {
        if (!this.state.isMapLoaded) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }

        return (
            <View style={{flex: 1}}>
                <MapView
                    style={{flex: 1}}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
            </View>
        );
    }
}