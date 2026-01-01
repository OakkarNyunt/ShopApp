import Cart from "@/components/custom/Cart";
import ViewPager from "@/components/custom/ViewPager";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { HStack } from "@/components/ui/hstack";
import { AddIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { DataProduct, selectItems } from "@/data/shop";
import { Stack, useLocalSearchParams } from "expo-router";
import { CheckIcon, HeartIcon, Minus, StarIcon } from "lucide-react-native";
import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const product = DataProduct.find((p) => p.id == id);

  // --- States ---
  const [seeMore, setSeeMore] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showActionsheet, setShowActionsheet] = useState(false);

  const toast = useToast();

  // --- Logic: Handle Submission & Validation ---
  const handleOpenActionsheet = () => {
    const colorValid = selectedColors.length > 0;
    const sizeValid = selectedSizes.length > 0;

    if (colorValid && sizeValid) {
      // 1. Clear toasts to avoid overlay fighting
      if (toast.isActive("validation-error")) {
        toast.close("validation-error");
      }
      // 2. Small delay ensures the Toast unmounts before Actionsheet mounts
      setTimeout(() => {
        setShowActionsheet(true);
      }, 50);
    } else {
      const missing =
        !colorValid && !sizeValid
          ? "Color and Size"
          : !colorValid
            ? "Color"
            : "Size";

      // Use a fixed ID to prevent multiple toasts from stacking
      if (!toast.isActive("validation-error")) {
        toast.show({
          id: "validation-error",
          placement: "top",
          duration: 2500,
          render: ({ id }) => {
            return (
              <Toast
                nativeID={id}
                action="error"
                variant="solid"
                className="mt-10"
              >
                <VStack space="xs">
                  <ToastTitle className="font-bold text-white">
                    Selection Required
                  </ToastTitle>
                  <ToastDescription className="text-white">
                    Please select a {missing} before proceeding.
                  </ToastDescription>
                </VStack>
              </Toast>
            );
          },
        });
      }
    }
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

          <Button
            onPress={handleOpenActionsheet}
            className="mt-6 h-12 rounded-xl bg-sky-500"
          >
            <ButtonText className="font-bold">Set Quantity</ButtonText>
          </Button>
        </VStack>
      </ScrollView>

      {/* --- Actionsheet Component --- */}
      <Actionsheet
        isOpen={showActionsheet}
        onClose={() => setShowActionsheet(false)}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent className="pb-8">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <VStack className="w-full p-4" space="xl">
            <VStack space="xs" className="items-center">
              <Text className="text-xs font-semibold uppercase text-zinc-500">
                Current Selections
              </Text>
              <Text className="text-center text-lg font-bold">
                {selectedColors.join(", ")} — {selectedSizes.join(", ")}
              </Text>
            </VStack>

            <VStack space="md" className="items-center py-4">
              <Text className="text-md font-medium">Quantity</Text>
              <HStack space="2xl" className="items-center">
                <Button
                  variant="outline"
                  action="secondary"
                  className="h-14 w-14 rounded-full border-zinc-300"
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <ButtonIcon as={Minus} className="text-zinc-600" />
                </Button>

                <Text className="w-12 text-center text-3xl font-bold">
                  {quantity}
                </Text>

                <Button
                  variant="outline"
                  action="secondary"
                  className="h-14 w-14 rounded-full border-zinc-300"
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <ButtonIcon as={AddIcon} className="text-zinc-600" />
                </Button>
              </HStack>
            </VStack>

            <Button
              className="h-14 w-full rounded-2xl bg-sky-600"
              onPress={() => {
                setShowActionsheet(false);
                // Trigger success logic here (e.g., adding to cart)
              }}
            >
              <ButtonText className="text-lg font-bold">
                Confirm & Add to Cart
              </ButtonText>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </SafeAreaView>
  );
};

export default ProductDetail;
