import React, { useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useDispatch } from 'react-redux';
import { fonts, routes } from '../../shared/constants';
import { disableIntroduction } from '../../store/reducers/user';
import ActionButton from './components/ActionButton';
import slides from './slides';

export default function IntroductionScreen({ navigation }) {
  const dispatch = useDispatch();
  const slider = useRef(null);

  function onDone() {
    dispatch(disableIntroduction());
    navigation.navigate(routes.HOME_NAVIGATOR);
  }

  function onSkipPress() {
    slider.current.goToSlide(slides.length - 1);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={onSkipPress} style={styles.skipButtonContainer}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </Pressable>
      <AppIntroSlider
        ref={slider}
        style={styles.sliderStyle}
        data={slides}
        onDone={onDone}
        renderItem={_renderItem}
        activeDotStyle={styles.sliderActiveDotStyle}
        dotStyle={styles.sliderDotStyle}
        showSkipButton={false}
        showPrevButton={true}
        showDoneButton={true}
        showNextButton={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderNextButton={() => <ActionButton title={'Next'} />}
        renderDoneButton={() => <ActionButton title={'Shop'} />}
        renderPrevButton={() => <ActionButton title={'Prev'} />}
      />
    </View>
  );
}

function _renderItem({ item }) {
  return (
    <View style={styles.renderItemContainer}>
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  skipButtonContainer: {
    justifyContent: 'center',
    padding: 24,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
  },
  skipButtonText: {
    alignSelf: 'flex-end',
    textTransform: 'uppercase',
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    color: 'gray',
  },
  sliderStyle: {
    backgroundColor: 'white',
  },
  sliderActiveDotStyle: {
    backgroundColor: '#212121',
  },
  sliderDotStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  renderItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '90%',
  },
  slide: {
    padding: 18,
    alignContent: 'center',
    alignItems: 'center',
    height: 350,
  },
  title: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginVertical: 12,
    fontFamily: fonts.BOLD,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  textContainer: {
    paddingHorizontal: 24,
  },
  text: {
    color: 'gray',
    textAlign: 'center',
    fontFamily: fonts.REGULAR,
  },
});
