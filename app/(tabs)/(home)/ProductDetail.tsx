import Cart from "@/components/custom/Cart";
import FloatingCart from "@/components/custom/FloatingCart";
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
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";

import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

const ProductDetail = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { id } = useLocalSearchParams();
  const product = DataProduct.find((p) => p.id == id);

  const [seeMore, setSeeMore] = useState(false);

  // MULTIPLE selections
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // VARIANT PAIRS (color + size + qty)
  const [variants, setVariants] = useState<
    { color: string; size: string; qty: number }[]
  >([]);

  // FINAL confirmed variants
  const [finalVariants, setFinalVariants] = useState<
    { color: string; size: string; qty: number }[]
  >([]);

  // Generate all combinations when user selects colors/sizes
  useEffect(() => {
    const newVariants: { color: string; size: string; qty: number }[] = [];

    selectedColors.forEach((color) => {
      selectedSizes.forEach((size) => {
        const existing = variants.find(
          (v) => v.color === color && v.size === size,
        );

        newVariants.push({
          color,
          size,
          qty: existing?.qty ?? 1,
        });
      });
    });

    setVariants(newVariants);
  }, [selectedColors, selectedSizes]);

  // Increase / Decrease per variant
  const increaseQty = (index: number) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, qty: v.qty + 1 } : v)),
    );
  };

  const decreaseQty = (index: number) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === index ? { ...v, qty: Math.max(1, v.qty - 1) } : v,
      ),
    );
  };

  // Remove variant
  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  // Disable confirm if no variants
  const isConfirmDisabled = variants.length === 0;

  // Toast + ActionSheet handler
  const showRegularToast = () => {
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

    actionSheetRef.current?.show();
  };

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

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack className="mt-4 px-4" space="lg">
          {/* Header */}
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

          {/* Color Selection */}
          <VStack space="md">
            <Text className="text-lg font-bold">Choose Color:</Text>
            <CheckboxGroup value={selectedColors} onChange={setSelectedColors}>
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

          {/* Size Selection */}
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

          {/* Set Quantity Button */}
          <Button
            className="mt-6 h-12 rounded-xl bg-sky-500"
            onPress={showRegularToast}
          >
            <ButtonText className="font-bold">Set Quantity</ButtonText>
          </Button>

          {/* FINAL VARIANTS DISPLAY */}
          {finalVariants.length > 0 && (
            <VStack space="lg" className="mt-6 rounded-xl bg-zinc-100 p-4">
              <Text className="text-lg font-bold text-zinc-700">
                Your Selection
              </Text>

              {finalVariants.map((item, index) => (
                <HStack
                  key={index}
                  className="items-center justify-between rounded-xl bg-white p-3"
                >
                  {/* Left side: Color + Size */}
                  <HStack space="md" className="items-center">
                    <Text className="font-semibold text-zinc-800">
                      {item.color}
                    </Text>
                    <Text className="font-semibold text-zinc-800">
                      {item.size}
                    </Text>
                  </HStack>

                  {/* Right side: Quantity + Remove */}
                  <HStack space="md" className="items-center">
                    <Text className="font-bold text-zinc-700">x{item.qty}</Text>

                    <Pressable
                      onPress={() => {
                        setFinalVariants((prev) =>
                          prev.filter((_, i) => i !== index),
                        );
                      }}
                      className="rounded-lg bg-red-500 px-3 py-1"
                    >
                      <Text className="font-bold text-white">X</Text>
                    </Pressable>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>

      {/* ACTION SHEET */}
      <ActionSheet gestureEnabled ref={actionSheetRef}>
        <VStack space="lg" className="p-6">
          <Text className="text-center text-xl font-bold">Set Quantities</Text>

          {/* VARIANT LIST */}
          {variants.map((v, index) => (
            <HStack
              key={index}
              className="items-center justify-between rounded-xl bg-zinc-100 p-3"
            >
              {/* Color + Size */}
              <HStack space="md" className="items-center">
                <Text className="font-semibold text-zinc-800">{v.color}</Text>
                <Text className="font-semibold text-zinc-800">{v.size}</Text>
              </HStack>

              {/* Quantity Controls */}
              <HStack space="md" className="items-center">
                <Pressable
                  onPress={() => decreaseQty(index)}
                  className="rounded-lg bg-zinc-300 px-3 py-1"
                >
                  <Text className="text-xl font-bold">-</Text>
                </Pressable>

                <Text className="w-6 text-center text-xl font-bold">
                  {v.qty}
                </Text>

                <Pressable
                  onPress={() => increaseQty(index)}
                  className="rounded-lg bg-zinc-300 px-3 py-1"
                >
                  <Text className="text-xl font-bold">+</Text>
                </Pressable>
              </HStack>

              {/* Remove */}
              <Pressable
                onPress={() => removeVariant(index)}
                className="rounded-lg bg-red-500 px-3 py-1"
              >
                <Text className="font-bold text-white">X</Text>
              </Pressable>
            </HStack>
          ))}

          {/* Buttons */}
          <HStack space="md" className="mt-6 justify-center">
            <Button
              className="rounded-xl bg-zinc-300 px-6"
              onPress={() => actionSheetRef.current?.hide()}
            >
              <ButtonText className="font-bold text-black">Cancel</ButtonText>
            </Button>

            <Button
              isDisabled={isConfirmDisabled}
              className={`rounded-xl px-6 ${
                isConfirmDisabled ? "bg-zinc-300" : "bg-sky-500"
              }`}
              onPress={() => {
                if (isConfirmDisabled) return;
                setFinalVariants(variants);
                actionSheetRef.current?.hide();
              }}
            >
              <ButtonText
                className={`font-bold ${
                  isConfirmDisabled ? "text-zinc-500" : "text-white"
                }`}
              >
                Confirm
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </ActionSheet>
      <FloatingCart />
    </SafeAreaView>
  );
};

export default ProductDetail;
