import {OrdersStatusUtil} from "./orders-status.util";
import {OrderStatusType} from "../../../types/order-status.type";

describe('Order status util', () => {
  it('should return name and color with no status', () => {
    const result = OrdersStatusUtil.getStatusAndColor(null);
    expect(result.name).not.toBe('');
    expect(result.color).not.toBe('');
  });


  it('should return new order status with wrong status', () => {
    const result = OrdersStatusUtil.getStatusAndColor('test' as OrderStatusType);

    expect(result.name).toBe('Новый')
  });
})
