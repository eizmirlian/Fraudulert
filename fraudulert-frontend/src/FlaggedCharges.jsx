import React, {useState} from 'react'

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




export function FlaggedCharges( {navigation} ) {

   const [flaggedTransactions, setFlaggedTransactions] = useState([
    {id : 1, text : 'Redirect'}, {id : 2, text : 'Poop2'}, {id : 3, text : 'Bye bitch'}
    ])
    const [flaggedState, setFlaggedState] = useState(flaggedTransactions)
    const handleClick = (id) => {
        console.log(id)
        //removeElement(id)
        navigation.push('Chat', {transId : id})
    }

    const addElement = (newID, element) => {
        var newArray = [...flaggedTransactions , {id : newID, text: element }];
        setFlaggedTransactions(newArray)
        setFlaggedState(flaggedTransactions)
    }

    const removeElement = (confirmedID) => {
        var toRemove = flaggedTransactions.findIndex(element => element.id == confirmedID)
        var newState = flaggedTransactions.toSpliced(toRemove)
        setFlaggedState(newState)
    }

    return (
        <View>
            <div>
                <Text>{flaggedTransactions.length} Fraudulent Transactions Detected</Text>
                <FlatList
                keyExtractor = {item => item.id}  
                data={flaggedState}
                renderItem = {item => (
                    <div>
                        <FlaggedCharge onClick = {() => handleClick(item.item.id)}> {item.item.text} </FlaggedCharge>
                    </div>
                )} />
            </div>
        </View>
    )
}