import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Screen from "./Screen";
import CustomCard from "../components/CustomCard";
import Loading from "../components/Loading";
import dataContext from "./../context/Data";

const Home = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const dataC = useContext(dataContext);

  useEffect(() => {
    setData(dataC.mainData);
  }, [dataC.mainData]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setData(dataC.mainData);
    } else {
      const filteredData =
        data &&
        data.filter((item) =>
          item.symbol.toLowerCase().includes(text.toLowerCase())
        );
      setData(filteredData);
    }
  };

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
        
        change24h={(item.change24h * 100).toFixed(4)}
        data={data}
        id={item.id}
        favourite={item.favourite}
        onToggleFavourite={dataC.toggleFavourite}
      />
    );
  };

  return (
    <Screen>
      <Text style={styles.heading}>Crypto Coin List</Text>
      <View style={{ padding: 8, width: "100%" }}>
        <TextInput
          style={{
            borderColor: "#fff",
            borderWidth: 1,
            borderRadius: 15,
            padding: 16,
            color: "#fff",
          }}
          placeholderTextColor={"white"}
          placeholder="Search a coin by symbol..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
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

export default Home;

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
