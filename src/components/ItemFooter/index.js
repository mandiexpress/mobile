import React from 'react';
import { Pressable, Image, Text } from 'react-native';
import { icons } from '../../shared/constants';
import styles from './styles';

export default function ItemFooter({ navigation, onPress, title }) {
  return (
    <Pressable onPress={onPress} style={styles.seeAllContainer}>
      <Image source={icons.NEXT_ICON} style={styles.seeAllIcon} />
      <Text style={styles.seeAllText}>{title}</Text>
    </Pressable>
  );
}
