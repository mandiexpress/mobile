import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import DropDown from '../../components/DropDown';
import Header from '../../components/Header';
import { icons } from '../../shared/constants';
import towns from '../../shared/data/towns';
import { capitalize, getBlocks, getSectors } from '../../shared/utils';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
const index = ({ navigation }) => {
  const [areasOpen, setAreasOpen] = useState(false);
  const [area, setArea] = useState(null);
  const [areas, setAreas] = useState(towns);

  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [sector, setSector] = useState(null);
  const [sectors, setSectors] = useState([]);

  const [blocksOpen, setBlocksOpen] = useState(false);
  const [block, setBlock] = useState(null);
  const [blocks, setBlocks] = useState([]);

  const [type, setType] = useState('');
  const [house, setHouse] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    user: { id },
  } = useSelector(state => state.root.user);

  function handleHouseChange(text) {
    setHouse(text);
  }
  function handleTypeChange(text) {
    setType(text);
  }

  async function handleAdd() {
    try {
      setLoading(true);
      const complete = `${house}, ${capitalize(block, '-')},${
        sector ? ` ${capitalize(sector, '_')},` : ''
      } ${capitalize(area, '-')}, Lahore, Punjab, Pakistan`;
      await firestore()
        .collection('Users')
        .doc(id)
        .collection('addresses')
        .doc()
        .set({
          house,
          sector,
          block,
          area,
          type,
          complete,
          isDefault: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setLoading(false);
      navigation.goBack();
    } catch (err) {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader visible={loading} text={'Add new Address...'} />}
      <Header navigation={navigation} title={'Add Address'} />
      <View style={{ margin: 20 }}>
        <Text style={styles.headerText}>Add new Address</Text>
        {/* Area Selection */}
        <DropDown
          open={areasOpen}
          value={area}
          items={areas}
          setOpen={setAreasOpen}
          setValue={setArea}
          setItems={setAreas}
          placeholder={'Select Area'}
          zIndex={3}
          searchPlaceholder={'Search Areas...'}
          textStyle={styles.dropdownEnabledTextStyle}
          onChangeValue={value => {
            if (
              value === 'model-town' ||
              value === 'valencia' ||
              value === 'iqbal-town'
            ) {
              console.log('Only load blocks');
              setBlocks(getBlocks(value, null));
            } else {
              setSectors(getSectors(value));
            }
          }}
        />

        {sectors && sectors.length > 0 && (
          <>
            <View style={styles.divider} />
            <DropDown
              open={sectorsOpen}
              value={sector}
              items={sectors}
              disabled={sectors && sectors.length === 0}
              setOpen={setSectorsOpen}
              setValue={setSector}
              setItems={setSectors}
              placeholder={'Select Sector'}
              zIndex={2}
              searchPlaceholder={'Search Areas...'}
              textStyle={
                sectors && sectors.length === 0
                  ? styles.dropdownDisabledTextStyle
                  : styles.dropdownEnabledTextStyle
              }
              onChangeValue={value => setBlocks(getBlocks(area, value))}
            />
          </>
        )}

        {blocks && blocks.length > 0 && (
          <>
            <View style={styles.bottomDivider} />
            <DropDown
              open={blocksOpen}
              value={block}
              items={blocks}
              disabled={blocks && blocks.length === 0}
              setOpen={setBlocksOpen}
              setValue={setBlock}
              setItems={setBlocks}
              placeholder={'Select Block'}
              zIndex={1}
              textStyle={
                blocks && blocks.length === 0
                  ? styles.dropdownDisabledTextStyle
                  : styles.dropdownEnabledTextStyle
              }
              searchPlaceholder={'Search Areas...'}
            />
          </>
        )}
        <View style={styles.inputContentContainer}>
          <Image source={icons.HOME_NUMBER} style={styles.inputIconStyle} />
          <TextInput
            disabled={true}
            onChangeText={handleHouseChange}
            // onBlur={}
            value={house}
            placeholder={'House Number'}
            placeholderTextColor={'gray'}
            style={styles.inputStyle}
            spellCheck={false}
            autoCorrect={false}
            maxLength={40}
            keyboardType={'default'}
          />
        </View>
        <View style={styles.inputContentContainer}>
          <Image source={icons.HOME_NUMBER} style={styles.inputIconStyle} />
          <TextInput
            disabled={true}
            onChangeText={handleTypeChange}
            // onBlur={}
            value={type}
            placeholder={'Type'}
            placeholderTextColor={'gray'}
            style={styles.inputStyle}
            spellCheck={false}
            autoCorrect={false}
            maxLength={40}
            keyboardType={'default'}
          />
        </View>
        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.registerButton}>Add</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default index;
