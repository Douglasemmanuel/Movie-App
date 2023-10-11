import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import utilis from "../core/utilis";

const Thumbnail = ({ url, size }) => {
  // console.log(url)
  return (
    <View>
      <Image
        source={utilis.thumbnail(url)}
        style={{
          width: size,
          height: size,
          borderRadius: size /2,
          backgroundColor: "#e0e0e0",
        }}
      />
    </View>
  );
};

export default Thumbnail;

const styles = StyleSheet.create({});
