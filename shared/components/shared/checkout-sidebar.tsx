import { cn } from "@/shared/lib/utils";
import React from "react";
import { WhiteBlock } from "./white-block";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "../ui";
import { CheckoutItemDetails } from "./checkout-item-details";

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
}) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₴
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex my-4">
            <span className="flex flex-1 text-lg text-neutral-500">
              Стоимость товаров:
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount} ₴`
          )
        }
      />

      <CheckoutItemDetails
        title={
          <div className="flex my-4">
            <span className="flex flex-1 text-l g text-neutral-500">
              Налоги:
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[4px]" />
          ) : (
            `${vatPrice} ₴`
          )
        }
      />

      <CheckoutItemDetails
        title={
          <div className="flex my-4">
            <span className="flex flex-1 text-lg text-neutral-500">
              Доставка:
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[4px]" />
          ) : (
            `${DELIVERY_PRICE} ₴`
          )
        }
      />

      <Button
        loading={loading}
        type="submit"
        disabled={!totalAmount}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
