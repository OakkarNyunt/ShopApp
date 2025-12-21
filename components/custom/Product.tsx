import { ProductType } from "@/data/types";
import { Image } from "expo-image";
import React from "react";

import { Link } from "expo-router";
import { HeartIcon, StarIcon } from "lucide-react-native";

import { Card } from "../ui/card";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Pressable } from "../ui/pressable";

import { Text } from "react-native";
import { VStack } from "../ui/vstack";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Product = ({
  id,
  name,
  image,
  discount,
  rating,
  Price,
  description,
}: ProductType) => {
  return (
    <Card className=" flex w-1/2 items-center rounded-md bg-zinc-400/20">
      <Link href={"/explore"}>
        <Image
          style={{
            width: 80,
            height: 80,
          }}
          source={image}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
        />
      </Link>
      <VStack space="sm">
        <Text className="font-bold">{name}</Text>
        <HStack space="md" className="items-center">
          <Icon as={StarIcon} className="text-yellow-500" size="md" />
          <Text className="font-bold">{rating}</Text>
        </HStack>
        <HStack space="md">
          <Text className="text-red-400 line-through">${Price}</Text>
          <Text className="font-bold">
            ${Price - (Price * Number(discount)) / 100}
          </Text>
        </HStack>
      </VStack>
      <Pressable className="absolute right-3 top-3 rounded-full bg-zinc-300/40 p-2">
        <Icon className=" text-red-500" as={HeartIcon} size="md" />
      </Pressable>
      <Text numberOfLines={3}>{description}</Text>
    </Card>
  );
};

export default Product;
