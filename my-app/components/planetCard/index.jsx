import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PlanetCard({ props }) {
  const navigation = useNavigation();

  function goToDetails() {
    navigation.navigate("PlanetInfo", props.id);
  }

  return (
    <TouchableOpacity onPress={goToDetails}>
      <View style={styles.container}>
        <Image source={{ uri: props.image }} style={styles.foto} />
        <Text style={styles.name}> {props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "white",
    padding: 5,
    margin: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 50,
  },
  foto: {
    width: 110,
    height: 110,
    objectFit: "cover",
  },
  name: {
    fontSize: 30,
    color: "white",
    fontWeight: "200",
    marginLeft: 40,
  },
});
