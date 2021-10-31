import firestore from '@react-native-firebase/firestore';
import { collections } from '../../shared/constants';

export async function fetchProductDetail(productId) {
  try {
    const productDoc = await firestore()
      .collection(collections.PRODUCTS)
      .doc(productId)
      .get();
    return { ...productDoc.data(), id: productDoc.id };
  } catch (err) {
    throw err.response.data;
  }
}

export async function fetchProductReviews(productId) {
  try {
    const reviewDocs = await firestore()
      .collection(collections.PRODUCTS)
      .doc(productId)
      .collection(collections.REVIEWS)
      .get();
    const reviews = [];
    for (const review of reviewDocs.docs) {
      const userDoc = await review.data().user.get();
      reviews.push({
        ...review.data(),
        username: review.data().isAnonymous ? 'Anonymous' : userDoc.data().name,
      });
    }
    return reviews;
  } catch (err) {
    throw err.response.data;
  }
}

export async function fetchSimilarItems(categoryId) {
  try {
    const productDocs = await firestore()
      .collection(collections.PRODUCTS)
      .where('category', '==', categoryId)
      .orderBy('title', 'asc')
      .get();
    const products = [];
    for (const product of productDocs.docs) {
      products.push({ ...product.data(), id: product.id });
    }
    return products;
  } catch (err) {
    throw err;
  }
}
