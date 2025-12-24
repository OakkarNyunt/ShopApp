import Cart from "@/components/custom/Cart";
import Colors from "@/components/custom/Colors";
import Sizes from "@/components/custom/Sizes";

import ViewPager from "@/components/custom/ViewPager";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

import { VStack } from "@/components/ui/vstack";
import { DataProduct } from "@/data/shop";
import { Stack, useLocalSearchParams } from "expo-router";
import { HeartIcon, StarIcon } from "lucide-react-native";
import React, { useState } from "react";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const product = DataProduct.find((product) => product.id == id);
  const [see, setSee] = useState(false);
  return (
    <VStack>
      <Stack.Screen
        options={{
          headerTitle: "Product Details",

          headerRight: () => (
            <Pressable className="pr-4">
              <Cart />
            </Pressable>
          ),
        }}
      />
      <ViewPager />
      <VStack className="px-4">
        <HStack className="items-center justify-between">
          <HStack space="md">
            <Text className="font-bold">{product?.name}</Text>
            <Icon as={StarIcon} className="text-yellow-500" size="md" />
            <Text className="">{product?.rating}</Text>
          </HStack>
          <HStack>
            <Pressable className="rounded-full bg-zinc-300/40 p-3 ">
              <Icon className=" text-red-500" as={HeartIcon} size="md" />
            </Pressable>
          </HStack>
        </HStack>
        <HStack space="md">
          <Text className="font-bold text-red-500 line-through">
            ${(product?.Price ?? 0).toFixed(2)}
          </Text>
          <Text className="font-bold text-green-500">
            $
            {(
              Number(product?.Price ?? 0) -
              (Number(product?.Price ?? 0) * Number(product?.discount ?? 0)) /
                100
            ).toFixed(2)}
          </Text>
        </HStack>
        <Text className="mt-4" numberOfLines={see ? undefined : 3}>
          {product?.description}
        </Text>
        <Pressable onPress={() => setSee((p) => !p)}>
          <Text className="font-bold">{see ? "See less" : "See more..."}</Text>
        </Pressable>
        <VStack space="xl">
          <Text className="mt-4 font-semibold">Choose Color:</Text>
          <Colors />
          <Text className="mt-4 font-semibold">Choose Size:</Text>
          <Sizes />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ProductDetail;
