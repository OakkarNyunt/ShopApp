import { Card } from "@/components/ui/card";
import { CategoryType } from "@/data/types";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

// const [select, onSelect] = useState("1");

const Categories = ({ id, name, image }: CategoryType) => {
  return (
    <Card variant="ghost" className="flex items-center justify-center">
      <Link href={"/explore"}>
        <Image
          style={[styles.image, styles.select]}
          source={image}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
        />
      </Link>
      <Text className=" mt-4 font-bold">{name}</Text>
    </Card>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
  select: {
    borderRadius: 30,
    borderColor: "green",
    borderWidth: 2,
  },
});
export default Categories;
