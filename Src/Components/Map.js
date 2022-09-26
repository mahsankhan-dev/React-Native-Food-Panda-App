import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Map({ navigation }) {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // let { coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({});
      // setLocation({ latitude, longitude });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Lowest,
          timeInterval: 100,
          distanceInterval: 0.05,
        },
        (location) => {
          let {
            coords: { latitude, longitude },
          } = location;
          setLocation({ latitude, longitude });
          console.log("realtime location", location);
        }
      );
    })();
  }, []);

  console.log("state location", location);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#d70f64",
          padding: 10,
          marginBottom: 100,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Another Order</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <MapView
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.000002,
            longitudeDelta: 0.000001,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: location.latitude || 24.8964165,
              longitude: location.longitude || 67.0817985,
            }}
            title={"Your Order"}
            description={"Deliverd on 10 mins"}
            image={{
              width: 100,
              uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/048b4913-5180-4a01-8b68-0b9f150c7dfb/d55casd-dbd46594-586e-4f7b-a9bc-ef79b9e627ba.png/v1/fill/w_900,h_566,strp/bike_png_stock_by_doloresminette_d55casd-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTY2IiwicGF0aCI6IlwvZlwvMDQ4YjQ5MTMtNTE4MC00YTAxLThiNjgtMGI5ZjE1MGM3ZGZiXC9kNTVjYXNkLWRiZDQ2NTk0LTU4NmUtNGY3Yi1hOWJjLWVmNzliOWU2MjdiYS5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qY_X56LUF24mxsH5OFxE9o4JsgjI-HBEUEWV0ybSnCw",
            }}
          />
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

// https://www.google.com/maps/place/National+Stadium+Karachi/@24.8964165,67.0817985,16.6z/data=!4m5!3m4!1s0x3eb33f30a80523ff:0xf18a3ecfe7cffbdd!8m2!3d24.8960659!4d67.08145
