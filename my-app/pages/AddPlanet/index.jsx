import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function AddPlanet() {
  const navigation = useNavigation();
  const [newPlanet, setNewPlanet] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [moon, setMoon] = useState("");
  const [moonNames, setMoonNames] = useState("");

  function cancel() {
    navigation.navigate("HomePage");
  }

  function processNames(names) {
    if (!names) return [];
    return names.split(",").map((name) => name.trim());
  }

  function addPlanet() {
    const planet = {
      name: newPlanet,
      image: image,
      description: description,
      moons: parseInt(moon, 10),
      moon_names: processNames(moonNames),
    };
    console.log("Planet to submit:", planet); // Depuración
    submitPlanet(planet);
    cancel();
  }

  const submitPlanet = async (planet) => {
    try {
      const response = await fetch("http://172.20.10.2:8000/planets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planet),
      });
      if (!response.ok) throw new Error("Error en la respuesta");
      return planet;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Text style={styles.title}> New planet </Text>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.text}> Name</Text>
          <TextInput
            placeholder="what is your planet's name?"
            placeholderTextColor="#669bbc"
            onChangeText={(text) => setNewPlanet(text)}
            style={styles.input}
          ></TextInput>
        </View>

        <View style={styles.form}>
          <Text style={styles.text}> Image (url)</Text>
          <TextInput
            placeholder="paste an image url here..."
            onChangeText={(text) => setImage(text)}
            placeholderTextColor="#669bbc"
            style={styles.input}
          ></TextInput>
        </View>

        <View style={styles.form}>
          <Text style={styles.text}> Description</Text>
          <TextInput
            placeholder="write about your planet..."
            placeholderTextColor="#669bbc"
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
          ></TextInput>
        </View>

        <View style={styles.form}>
          <Text style={styles.text}> Moons amount</Text>
          <TextInput
            placeholder="how many moons does it have?"
            keyboardType="numeric"
            onChangeText={(text) => setMoon(text)}
            placeholderTextColor="#669bbc"
            style={styles.input}
          ></TextInput>
        </View>

        <View style={styles.form}>
          <Text style={styles.text}> Moons names:</Text>
          <TextInput
            placeholder="name the moons!..."
            onChangeText={(text) => setMoonNames(text)}
            placeholderTextColor="#669bbc"
            style={styles.input}
          ></TextInput>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={addPlanet}>
          <View style={styles.buttonAdd}>
            <Text style={styles.buttonText}> create planet</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={cancel}>
          <View style={styles.buttonChangeOrder}>
            <Text style={styles.buttonText}> cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#0d1321",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: "white",
    marginTop: 40,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 20,
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  formContainer: {
    width: "85%",
    textAlign: "left",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#1d2d44",
    borderRadius: 20,
    color: "#669bbc",
    padding: 10,
    paddingLeft: 15,
    fontWeight: "400",
  },
  form: {
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  buttonAdd: {
    backgroundColor: "#f6aa1c",
    height: 55,
    width: 150,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonChangeOrder: {
    backgroundColor: "#457b9d",
    // backgroundColor: "#1d2d44",
    height: 55,
    width: 150,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});
