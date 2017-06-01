import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
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

    },
    tabBarLabel: 'Review Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='favorite' size={30} color={tintColor} />;
    }
  });

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {
        company, formattedRelativeTime, url,
        longitude, latitude, jobtitle, jobkey
      } = job;

      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };
      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.os === 'android'}
              initialRegion={initialRegion}
            />

            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
            </View>
            <Button
              title='Apply Now!'
              backgroundColor='#0389F4'
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  },
};

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs || [] };
}

export default connect(mapStateToProps, null)(ReviewScreen);
