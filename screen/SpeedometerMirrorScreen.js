import * as React from 'react';
import { useContext, useState, useEffect} from "react";
import { View, Text, Image } from "react-native"
import * as ScreenOrientation from 'expo-screen-orientation';

import {Chip, Button } from "@rneui/themed";

//theme
import style from "../style/Style";
import themeContext from "../config/themeContext";

//redux
import { useSelector } from "react-redux";

const SpeedometerMirrorScreen = ({navigation}) => {
    const theme = useContext(themeContext);
    const infoSpeed = useSelector((state)=>state.speedInfo);
    const infoSettings = useSelector((state)=> state.settingsInfo);

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundTitleColor, flexDirection:'column'}}>
            <Button onPress={()=>{
                navigation.goBack();
                ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            }}
                title={'X'}
                titleStyle={{
                    color:'white', fontSize: 20, width:26, height: 30,textAlign: 'center', textAlignVertical:'center',
                }}
                buttonStyle={{
                    backgroundColor: theme.backgroundButtonColor,
                    borderRadius: 30
                }}
                containerStyle={{
                    width: 45,
                    alignSelf:'flex-end',
                    marginTop:25,
                    marginBottom:-60,
                    marginRight:10,
                }}>  
            </Button>
            <View style={{flex:1, justifyContent:'center', flexDirection:'row'}}>
                <Text style={{color:'white',fontSize:27, marginTop: 20, transform: [{ scaleX: -1 }]}}>{(new Date()).getHours()}:{(new Date()).getMinutes()}</Text>
            </View>
            <View style={{flex:4, flexDirection: 'row', justifyContent:'center'}}>
                <View style={{flexDirection:'row', width:450}}>
                    {infoSettings.enableSpeed ==false && <View style={{width:125}}></View>}
                    <View style={
                    { 
                        borderColor:'red', borderRadius: 100, borderWidth: 15, 
                        height: 200, width: 200, 
                        backgroundColor:'white',
                        padding: 10
                    }}>
                        <View style={{paddingLeft: 40, paddingRight: 40}}>
                            {infoSpeed.isAuto && <Chip 
                                style={{ alignSelf:'center'}}
                                containerStyle={{transform: [{ scaleX: -1 }]}}
                            >auto</Chip>}
                            {infoSpeed.isAuto==false && <View style={{height:30}}></View>}
                        </View>
                        <Text style={{fontWeight: 'bold', marginTop: -20, fontSize: (infoSpeed.Wspeed>=100? 82: 90), alignSelf:'center', transform: [{ scaleX: -1 }]}}>{infoSpeed.Wspeed}</Text>
                    </View>
                    <View style={{width:50}}></View>
                    {infoSettings.enableSpeed && <View style={
                    { 
                        borderColor: 'green', borderRadius: 100, borderWidth: 15, 
                        height: 200, width: 200, 
                        marginBottom:50,
                        padding: 10
                    }}>
                        <Text style={{fontSize: (infoSpeed.speed>=100? 82: 90), fontWeight: 'bold', marginTop:15, color:'white', alignSelf:'center', transform: [{ scaleX: -1 }]}}>{infoSpeed.speed}</Text>
                        <Text style={{fontSize:17, marginTop:-10, color:'white', alignSelf:'center', transform: [{ scaleX: -1 }]}}>KM/H</Text>
                    </View>}
                </View>
            </View>
            <View style={{flex:1.5, justifyContent:'center', flexDirection:'row'}}>
                <Image source={require('../assets/icons8-steering-wheel-68.png')}>
                </Image>
            </View>
            <View style={{flex:0.5, justifyContent:'center', flexDirection:'row'}}>
                <Text style={{color:'white'}}>Đặt điện thoại theo hướng này</Text>
            </View>
        </View>
    )
}

export default SpeedometerMirrorScreen;