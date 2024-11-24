import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import PlanetCard from "../../components/planetCard";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const [planets, setPlanets] = useState([]); // Estado para almacenar los planetas
  const [originalOrder, setOriginalOrder] = useState([]);
  const [ordered, setOrdered] = useState(false);
  const navigation = useNavigation();

  const getPlanets = async () => {
    try {
      const response = await fetch("http://172.20.10.2:8000/planets", {
        method: "GET",
      });

      const data = await response.json();
      console.log("data response all planets: ", data);
      setPlanets(data);
      setOriginalOrder(data); // Guarda el orden original

      if (!response.ok) throw new Error("Error en la respuesta");
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getPlanets();
  }, []);

  function gotToAddPlanet() {
    navigation.navigate("AddPlanet");
  }

  // Función para alternar el orden de los planetas
  const toggleOrder = () => {
    if (ordered) {
      // Si está ordenado, restablecer el orden original
      setPlanets(originalOrder);
    } else {
      // Ordenar los planetas por cantidad de lunas (de mayor a menor)
      const sortedPlanets = [...planets].sort(
        (a, b) => (b.moons || 0) - (a.moons || 0)
      );
      setPlanets(sortedPlanets);
    }
    setOrdered(!ordered); // Alterna el estado
  };

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
      <View style={Platform.select(styles.buttonsContainer)}>
        <TouchableOpacity onPress={gotToAddPlanet}>
          <View style={Platform.select(styles.buttonAdd)}>
            {/* Cambiar etiqueta y estilos según la plataforma */}
            <Text style={styles.buttonText}>
              {Platform.OS === "android" ? "new planet" : "create planet"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleOrder}>
          <View style={styles.buttonChangeOrder}>
            <Text style={styles.buttonText}>
              {" "}
              {ordered ? "reset order" : "sort by moons"}
            </Text>
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
    height: "74%",
    marginTop: 25,
  },
  buttonsContainer: {
    android: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "85%",
      marginTop: 20,
    },
    ios: {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      width: "85%",
      marginTop: 20,
    },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  buttonAdd: {
    android: {
      backgroundColor: "#f6aa1c", // Fondo amarillo
      height: 55,
      width: 150,
      justifyContent: "center",
      alignItems: "center", // Alineado a la izquierda
      borderRadius: 30,
    },
    ios: {
      backgroundColor: "#4c956c", // Fondo verde
      height: 55,
      width: 150,
      justifyContent: "center",
      alignItems: "center", // Alineado a la derecha
      // no le agrego texto negro porque queda feo
      alignContent: "center",
      borderRadius: 30,
    },
  },
  buttonChangeOrder: {
    backgroundColor: "#1d2d44",
    height: 55,
    width: 150,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});
