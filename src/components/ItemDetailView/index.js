import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import { fonts } from '../../shared/constants';

export default function ItemDetailView({ visible, onRequestClose, item }) {
  console.log('Item', item);

  return (
    <Modal
      visible={visible}
      backdropColor={'rgba(0, 0, 0, 0.2)'}
      onBackdropPress={onRequestClose}
      style={{ margin: 0, borderTopEndRadius: 10 }}
      backdropOpacity={1}
      onBackButtonPress={onRequestClose}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}>
      <View
        style={{
          width: '100%',
          height: '50%',
          backgroundColor: '#fcfcfc',
          position: 'absolute',
          bottom: 0,
          borderTopEndRadius: 12,
        }}>
        <View style={{ padding: 16, flexDirection: 'row' }}>
          <Text style={{ flex: 1, fontFamily: fonts.REGULAR, fontSize: 24 }}>
            {item.title}
          </Text>
          <Pressable>{/* <Image style={} /> */}</Pressable>
        </View>
      </View>
    </Modal>
  );
}
