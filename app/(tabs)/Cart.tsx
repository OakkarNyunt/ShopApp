import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Fab } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";

import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { carts } from "@/data/shop";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Image } from "expo-image";
import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Cart = () => {
  const AlertBox = () =>
    Alert.alert("Delete All Your Cart", "Are you Sure All Your Cart?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Box>
        <Heading className="my-4 text-center text-xl font-bold">
          Shopping Cart ({carts.length})
        </Heading>
      </Box>

      {carts.length === 0 ? (
        <Text className="mt-10 text-center text-lg">Your Cart is Empty.</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {carts.map((item) => (
            <View key={item.id} className="px-3">
              <VStack className="mb-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                <HStack space="md" className="items-center">
                  {/* Product Image */}
                  <Image
                    style={{ width: 60, height: 80, borderRadius: 8 }}
                    source={item.image}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    transition={500}
                  />

                  {/* Product Info */}
                  <VStack className="flex-1 ">
                    <Text className="text-base font-semibold">
                      {item.title}
                    </Text>

                    <VStack className="mt-1">
                      {item.items.map((itemz) => (
                        <HStack
                          key={itemz.id}
                          space="md"
                          className="items-center"
                        >
                          <Text className="text-sm text-gray-600">
                            {itemz.color}
                          </Text>
                          <Text className="text-sm text-gray-600">
                            {itemz.size}
                          </Text>
                          <Text className="text-sm font-medium">
                            {item.price} × {itemz.quantity}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>

                  {/* Quantity Controls */}
                  <VStack space="sm" className="items-center">
                    {/* Quantity + Remove in same row */}
                    <HStack space="sm" className="items-center">
                      <Button variant="secondary">
                        <AntDesign name="minus" size={12} color="black" />
                      </Button>

                      <Text className="text-base font-semibold">1</Text>

                      <Button>
                        <AntDesign name="plus" size={12} color="black" />
                      </Button>

                      <Button
                        variant="outline"
                        className="ml-2 border-red-500"
                        onPress={AlertBox}
                      >
                        <FontAwesome name="remove" size={12} color="black" />
                      </Button>
                    </HStack>
                  </VStack>
                </HStack>
              </VStack>
            </View>
          ))}
          <VStack className="my-4 px-4">
            <HStack className="mb-4 justify-between">
              <Text>Total Price:</Text>
              <Text>$ 2100</Text>
            </HStack>
            <Button className="bg-green-500">
              <Text> Buy Now !</Text>
            </Button>
          </VStack>
        </ScrollView>
      )}
      <Box className="rounded-md bg-background-50">
        <Fab
          size="sm"
          placement="bottom right"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          className="bg-red-500"
          onPress={AlertBox}
        >
          <AntDesign name="delete" size={18} color="white" />
        </Fab>
      </Box>
    </SafeAreaView>
  );
};

export default Cart;
