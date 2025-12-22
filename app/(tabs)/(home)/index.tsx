import Cart from "@/components/custom/Cart";
import Title from "@/components/custom/Title";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { DataCat, DataProduct } from "@/data/shop";
import { Image } from "expo-image";
import { FlatList, ScrollView } from "react-native";

//local import
import Categories from "@/components/custom/Categories";
import Product from "@/components/custom/Product";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { MoveUpRightIcon } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HStack className="mb-2 flex items-center justify-between px-6">
        <Pressable>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("@/assets/images/shop.jpg")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>
        <Cart />
      </HStack>
      <ScrollView>
        <Image
          style={{ width: "100%", aspectRatio: 19 / 6 }}
          source={require("@/assets/images/shoppingBanner.jpg")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <VStack>
          <Title title="Shop by Categories" seeAll="See All" />

          <FlatList
            data={DataCat}
            renderItem={({ item }) => <Categories {...item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          <Title title="Recommended for you" seeAll="See All" />
          <FlatList
            data={DataProduct}
            numColumns={2}
            renderItem={({ item }) => <Product {...item} />}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 10, gap: 10 }}
            columnWrapperStyle={{ gap: 5 }}
          />
          <Box className="mx-auto my-8">
            <Button variant="solid" size="md" action="positive">
              <ButtonText className="text-white">See More</ButtonText>
              <Icon as={MoveUpRightIcon} />
            </Button>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
