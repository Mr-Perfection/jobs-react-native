import Expo, { Notifications } from 'expo';
import React from 'react';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import store from './store';
import registerForNotifications from './services/push_notifications';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Expo.Notifications.addListener((notification) => {
      const { origin, data: { text } } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [
            { text: 'Ok.' }
          ]
        );
      }
    });
  }

  render() {
    const routesConfig = {
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            activeTintColor: '#009688',
            labelStyle: {
              fontSize: 12,
            },
          },
        })
      }
    };
    const tabNavigatorConfig = {
      activeTintColor: '#e91e63',
      lazy: true,
      navigationOptions: {
        tabBarVisible: false
      }
    };
    const MainNavigator = TabNavigator(routesConfig, tabNavigatorConfig);

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
