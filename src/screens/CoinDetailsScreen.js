import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "./Screen";
import dataContext from "./../context/Data";
import Loading from "../components/Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CoinDetailsScreen = ({ route }) => {
  const {
    symbol,
    price,
    id,
    change24h,
    fundingRate,
    high24h,
    low24h,
    favourite,
  } = route.params;
  const { toggleFavourite } = useContext(dataContext);

  const handleToggleFavourite = async () => {
    await toggleFavourite(id);
    console.log(id);
    console.log(favourite);
  };
  return (
    <Screen style={{ position: "relative" }}>
      {symbol ? (
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 80,
              fontWeight: "bold",
              padding: 50,
            }}
          >
            {symbol}
          </Text>
          <View
            style={[
              { padding: 20, width: "100%" },
              change24h > 0
                ? { backgroundColor: "#39cccc" }
                : { backgroundColor: "#ff80b3" },
            ]}
          >
            <Text
              style={[
                { textAlign: "center", fontSize: 50, fontWeight: "bold" },
                change24h > 0 ? { color: "#000" } : { color: "#fff" },
              ]}
            >
              ${price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: 50,
            }}
          >
            <View
              style={[
                styles.miniViewContainer,
                fundingRate * 100 > 0
                  ? { backgroundColor: "#FFA500" }
                  : { backgroundColor: "#DFFF00" },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Funding Rate: <Text>{(fundingRate * 100).toFixed(4)}%</Text>
              </Text>
            </View>
            <View
              style={[
                styles.miniViewContainer,
                change24h * 100 > 0
                  ? { backgroundColor: "#DFFF00" }
                  : { backgroundColor: "#FFA500" },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Change{"(24h): "}
                <Text>{(change24h * 100).toFixed(4)}%</Text>
              </Text>
            </View>
            <View
              style={[
                styles.miniViewContainer,
                change24h * 100 > 0
                  ? { backgroundColor: "#39cccc" }
                  : { backgroundColor: "#ff80b3" },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                High{"(24h): "}
                <Text>{high24h}</Text>
              </Text>
            </View>
            <View
              style={[
                styles.miniViewContainer,
                change24h * 100 > 0
                  ? { backgroundColor: "#39cccc" }
                  : { backgroundColor: "#ff80b3" },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Low{"(24h): "}
                <Text>{low24h}</Text>
              </Text>
            </View>
          </View>
          {
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 20 }}
              onPress={handleToggleFavourite}
            >
              <MaterialCommunityIcons
                name="heart"
                size={30}
                color={favourite ? "#ff80b3" : "#fff"}
              />
            </TouchableOpacity>
          }
        </View>
      ) : (
        <Loading />
      )}
    </Screen>
  );
};

export default CoinDetailsScreen;

const styles = StyleSheet.create({
  miniViewContainer: {
    padding: 15,
    width: "45%",
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
