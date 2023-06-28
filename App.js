import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNavigationContainerRef, NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import themeContext from './config/themeContext';
import theme from './config/theme';

import WarningScreen from './screen/WarningScreen';
import SpeedometerScreen from './screen/SpeedometerScreen';
import JouneyDiaryScreen from './screen/JourneyDiaryScreen';
import SettingScreen from './screen/settingsScreen';
import ErrorSettingScreen from './screen/ErrorSettingScreen'
import UpdateDataSreen from './screen/UpdateDataScreen';
import ContributeDataScreen from './screen/ContributeDataScreen';
import TrafficScreen from './screen/TrafficLawScreen';
import SearchTrafficScreen from './screen/SearchRrafficViolationScreen';
import MapViewScreen from './screen/mapView';
import SpeedometerMirrorScreen from './screen/SpeedometerMirrorScreen';

import { Header } from 'react-native/Libraries/NewAppScreen';
import { Button } from '@rneui/themed';
//redux
import { Provider } from 'react-redux';
import { store } from './redux/store';
// database
import * as SQLite from 'expo-sqlite';
// notifications 
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const rootStackNavigator = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'white',
    card: '#142c48',
  },
};

export default function App() {
  const db = SQLite.openDatabase('test.db');
  const [mode, setMode] = useState(false);
  // push notifications 
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [isNight, setisNight] = useState(false);
  const [isWarningScreen, setisWarningScreen] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(()=>{

    db.transaction(tx=>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS Jouneys (id INTEGER PRIMARY KEY AUTOINCREMENT, distance REAL, highest REAL, begin TEXT, finish TEXT, time INTEGER, average REAL)');
    });

    db.transaction(tx=>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS Treets (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, subregion TEXT, district TEXT, city TEXT, region TEXT, maxSpeed REAL, message TEXT, vehicle_id INTEGER)');
    });

    db.transaction(tx=>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS Vehicles (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT)');
    });

    db.transaction(tx=>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS SettingsApp (id INTEGER PRIMARY KEY AUTOINCREMENT, selectVehicle INTEGER, isWarning INTEGER, enableSound INTEGER, selectSettingVoice INTEGER, warningLevel INTEGER, selectShortcut INTEGER, enableSpeed INTEGER, isNight INTEGER, enableExitBtn INTEGER, enableWarningScreen INTEGER, isUpdateWhenOpen INTEGER, TimeUpdate TEXT)');
    });

    db.transaction(tx => {
      tx.executeSql('INSERT INTO SettingsApp (id, selectVehicle, isWarning, enableSound, selectSettingVoice, warningLevel, selectShortcut, enableSpeed, isNight, enableExitBtn, enableWarningScreen, isUpdateWhenOpen, TimeUpdate) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [1, 1, 1, 1, 0, 5, 1, 1, 0, 1, 1, 0, null])
    });

    db.transaction(tx => {
      tx.executeSql("SELECT * FROM SettingsApp", null,
      (txObj, resultSet)=>{ 
        console.log(resultSet.rows._array);
          if(resultSet.rows._array.length!=0){
              setisWarningScreen(resultSet.rows._array[0].enableWarningScreen==0? false: true);
              setMode(resultSet.rows._array[0].isNight==0?false:true);
              setisLoading(false);
          }
      },
      (txObj, error)=>console.log(error));
  });

    let eventListener = EventRegister.addEventListener(
      'ChangeTheme',
      (data)=>{setMode(data);}
    );
    return ()=>{
      EventRegister.removeAllListeners(eventListener);
    }
  });

  if(isLoading){
    return null;
  }

  return (
    <themeContext.Provider value={mode === true? theme.dark : theme.light}>
      <Provider store={store}>
      <NavigationContainer theme={mode === true? DarkTheme: MyTheme}>
        <rootStackNavigator.Navigator initialRouteName={isWarningScreen===false? 'Speedometer':'Warning'}>
          <rootStackNavigator.Screen name='Warning' component={WarningScreen} 
                                      options={{
                                        headerShown: false
                                        }}></rootStackNavigator.Screen>
          <rootStackNavigator.Screen name='Speedometer' component={SpeedometerScreen} options={{headerShown: false}}></rootStackNavigator.Screen>
          <rootStackNavigator.Screen name='Nhật ký hành trình' component={JouneyDiaryScreen}></rootStackNavigator.Screen>
          <rootStackNavigator.Screen name='Cài đặt' component={SettingScreen}></rootStackNavigator.Screen>
          <rootStackNavigator.Screen name='Độ lệch so với tốc độ thực tế' component={ErrorSettingScreen}></rootStackNavigator.Screen>
          <rootStackNavigator.Screen name="Cập nhật dữ liệu" component={UpdateDataSreen}></rootStackNavigator.Screen>    
          <rootStackNavigator.Screen name='Đóng góp dữ liệu' component={ContributeDataScreen}></rootStackNavigator.Screen>   
          <rootStackNavigator.Screen name='Luật giao thông đường bộ' component={TrafficScreen}></rootStackNavigator.Screen>  
          <rootStackNavigator.Screen name='Tra cứu vi phạm' component={SearchTrafficScreen}></rootStackNavigator.Screen> 
          <rootStackNavigator.Screen name='MapView' component={MapViewScreen}></rootStackNavigator.Screen>     
          <rootStackNavigator.Screen name='SpeedometerMirror' component={SpeedometerMirrorScreen} options={{headerShown: false}}></rootStackNavigator.Screen>                
        </rootStackNavigator.Navigator>
      </NavigationContainer>
      </Provider>
    </themeContext.Provider>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

