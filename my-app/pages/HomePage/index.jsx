import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import PlanetCard from "../../components/planetCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [planets, setPlanets] = useState([]); // Estado para almacenar los planetas

  const getPlanets = async () => {
    try {
      const response = await fetch("http://172.20.10.2:8000/planets", {
        method: "GET",
      });

      const data = await response.json();
      console.log("data response all planets: ", data);
      setPlanets(data);

      if (!response.ok) throw new Error("Error en la respuesta");
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.title}> Planets </Text>
      <View style={styles.planetList}>
        <FlatList
          data={planets}
          renderItem={({ item }) => <PlanetCard props={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}> add planet</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}> change order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#0d1321",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 30,
  },
  planetList: {
    width: "85%",
    height: "71%",
    marginTop: 25,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "white",
    height: 55,
    width: 150,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
