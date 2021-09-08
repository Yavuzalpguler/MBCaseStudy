import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import MovieDetail from './src/screens/MovieDetail';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import movieReducer from './src/redux/reducers/reducer';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createTransform} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['bookmarks'],
};
const rootReducer = combineReducers({
  movieReducer: persistReducer(persistConfig, movieReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
              name={'Home'}
              component={TabScreen}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
              name={'Movie details'}
              component={MovieDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
