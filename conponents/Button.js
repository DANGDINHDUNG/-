import * as React from 'react';
import { View } from "react-native"
import { useContext } from "react";
import {Button} from "@rneui/themed";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const buttonJouney =()=>{
    return(
        <View style={{flexDirection:'row'}}>
        <Button 
            buttonStyle={{borderRadius: 40, backgroundColor:'transparent'}}>
            <MaterialCommunityIcons name="calendar-month" color={theme===DarkTheme? 'white' : 'black' } size={25} style={{ width:26, height: 30,textAlign: 'center', textAlignVertical:'center'}} ></MaterialCommunityIcons>
        </Button>
        <Button 
            buttonStyle={{borderRadius: 40, backgroundColor:'transparent'}}>
            <MaterialCommunityIcons name="delete-sweep" size={28}  style={{ width:26, height: 30,textAlign: 'center', textAlignVertical:'center'}} ></MaterialCommunityIcons>
        </Button>
        </View>
    );
}


export default buttonJouney;