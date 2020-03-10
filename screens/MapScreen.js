import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, Platform, Alert} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();
    const mapRegion = {
        latitude: 1,
        longitude: 1,
        latitudeDelta: 1,
        longitudeDelta: 1
    };

    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('Can\'t save', 'You need pick location', [{text: 'Okay'}]);
            return;
        }
        props.navigation.navigate('NewPlace', {pickedLocation: selectedLocation});
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocationHandler});
    }, [savePickedLocationHandler]);

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return (
        <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
            {markerCoordinates && <Marker title='Picked Loacation' coordinate={markerCoordinates}></Marker>}
        </MapView>
    );
};

MapScreen.navigationOptions = navData => {

    const saveFn = navData.navigation.getParam('saveLocation');

    return {
        headerRight: <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
            <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    },
    headerButton: {
        marginHorizontal: 20
    }
});

export default MapScreen;
