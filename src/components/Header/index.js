import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Header as RNEHeader } from 'react-native-elements';
import { icons } from '../../shared/constants';
import styles from './styles';

export default function Header({
  navigation,
  title,
  titleStyle = {},
  rightComponent,
  leftComponent = true,
  backNavStyle = {},
  placement = 'left',
}) {
  return (
    <RNEHeader
      leftComponent={
        leftComponent && (
          <Pressable
            style={[styles.backNav, backNavStyle]}
            onPress={() => navigation.pop()}>
            <Image source={icons.BACK} style={styles.backNavIcon} />
          </Pressable>
        )
      }
      containerStyle={{
        paddingHorizontal: 0,
      }}
      rightComponent={rightComponent}
      rightContainerStyle={{ alignSelf: 'center' }}
      statusBarProps={{ backgroundColor: '#212121' }}
      centerComponent={
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
      }
      backgroundColor={'white'}
      placement={placement}
    />
  );
}
