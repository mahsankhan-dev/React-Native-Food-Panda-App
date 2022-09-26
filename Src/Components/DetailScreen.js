import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  Share,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons,
  EvilIcons,
  Feather,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useState, useEffect, useLayoutEffect } from "react";
import { getdetail, getRestaurentMenu } from "../Config/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../app/Reducer";

const DetailsScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [idData, setIdData] = useState();
  const [menuData, setMenuData] = useState();
  const cartItems = useSelector((state) => state.cart.items);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: idData.image,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getDetailbyid();
    allMenuData();
  }, []);

  const { itemId } = route.params;
  const allMenuData = async () => {
    const menus = await getRestaurentMenu(itemId);
    setMenuData(menus);
  };
  const getDetailbyid = async () => {
    const data = await getdetail(itemId);
    setIdData(data);
  };
  if (!idData) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  var RandomNumber = Math.floor(Math.random() * 50) + 20;
  //   let quantity = 1;
  const dispatch = useDispatch();
  const addItemToCart = (id) => {
    const r = dispatch(
      addItem({
        menuData: {
          id,
          quantity: 1,
        },
      })
    );
    console.log("MY R =====>", r);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <View>
              <ImageBackground
                style={styles.image}
                source={{ uri: idData.image }}
              >
                <View
                  style={{
                    padding: 20,
                    paddingTop: 50,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.top_menu_icon}>
                    <Feather
                      onPress={() => navigation.goBack()}
                      name="arrow-left"
                      size={24}
                      color="#d70f64"
                    />
                  </View>
                  <View style={styles.top_menu_icon}>
                    <AntDesign
                      onPress={onShare}
                      name="sharealt"
                      size={24}
                      color="#d70f64"
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>
            <Text style={{ fontWeight: "bold", padding: 10 }}>
              {idData.title}
            </Text>
            <View style={styles.texts}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ paddingRight: 5, color: "gray", fontSize: 12 }}>
                  2.7km away |
                </Text>
                <Text style={{ paddingRight: 5, color: "gray", fontSize: 12 }}>
                  Minimum |
                </Text>

                <Text>
                  <MaterialIcons name="star-rate" size={14} color="#d70f64" />
                  <MaterialIcons name="star-rate" size={14} color="#d70f64" />
                  <MaterialIcons name="star-rate" size={14} color="#d70f64" />
                  <MaterialIcons name="star-rate" size={14} color="#d70f64" />
                  <MaterialIcons name="star-rate" size={14} color="gray" />
                </Text>
                <Text style={{ fontSize: 12, color: "gray", marginLeft: 5 }}>
                  1000+ ratings
                </Text>
              </View>
              <View style={styles.moreInfo}>
                <Text
                  style={{
                    color: "#d70f64",
                    fontWeight: "bold",
                  }}
                >
                  More Info
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", padding: 5, marginTop: 10 }}>
              <EvilIcons name="clock" size={24} color="#d70f64" />
              <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                Delivery: {RandomNumber} min
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: "#DCDCDC",
                borderBottomWidth: 1,
                marginTop: 20,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Variation
                </Text>
                <Text
                  style={{
                    color: "gray",
                  }}
                >
                  Select Item
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#d70f64",
                  borderRadius: 15,
                  height: 35,
                  width: 90,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Required
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#DCDCDC",
                borderBottomWidth: 1,
                marginTop: 10,
              }}
            />

            <View>
              {menuData.map((items) => {
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
                            source={{ uri: items.image }}
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
                            {items.item}
                          </Text>
                          <Text style={{ color: "#d70f64" }}>
                            Rs. {items.price}
                          </Text>
                        </View>
                      </View>

                      <View style={{ paddingRight: 10 }}>
                        <TouchableOpacity onPress={() => addItemToCart(items)}>
                          <FontAwesome
                            name="cart-plus"
                            size={34}
                            color="#d70f64"
                          />
                        </TouchableOpacity>
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
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          justifyContent: "flex-end",
          //   flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ padding: 10 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Special Instructions
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cart")}
                style={{
                  width: 300,
                  backgroundColor: "#d70f64",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Your Cart ({cartItems.length})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  top_menu_icon: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  texts: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flexWrap: "wrap",
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default DetailsScreen;
