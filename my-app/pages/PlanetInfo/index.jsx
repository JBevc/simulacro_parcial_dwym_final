import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function PlanetInfo({ route }) {
  const { id } = route.params;
  const [planet, setPlanet] = useState([]);
  const navigation = useNavigation();

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

  function submitDeletePlanet() {
    deletePlanet();
    goBack();
  }

  const deletePlanet = async () => {
    try {
      const response = await fetch(`http://172.20.10.2:8000/planets/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("data response delete planet: ", data);

      if (!response.ok) throw new Error("Error en la respuesta");
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getPlanet();
  }, []);

  function goToEdit() {
    navigation.navigate("EditPlanet", { id });
  }

  function goBack() {
    navigation.navigate("HomePage");
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.goBackContainer}>
        <TouchableOpacity style={styles.goBack} onPress={goBack}>
          <MaterialIcons name="arrow-back-ios" style={styles.backIcon} />
          <Text style={styles.backIcon}>back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}> {planet.name} </Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: planet.image }} style={styles.planetImage} />
      </View>
      <ScrollView style={styles.planetContent}>
        <Text style={styles.text}>{planet.description}</Text>
        {planet.moons === 0 ? (
          <>
            <Text style={styles.text}>It has no moons.</Text>
          </>
        ) : (
          <>
            <Text style={styles.text}>Moons: {planet.moons} </Text>
          </>
        )}
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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={submitDeletePlanet}>
          <View style={styles.buttonDelete}>
            <Text style={styles.buttonTextDelete}> Delete </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToEdit}>
          <View style={styles.buttonEdit}>
            <Text style={styles.buttonTextEdit}> Edit </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    // backgroundColor: "#0d1321",
    backgroundColor: "#0d1321",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: "white",
    marginTop: 20,
    fontWeight: "bold",
  },
  loading: {
    color: "white",
    fontSize: 18,
  },
  planetImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  imageContainer: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "85%",
    height: "35%",
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    margin: 10,
    textAlign: "justify",
    marginLeft: 0,
    marginRight: 0,
  },
  textList: {
    color: "white",
    fontSize: 18,
    margin: 10,
    marginTop: 0,
  },
  planetContent: {
    marginTop: 20,
    width: "80%",
    maxHeight: "35%",
    padding: 0, // Sin padding
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 20,
  },
  buttonTextEdit: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  buttonTextDelete: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  buttonEdit: {
    backgroundColor: "#1d2d44",
    height: 55,
    width: 150,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonDelete: {
    backgroundColor: "#e63946",
    height: 55,
    width: 150,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  backIcon: {
    color: "#669bbc",
    fontSize: 18,
  },
  goBack: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  goBackContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    width: "100%",
  },
});
