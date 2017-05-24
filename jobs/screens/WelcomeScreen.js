import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import { AppLoading } from 'expo';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to this Job Search App', color: '#03A9F4' },
  { text: 'Use this to get a job.', color: '#03FFFF' },
  { text: 'Set your location and swipe right!', color: '#03A9F4' }
];
class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.setState({ token });
      this.props.navigation.navigate('map');
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
