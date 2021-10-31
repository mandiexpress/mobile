import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Modal } from 'react-native-paper';
import styles from './styles';

export default function DialogBox({
  visibile,
  setVisibility,
  image,
  title,
  message,
  enableLeftButton = false,
  onLeftButtonPress = () => {},
  leftButtonText = '',
  enableRightButton = false,
  onRightButtonPress = () => {},
  rightButtonText = '',
  enableDismissButton = true,
  onDismissButtonPress = () => {},
  dismissText = 'Cancel',
}) {
  return (
    <Modal
      visible={visibile}
      style={styles.modalStyle}
      onDismiss={() => setVisibility(false)}
      dismissable={true}>
      <View style={styles.container}>
        <Image source={image} style={styles.imageStyle} />
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.messageStyle}>{message}</Text>
        <View style={styles.actionContainer}>
          {enableLeftButton && (
            <Pressable
              onPress={onLeftButtonPress}
              style={styles.leftButtonStyle}>
              <Text style={styles.actionButtonTextStyle}>{leftButtonText}</Text>
            </Pressable>
          )}
          {enableRightButton && (
            <Pressable
              onPress={onRightButtonPress}
              style={styles.rightButtonStyle}>
              <Text style={styles.actionButtonTextStyle}>
                {rightButtonText}
              </Text>
            </Pressable>
          )}
        </View>
        {enableDismissButton && (
          <Pressable
            style={styles.dismissContainer}
            onPress={onDismissButtonPress}>
            <Text style={styles.dismissTextStyle}>{dismissText}</Text>
          </Pressable>
        )}
      </View>
    </Modal>
  );
}
