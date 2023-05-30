import * as React from 'react';
import { Image, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home_connexion'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription'



function LogoTitle() {
  return (
    <Image
      style={{ width: 200 }}
      source={require('./assets/img/Logomobile.png')}
    />
  );
}



const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
          options={{ 
            headerTitle: (props) => <LogoTitle {...props}  />,
            headerStyle: {
              backgroundColor: '#0C284D',
            },
          }}
         
         
        
      />
      <Stack.Screen
        name="Connexion"
        component={Connexion}
        options={{ 
          headerTitle: (props) => <LogoTitle {...props}  />,
          headerStyle: {
            backgroundColor: '#0C284D',   
          },
        }}
      />
        <Stack.Screen
        name="Inscription"
        component={Inscription}
        options={{ 
          headerTitle: (props) => <LogoTitle {...props}  />,
          headerStyle: {
            backgroundColor: '#0C284D',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
