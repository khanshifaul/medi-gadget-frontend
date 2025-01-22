/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../../../lib/db";

// Helper function to calculate discount
export async function calculateDiscount(
  couponId: string,
  totalPrice: number
): Promise<number> {
  const coupon = await db.coupon.findUnique({ where: { id: couponId } });
  if (!coupon) return 0;

  if (coupon.discountType === "PERCENTAGE") {
    return (coupon.discountValue / 100) * totalPrice;
  } else if (coupon.discountType === "FLAT") {
    return coupon.discountValue;
  }
  return 0;
}

// Helper function to calculate delivery charge
export function calculateDeliveryCharge(items: any[]): number {
  const deliveryChargePerItem = 5; // Example charge per item
  const totalItems = items.length;
  const totalDeliveryCharge = totalItems * deliveryChargePerItem;
  return totalDeliveryCharge;
}
