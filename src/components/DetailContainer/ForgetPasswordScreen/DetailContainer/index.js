import React, {useState} from 'react';
import {Text, Pressable, View, Image} from 'react-native';
import {icons} from '../../../../shared/constants';
import styles from './styles';

const DetailContainer = ({item}) => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.uri}} style={styles.imageStyle} />
      </View>
      <View style={styles.contextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.divider} />
        <Text style={styles.itemPrice}>Rs. {item.price}/KG</Text>
        {item.subTotal ? (
          <Text style={styles.itemPrice}>Rs. {item.subTotal}</Text>
        ) : null}
      </View>
      <View style={styles.counterStyle}>
        <Pressable onPress={() => setCount(prevState => prevState + 1)}>
          <Image style={styles.plusCount} source={icons.ADD} />
        </Pressable>
        <View style={styles.countStyle}>
          <Text style={styles.countTextStyle}>{count}</Text>
        </View>

        <Pressable
          disabled={count === 0}
          onPress={() =>
            setCount(prevState => {
              return prevState - 1;
            })
          }>
          <Image style={styles.minusCount} source={icons.MINUS} />
        </Pressable>
      </View>
    </View>
  );
};
export default DetailContainer;
