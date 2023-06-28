import { View, Text, Alert, BackHandler, ToastAndroid } from "react-native"
import * as React from 'react';
import { useContext, useState, useEffect, useCallback} from "react";
import { Button, Chip } from "@rneui/themed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';

import style from "../style/Style";
import themeContext from "../config/themeContext";

//redux
import { useDispatch, useSelector } from "react-redux";
import { updateWspeed, updateSpeed, updateIsAuto} from '../redux/actions/speedAction';
import { updateWritejourney, updateIsRunning } from "../redux/actions/writeJourneyAction";
import { updateSettingEnableExitBtn , 
    updateSettingEnableSound, 
    updateSettingEnableSpeedometer, 
    updateSettingEnableVoice, 
    updateSettingEnableWarningScreen, 
    updateSettingIsUpdateWhenOpen,
    updateSettingIsNight,
    updateSettingIsWarning,
    updateSettingSelectShortcut,
    updateSettingVehicle,
    updateSettingWarningLevel } from "../redux/actions/settingsAction";

// database
import * as SQLite from 'expo-sqlite';

// format time
import formatTime from 'minutes-seconds-milliseconds';

// location
import * as Location from 'expo-location';

// geolid
import { getDistance } from "geolib";

//audio 
import { Audio } from 'expo-av';
//text to speech
import * as Speech from 'expo-speech';

import RNSpeedometer from 'react-native-speedometer'

import {
    SafeAreaView,
    StyleSheet,
    TextInput
  } from 'react-native';

//nChange = (value) => this.setState({ value: parseInt(value) });
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      borderBottomWidth: 0.3,
      borderBottomColor: 'black',
      height: 25,
      fontSize: 16,
      marginVertical: 50,
      marginHorizontal: 20,
    },
  });

const SpeedometerScreen = ({navigation}) => {
    const theme = useContext(themeContext);
    const db = SQLite.openDatabase('test.db');

    const infoSpeed = useSelector((state)=>state.speedInfo);
    const infoWriteJourney = useSelector((state)=>state.writeJourneyInfo);
    const infoSettings = useSelector((state)=> state.settingsInfo);
    const infoErrorLevel = useSelector((state)=> state.errorLevelInfo);
    const dispatch = useDispatch();
    const [timeStart, settimeStart] = useState(null);

    // get loction
    const [location, setLocation] = useState(null);
    const [IsLoading, setIsLoading] = useState(true);
    const [prelocation, setpreLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [nowTime, setnowTime] = useState(null);
    const [dist, setdist] = useState(0);

    const [isWarningEffect, setIsWarningEffect] = useState(false);

    // audio 
    const [sound, setSound] = useState(null);
    // exit app
    const [clickCountExit, setClickCountExit] = useState(0);
    // change max speed
    const [newMaxSpeed, setMaxSpeed] = useState(null);

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../assets/Wspeed.mp3')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    // text to speech
    const speak = (text) => {
        Speech.speak(text);
    };

    // handle Exit App
    const handleExit = ()=>{
        if(clickCountExit===1){
            clearInterval(this.exitTimer);
            BackHandler.exitApp();
        }
        else {
            ToastAndroid.show('Nhấn lại một lần nữa để thoát', ToastAndroid.SHORT);
            this.exitTimer = setInterval(()=>{
                console.log('exit timer');
                setClickCountExit(0);
                clearInterval(this.exitTimer);
            }, 2500);
            setClickCountExit(1);
        }
    }

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Quyền truy cập vị trí đã bị từ chối');
            return;
          }
          
        //   let loc = await Location.getCurrentPositionAsync({});
        //   setLocation(loc);
        })();
        let dis = 0;
        if(prelocation!= null && location!= null)
        {
            dis = getDistance(prelocation.coords, location.coords);
        }
        setdist(dis);
        let speed = dis*3.6;
        if(speed>=0 && speed<=19){
            speed += speed*infoErrorLevel.errorLevel0To19/100;
        } 
        else if(speed>=20 && speed<=39){
            speed += speed*infoErrorLevel.errorLevel20To39/100;
        }
        else if(speed>=40 && speed<=59){
            speed += speed*infoErrorLevel.errorLevel40To59/100;
        }
        else if(speed>=60 && speed<=79){
            speed += speed*infoErrorLevel.errorLevel60To79/100; 
        }
        else if(speed>=80 && speed<=99){
            speed += speed*infoErrorLevel.errorLevel80To99/100; 
        }
        else if(speed>100){
            speed += speed*infoErrorLevel.errorLevelMore100/100; 
        }
        dispatch(updateSpeed(speed.toFixed(0)));

        if(infoWriteJourney.isRunning){
            let maxspeed = infoWriteJourney.highest;
            if(maxspeed < speed)
                maxspeed = speed;      
            dispatch(updateWritejourney(infoWriteJourney.distance + (dis/1000), maxspeed, new Date() - timeStart));
        }

        if(_CheckWarning()){
            //speak();
            if(infoSettings.enableSound)
                playSound();
            if(isWarningEffect)
                setIsWarningEffect(false);
            else 
                setIsWarningEffect(true);
        }
        else{
            setIsWarningEffect(false);
        }
        if(infoSpeed.isAuto){ 
            if(_CheckMaxSpeed()){
                dispatch(updateWspeed(newMaxSpeed));
                
                if(infoSettings.selectSettingVoice==0 || (infoSettings.selectSettingVoice ==1 && navigation.isFocused() == true))
                {
                    speak('Giới hạn tốc độ là '+ newMaxSpeed+ ' km/h');
                }
            }
        }
        else {
            if(infoSpeed.Wspeed == newMaxSpeed)
                dispatch(updateIsAuto(true));
            else if(newMaxSpeed == null && infoSpeed.Wspeed == 50)
                dispatch(updateIsAuto(true));
        }
        
        setpreLocation(location);
    }, [location]); 

    const _updateLocation = useCallback(async()=>{
        let loc = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(loc.coords);
        let strStreet = address[0].street===null? '': "street='"+address[0].street+"'";
        let strSubregion = address[0].subregion===null? '': " and subregion='"+address[0].subregion+"'";
        let strDistrict = address[0].district===null? '': " and district='"+address[0].district+"'";
        let strCity = address[0].city===null? '': " and city='"+address[0].city+"'";
        let strRegion = address[0].region===null? '': " and region='"+address[0].region+"'";

        db.transaction(tx => {
            tx.executeSql("SELECT maxSpeed FROM Treets where "+strStreet+strSubregion+strDistrict+strCity+strRegion, null,
            (txObj, resultSet)=>{ 
                //console.log(resultSet.rows._array[0].maxSpeed);
                if(resultSet.rows._array.length!=0){
                    setMaxSpeed(resultSet.rows._array[0].maxSpeed);
                }
                else setMaxSpeed(null);
            },
            (txObj, error)=>console.log(error));
        });
        setLocation(loc);
    },[]);

    const _setlocationStart = useCallback(async()=>{
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        setpreLocation(loc);
    }, []);

    const _updatenowTime = () =>{
        let date = new Date();
        let strTime = date.getHours()+":";
        if(date.getMinutes()<10)
            strTime += ('0'+ date.getMinutes());
        else strTime += date.getMinutes();
        setnowTime(strTime); 
    }

    const handleisRunning = ()=>{
        if(infoWriteJourney.isRunning){
            Alert.alert(
                "Thông báo",
                "Ứng dụng đang ghi lại nhật ký hành trình của bạn, Bạn có muốn kết thúc hành trình hành không?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => {
                    let strtimeStart = timeStart.getDate()+'-'+(timeStart.getMonth()+1)+'-'+timeStart.getFullYear()+', '+timeStart.getHours()+':'+timeStart.getMinutes()+':'+timeStart.getSeconds();
                    let timeFinish = new Date();
                    let strtimeFinish = timeFinish.getDate()+'-'+(timeFinish.getMonth()+1)+'-'+timeFinish.getFullYear()+', '+timeFinish.getHours()+':'+timeFinish.getMinutes()+':'+timeFinish.getSeconds();
                    let aver = (infoWriteJourney.distance*1000/(infoWriteJourney.timeDrive/1000))*3.6;
                    console.log('finish:');
                    console.log(strtimeStart);
                    console.log(strtimeFinish);
                    console.log(infoWriteJourney.distance);
                    console.log(infoWriteJourney.timeDrive);
                    console.log(aver);
                    db.transaction(tx => {
                        tx.executeSql('INSERT INTO Jouneys (distance, highest, begin, finish, time, average) values (?, ?, ?, ?, ?, ?)', [infoWriteJourney.distance, infoWriteJourney.highest, strtimeStart, strtimeFinish, infoWriteJourney.timeDrive , aver])
                        })
                    dispatch(updateWritejourney(0.0,0.0,'00:00.00'));
                    dispatch(updateIsRunning(false));
                  } }
                ]
            );
        }
        else {
            Alert.alert(
                "Thông báo",
                "Bạn muốn ghi lại nhật ký hành trình di chuyển không?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => {
                    dispatch(updateIsRunning(true));
                    settimeStart(new Date());
                    _setlocationStart();
                    } 
                  }
                ]
            );
            
        }
    };

    const _CheckWarning =()=>{
        if(infoSettings.isWarning==false)
            return false;
        if(Math.round(infoSpeed.speed) + Math.round(infoSettings.warningLevel) >= infoSpeed.Wspeed){
            return true;
        }
        return false;
    }

    const _CheckMaxSpeed = ()=>{
        if(newMaxSpeed!= null && newMaxSpeed!= infoSpeed.Wspeed){
            return true;
        }
        return false;
    }

    // load settings
    const _LoadSettings = () => {
        let enableExitBtn = true;
        let isWarning= true;
        let enableSound= true;
        let selectSettingVoice= 0;
        let warningLevel= 5;
        let selectShortcut= 1;
        let enableSpeed= true;
        let isNight= false;
        let enableWarningScreen= true;
        let isUpdateWhenOpen= false;
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM SettingsApp", null,
            (txObj, resultSet)=>{ 
                if(resultSet.rows._array.length!=0){
                    console.log(resultSet.rows._array[0]);

                    enableExitBtn = resultSet.rows._array[0].enableExitBtn==0? false: true;
                    enableSound = resultSet.rows._array[0].enableSound==0? false:true;
                    enableSpeed = resultSet.rows._array[0].enableSpeed==0? false:true;
                    enableWarningScreen = resultSet.rows._array[0].enableWarningScreen==0? false:true;
                    isNight = resultSet.rows._array[0].isNight==0? false:true;
                    isUpdateWhenOpen = resultSet.rows._array[0].isUpdateWhenOpen==0? false:true;
                    isWarning = resultSet.rows._array[0].isWarning==0? false:true;
                    selectSettingVoice = resultSet.rows._array[0].selectSettingVoice;
                    selectShortcut = resultSet.rows._array[0].selectShortcut;
                    isUpdateWhenOpen = resultSet.rows._array[0].isUpdateWhenOpen==0? false:true;
                    selectVehicle = resultSet.rows._array[0].selectVehicle;
                    warningLevel = resultSet.rows._array[0].warningLevel;

                    dispatch(updateSettingEnableExitBtn(enableExitBtn));
                    dispatch(updateSettingEnableSound(enableSound));
                    dispatch(updateSettingEnableSpeedometer(enableSpeed));
                    dispatch(updateSettingEnableVoice(selectSettingVoice));
                    dispatch(updateSettingEnableWarningScreen(enableWarningScreen));
                    dispatch(updateSettingIsNight(isNight));
                    dispatch(updateSettingIsUpdateWhenOpen(isUpdateWhenOpen));
                    dispatch(updateSettingIsWarning(isWarning));
                    dispatch(updateSettingSelectShortcut(selectShortcut));
                    dispatch(updateSettingVehicle(selectVehicle));
                    dispatch(updateSettingWarningLevel(warningLevel));
                    // dispatch(updateSettingEnableSpeedometer(resultSet.rows._array[0].enableSpeed==0? false:true));
                    // dispatch(updateSettingEnableVoice(resultSet.rows._array[0].selectSettingVoice));
                    // dispatch(updateSettingEnableWarningScreen(resultSet.rows._array[0].enableWarningScreen==0? false:true));
                    // dispatch(updateSettingIsNight(resultSet.rows._array[0].isNight==0? false:true));
                    // dispatch(updateSettingIsUpdateWhenOpen(resultSet.rows._array[0].isUpdateWhenOpen==0? false:true));
                    // dispatch(updateSettingIsWarning(resultSet.rows._array[0].isWarning==0? false:true));
                    // dispatch(updateSettingSelectShortcut(resultSet.rows._array[0].selectShortcut));
                    // dispatch(updateSettingVehicle(resultSet.rows._array[0].selectVehicle));
                    // dispatch(updateSettingWarningLevel(resultSet.rows._array[0].warningLevel));

                    console.log('settings loaded');
                }
            },
            (txObj, error)=>console.log(error));
        });
        console.log('settings loaded');
    }

    if(IsLoading){
        console.log(1);
        _LoadSettings();
        this.mytimer = setInterval(()=>{
            _updateLocation();
            _updatenowTime();
        }, 1000);
        setIsLoading(false);
    }

    return(
        <View style={{ flex: 1, backgroundColor: theme.backgroundTitleColor}}> 
            <View style={ {flex: 2, flexDirection: 'row', marginTop: 20}}>
                
                
                <View style={{flex: 1, padding: 10}}>
                    
                    <View style={[style.container,{flex: 1,  backgroundColor: theme.backgroundButtonColor, borderRadius: 5}]}>
                        <Text style={{color:'white',fontSize:20}}>{nowTime}</Text>
                    </View>

                    <View style={[style.container, {flex: 1, flexDirection:'row', justifyContent:'space-around', paddingLeft: 30, paddingRight: 30}]}>
                <Button onPress={()=>{
                    db.transaction(tx => {
                        tx.executeSql('UPDATE SettingsApp SET isWarning = '+!infoSettings.isWarning)
                    });
                    if(!infoSettings.isWarning){
                        ToastAndroid.show('Bật cảnh báo khi vượt quá tốc độ tối đa', ToastAndroid.SHORT);
                    }
                    else {
                        ToastAndroid.show('Tắt cảnh báo khi vượt quá tốc độ tối đa', ToastAndroid.SHORT);
                    }
                    dispatch(updateSettingIsWarning(!infoSettings.isWarning));
                }}
                    color={theme.backgroundButtonColor}
                    buttonStyle={{borderRadius: 40}} >
                    <IoniconsIcons name={infoSettings.isWarning?"warning":"close-circle-outline"} size={25} style={{color:'white', width:26, height: 30,textAlign: 'center', textAlignVertical:'center'}} ></IoniconsIcons>
                </Button>
                {/* <Button 
                    color={theme.backgroundButtonColor}
                    buttonStyle={{borderRadius: 40}} >
                    <MaterialCommunityIcons name="directions" size={25} style={{color:'white', width:26, height: 30,textAlign: 'center', textAlignVertical:'center'}} ></MaterialCommunityIcons>
                </Button> */}
                <Button onPress={()=>{
                    navigation.navigate('SpeedometerMirror');
                }}
                    color={theme.backgroundButtonColor}
                    buttonStyle={{borderRadius: 40}} >
                    <MaterialCommunityIcons name="laptop" size={25} style={{color:'white', width:26, height: 30,textAlign: 'center', textAlignVertical:'center'}} ></MaterialCommunityIcons>
                </Button>
                {infoSettings.enableExitBtn &&
                 <Button onPress={handleExit}
                    color={theme.backgroundButtonColor}
                    buttonStyle={{borderRadius: 40}} >
                    <MaterialCommunityIcons name="exit-to-app" size={25} style={{color:'white', width:26, height: 30,textAlign: 'center', textAlignVertical:'center'}} ></MaterialCommunityIcons>
                </Button>}
            </View>
                </View>
                
            </View>
            <View style={{flex: 8,}}>
            {infoSettings.enableSpeed && <View style={[style.container,{flex: 1}]}>
                    {/* <View style={[style.container,
                    { 
                        borderColor: 'green', borderRadius: 100, borderWidth: 15, 
                        height: 200, width: 200, 
                        marginTop:30,
                        marginBottom:50,
                        justifyContent:'flex-start',
                        padding: 10
                    }]}>
                        <Text style={{fontSize: (infoSpeed.speed>=100? 82: 90), fontWeight: 'bold', marginTop:15, color:'white'}}>{infoSpeed.speed}</Text>
                        <Text style={{fontSize:17, marginTop:-10, color:'white'}}>KM/H</Text>
                    </View> */}

                    <SafeAreaView style={style.container}>
          <RNSpeedometer value={Number(infoSpeed.speed)} size={300}/>

           
          <View style={[style.container,{flex: 1, flexDirection: 'row', justifyContent:'space-between', marginTop: 80}]}>
                        <Button
                            title={infoWriteJourney.isRunning? 'STOP': 'RUN'}
                            titleStyle={{
                                color:'white', fontSize: 10, width:26, height: 30,textAlign: 'center', textAlignVertical:'center', 
                            }}
                            buttonStyle={{
                                backgroundColor: theme.backgroundButtonColor,
                                borderRadius: 30
                                }} 
                            onPress={handleisRunning}>  
                        </Button>
                        <Button 
                            color={theme.backgroundButtonColor}
                            buttonStyle={{borderRadius: 40}} 
                            onPress={()=>{
                                navigation.navigate('Cài đặt');
                                }}>
                            <IoniconsIcons name="ios-settings" size={25} style={{color:'white', width:26, height: 30,textAlign: 'center', textAlignVertical:'center'}} ></IoniconsIcons>
                        </Button>
                    </View>
        </SafeAreaView>
                    
                </View>}
                <View style={[style.container,{flex: 1, flexDirection:'row'}]}>
                    
                    <View style={{zIndex: 999, marginLeft: 95}}>
                        <Button onPress={()=>{
                            dispatch(updateWspeed(infoSpeed.Wspeed - 10));
                            if(infoSpeed.isAuto)
                                dispatch(updateIsAuto(false));
                        }}
                            color={'transparent'} buttonStyle={{height: 200, width: 100}}>
                        </Button>
                    </View>
                    
                    <View style={[style.container,
                        { 
                            borderColor: (isWarningEffect?'transparent':'red'), borderRadius: 100, borderWidth: 15, 
                            height: 200, width: 200, 
                            marginLeft:-100, marginRight:-100,
                            backgroundColor:(isWarningEffect?'transparent':'white'),
                            justifyContent:'flex-start',
                            padding: 10
                        }]}>
                            {infoSpeed.isAuto==true && <Chip title="auto" style={{}}></Chip>}
                            {infoSpeed.isAuto==false && <View style={{height:30}}></View>}
                            <Text style={{fontWeight: 'bold', marginTop: -20, fontSize: (infoSpeed.Wspeed>=100? 82: 90)}}>{infoSpeed.Wspeed}</Text>
                        </View>
                    <View style={{marginRight: 95}}>
                        <Button onPress={()=>{
                            dispatch(updateWspeed(infoSpeed.Wspeed + 10));
                            if(infoSpeed.isAuto)
                                dispatch(updateIsAuto(false));;
                        }}
                        color={'transparent'} buttonStyle={{height: 200, width: 100}}
                        ></Button>
                    </View>
                </View>

            </View>

            <View style={{flex: 2, alignItems: 'stretch', padding: 10}}>
                    <Button color={theme.backgroundButtonColor}
                        buttonStyle={{borderRadius: 5}} 
                        onPress={()=>{
                            navigation.navigate('Nhật ký hành trình');
                            }}>
                        <View style={{flex: 1, height: 110}}>
                            <View style={{flex: 4, flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', paddingBottom: 5}}>
                                <View style={[style.container, {flex:1, borderRightWidth: 1, borderColor: 'white'}]}>
                                    <MaterialCommunityIcons name="map-marker-distance" type="MaterialCommunityIcons" color='white' size={35}></MaterialCommunityIcons>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Text style={{color: 'white', fontWeight:'bold'}}>{infoWriteJourney.distance.toFixed(2)}</Text>
                                        <Text style={{color: 'white'}}> km</Text>
                                    </View>
                                </View>
                                <View style={[style.container,{flex:1}]}>
                                    <MaterialCommunityIcons name="speedometer-slow" color='white' size={35}></MaterialCommunityIcons>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Text style={{color: 'white', fontWeight:'bold'}}>{infoWriteJourney.highest}</Text>
                                        <Text style={{color: 'white'}}> km/h</Text>
                                    </View>
                                </View>
                                
                            </View>
                            <View style={[style.container,{flex: 3, flexDirection: 'row'}]}>
                                <MaterialCommunityIcons name="clock-time-eight-outline" color='white' size={35}></MaterialCommunityIcons>
                                <Text style={{color: 'white', fontWeight:'bold'}}>{formatTime(infoWriteJourney.timeDrive)}</Text>
                            </View>
                        </View>
                    </Button>
                </View>
        </View>
    )
}

export default SpeedometerScreen;