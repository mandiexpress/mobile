import {icons, status} from '../constants';

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
