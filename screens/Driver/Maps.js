import React from 'react';

import {View, Text, StyleSheet, Button} from 'react-native'

const Map = (props) => {
    return(
        <View>
            <Button title = 'Basic Use' onPress={() => props.navigation.navigate("Basic")}/>
            <Button title = 'Maps with useState ' onPress={() => props.navigation.navigate("usestate")}/>
            <Button title = 'Map Coordinates' onPress={() => props.navigation.navigate("MapCoordinates")}/>
            <Button title = 'Map Custom Marker' onPress={() => props.navigation.navigate("MapCustomMarker")}/>
            <Button title = 'Map Lines' onPress={() => props.navigation.navigate("MapLines")}/>
            <Button title = 'Maps Marker' onPress={() => props.navigation.navigate("MapsMarker")}/>
            <Button title = 'Map Style' onPress={() => props.navigation.navigate("MapStyle")}/>
            <Button title = 'Map Directions' onPress={() => props.navigation.navigate("MapDirection")}/>
            <Button title = 'Map Current' onPress={() => props.navigation.navigate("MapCurrent")}/>
            <Button title = 'Map Location' onPress={() => props.navigation.navigate("MapLocation")}/>
        </View>
        
    )
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})