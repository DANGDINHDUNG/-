import { View, Text, TextInput, Alert} from "react-native"
import * as React from 'react';
import { useState, useContext, useEffect } from "react";

import style from "../style/Style";
import themeContext from "../config/themeContext";
import { Button } from "@rneui/base";
// location
import * as Location from 'expo-location';
//listen event
import { EventRegister } from 'react-native-event-listeners';
//redux
import { useDispatch, useSelector } from "react-redux";
// database 
import * as SQLite from 'expo-sqlite';

const ContributeDataScreen = ({navigation})=>{
    const db = SQLite.openDatabase('test.db');
    const theme = useContext(themeContext);
    const [isFocusedMapInput, setIsFocusedMapInput] = useState(false);
    const [isFocusedSpeedInput, setIsFocusedSpeedInput] = useState(false);
    const [isFocusedMessageInput, setIsFocusedMessageInput] = useState(false);

    const [inputLocation, setInputLocation] = useState(null);
    const [inputMaxSpeed, setMaxSpeed] = useState(null);
    const [inputMessage, setMessage] = useState(null);

    const infoSettings = useSelector((state)=>state.settingsInfo);

    useEffect(()=>{

        let eventListener = EventRegister.addEventListener(
            'ChangeInputLocation',
            (data)=>{setInputLocation(data);}
          );
          return ()=>{
            EventRegister.removeAllListeners(eventListener);
          }
    });

    const handleAddStreets = async()=>{
        // db.transaction(tx => {
        //     tx.executeSql("SELECT * FROM Treets", null,
        //     (txObj, resultSet)=>{ console.log(resultSet.rows._array); },
        //     (txObj, error)=>console.log(error));
        // });
        // console.log(3);
        if(inputLocation==null)
            return;
        let scoops = inputLocation.split(";");
        let address = await Location.reverseGeocodeAsync({latitude: parseFloat(scoops[0]), longitude: parseFloat(scoops[1])});
         
        let strStreet = address[0].street===null? '': "street='"+address[0].street+"'";
        let strSubregion = address[0].subregion===null? '': " and subregion='"+address[0].subregion+"'";
        let strDistrict = address[0].district===null? '': " and district='"+address[0].district+"'";
        let strCity = address[0].city===null? '': " and city='"+address[0].city+"'";
        let strRegion = address[0].region===null? '': " and region='"+address[0].region+"'";
        //console.log("SELECT * FROM Treets where "+strStreet+strSubregion+strDistrict+strCity+strRegion);
        
        db.transaction(tx => {
            tx.executeSql("SELECT COUNT(*) as count FROM Treets where "+strStreet+strSubregion+strDistrict+strCity+strRegion, null,
            (txObj, resultSet)=>{ 
                if(resultSet.rows._array[0].count<=0){
                    db.transaction(tx => {
                        tx.executeSql('INSERT INTO Treets (street, subregion, district, city, region, maxSpeed, message, vehicle_id) values (?, ?, ?, ?, ?, ?, ?, ?)', [address[0].street, address[0].subregion, address[0].district, address[0].city, address[0].region , inputMaxSpeed, null, (infoSettings.selectVehicle+1)]),
                        (txObj, resultSet)=>{ console.log('complete')},
                        (txObj, error)=>console.log(error);
                    });
                    Alert.alert(
                        "Thông báo",
                        "Đã thêm dữ liệu mới!",
                        [
                          { text: "OK", onPress: () => {}, style:'cancel', }
                        ]
                    );
                }
                else {
                    Alert.alert(
                        "Thông báo",
                        "Đã có dữ liệu của đường này!",
                        [
                          {
                            text: "OK",
                            onPress: () => {},
                            style:'cancel',
                          }
                        ]
                    );
                }
            },
            (txObj, error)=>console.log(error));
        });
        // db.transaction(tx => {
        //     tx.executeSql("DELETE FROM Treets", null,
        //     (txObj, resultSet)=>{ console.log('đã xóa');},
        //     (txObj, error)=>console.log(error));
        // });

    }

    return(
        <View style={{ flex: 1, backgroundColor: theme.backgroundFlatlist}}>
            <View style={{flex: 5, margin: 10}}>
                <Text style={{color: theme.textColor, fontWeight:'bold'}}>Vị trị trên bản đồ</Text>
                <TextInput value={inputLocation}
                onPressIn={()=>navigation.navigate('MapView')} readOnly={true}
                onFocus={() => setIsFocusedMapInput(true)} onBlur={() => setIsFocusedMapInput(false)}
                style={[style.input, {borderColor: isFocusedMapInput?theme.titleColor:theme.textColor}]}
                color={theme.textColor}
                placeholderTextColor={theme.textColor}
                placeholder="Chọn toạ độ trên bản đồ"></TextInput>

                <Text style={{color: theme.textColor, fontWeight:'bold', marginTop: 15}}>Tốc độ tối đa</Text>
                <TextInput value={inputMaxSpeed} onChangeText={(maxspeed)=>setMaxSpeed(maxspeed)}
                onFocus={() => setIsFocusedSpeedInput(true)} onBlur={() => setIsFocusedSpeedInput(false)}
                style={[style.input, {borderColor: isFocusedSpeedInput?theme.titleColor:theme.textColor}]}
                color={theme.textColor}
                placeholderTextColor={theme.textColor}
                placeholder="60"
                keyboardType="numeric"></TextInput>
            </View>
            <View style={{flex:1, justifyContent:'flex-end'}}>
                <Button onPress={handleAddStreets}
                title="THÊM"
                buttonStyle={{height: 50, backgroundColor:theme.titleColor, color:theme.textColor}}>
                </Button>
            </View>
            
        </View>
    );
}

export default ContributeDataScreen;