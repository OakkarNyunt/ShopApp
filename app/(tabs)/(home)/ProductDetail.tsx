import Cart from "@/components/custom/Cart";
import ViewPager from "@/components/custom/ViewPager";

import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { DataProduct, selectItems } from "@/data/shop";
import { Stack, useLocalSearchParams } from "expo-router";
import { CheckIcon, HeartIcon, StarIcon } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Toast } from "toastify-react-native";

import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const ProductDetail = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { id } = useLocalSearchParams();
  const product = DataProduct.find((p) => p.id == id);

  const [seeMore, setSeeMore] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // tosast and action sheet handler

  const showRegularToast = () => {
    // If missing color or size → show toast
    if (selectedColors.length === 0 || selectedSizes.length === 0) {
      Toast.show({
        type: "error",
        visibilityTime: 1500,
        position: "bottom",
        text1: "Please Choose Both Color and Size.",
        useModal: false,
      });
      return;
    }

    // If both selected → open ActionSheet
    actionSheetRef.current?.show();
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1)); // prevent going below 1

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <VStack className="mt-4 px-4" space="lg">
          {/* Header & Rating */}
          <HStack className="items-center justify-between">
            <VStack>
              <Text className="text-xl font-bold">{product?.name}</Text>
              <HStack space="xs" className="items-center">
                <Icon as={StarIcon} className="text-yellow-500" size="sm" />
                <Text className="font-medium">{product?.rating}</Text>
              </HStack>
            </VStack>

            <Pressable className="rounded-full bg-zinc-100 p-3">
              <Icon className="text-red-500" as={HeartIcon} size="md" />
            </Pressable>
          </HStack>

          {/* Pricing */}
          <HStack space="md" className="items-center">
            <Text className="text-2xl font-bold text-green-600">
              $
              {(
                Number(product?.Price ?? 0) *
                (1 - Number(product?.discount ?? 0) / 100)
              ).toFixed(2)}
            </Text>

            {Number(product?.discount) > 0 && (
              <Text className="font-bold text-zinc-400 line-through">
                ${(product?.Price ?? 0).toFixed(2)}
              </Text>
            )}
          </HStack>

          {/* Description */}
          <VStack>
            <Text
              numberOfLines={seeMore ? undefined : 3}
              className="text-zinc-600"
            >
              {product?.description}
            </Text>
            <Pressable onPress={() => setSeeMore(!seeMore)}>
              <Text className="mt-1 font-bold text-sky-600">
                {seeMore ? "See less" : "See more..."}
              </Text>
            </Pressable>
          </VStack>

          {/* Selection Sections */}
          <VStack space="xl">
            {/* Colors */}
            <VStack space="md">
              <Text className="text-lg font-bold">Choose Color:</Text>
              <CheckboxGroup
                value={selectedColors}
                onChange={setSelectedColors}
              >
                <HStack space="xl" className="flex-wrap">
                  {selectItems.colors.map((c) => (
                    <Checkbox value={c.name} key={c.id} isDisabled={!c.stock}>
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel className="ml-2">{c.name}</CheckboxLabel>
                    </Checkbox>
                  ))}
                </HStack>
              </CheckboxGroup>
            </VStack>

            {/* Sizes */}
            <VStack space="md">
              <Text className="text-lg font-bold">Choose Size:</Text>
              <CheckboxGroup value={selectedSizes} onChange={setSelectedSizes}>
                <HStack space="xl" className="flex-wrap">
                  {selectItems.sizes.map((s) => (
                    <Checkbox value={s.name} key={s.id} isDisabled={!s.stock}>
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                      <CheckboxLabel className="ml-2">{s.name}</CheckboxLabel>
                    </Checkbox>
                  ))}
                </HStack>
              </CheckboxGroup>
            </VStack>
          </VStack>

          {/* Button */}
          <Button
            className="mt-6 h-12 rounded-xl bg-sky-500"
            onPress={showRegularToast}
          >
            <ButtonText className="font-bold">Set Quantity</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
      <ActionSheet gestureEnabled ref={actionSheetRef}>
        <VStack space="lg" className="p-6">
          {/* Title */}
          <VStack space="xs" className="items-center">
            <Text className="text-xl font-bold">Colors & Sizes</Text>
            <Text className="text-md text-zinc-500">Set Quantity</Text>
          </VStack>

          {/* Selected Color & Size */}
          <VStack space="sm" className="items-center">
            <Text className="text-lg font-semibold">
              Color: {selectedColors[0]}
            </Text>
            <Text className="text-lg font-semibold">
              Size: {selectedSizes[0]}
            </Text>
          </VStack>

          {/* Quantity Selector */}
          <HStack space="lg" className="mt-4 items-center justify-center">
            <Pressable
              onPress={decreaseQty}
              className="rounded-full bg-zinc-200 px-4 py-2"
            >
              <Text className="text-xl font-bold">-</Text>
            </Pressable>

            <Text className="w-10 text-center text-2xl font-bold">
              {quantity}
            </Text>

            <Pressable
              onPress={increaseQty}
              className="rounded-full bg-zinc-200 px-4 py-2"
            >
              <Text className="text-xl font-bold">+</Text>
            </Pressable>
          </HStack>

          {/* Buttons */}
          <HStack space="md" className="mt-6 justify-center">
            <Button
              className="rounded-xl bg-zinc-300 px-6"
              onPress={() => actionSheetRef.current?.hide()}
            >
              <ButtonText className="font-bold text-black">Cancel</ButtonText>
            </Button>

            <Button
              className="rounded-xl bg-sky-500 px-6"
              onPress={() => {
                console.log("Confirmed quantity:", quantity);
                actionSheetRef.current?.hide();
              }}
            >
              <ButtonText className="font-bold">Confirm</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default ProductDetail;
