import { View, Text, Switch, Alert} from "react-native"
import * as React from 'react';
import { useState, useContext } from "react";
import {Button, LinearProgress} from  "@rneui/themed";

import style from "../style/Style";
import themeContext from "../config/themeContext";

import { firebase } from "../config/firebaseConfig";
// database 
import * as SQLite from 'expo-sqlite';
//redux
import { useDispatch, useSelector } from "react-redux";
import { updateSettingIsUpdateWhenOpen } from "../redux/actions/settingsAction";

 const UpdateDataSreen = ()=>{
    const theme = useContext(themeContext);
    const db = SQLite.openDatabase('test.db');

    const [checkUpdate, setCheckUpdate] = useState('Chưa có dữ liệu cập nhật');
    const [strupdate, setstrUpdate] = useState('Chưa tiến hành cập nhật dữ liệu');
    const [lastTimeUpdate, setlastTimeUpdate] = useState(null);
    const timeUpdateDB = firebase.firestore().collection('UpdateTime');
    const streetUpdate = firebase.firestore().collection('CTMaxSpeed');
    
    // progress
    const [isDowloading, setIsDowloading] = useState(false);
    const [percent, setPercent] = useState(0);

    // redux
    const infoSettings = useSelector((state)=> state.settingsInfo);
    const dispatch = useDispatch();

    // is Loading
    const[isLoading, setisLoading] = useState(true);

    if(isLoading){
        db.transaction(tx => {
            tx.executeSql("SELECT TimeUpdate FROM SettingsApp", null,
            (txObj, resultSet)=>{ 
                console.log(resultSet.rows._array);
                if(resultSet.rows._array.length!=0 && resultSet.rows._array[0].TimeUpdate != null){
                    let date = new Date(resultSet.rows._array[0].TimeUpdate);
                    setlastTimeUpdate(date);
                    setstrUpdate('Lần cập nhật gần nhất: '+ date.getDate()+'-'+ (date.getMonth()+1)+'-'+date.getFullYear()+', '+date.getHours()+':'+date.getMinutes())
                }
            },
            (txObj, error)=>console.log(error));
        });

        setisLoading(false);
    }

    const checkupdate = async ()=>{
        timeUpdateDB
        .onSnapshot(
            querySnapshot =>{
                const timeupdates = [];
                querySnapshot.forEach((doc)=>{
                    const {Timeupdate} = doc.data();
                    timeupdates.push(
                        {
                            id: doc.id,
                            Timeupdate,
                        }
                    )
                })
                //console.log(timeupdates[0].Timeupdate);
                let date1 = (timeupdates[0].Timeupdate).toDate();
                let date = new Date();
                if(date>date1 && lastTimeUpdate<date1){
                    let strminute = date1.getMinutes()>=10? date1.getMinutes(): ('0'+ date1.getMinutes());
                    let strdate = date1.getDate()+'-'+(date1.getMonth()+1)+'-'+date1.getFullYear()+', '+date1.getHours()+':'+strminute;
                    setCheckUpdate('Đã có bản cập nhật vào ngày '+ strdate);
                    Alert.alert(
                        "Thông báo",
                        "Đã có bản cập nhật mới nhất vào ngày "+ strdate + ". Bạn có muốn cập nhật dữ liệu mới không?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => {},
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => {
                                console.log('dowload data');
                                setIsDowloading(true);
                                dowloadData();
                            } 
                          }
                        ]
                    );
                }
                else {
                    Alert.alert(
                        "Thông báo",
                        "Vẫn chưa có bản cập nhật mới!",
                        [
                          {
                            text: "OK",
                            onPress: () => {},
                            style: "cancel"
                          },
                        ]
                    );
                }
            }
        )
    }

    const dowloadData = ()=>{
        streetUpdate.onSnapshot(
            querySnapshot =>{
                const ctMaxspeeds = [];
                querySnapshot.forEach((doc)=>{
                    const {city, district, maxSpeed, message, region, street, subregion, vehicle_id} = doc.data();
                    ctMaxspeeds.push(
                        {
                            id: doc.id,
                            city,
                            district,
                            maxSpeed, 
                            message, 
                            region, 
                            street, 
                            subregion, 
                            vehicle_id,
                        }
                    )
                })
                let tong = ctMaxspeeds.length;
                let n = 0;
                db.transaction(tx => {
                    tx.executeSql("DELETE FROM Treets", null,
                    (txObj, resultSet)=>{ console.log('đã xóa');},
                    (txObj, error)=>console.log(error));
                });

                ctMaxspeeds.forEach(element => {
                    let strStreet = element.street===''? null: element.street;
                    let strSubregion = element.subregion===''? null: element.subregion;
                    let strDistrict = element.district===''? null: element.district;
                    let strCity = element.city===''? null: element.city;
                    let strRegion = element.region===''? null: element.region;
                    let strMaxSpeed = element.maxSpeed===''? null: element.maxSpeed;
                    let strMessage = element.message===''? null: element.message;
                    let strVehicle_id = element.vehicle_id===''? null: element.vehicle_id;
                    console.log(strStreet+strSubregion+strDistrict+strCity+strRegion);
                    db.transaction(tx => {
                        tx.executeSql('INSERT INTO Treets (street, subregion, district, city, region, maxSpeed, message, vehicle_id) values (?, ?, ?, ?, ?, ?, ?, ?)', [strStreet, strSubregion, strDistrict, strCity, strRegion , strMaxSpeed , strMessage, strVehicle_id]),
                        (txObj, resultSet)=>{ console.log('complete')},
                        (txObj, error)=>console.log(error);
                    });
                    n++;
                    console.log(n/tong);

                    setPercent(n/tong);
                });
                let date = new Date();
                let strDate = "'"+date.toString()+"'";
                console.log(strDate);
                db.transaction(tx => {
                    tx.executeSql("UPDATE SettingsApp SET TimeUpdate = "+strDate);
                });
                setstrUpdate('Lần cập nhật gần nhất: '+ date.getDate()+'-'+ (date.getMonth()+1)+'-'+date.getFullYear()+', '+date.getHours()+':'+date.getMinutes());
            }
        )
    }

    return(
        <View style={{ backgroundColor: theme.backgroundFlatlist, flex: 1, flexDirection:'column'}}>
            <View style={[style.container, {flex: 5}]}>
                <Text style={{marginTop: 80, marginBottom: 10, color:theme.textColor}}>{checkUpdate}</Text>
                <Button onPress={checkupdate} title="KIỂM TRA CẬP NHẬT" buttonStyle={{backgroundColor:theme.backgroundButtonColor, color: theme.textColor}}></Button>
            </View>
            <View style={[style.container,{flex:1}]}>
                { isDowloading && <Text style={{color: theme.textColor}}>Đang tiến hành cập nhật: {percent*100}%</Text>}
                { isDowloading && <LinearProgress
                    style={{ marginVertical: 10, width:'80%' }}
                    value={percent}
                    variant="determinate"
                />}
                <Text style={{color: theme.textColor}}>{strupdate}</Text>
                {/* <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={{color: theme.textColor, fontWeight:'bold', marginRight: 10}}>Kiểm tra cập nhật khi mở ứng dụng</Text>
                    <Switch value={infoSettings.isUpdateWhenOpen}
                    thumbColor={theme.titleColor}
                    trackColor={{true: theme.titleColor, false: 'grey'}}
                    onValueChange={(value)=>{
                        dispatch(updateSettingIsUpdateWhenOpen(value));
                    }}></Switch>
                </View> */}
            </View>
            
        </View>
    );
 }

 export default UpdateDataSreen;