import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
function Slides({ data }) {
  const renderSlides = (slides) => {
    const renderLastSlide = (index) => {
      if (index === slides.length - 1) {
        return (
          <Button
            title='Finished!'
            raised
          />
        );
      }
    };

    return slides.map((slide, index) => {
      return (
        <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
          <Text style={styles.textStyle}>{slide.text}</Text>
          { renderLastSlide(index) }
        </View>
      );
    });
  };

  return (
    <ScrollView
      horizontal
      pagingEnabled
      style={{ flex: 1 }}
    >
      {renderSlides(data)}
    </ScrollView>);
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 27,
    color: 'white'
  }
};

export default Slides;
