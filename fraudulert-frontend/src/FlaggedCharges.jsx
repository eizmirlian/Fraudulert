import React, {useEffect, useState} from 'react'
import transactionData from './flaggedTransactions.json'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
    Navigation,
} from "react-router-dom";

//import FlaggedChargeItem from './components/FlaggedChargeItem'

import {FlaggedCharge} from './components/FlaggedCharge'

import { Text, View, StyleSheet } from 'react-native';
import App from './App'

import { FlatList } from 'react-native';




export function FlaggedCharges( {route, navigation} ) {

    const flaggedTransactions = Object.keys(transactionData).map((key) => ({
        id: key,
        text: JSON.stringify(transactionData[key], null, 2),
      }));
    console.log(flaggedTransactions);
    const handleClick = (id) => {
        console.log(id)
        //removeElement(id)
        navigation.push('Chat', {transId : id})
        
    };
    const id = route.params['transId'];
    const [data, setData] = useState(flaggedTransactions);
    const [flaggedState, setFlaggedState] = useState(flaggedTransactions)
    useEffect(() => {
        if (id != '-1') {
            removeElement(id);
        }
    }, [])
   
    const addElement = (newID, element) => {
    var newArray = [...data , {id : newID, text: element }];
    setData(newArray)
    setFlaggedState(data)
};

const removeElement = (confirmedID) => {
    var toRemove = data.findIndex(element => element.id == confirmedID)
    var newState = data.toSpliced(toRemove)
    setFlaggedState(newState)
};
    

    return (
        <View>
            <div>
                <Text style={styles.title}>{flaggedTransactions.length} Fraudulent Transactions Detected </Text>
                <Text style={styles.space}> {'\n'} </Text>
                <FlatList
                keyExtractor = {item => item.id}  
                data={flaggedState}
                renderItem = {item => (
                    <div>
                        <FlaggedCharge onClick = {() => handleClick(item.item.id)}> {"Transaction #" + item.item.id + " :" + item.item.text} </FlaggedCharge>
                    </div>
                )} />
            </div>
        </View>
    );
};
const styles = {
    title: {
        fontSize: `${70}px`, 
        textAlign: 'center',
        alignItems: 'center',
        color: '#3C4142',
    }, 
    space: {
        fontSize: `${30}px` 
    },
};