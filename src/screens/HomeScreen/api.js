import firestore from '@react-native-firebase/firestore';
import { collections } from '../../shared/constants';

export async function fetchPromotions() {
  try {
    const { docs } = await firestore()
      .collection(collections.PROMOTIONS)
      .where('active', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    const result = [];
    for (const item of docs) {
      result.push({ ...item.data(), id: item.id });
    }
    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetchCategories() {
  try {
    const { docs } = await firestore()
      .collection(collections.CATEGORIES)
      .orderBy('english', 'asc')
      .limit(5)
      .get();
    const result = [];
    for (const item of docs) {
      result.push({ ...item.data(), id: item.id });
    }
    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetchDiscountItems() {
  try {
    const { docs } = await firestore()
      .collection(collections.PRODUCTS)
      .where('discount', '>', 0)
      .orderBy('discount', 'desc')
      .limit(5)
      .get();
    const result = [];
    for (const item of docs) {
      result.push({ ...item.data(), id: item.id });
    }
    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetchLatestProducts() {
  try {
    const { docs } = await firestore()
      .collection(collections.PRODUCTS)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    const result = [];
    for (const item of docs) {
      result.push({ ...item.data(), id: item.id });
    }
    return result;
  } catch (err) {
    throw err;
  }
}
