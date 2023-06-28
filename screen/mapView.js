import * as React from 'react';
import { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View } from 'react-native';
import style from "../style/Style";

// location
import * as Location from 'expo-location';
import { Button } from '@rneui/base';
//listen event
import { EventRegister } from 'react-native-event-listeners';


const MapViewScreen = ({navigation, route})=>{
    const [lat, setLat] = useState(10.873041);
    const [long, setLong] = useState(106.735647);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
          let loc = await Location.getCurrentPositionAsync({});
          setLocation(loc);
          setLat(loc.coords.latitude);
          setLong(loc.coords.longitude);
        })();

    },[]);

    return (
        <View style={style.container}>
           <MapView style={style.map} onPress={(e)=>{
            setLat(e.nativeEvent.coordinate.latitude); setLong(e.nativeEvent.coordinate.longitude);
        }
            
        }
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
            <Marker
              coordinate={{ latitude : lat , longitude : long }}
              title={"Vị trí"}
                description={lat+";"+long}
            />
            </MapView>
            <View
                style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    top: '90%',
                    alignSelf: 'center' //for align to right
                }}>
                <Button onPress={()=> {
                    navigation.goBack();
                    EventRegister.emit('ChangeInputLocation', (lat+";"+long));
                }}
                    title={'Chọn'} color={'#fec107'} />
            </View>
        </View>
    );
}

export default MapViewScreen;
