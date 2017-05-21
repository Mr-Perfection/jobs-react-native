import Expo from 'expo';
import React from 'react';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

class App extends React.Component {
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
        })
      }
    };
    const tabNavigatorConfig = {
      activeTintColor: '#e91e63',
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
