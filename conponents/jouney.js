import { View, Text } from "react-native"
import * as React from 'react';
import { useState, useContext } from "react";
import {Icon, Button, Chip } from "@rneui/themed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';

import style from "../style/Style";
import themeContext from "../config/themeContext";
// format time
import formatTime from 'minutes-seconds-milliseconds';

const Jouney = ({item, index})=>{
    const theme = useContext(themeContext);

    return(
        <View style={[style.shadow,{backgroundColor: theme.backgroundTextColor, flexDirection: 'row', alignSelf: 'stretch', padding: 10, margin:10}]}>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name="map-marker-distance" type="MaterialCommunityIcons" color={theme.textColor} size={25} style={{alignSelf:'center'}}></MaterialCommunityIcons>
                    <View style={{marginLeft:5}}>
                        <Text style={{color: theme.textColor}}>Quảng đường</Text>
                        <Text style={{fontWeight:'bold', color: theme.textColor}}>{item.distance.toFixed(2)} km</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <MaterialCommunityIcons name="speedometer-slow" type="MaterialCommunityIcons" color={theme.textColor} size={25} style={{alignSelf:'center'}}></MaterialCommunityIcons>
                    <View style={{marginLeft:5}}>
                        <Text style={{color: theme.textColor}}>Cao nhất</Text>
                        <Text style={{fontWeight:'bold', color: theme.textColor}}>{item.highest} km/h</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <IoniconsIcons name="paper-plane" type="MaterialCommunityIcons" color={theme.textColor} size={25} style={{alignSelf:'center'}}></IoniconsIcons>
                    <View style={{marginLeft:5}}>
                        <Text style={{color: theme.textColor}}>Bắt đầu</Text>
                        <Text style={{fontWeight:'bold', color: theme.textColor}}>{item.begin}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <IoniconsIcons name="ios-flag" type="MaterialCommunityIcons" color={theme.textColor} size={25} style={{alignSelf:'center'}}></IoniconsIcons>
                    <View style={{marginLeft:5}}>
                        <Text style={{color: theme.textColor}}>Kết thúc</Text>
                        <Text style={{fontWeight:'bold', color: theme.textColor}}>{item.finish}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name="clock-time-eight-outline" type="MaterialCommunityIcons" color={theme.textColor} size={25} style={{alignSelf:'center'}}></MaterialCommunityIcons>
                    <View style={{marginLeft:5}}>
                        <Text style={{color: theme.textColor}}>Thời gian</Text>
                        <Text style={{fontWeight:'bold', color: theme.textColor}}>{formatTime(item.time)}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <IoniconsIcons name="analytics-sharp" type="MaterialCommunityIcons" color={theme.textColor} size={25} style={{alignSelf:'center'}}></IoniconsIcons>
                    <View style={{marginLeft:5}}>
                        <Text style={{color: theme.textColor}}>Trung bình</Text>
                        <Text style={{fontWeight:'bold', color: theme.textColor}}>{item.average === null? 0: item.average.toFixed(2)} km/h</Text>
                    </View>
                </View>
            </View>
            
        </View>
    );
}

export default Jouney;