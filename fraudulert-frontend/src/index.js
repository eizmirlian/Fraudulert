import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FlaggedCharges } from './FlaggedCharges';
import Welcome from './Welcome';


const Stack = createNativeStackNavigator();

const Router = () => (
  <NavigationContainer>
  <Stack.Navigator initialRouteName="App">
    <Stack.Screen name="Charges" component={FlaggedCharges} />
    <Stack.Screen name="App" component={Welcome}/>
    <Stack.Screen name="Chat" component={Chat} initialParams={{transID}}/>
  </Stack.Navigator>
</NavigationContainer>
)

ReactDOM.render(<Router />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
