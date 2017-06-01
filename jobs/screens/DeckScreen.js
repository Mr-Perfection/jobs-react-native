import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';

import Swipe from '../components/Swipe';
import * as actions from '../actions';

const SCREEN_HEIGHT = Dimensions.get('window').height;
class DeckScreen extends Component {

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      longitudeDelta: 0.045,
      latitudeDelta: 0.02
    };

    return (
      <Card title={job.jobtitle} titleStyle={{ height: SCREEN_HEIGHT * 0.07 }}>
        <View style={{ height: SCREEN_HEIGHT / 4 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.os === 'android'}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <View style={{ height: SCREEN_HEIGHT / 4 }}>
          <Text>
            {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
          </Text>
        </View>
      </Card>
    );
  }

  renderNoMoreJobs() {
    return (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard.bind(this)}
          renderNoMoreCards={this.renderNoMoreJobs.bind(this)}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp='jobkey'
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results || [] };
}

export default connect(mapStateToProps, actions)(DeckScreen);
