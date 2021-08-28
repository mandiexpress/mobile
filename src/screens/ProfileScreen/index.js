import auth from '@react-native-firebase/auth';
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/reducers/user';

export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();
  // const {user} = useSelector(state => state.root.user);

  async function onLogout() {
    try {
      await auth().signOut();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button onPress={onLogout}>Logout</Button>
    </View>
  );
}
