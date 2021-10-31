import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';

export default function DropDown({
  open,
  value,
  items,
  disabled = false,
  setOpen,
  setValue,
  setItems,
  placeholder,
  zIndex,
  searchPlaceholder,
  textStyle = {},
  onChangeValue,
  listMode = 'MODAL',
}) {
  return (
    <DropDownPicker
      categorySelectable={true}
      open={open}
      value={value}
      items={items}
      disabled={disabled}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder}
      zIndex={zIndex}
      searchPlaceholder={searchPlaceholder}
      disabledItemLabelStyle={styles.disabledItemLabelStyle}
      textStyle={textStyle}
      listItemLabelStyle={styles.dropdownListItemLabelStyle}
      listMode={listMode}
      style={styles.dropdownStyle}
      searchContainerStyle={styles.dropdownSearchContainerStyle}
      modalContentContainerStyle={styles.dropdownModalContentContainerStyle}
      searchable={true}
      searchTextInputStyle={styles.dropdownSearchTextInputStyle}
      listItemContainerStyle={styles.dropdownListItemContainerStyle}
      onChangeValue={onChangeValue}
    />
  );
}
