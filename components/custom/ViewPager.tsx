import { Image } from "expo-image";
import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const data = [
  {
    key: "1",
    imageUri: require("@/data/images/banner/phonePageViewer2.avif"),
    color: "#9dcdfa",
  },
  {
    key: "2",
    imageUri: require("@/data/images/banner/phonePageViewer2.avif"),
    color: "#db9efa",
  },
  {
    key: "3",
    imageUri: require("@/data/images/banner/phonePageViewer2.avif"),
    color: "#999",
  },
  {
    key: "fourth",
    imageUri: require("@/data/images/banner/phonePageViewer2.avif"),
    color: "#a1e3a1",
  },
  {
    key: "5",
    imageUri: require("@/data/images/banner/phonePageViewer2.avif"),
    color: "#9dcdfa",
  },
];

const { width, height } = Dimensions.get("window");
const DOT_SIZE = 20;

function Pagination({ progress }: { progress: Animated.Value }) {
  const translateX = Animated.multiply(progress, DOT_SIZE);

  return (
    <View style={styles.pagination}>
      <Animated.View
        style={[styles.paginationIndicator, { transform: [{ translateX }] }]}
      />
      {data.map((item) => (
        <View key={item.key} style={styles.paginationDotContainer}>
          <View
            style={[styles.paginationDot, { backgroundColor: item.color }]}
          />
        </View>
      ))}
    </View>
  );
}

export default function PageViewerCarousel() {
  const progress = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageScroll={(e) => {
          const { position, offset } = e.nativeEvent;
          progress.setValue(position + offset);
        }}
      >
        {data.map((item) => (
          <View key={item.key} style={styles.page}>
            <Image
              source={item.imageUri}
              style={styles.image}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={0}
            />
          </View>
        ))}
      </PagerView>

      <Pagination progress={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height / 4,
  },
  pagerView: {
    width: "100%",
    height: "100%",
  },
  page: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: width * 0.75,
  },

  pagination: {
    position: "absolute",
    left: (width - data.length * DOT_SIZE) / 2,
    bottom: 20,
    flexDirection: "row",
    height: DOT_SIZE,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationIndicator: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: "#ddd",
  },
});
