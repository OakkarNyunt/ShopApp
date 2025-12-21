import React from "react";
import { Text } from "react-native";
import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";

interface titleProps {
  title: string;
  seeAll: string;
}

const Title = ({ title, seeAll }: any) => {
  return (
    <HStack className="my-4 flex justify-between px-4">
      <Text className="font-bold">{title}</Text>
      <Pressable>
        <Text className=" underline">{seeAll}</Text>
      </Pressable>
    </HStack>
  );
};

export default Title;
