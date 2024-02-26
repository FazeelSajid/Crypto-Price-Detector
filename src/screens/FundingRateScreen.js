import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "./Screen";
import dataContext from "../context/Data";
import Loading from "../components/Loading";
import CustomCard from "../components/CustomCard";

const FundingRateScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const dataC = useContext(dataContext);

  useEffect(() => {
    if (!data) {
      setData(dataC.mainData);
    } else {
      const sorted = [...data].sort(
        (a, b) => a.fundingRate * 100 - b.fundingRate * 100
      );
      setData(sorted);
    }
  }, [dataC.mainData]);

  const renderItem = ({ item }) => {
    return (
      <CustomCard
        onPress={() =>
          navigation.navigate("Coin-Details", {
            symbol: item.symbol,
            price: item.lastPr,
            id: item.id,
            change24h: item.change24h,
            fundingRate: item.fundingRate,
            high24h: item.high24h,
            low24h: item.low24h,
            favourite: item.favourite
          })
        }
        title={item.symbol.replace("USDT", "")}
        price={item.lastPr}
        change24h={item.change24h}
        id={item.id}
        favourite={item.favourite}
        onToggleFavourite={dataC.toggleFavourite}
      />
    );
  };

  return (
    <Screen>
      <Text style={styles.heading}>Funding Rates</Text>
      {data ? (
        <FlatList
          style={{ width: "100%" }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Loading />
      )}
    </Screen>
  );
};

export default FundingRateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
});
