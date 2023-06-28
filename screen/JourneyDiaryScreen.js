import { View, Text, FlatList } from "react-native"
import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import {Icon, Button,  Overlay } from "@rneui/themed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import style from "../style/Style";
import themeContext from "../config/themeContext";
import Jouney from "../conponents/jouney";

import FlatListJouneyDiaryData from "../data/dataJouneyDiary";
// format time
import formatTime from 'minutes-seconds-milliseconds';


// database 
import * as SQLite from 'expo-sqlite';

const JouneyDiaryScreen = ({ navigation }) =>{
    const db = SQLite.openDatabase('test.db');
    const [isloading, setIsloading] = useState(true);
    const [journeys, setjourneys] = useState([]);

    const theme = useContext(themeContext);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [visibleDeleteJouney, setVisibleDeleteJouney] = useState(false);
    //state for screen
    const [allDistance, setAlldistance] = useState(0.0);
    const [SpeedMax, setSpeedMax] = useState(0);
    const [AllTimeDrive, setAllTimeDrive] = useState('00:00.00');
    const [selecteddate, setselecteddate] = useState(new Date());

    useEffect(()=> {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Jouneys', null,
            (txObj, resultSet)=>{ setjourneys(resultSet.rows._array); console.log(journeys)},
            (txObj, error)=>console.log(error));
          });
          db.transaction(tx => {
            tx.executeSql('SELECT SUM(distance) as alldis FROM Jouneys', null,
            (txObj, resultSet)=>{ setAlldistance(resultSet.rows._array[0].alldis); console.log(allDistance)},
            (txObj, error)=>console.log(error));
        });

        db.transaction(tx => {
            tx.executeSql('SELECT MAX(highest) as mspeed FROM Jouneys', null,
            (txObj, resultSet)=>{ setSpeedMax(resultSet.rows._array[0].mspeed); console.log(SpeedMax)},
            (txObj, error)=>console.log(error));
        });

        db.transaction(tx => {
            tx.executeSql('SELECT SUM(time) as alltime FROM Jouneys', null,
            (txObj, resultSet)=>{ setAllTimeDrive(resultSet.rows._array[0].alltime); console.log(AllTimeDrive)},
            (txObj, error)=>console.log(error));
        });
    }, []);
    

    const deleteAlljouney = () => {
        toggleOverlayDeleteJouney();
        db.transaction(tx=>{
            tx.executeSql('DELETE FROM Jouneys', null, 
            (txObj, resultSet)=> {
                if(resultSet.rowsAffected>0){
                    let existingJouneys = [];
                    setjourneys(existingJouneys);
                    console.log(journeys);
                }
            },
            (txObj, error)=>{console.log(error)});
        });
    }

    const getJourneysInDay = (date)=>{
        console.log('get');
        let str = "'"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+"%'";
        console.log(str);
        db.transaction(tx => {+1
            tx.executeSql('SELECT * FROM Jouneys where begin LIKE '+str, null,
            (txObj, resultSet)=>{ setjourneys(resultSet.rows._array); console.log(journeys)},
            (txObj, error)=>console.log(error));
        });

        db.transaction(tx => {
            tx.executeSql('SELECT SUM(distance) as alldis FROM Jouneys where begin LIKE '+str, null,
            (txObj, resultSet)=>{ setAlldistance(resultSet.rows._array[0].alldis); console.log(allDistance)},
            (txObj, error)=>console.log(error));
        });

        db.transaction(tx => {
            tx.executeSql('SELECT MAX(highest) as mspeed FROM Jouneys where begin LIKE '+str, null,
            (txObj, resultSet)=>{ setSpeedMax(resultSet.rows._array[0].mspeed); console.log(SpeedMax)},
            (txObj, error)=>console.log(error));
        });

        db.transaction(tx => {
            tx.executeSql('SELECT SUM(time) as alltime FROM Jouneys where begin LIKE '+str, null,
            (txObj, resultSet)=>{ setAllTimeDrive(resultSet.rows._array[0].alltime); console.log(AllTimeDrive)},
            (txObj, error)=>console.log(error));
        });
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setselecteddate(date);
        getJourneysInDay(date);
        hideDatePicker();
    };

    const toggleOverlayDeleteJouney = () => {
        setVisibleDeleteJouney(!visibleDeleteJouney);
      };

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection:'row'}}>
                <Button onPress={showDatePicker}
                    buttonStyle={{borderRadius: 40, backgroundColor:'transparent'}}>
                    <MaterialCommunityIcons name="calendar-month" color={'white'} size={25} style={{ width:26, height: 30,textAlign: 'center', textAlignVertical:'center'}} ></MaterialCommunityIcons>
                </Button>
                <Button onPress={toggleOverlayDeleteJouney}
                    buttonStyle={{borderRadius: 40, backgroundColor:'transparent'}}>
                    <MaterialCommunityIcons name="delete-sweep" color={'white'} size={28}  style={{ width:26, height: 30,textAlign: 'center', textAlignVertical:'center'}} ></MaterialCommunityIcons>
                </Button>
                </View>
            ),
        })
    }, [navigation])
    return(
        <View style={{flex: 1, backgroundColor: theme.backgroundTitleColor}}>
            <View style={[style.container,style.shadow,{flex:1, backgroundColor:theme.backgroundTextColor}]}>
                <Text style={{color: theme.titleColor, fontSize: 17, fontWeight: 'bold'}} >Tất cả hành trình</Text>
                <View style={{flexDirection: 'row', alignSelf:'stretch', justifyContent: 'space-around', marginLeft: 70, marginRight: 70}}>
                    <View>
                        <MaterialCommunityIcons name="map-marker-distance" type="MaterialCommunityIcons" color={theme.textColor} size={35}></MaterialCommunityIcons>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: theme.textColor, fontWeight:'bold'}}>{allDistance===null? '0.00': allDistance.toFixed(2)}</Text>
                            <Text style={{color: theme.textColor}}> km</Text>
                        </View>
                    </View>
                    <View>
                        <MaterialCommunityIcons name="speedometer-slow" type="MaterialCommunityIcons" color={theme.textColor} size={35}></MaterialCommunityIcons>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: theme.textColor, fontWeight:'bold'}}>{SpeedMax===null? 0: SpeedMax}</Text>
                            <Text style={{color: theme.textColor}}> km/h</Text>
                        </View>
                    </View>
                    <View>
                        <MaterialCommunityIcons name="clock-time-eight-outline" type="MaterialCommunityIcons" color={theme.textColor} size={35}></MaterialCommunityIcons>
                        <Text style={{color: theme.textColor, fontWeight:'bold'}}>{AllTimeDrive===null? '00:00.00': formatTime(AllTimeDrive)}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex:7, backgroundColor: theme.backgroundFlatlist, marginTop: 1}}>
                <FlatList
                    data={journeys}
                    renderItem={({item, index})=>{
                        return(
                            <Jouney item={item} index={index}>
                            </Jouney>
                        );
                    }}>

                </FlatList>
                
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                date={selecteddate}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <Overlay isVisible={visibleDeleteJouney} onBackdropPress={toggleOverlayDeleteJouney}>
                <View style={[style.overlay, {backgroundColor: theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Xoá tất cả nhật ký</Text>
                    <Text style={[style.textOverlay, {color: theme.textColor}]}>
                        Bạn có muốn xoá tất cả nhật ký hành trình đã ghi?
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} titleStyle={{color: theme.titleColor}}>Không</Button>
                        <Button buttonStyle={[style.buttonOverlay]} titleStyle={{color: theme.titleColor}} onPress={deleteAlljouney}>Có</Button>
                    </View>
                </View>
            </Overlay>
        </View>
    )
}

export default JouneyDiaryScreen;