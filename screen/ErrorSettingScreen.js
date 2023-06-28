import { View, Text} from "react-native"
import * as React from 'react';
import { useState, useContext } from "react";
import {Button, Overlay, Slider} from  "@rneui/themed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import style from "../style/Style";
import themeContext from "../config/themeContext";

//redux
import { useDispatch, useSelector } from "react-redux";
import { updateError0To19,
        updateError20To39,
        updateError40To59,
        updateError60To79,
        updateError80To99,
        updateError100Up } from "../redux/actions/errorLevelAction";

const ErrorSettingScreen = ()=>{
    const theme = useContext(themeContext);
    const [visibleErrorLevel0To19, setVisibleErrorLevel0To19] = useState(false);
    const [ErrorLevel0To19Value, setErrorLevel0To19Value] = useState(0);
    const [visibleErrorLevel20To39, setVisibleErrorLevel20To39] = useState(false);
    const [ErrorLevel20To39Value, setErrorLevel20To39Value] = useState(0);
    const [visibleErrorLevel40To59, setVisibleErrorLevel40To59] = useState(false);
    const [ErrorLevel40To59Value, setErrorLevel40To59Value] = useState(0);
    const [visibleErrorLevel60To79, setVisibleErrorLevel60To79] = useState(false);
    const [ErrorLevel60To79Value, setErrorLevel60To79Value] = useState(0);
    const [visibleErrorLevel80To99, setVisibleErrorLevel80To99] = useState(false);
    const [ErrorLevel80To99Value, setErrorLevel80To99Value] = useState(0);
    const [visibleErrorLevel100, setVisibleErrorLevel100] = useState(false);
    const [ErrorLevel100Value, setErrorLevel100Value] = useState(0);

    const infoErrorLevel = useSelector((state)=>state.errorLevelInfo);
    const dispatch = useDispatch();

    const toggleOverlayErrorLevel0To19 = () => {
        setVisibleErrorLevel0To19(!visibleErrorLevel0To19);
    };
    const toggleOverlayErrorLevel20To39 = () => {
        setVisibleErrorLevel20To39(!visibleErrorLevel20To39);
    };
    const toggleOverlayErrorLevel40To59 = () => {
        setVisibleErrorLevel40To59(!visibleErrorLevel40To59);
    };
    const toggleOverlayErrorLevel60To79 = () => {
        setVisibleErrorLevel60To79(!visibleErrorLevel60To79);
    };
    const toggleOverlayErrorLevel80To99 = () => {
        setVisibleErrorLevel80To99(!visibleErrorLevel80To99);
    };
    const toggleOverlayErrorLevel100 = () => {
        setVisibleErrorLevel100(!visibleErrorLevel100);
    };
    return(
        <View style={{ backgroundColor: theme.backgroundFlatlist, flex: 1}}>
            <Button onPress={toggleOverlayErrorLevel0To19}
                titleStyle={{color: 'black'}}
                buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                <View style={{ marginLeft: 20, width: 280}}>
                    <Text style={{color:theme.textColor, fontWeight:'bold', fontSize: 17}}>Từ 0 đến 19 km/h</Text>
                    <Text style={{color:theme.textColor, fontSize: 15}}>{infoErrorLevel.errorLevel0To19}%</Text>
                </View>
            </Button>
            <Button onPress={toggleOverlayErrorLevel20To39}
                titleStyle={{color: 'black'}}
                buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                <View style={{ marginLeft: 20, width: 280}}>
                    <Text style={{color:theme.textColor, fontWeight:'bold', fontSize: 17}}>Từ 20 đến 39 km/h</Text>
                    <Text style={{color:theme.textColor, fontSize: 15}}>{infoErrorLevel.errorLevel20To39}%</Text>
                </View>
            </Button>
            <Button onPress={toggleOverlayErrorLevel40To59}
                titleStyle={{color: 'black'}}
                buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                <View style={{ marginLeft: 20, width: 280}}>
                    <Text style={{color:theme.textColor, fontWeight:'bold', fontSize: 17}}>Từ 40 đến 59 km/h</Text>
                    <Text style={{color:theme.textColor, fontSize: 15}}>{infoErrorLevel.errorLevel40To59}%</Text>
                </View>
            </Button>
            <Button onPress={toggleOverlayErrorLevel60To79}
                titleStyle={{color: 'black'}}
                buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                <View style={{ marginLeft: 20, width: 280}}>
                    <Text style={{color:theme.textColor, fontWeight:'bold', fontSize: 17}}>Từ 60 đến 79 km/h</Text>
                    <Text style={{color:theme.textColor, fontSize: 15}}>{infoErrorLevel.errorLevel60To79}%</Text>
                </View>
            </Button>
            <Button onPress={toggleOverlayErrorLevel80To99}
                titleStyle={{color: 'black'}}
                buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                <View style={{ marginLeft: 20, width: 280}}>
                    <Text style={{color:theme.textColor, fontWeight:'bold', fontSize: 17}}>Từ 80 đến 99 km/h</Text>
                    <Text style={{color:theme.textColor, fontSize: 15}}>{infoErrorLevel.errorLevel80To99}%</Text>
                </View>
            </Button>
            <Button onPress={toggleOverlayErrorLevel100}
                titleStyle={{color: 'black'}}
                buttonStyle={{backgroundColor: 'transparent', alignItems:'center', justifyContent:'flex-start'}}>
                <View style={{ marginLeft: 20, width: 280}}>
                    <Text style={{color:theme.textColor, fontWeight:'bold', fontSize: 17}}>Từ 100 km/h trở lên</Text>
                    <Text style={{color:theme.textColor, fontSize: 15}}>{infoErrorLevel.errorLevelMore100}%</Text>
                </View>
            </Button>
            <Overlay isVisible={visibleErrorLevel0To19} onBackdropPress={toggleOverlayErrorLevel0To19}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Sai số từ 0 đến 19 km/h</Text>
                    <Text style={[style.textOverlay,{alignSelf:'center'}]}>{infoErrorLevel.errorLevel0To19} %</Text>
                    <View>
                        <Slider
                            value={infoErrorLevel.errorLevel0To19}
                            onValueChange={ (value)=> dispatch(updateError0To19(value))}
                            maximumValue={10}
                            minimumValue={-10}
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
                        <Text style={[style.textOverlay]}>-10</Text>
                        <Text style={[style.textOverlay]}>10</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayErrorLevel0To19}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>
            <Overlay isVisible={visibleErrorLevel20To39} onBackdropPress={toggleOverlayErrorLevel20To39}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Sai số từ 20 đến 39 km/h</Text>
                    <Text style={[style.textOverlay,{alignSelf:'center'}]}>{infoErrorLevel.errorLevel20To39} %</Text>
                    <View>
                        <Slider
                            value={infoErrorLevel.errorLevel20To39}
                            onValueChange={(value)=> dispatch(updateError20To39(value))}
                            maximumValue={10}
                            minimumValue={-10}
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
                        <Text style={[style.textOverlay]}>-10</Text>
                        <Text style={[style.textOverlay]}>10</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayErrorLevel20To39}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>
            <Overlay isVisible={visibleErrorLevel40To59} onBackdropPress={toggleOverlayErrorLevel40To59}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Sai số từ 40 đến 59 km/h</Text>
                    <Text style={[style.textOverlay,{alignSelf:'center'}]}>{infoErrorLevel.errorLevel40To59} %</Text>
                    <View>
                        <Slider
                            value={infoErrorLevel.errorLevel40To59}
                            onValueChange={(value)=> dispatch(updateError40To59(value))}
                            maximumValue={10}
                            minimumValue={-10}
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
                        <Text style={[style.textOverlay]}>-10</Text>
                        <Text style={[style.textOverlay]}>10</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayErrorLevel40To59}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>
            <Overlay isVisible={visibleErrorLevel60To79} onBackdropPress={toggleOverlayErrorLevel60To79}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Sai số từ 60 đến 79 km/h</Text>
                    <Text style={[style.textOverlay,{alignSelf:'center'}]}>{infoErrorLevel.errorLevel60To79} %</Text>
                    <View>
                        <Slider
                            value={infoErrorLevel.errorLevel60To79}
                            onValueChange={(value)=> dispatch(updateError60To79(value))}
                            maximumValue={10}
                            minimumValue={-10}
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
                        <Text style={[style.textOverlay]}>-10</Text>
                        <Text style={[style.textOverlay]}>10</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayErrorLevel60To79}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>
            <Overlay isVisible={visibleErrorLevel80To99} onBackdropPress={toggleOverlayErrorLevel80To99}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Sai số từ 80 đến 99 km/h</Text>
                    <Text style={[style.textOverlay,{alignSelf:'center'}]}>{infoErrorLevel.errorLevel80To99} %</Text>
                    <View>
                        <Slider
                            value={infoErrorLevel.errorLevel80To99}
                            onValueChange={(value)=> dispatch(updateError80To99(value))}
                            maximumValue={10}
                            minimumValue={-10}
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
                        <Text style={[style.textOverlay]}>-10</Text>
                        <Text style={[style.textOverlay]}>10</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayErrorLevel80To99}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>
            <Overlay isVisible={visibleErrorLevel100} onBackdropPress={toggleOverlayErrorLevel100}>
                <View style={[style.overlay, {width: 340, backgroundColor:theme.backgroundTextColor}]}>
                    <Text style={[style.titleOverLay, {color: theme.textColor}]}>Sai số từ 100 km/h trở lên</Text>
                    <Text style={[style.textOverlay,{alignSelf:'center'}]}>{infoErrorLevel.errorLevelMore100} %</Text>
                    <View>
                        <Slider
                            value={infoErrorLevel.errorLevelMore100}
                            onValueChange={(value)=> dispatch(updateError100Up(value))}
                            maximumValue={10}
                            minimumValue={-10}
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
                        <Text style={[style.textOverlay]}>-10</Text>
                        <Text style={[style.textOverlay]}>10</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <Button buttonStyle={[style.buttonOverlay]} 
                                titleStyle={{color: theme.titleColor}}
                                onPress={toggleOverlayErrorLevel100}>Huỷ</Button>
                    </View>
                </View>
            </Overlay>
        </View>
    );
}

export default ErrorSettingScreen;