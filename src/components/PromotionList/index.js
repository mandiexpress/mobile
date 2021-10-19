import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { icons, routes } from '../../shared/constants';
import PromotionItem from '../PromotionItem';
import SectionHeader from '../SectionHeader';
import styles from './styles';

export default function PromotionList({
  navigation,
  showHeader = true,
  id = null,
  promotions = [],
}) {
  function onSeeAllPress() {
    navigation.navigate(routes.PROMOTION_LIST_SCREEN);
  }

  return (
    <View style={styles.sectionContainer}>
      {showHeader && <SectionHeader title={'Promotions / Offers'} />}
      <FlatList
        data={promotions}
        ListFooterComponent={() => <SeeMore onSeeAllPress={onSeeAllPress} />}
        renderItem={({ item }) => {
          if (id !== null && id === item.id) {
            return null;
          } else {
            return <PromotionItem item={item} navigation={navigation} />;
          }
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </View>
  );
}

function SeeMore({ onSeeAllPress }) {
  return (
    <Pressable style={styles.seeMoreContainer} onPress={onSeeAllPress}>
      <Image source={icons.NEXT_ICON} style={styles.seeMoreIcon} />
      <Text style={styles.seeMoreText}>See All{'\n'}Promotions / Offers</Text>
    </Pressable>
  );
}
