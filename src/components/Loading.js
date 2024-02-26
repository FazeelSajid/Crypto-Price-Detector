import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>Loading...</Text>
      <ActivityIndicator color={"#39cccc"} size={"large"} />
    </View>
  );
};

export default Loading;
