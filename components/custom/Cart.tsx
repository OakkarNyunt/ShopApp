import { Badge, BadgeText } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart } from "lucide-react-native";
import React from "react";
import { Box } from "../ui/box";

const count = 1;

const Cart = () => {
  return (
    <Box>
      <Badge
        className={`z-10 self-end ${
          count > 9 ? "h-[28px] w-[28px] " : "h-[22px] w-[22px]"
        }  -mb-3.5 -mr-3.5 rounded-full bg-red-600`}
        variant="solid"
      >
        <BadgeText className="text-white">{count}</BadgeText>
      </Badge>
      <Icon className="text-typography-500" as={ShoppingCart} size="xl" />
    </Box>
  );
};

export default Cart;
