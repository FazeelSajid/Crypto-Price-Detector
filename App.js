import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import dataContext from "./src/context/Data";
import bitget from "./src/api/bitget";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";

const REFRESH_INTERVAL = 1000; // 1m

const App = () => {
  const [mainData, setMainData] = useState(null);
  const [favCoins, setFavCoins] = useState(null);

  const fetchData = async () => {
    const response = await bitget.get(
      `/mix/market/tickers?productType=USDT-FUTURES`
    );
    if (!response.ok) {
      console.log(response.data);
      return;
    }

    const apiData = response.data.data.map((bitgetCoin, index) => ({
      ...bitgetCoin,
      favourite: false,
      id: index,
    }));
    setMainData(apiData);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const toggleFavourite = (id) => {
    setMainData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, favourite: !item.favourite };
        } else {
          return item;
        }
      });
    });
    const favourites = mainData.filter(
      (item) => item.favourite === true
    );
    setFavCoins(favourites);
  };

  return (
    <dataContext.Provider value={{ mainData, setMainData, toggleFavourite, favCoins }}>
      <View style={{ flex: 1, backgroundColor: "#222" }}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </View>
    </dataContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
