import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";

export default function PlanetInfo({ route }) {
  const { id } = route.params;
  const [planet, setPlanet] = useState([]);

  const getPlanet = async () => {
    try {
      const response = await fetch(`http://172.20.10.2:8000/planets/${id}`, {
        method: "GET",
      });

      const data = await response.json();
      console.log("data response get planet: ", data);
      setPlanet(data);

      if (!response.ok) throw new Error("Error en la respuesta");
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getPlanet();
  }, []);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.title}> {planet.name} </Text>
      <Image source={{ uri: planet.image }} style={styles.planetImage} />
      <ScrollView style={styles.planetContent}>
        <Text style={styles.text}> {planet.description} </Text>
        <Text style={styles.text}>Moons: {planet.moons} </Text>
        {planet.moon_names?.length > 0 && (
          <>
            <Text style={styles.text}>Moon names: </Text>
            {planet.moon_names?.map((moonName, index) => (
              <Text key={index} style={styles.textList}>
                - {moonName}
              </Text>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    // backgroundColor: "#0d1321",
    backgroundColor: "black",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: "white",
    marginTop: 50,
    fontWeight: "bold",
  },
  loading: {
    color: "white",
    fontSize: 18,
  },
  planetImage: {
    width: 250,
    height: 250,
    marginTop: 20,
    objectFit: "contain",
  },
  text: {
    color: "white",
    fontSize: 20,
    margin: 10,
  },
  textList: {
    color: "white",
    fontSize: 20,
    margin: 10,
    marginTop: 0,
  },
  planetContent: {
    marginTop: 30,
    width: "80%",
  },
});
