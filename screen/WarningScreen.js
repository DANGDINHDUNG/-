import { View, Text, Switch } from "react-native"
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {  useContext } from "react";
import { Icon, Button } from "@rneui/themed";
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import style from "../style/Style";
import themeContext from "../config/themeContext";


const WarningScreen = ({navigation}) => {
    const theme = useContext(themeContext);
    
    return(
        <View style={[style.container,{backgroundColor:theme.backgroundTitleColor}]}>
            <StatusBar></StatusBar>
            <View style={[style.container,
                {
                    flex:1, 
                    flexDirection: 'row', 
                    alignSelf:'stretch',
                    alignItems:'center',
                    marginTop: 30,
                    margin: 10,
                    borderColor: 'white', 
                    borderWidth: 1,
                    borderRadius: 8,
                }
            ]}>
                <Icon name="warning" type='Entypo' color='white' size={35}></Icon>
                <Text style={{width: 300, color: 'white', marginLeft: 10}}>Khi ứng dụng đang chạy, bạn có thể tắt màn hình thiết bị để tập trung hơn và tiết kiệm pin</Text>
                
            </View>
            <View style={[style.container,{flex: 7, marginLeft: 10, marginRight: 10}]}>
                <Text style={{color: theme.titleColor, fontSize: 20, fontWeight: 'bold'}}>Cảnh báo</Text>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 15}}>Nhìn vào màn hình điện thoại trong lúc lái xe có thể khiến cho bạn mất tập trung và xảy ra tai nạn. Tốc độ giới hạn thực tế có thể khác với tốc độ giới hạn trên màn hình.</Text>
                <Button  color={theme.backgroundButtonColor} 
                        buttonStyle={{borderRadius: 20}}  
                        title="Đã hiểu" onPress={()=>navigation.navigate("Speedometer")}></Button>
            </View>
        </View>


    )
}

export default WarningScreen;