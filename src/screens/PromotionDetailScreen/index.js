import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Header from '../../components/Header';
import PromotionList from '../../components/PromotionList';
import { fetchPromotions } from '../../shared/api';
import styles from './styles';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function PromotionDetailScreen({ navigation, route }) {
  const { validTill, description, image, title, id } = route.params;
  const [imageModal, setImageModal] = useState(false);
  const [promotions, setPromotions] = useState([]);

  async function getPromotions() {
    try {
      const result = await fetchPromotions();
      setPromotions(result);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getPromotions();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={'Promotion Detail'} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <Pressable>
          <Image
            style={styles.image}
            resizeMode={'cover'}
            source={{ uri: image }}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title.en}</Text>
          <Text style={styles.leftOver}>
            Ends {dayjs().to(dayjs(validTill.toDate()))}
          </Text>
          <Text style={styles.description}>{description.en}</Text>
        </View>
        <Divider />
        <View style={styles.similarContainer}>
          <Text style={styles.similarHeading}>Similar Promotions / Offers</Text>
          <PromotionList
            navigation={navigation}
            showHeader={false}
            id={id}
            promotions={promotions}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Divider({ marginVertical = 12 }) {
  return (
    <View
      style={{
        backgroundColor: 'black',
        opacity: 0.05,
        marginVertical,
        height: 1,
        width: '90%',
        alignSelf: 'center',
      }}
    />
  );
}
