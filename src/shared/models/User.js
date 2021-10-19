import firestore from '@react-native-firebase/firestore';
import { paths } from '../constants';

export default class User {
  constructor({
    name,
    contact,
    address,
    totalOrders = 0,
    id = null,
    image = null,
  }) {
    this.name = name;
    this.contact = contact;
    this.address = address;
    this.totalOrders = totalOrders;
    this.id = id;
    this.image = image;
  }

  async saveInDB(user) {
    try {
      const userDocument = paths.USERS.doc(user.id);
      const orderCollection = paths.ORDERS.where(
        'phone',
        '==',
        user.contact.international,
      );

      await userDocument.set({
        ...user,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      const { docs } = await orderCollection.get();
      if (docs.length > 0) {
        for (const order of docs) {
          const orderDocument = paths.ORDERS.doc(order.id);
          await orderDocument.update({
            placedBy: user.id,
          });
        }
      }

      return await this.fetchUser(user.id);
    } catch (err) {
      throw err;
    }
  }

  async fetchUser(uid) {
    try {
      const document = await paths.USERS.doc(uid).get();
      if (!document.exists) {
        throw 'firestore/user-not-found';
      }
      return {
        ...document.data(),
        id: document.id,
      };
    } catch (err) {
      throw err;
    }
  }
}
