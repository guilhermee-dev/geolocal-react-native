import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';


const points = [
    {
        "title": "Maysa",
        "latitude": 27.692612,
        "longitude": 85.342982
    },
    {
        "title": "País das maravilhas",
        "latitude": 27.690227,
        "longitude": 85.342671
    },
    {
        "title": "Guilherme",
        "latitude": 27.690693,
        "longitude": 85.339581
    }
]

function App() {
    const [loading, setLoading] = useState(true);
    const [coordinates, setCoordinates] = useState({});

    useEffect(() => {
        Geolocation.getCurrentPosition(
            ({ coords }) => {
                setCoordinates(coords);
                setLoading(false);
            },
            error => {
                console.log(error);
            },
            { enableHighAccuracy: true, maximumAge: 1000, timeout: 1000 }
        );
    }, []);

    return (
        <View style={styles.Container}>
            {
                loading ? (
                    <ActivityIndicator size="large"/>
                ) : (
                    <MapView 
                        initialRegion={{
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude,
                            latitudeDelta: 1.0068,
                            longitudeDelta: 1.0068,
                        }}
                        style={styles.map}
                    >
                        
                       <Marker 
                            coordinate={{
                                latitude: coordinates.latitude,
                                longitude: coordinates.longitude,
                            }}
                            
                        />
                    </MapView>
                )
                
            }
        </View>
    );
}

function RenderPoints() {
    return points.map(points => (
        <Marker 
            key={points.title}
            coordinate={{
                latitude: parseFloat(coordinates.latitude),
                longitude: parseFloat(coordinates.longitude)
            }}
            title={points.title}
        />
    ))
}

export const styles = StyleSheet.create({
    Container: {
        ...StyleSheet.absoluteFill,
        backgroundColor: '#7159c1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});

export default App;