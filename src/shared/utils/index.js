import { icons, status } from '../constants';
import towns from '../data/towns';

export function getOrderStatusGraphic(orderStatus) {
  switch (orderStatus) {
    case status.CONFIRMATION:
      return icons.CONFIRMATION;
    case status.PACKING:
      return icons.PACKING;
    case status.ON_THE_WAY:
      return icons.ON_THE_WAY;
    case status.DELIVERED:
      return icons.DELIVERED;
    case status.CANCELLED:
      return icons.CANCELLED;
    case status.DELAYED:
      return icons.DELAYED;
    case status.WEATHER_ISSUES:
      return icons.WEATHER_ISSUES;
  }
}

export function getOrderStatus(orderStatus) {
  switch (orderStatus) {
    case status.CONFIRMATION:
      return 'Confirming your Order';
    case status.PACKING:
      return 'Your order is being packed';
    case status.ON_THE_WAY:
      return 'Your order is on the way';
    case status.DELIVERED:
      return 'Order delivered';
    case status.CANCELLED:
      return 'Order cancelled';
    case status.DELAYED:
      return 'Order delayed';
    case status.WEATHER_ISSUES:
      return 'Order delayed due to weather conditions';
  }
}

export function getOrderStatusColor(orderStatus) {
  switch (orderStatus) {
    case status.CONFIRMATION:
      return 'brown';
    case status.PACKING:
      return 'purple';
    case status.ON_THE_WAY:
      return '#538AFF';
    case status.DELIVERED:
      return 'green';
    case status.CANCELLED:
      return 'red';
    case status.DELAYED:
      return 'darkred';
    case status.WEATHER_ISSUES:
      return 'orange';
  }
}

export function calculateDiscount(discount = 0, price = 0) {
  const discountPrice = price - price * (discount / 100);
  return Math.round(discountPrice);
}

export function calculateSavePrice(discount = 0, price = 0) {
  const saving = price - calculateDiscount(discount, price);
  return Math.round(saving);
}

export function getQuantity(cart, id) {
  const cartItem = cart.filter(item => item.id === id);
  if (cartItem.length <= 0) {
    return;
  }
  return cartItem[0].quantity;
}

export function getInitials(name) {
  let initials = name.split(' ');

  if (initials.length > 1) {
    initials = initials.shift().charAt(0) + initials.pop().charAt(0);
  } else {
    initials = name.substring(0, 2);
  }

  return initials.toUpperCase();
}

export function getSectors(area) {
  if (area === null) {
    return;
  }
  const areaObj = towns.find(item => item.value === area);
  if (!areaObj) {
    return [];
  }

  // If there is an area but no sectors
  if (areaObj && !areaObj.sectors) {
    return null;
  }

  // If there is an area and sector
  return areaObj.sectors;
}

export function getBlocks(area, sector) {
  const areaObj = towns.filter(item => item.value === area);
  if (areaObj.length > 0) {
    const blocks = areaObj[0].blocks.filter(item => item.sector === sector);
    return blocks;
  }
  // const areaObj = towns.find(item => item.value === area);
  // if (!areaObj && !areaObj.blocks) {
  //   return null;
  // }

  // const blocks = areaObj.blocks.filter(item => item.sector === sector);
  // if (blocks && blocks.length > 0) {
  //   return blocks;
  // } else {
  //   return null;
  // }
}

export function capitalize(text, splitter) {
  if (text === 'dha') {
    return text.toUpperCase();
  }
  const arr = text.split(splitter);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const result = arr.join(' ');
  return result;
}

export function formatPhone(phoneNumber) {
  if (phoneNumber.startsWith('0')) {
    return `+92${phoneNumber.trim().slice(1, phoneNumber.length)}`;
  } else {
    return `+92${phoneNumber}`;
  }
}
