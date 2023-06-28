import { CurrentRenderContext } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { useState, useContext } from "react";
import themeContext from "../config/themeContext";




const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    overlay:{
        margin: -10,
        padding: 15,
    },
    titleOverLay:{
        fontWeight:'bold',
        fontSize: 18,
    },
    textOverlay:{
        marginTop: 10,
    },
    buttonOverlay:{
        backgroundColor:'transparent',
        marginRight: 20,
    }, 
    input:{
        borderBottomWidth: 1,
        height: 40
    }, 
    textTrafficTitle:{
        marginTop: 15,
        fontSize:20,
        fontWeight:'bold',
    },
    textTrafficItali:{
        marginTop: 15,
        fontSize: 14,
        fontStyle:'italic',
    },
    textTrafficTerm:{
        marginTop: 15,
        fontSize: 17,
        fontWeight:'bold'
    },
    textTraffic:{
        marginTop: 15,
        fontSize: 15,
    }, 
    tableBorder:{
        borderWidth:0.5,
    }, 
    Hyperlink:{
        textDecorationLine:'underline',
        color:'blue',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default style;