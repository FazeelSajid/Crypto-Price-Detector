import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons'; 

const CustomCard = ({ price, id, title, change24h, favourite, onPress, onToggleFavourite }) => {
  return (
    <TouchableOpacity style={{ margin: 8 }} onPress={onPress}>
      <View
        style={[
          styles.card,
          change24h > 0
            ? { backgroundColor: "#39cccc" }
            : { backgroundColor: "#ff80b3" },
        ]}
      >
        <Text
          style={[
            { color: "#000", fontSize: 32, fontWeight: "bold" },
            change24h > 0 ? { color: "#000" } : { color: "#fff" },
          ]}
        >
          {title}
        </Text>
        <Text style={{ color: "#000", fontSize: 22, fontWeight: "bold" }}>
          ${price}
          <Text style={{ color: "#000", fontSize: 14 }}> ({change24h}%) </Text>
        </Text>
        <TouchableOpacity onPress={() => onToggleFavourite(id)}>
          <FontAwesome name={favourite ? 'heart' : 'heart-o'} size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 20,
  },
});
