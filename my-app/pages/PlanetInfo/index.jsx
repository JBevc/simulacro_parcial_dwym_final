import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function PlanetInfo({ route }) {
  const { id } = route.params;
  const [planet, setPlanet] = useState([]); // Estado para almacenar los planetas

  const getPlanet = async () => {
    try {
      const response = await fetch(`http://172.20.10.2:8000/planets/${id}`, {
        method: "GET",
      });

      const data = await response.json();
      console.log("data response all planets: ", data);
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
    <SafeAreaView style={styles.pageContaier}>
      <Text> {planet.name} </Text>
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
    fontSize: 50,
  },
});
