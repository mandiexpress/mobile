import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { icons } from '../../shared/constants';
import styles from './styles';

export default function ListModal({
  visible,
  onDismiss,
  heading,
  items,
  onItemSelect,
  selectedItem,
}) {
  function onSelectItem(item) {
    onItemSelect(item);
    onDismiss();
  }

  return (
    <Modal
      visible={visible}
      dismissable={true}
      onDismiss={onDismiss}
      style={styles.modalStyle}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headingStyle}>{heading}</Text>
          <Pressable onPress={onDismiss}>
            <Image style={styles.closeIcon} source={icons.CLOSE} />
          </Pressable>
        </View>
        <FlatList
          keyExtractor={(_, index) => `_${index}`}
          contentContainerStyle={styles.listContentContainerStyle}
          ItemSeparatorComponent={() => (
            <View style={styles.listItemSeparatorComponent} />
          )}
          data={items}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={styles.itemContainerStyle}
                onPress={() => onSelectItem(item)}>
                {item.icon && (
                  <Image source={item.icon} style={styles.itemIcon} />
                )}
                <Text style={styles.itemLabel}>{item.label}</Text>
                {selectedItem === item.value && (
                  <Image source={icons.TICK} style={styles.itemChecked} />
                )}
              </Pressable>
            );
          }}
        />
      </View>
    </Modal>
  );
}
