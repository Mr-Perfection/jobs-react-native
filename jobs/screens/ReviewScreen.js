import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
  ),
  headerStyle: {
    marginTop: Platform.os === 'android' ? 24 : 0
    
  }
  });

  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default ReviewScreen;
