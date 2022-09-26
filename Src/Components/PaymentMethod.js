import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";

const PaymentMethod = ({ navigation }) => {
  const [checked, setChecked] = useState();
  console.log("checked", checked);
  const cartItems = useSelector((state) => state.cart.items);
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((items) => {
      total += items.menuData.id.price;
    });
    return total;
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.div_wrapper}>
            <View style={styles.cash_icon}>
              <MaterialCommunityIcons name="cash-plus" size={20} color="gray" />
            </View>
            <Text style={{ fontWeight: "bold" }}>Cash</Text>
          </View>
          <View>
            <RadioButton
              value={checked}
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
              color="#d70f64"
            />
          </View>
        </View>
      </View>
      <View>
        <Image source={require("../../assets/Images/giphy.gif")} />
      </View>

      {checked && (
        <View style={styles.footer}>
          <View style={styles.footer_alignment}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Total</Text>
              <Text style={{ fontSize: 10, margin: 5, color: "gray" }}>
                (incl.VAT)
              </Text>
            </View>
            <View>
              <Text
                style={{ fontWeight: "bold" }}
              >{`Rs. ${calculateTotal()}`}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Map")}
              style={styles.footer_button}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  div_wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  cash_icon: {
    backgroundColor: "#FFFAFA",
    paddingRight: 5,
    paddingLeft: 3,
    marginRight: 10,
  },
  footer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-end",
  },
  footer_alignment: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  footer_button: {
    backgroundColor: "#d70f64",
    width: "80%",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    marginLeft: 40,
    marginBottom: 20,
  },
});
