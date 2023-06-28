import { View, Text, Switch, ScrollView, Share, Linking, ToastAndroid } from "react-native"
import * as React from 'react';
import { useState, useContext } from "react";
import {EventRegister} from 'react-native-event-listeners';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import FontistoIcons from 'react-native-vector-icons/Fontisto';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import RadioButtonRN from 'radio-buttons-react-native';

import style from "../style/Style";
import themeContext from "../config/themeContext";
import { Button, Overlay, Slider } from "@rneui/themed";
import dataVehicle from "../data/datasettings/dataVehicle";
import dataWarningVoice from "../data/datasettings/dataWarningVoice";
import dataShortCuts from "../data/datasettings/datashortcuts";
import dataSizeShortCut from "../data/datasettings/dataSizeShortCut";

//redux
import { useDispatch, useSelector } from "react-redux";
import { updateSettingVehicle, 
        updateSettingIsWarning, 
        updateSettingEnableSound,
        updateSettingEnableVoice,
        updateSettingWarningLevel,
        updateSettingSelectShortcut,
        updateSettingEnableSpeedometer,
        updateSettingIsNight,
        updateSettingEnableExitBtn,
        updateSettingEnableWarningScreen } from "../redux/actions/settingsAction";

// database
import * as SQLite from 'expo-sqlite';

const linkApp = 'com.phamgia.speedlimit';

const SettingScreen = ({navigation}) =>{
    const theme = useContext(themeContext);
    const db = SQLite.openDatabase('test.db');

    const [mode, setMode] = useState(false);
    const [visibleVehicle, setVisibleVehicle] = useState(false);
    const [visibleWarningVoice, setVisibleWarningVoice] = useState(false);
    const [visibleWarningLevel, setVisibleWarningLevel] = useState(false);
    const [WarningLevelValue, setWarningLevelValue] = useState(1);
    const [visibleShortCuts, setVisibleShortCuts] = useState(false);
    const [visibleSizeShortCuts, setVisibleSizeShortCuts] = useState(false);

    const infoSettings = useSelector((state)=>state.settingsInfo);
    const dispatch = useDispatch();

    // sharing 
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'https://www.facebook.com/tran.thanh.1311',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    const toggleOverlayVehicle = () => {
        setVisibleVehicle(!visibleVehicle);
    };
    const toggleOverlayWarningVoice = () => {
        setVisibleWarningVoice(!visibleWarningVoice);
    };
    const toggleOverlayWarningLevel = () => {
        setVisibleWarningLevel(!visibleWarningLevel);
    };
    const toggleOverlayShortCuts = () => {
        setVisibleShortCuts(!visibleShortCuts);
    };
    const toggleOverlaySizeShortCuts = () => {
        setVisibleSizeShortCuts(!visibleSizeShortCuts);
    };
    return(
        <View style={{backgroundColor: theme.backgroundTitleColor}}>
            <ScrollView>
            <View style={{padding: 10, backgroundColor: theme.backgroundFlatlist}}>
                <Text style={{color:theme.titleColor, fontWeight:'bold'}}>Chung</Text>
                <Button onPress={toggleOverlayVehicle}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <IoniconsIcons name="car-sharp" type="MaterialCommunityIcons" color={theme.textColor} size={25}></IoniconsIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Chọn phương tiện</Text>
                        <Text style={{color:theme.textColor}}>{dataVehicle[infoSettings.selectVehicle].label}</Text>
                    </View>
                </Button>

                <Button 
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <IoniconsIcons name="warning" color={theme.textColor} size={25}></IoniconsIcons>
                    <View style={{ marginLeft: 20, width: 250}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Cảnh báo tốc độ</Text>
                        <Text style={{color:theme.textColor}}>Phát âm thanh và nhấp nháy khi vượt quá tốc độ cho phép</Text>
                    </View>
                    <Switch value={infoSettings.isWarning}
                    thumbColor={theme.titleColor}
                    trackColor={{true: theme.titleColor, false: 'grey'}}
                    onValueChange={(value)=>{
                        db.transaction(tx => {
                            tx.executeSql('UPDATE SettingsApp SET isWarning = '+value)
                        });
                        dispatch(updateSettingIsWarning(value));
                    }}></Switch> 
                </Button>

                <Button
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <FontistoIcons name="bell-alt" color={theme.textColor} size={25}></FontistoIcons>
                    <View style={{ marginLeft: 20, width: 250}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Phát âm thanh</Text>
                    </View>
                    <Switch value={infoSettings.enableSound}
                    thumbColor={theme.titleColor}
                    trackColor={{true: theme.titleColor, false: 'grey'}}
                    onValueChange={(value)=>{
                        db.transaction(tx => {
                            tx.executeSql('UPDATE SettingsApp SET enableSound = '+value)
                        });
                        dispatch(updateSettingEnableSound(value));
                    }}></Switch> 
                </Button>

                <Button onPress={toggleOverlayWarningVoice}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="account-voice" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 250}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Cảnh báo bằng giọng nói</Text>
                        <Text style={{color:theme.textColor}}>{dataWarningVoice[infoSettings.selectSettingVoice].label}</Text>
                    </View>
                </Button>

                <Button onPress={toggleOverlayWarningLevel}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="reload-alert" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Mức cảnh báo khi vượt quá tốc độ giới hạn</Text>
                        <Text style={{color:theme.textColor}}>{infoSettings.warningLevel} km/h</Text>
                    </View>
                </Button>

                {/* <Button onPress={toggleOverlayShortCuts}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="directions" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Phím tắt</Text>
                        <Text style={{color:theme.textColor}}>{dataShortCuts[infoSettings.selectShortcut].label}</Text>
                    </View>
                </Button>

                <Button onPress={toggleOverlaySizeShortCuts}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="format-size" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Kích thước khi hiển thị trên ứng dụng khác</Text>
                        <Text style={{color:theme.textColor}}>Nhỏ</Text>
                    </View>
                </Button> */}

                <Button
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="speedometer-slow" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 250}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Đồng hồ tốc độ của phương tiện</Text>
                    </View>
                    <Switch value={infoSettings.enableSpeed}
                    thumbColor={theme.titleColor}
                    trackColor={{true: theme.titleColor, false: 'grey'}}
                    onValueChange={(value)=>{
                        db.transaction(tx => {
                            tx.executeSql('UPDATE SettingsApp SET enableSpeed = '+value)
                        });
                        dispatch(updateSettingEnableSpeedometer(value));
                    }}></Switch> 
                </Button>

                <Button onPress={()=>navigation.navigate('Độ lệch so với tốc độ thực tế')}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="calculator-variant-outline" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Độ lệch so với tốc độ của phương tiện</Text>
                        <Text style={{color:theme.textColor}}>Điều chỉnh độ lệch giữa tốc độ hiển thị so với tốc độ thực tế</Text>
                    </View>
                </Button>

                <Button
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="theme-light-dark" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 250}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Chế độ ban đêm</Text>
                    </View>
                    <Switch value={infoSettings.isNight} 
                    thumbColor={theme.titleColor}
                    trackColor={{true: theme.titleColor, false: 'grey'}}
                    onValueChange={(value)=>{
                        db.transaction(tx => {
                            tx.executeSql('UPDATE SettingsApp SET isNight = '+value)
                        });
                        dispatch(updateSettingIsNight(value));
                        EventRegister.emit('ChangeTheme', value);
                    }}></Switch>
                </Button>

                <Button
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="exit-to-app" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 250}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Hiển thị phím thoát ứng dụng ở màn hình chính</Text>
                    </View>
                    <Switch value={infoSettings.enableExitBtn}
                    thumbColor={theme.titleColor}
                    trackColor={{true: theme.titleColor, false: 'grey'}}
                    onValueChange={(value)=>{
                        db.transaction(tx => {
                            tx.executeSql('UPDATE SettingsApp SET enableExitBtn = '+value)
                        });
                        dispatch(updateSettingEnableExitBtn(value));
                    }}></Switch> 
                </Button>

                <Button
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="human-greeting" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 250}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Hiển thị màn hình nhắc nhở khi khởi động ứng dụng</Text>
                    </View>
                    <Switch value={infoSettings.enableWarningScreen}
                    thumbColor={theme.titleColor}
                    trackColor={{true: theme.titleColor, false: 'grey'}}
                    onValueChange={(value)=>{
                        db.transaction(tx => {
                            tx.executeSql('UPDATE SettingsApp SET enableWarningScreen = '+value)
                        });
                        dispatch(updateSettingEnableWarningScreen(value));
                    }}></Switch> 
                </Button>
            </View>

            <View style={{padding:10, backgroundColor: theme.backgroundFlatlist}}>
                <Text style={{color:theme.titleColor, fontWeight:'bold'}}>Về ứng dụng này</Text>
                <Button
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <AntDesignIcons name="exclamationcircleo" color={theme.textColor} size={25}></AntDesignIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Phiên bản</Text>
                        <Text style={{color:theme.textColor}}>3.3</Text>
                    </View>
                </Button>

                <Button onPress={onShare}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="share-variant" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Chia sẻ ứng dụng</Text>
                    </View>
                </Button>

                <Button onPress={()=> Linking.openURL('market://details?id=com.phamgia.speedlimit')}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <AntDesignIcons name="like1" color={theme.textColor} size={25}></AntDesignIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Đánh giá ứng dụng</Text>
                    </View>
                </Button>

                <Button onPress={()=>navigation.navigate('Cập nhật dữ liệu')}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="cloud-download" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Cập nhật dữ liệu</Text>
                    </View>
                </Button>

                <Button onPress={()=>navigation.navigate('Đóng góp dữ liệu')}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <IoniconsIcons name="location" color={theme.textColor} size={25}></IoniconsIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Thêm dữ liệu mới</Text>
                        <Text style={{color:theme.textColor}}>Thêm mới/ chỉnh sửa tốc độ giới hạn cho một tuyến đường</Text>
                    </View>
                </Button>

                <Button onPress={()=>navigation.navigate('Luật giao thông đường bộ')}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="traffic-light" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Luật giao thông đường bộ</Text>
                        <Text style={{color:theme.textColor}}>Tìm hiểu về luật giao thông đường bộ về tốc độ giới hạn</Text>
                    </View>
                </Button>

                <Button onPress={()=> navigation.navigate("Tra cứu vi phạm")}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="alert-circle-check-outline" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Kiểm tra vi phạm</Text>
                    </View>
                </Button>

                <Button onPress={()=>{
                    ToastAndroid.show('Tính năng vẫn đang trong quá trình phát triển', ToastAndroid.SHORT);
                }}
                    titleStyle={{color: 'black'}}
                    buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                    <MaterialCommunityIcons name="advertisements-off" color={theme.textColor} size={25}></MaterialCommunityIcons>
                    <View style={{ marginLeft: 20, width: 280}}>
                        <Text style={{color:theme.textColor, fontWeight:'bold'}}>Xoá quảng cáo</Text>
                        <Text style={{color:theme.textColor}}>Không hiển thị quảng cáo trong vòng 1 năm</Text>
                    </View>
                </Button>   
            </View>
            </ScrollView>
            <Overlay isVisible={visibleVehicle} onBackdropPress={toggleOverlayVehicle}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Chọn phương tiện</Text>
                    <View>
                    <RadioButtonRN
                        box={false}
                        activeColor={theme.titleColor}
                        data={dataVehicle}
                        initial={infoSettings.selectVehicle+1}
                        textColor={theme.textColor}
                        selectedBtn={(e) => {
                            db.transaction(tx => {
                                tx.executeSql('UPDATE SettingsApp SET selectVehicle = '+dataVehicle.indexOf(e))
                            });
                            dispatch(updateSettingVehicle(dataVehicle.indexOf(e)));
                        }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayVehicle}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>
            <Overlay isVisible={visibleWarningVoice} onBackdropPress={toggleOverlayWarningVoice}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Cảnh báo bằng giọng nói</Text>
                    <View>
                    <RadioButtonRN
                        box={false}
                        activeColor={theme.titleColor}
                        data={dataWarningVoice}
                        initial={infoSettings.selectSettingVoice+1}
                        textColor={theme.textColor}
                        selectedBtn={(e) => {
                            db.transaction(tx => {
                                tx.executeSql('UPDATE SettingsApp SET selectSettingVoice = '+dataWarningVoice.indexOf(e))
                            });
                            dispatch(updateSettingEnableVoice(dataWarningVoice.indexOf(e)));
                        }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayWarningVoice}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>

            <Overlay isVisible={visibleWarningLevel} onBackdropPress={toggleOverlayWarningLevel}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Mức cảnh báo khi vượt quá tốc độ tối đa</Text>
                    <Text style={[style.textOverlay,{alignSelf:'center'}]}>{infoSettings.warningLevel} km/h</Text>
                    <View>
                        <Slider
                            value={infoSettings.warningLevel}
                            onValueChange={(value)=>{
                                db.transaction(tx => {
                                    tx.executeSql('UPDATE SettingsApp SET warningLevel = '+value)
                                });
                                dispatch(updateSettingWarningLevel(value));
                            }}
                            maximumValue={10}
                            minimumValue={0}
                            minimumTrackTintColor={theme.titleColor}
                            step={1}
                            thumbStyle={{ height: 18, width: 18, backgroundColor: 'transparent' }}
                            thumbProps={{
                            children: (
                                <MaterialCommunityIcons
                                name="checkbox-blank-circle"
                                color={theme.titleColor}
                                size={16}
                                />
                            ),
                            }}
                        />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={[style.textOverlay]}>0</Text>
                        <Text style={[style.textOverlay]}>10</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayWarningLevel}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>
            
            <Overlay isVisible={visibleShortCuts} onBackdropPress={toggleOverlayShortCuts}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Phím tắt</Text>
                    <View>
                    <RadioButtonRN
                        box={false}
                        activeColor={theme.titleColor}
                        data={dataShortCuts}
                        initial={infoSettings.selectShortcut+1}
                        textColor={theme.textColor}
                        selectedBtn={(e) => {dispatch(updateSettingSelectShortcut(dataShortCuts.indexOf(e)))}}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayShortCuts}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>

            <Overlay isVisible={visibleSizeShortCuts} onBackdropPress={toggleOverlaySizeShortCuts}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Kích thước khi hiển thị trên ứng dụng khác</Text>
                    <View>
                    <RadioButtonRN
                        box={false}
                        activeColor={theme.titleColor}
                        data={dataSizeShortCut}
                        initial={1}
                        textColor={theme.textColor}
                        //selectedBtn={(e) => console.log(e)}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlaySizeShortCuts}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>
            
            {/* <Switch value={mode} onValueChange={(value)=>{
                        setMode(value)
                        EventRegister.emit('ChangeTheme', value);
                    }}></Switch> */}
        </View>
    )
}
export default SettingScreen;