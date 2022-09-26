import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../app/Reducer";

const Cart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((items) => {
      total += items.menuData.id.price;
    });
    return total;
  };

  const dispatch = useDispatch();
  const onRemove = (ids) => {
    const r = dispatch(removeItem(ids));
    console.log(r);
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 2,
              borderColor: "#d70f64",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Cart Items{" "}
            </Text>
            <Text
              style={{ color: "#d70f64", fontWeight: "bold", fontSize: 20 }}
            >
              {cartItems.length}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 2,
              borderColor: "#d70f64",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total </Text>
            <Text
              style={{ color: "#d70f64", fontWeight: "bold", fontSize: 20 }}
            >
              {calculateTotal()}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#fff", marginBottom: 100 }}>
          <ScrollView>
            {!cartItems.length ? (
              <View style={{ padding: 20 }}>
                <Text style={{ fontWeight: "bold" }}>
                  No any singal items !
                </Text>
              </View>
            ) : (
              <>
                {cartItems.map((items) => {
                  return (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          padding: 10,
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View>
                            <Image
                              style={styles.images}
                              source={{ uri: items.menuData.id.image }}
                            />
                          </View>

                          <View style={{ paddingLeft: 15 }}>
                            <Text
                              style={{
                                fontWeight: "bold",
                                width: 200,
                                // fontSize: 20,
                              }}
                            >
                              {items.menuData.id.item}
                            </Text>
                            <Text style={{ color: "#d70f64" }}>
                              Rs. {items.menuData.id.price}
                            </Text>
                          </View>
                        </View>

                        <View style={{ paddingRight: 10 }}>
                          <MaterialCommunityIcons
                            onPress={() => onRemove(items.menuData.id)}
                            name="archive-remove-outline"
                            size={34}
                            color="#d70f64"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          borderBottomColor: "#DCDCDC",
                          borderBottomWidth: 1,
                        }}
                      />
                    </>
                  );
                })}
              </>
            )}

            {!cartItems?.length ? (
              <View style={{ padding: 20, backgroundColor: "#fff" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: "#d70f64" }}>Add Item</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ padding: 20, backgroundColor: "#fff" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: "#d70f64" }}>Add More Item</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      {!cartItems.length ? (
        ""
      ) : (
        <View
          style={{
            backgroundColor: "#fff",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Payment")}
            style={{ alignItems: "center" }}
          >
            <Text
              style={{
                backgroundColor: "#d70f64",
                color: "#fff",
                fontWeight: "bold",
                padding: 10,
                borderRadius: 6,
                marginBottom: 10,
              }}
            >
              Confirm payment
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  images: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});
