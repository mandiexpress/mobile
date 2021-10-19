import dayjs from 'dayjs';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { icons, routes } from '../../shared/constants';
import styles from './styles';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function PromotionItem({ item, navigation, fullWidth = false }) {
  let width = 250;
  if (fullWidth) {
    width = '100%';
  }

  return (
    <Pressable
      style={[styles.container, { width }]}
      onPress={() => navigation.navigate(routes.PROMOTION_DETAIL_SCREEN, item)}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode={'cover'}
      />
      <View style={styles.detailContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title.en}</Text>
          <Text style={styles.validity}>
            Valid for {dayjs().to(item.validTill.toDate(), true)}
          </Text>
        </View>
        <Image source={icons.BACK} style={styles.nextIcon} />
      </View>
    </Pressable>
  );
}
