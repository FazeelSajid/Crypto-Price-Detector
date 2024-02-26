import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "./MainStack";
import FavouriteStack from "./FavouriteStack";
import FundingStack from "./FundingStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: "Crypto Coins",
        tabBarStyle: {
          backgroundColor: "#222",
        },
        tabBarActiveTintColor: "#39cccc",
        tabBarInactiveTintColor: "#ccc"

      }}
    >
      <Tab.Screen name="Funding Rates" component={FundingStack} options={{
        tabBarIcon: ({ size, color }) => {
          return (
            <MaterialCommunityIcons name="cash-refund" size={size} color={color} />
          )
        }
      }} />
      <Tab.Screen
        name="Crypto Coins"
        component={MainStack}
        options={({ navigation }) => ({
          tabBarButton: ({ size, color }) => {
            return (
              <Pressable
                onPress={() => navigation.navigate("Crypto Coins")}
                style={{
                  borderColor: "white",
                  backgroundColor: "#222",
                  borderWidth: 1,
                  borderRadius: 50,
                  width: 65,
                  height:65,
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: 30,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 5,
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="home"
                    size={30}
                    color={color}
                  />
                </View>
              </Pressable>
            );
          },
        })}
      />
      <Tab.Screen name="Favourites" component={FavouriteStack} options={{
        tabBarIcon: ({ size, color }) => {
          return (
            <MaterialCommunityIcons name="account-heart" size={size} color={color} />
          )
        }
      }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
