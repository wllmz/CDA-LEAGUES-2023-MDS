import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Button({ label, theme }) {
  const navigation = useNavigation();


  if (theme === "primary") {
    return (
      <View
        style={[styles.buttonContainer, { color: "#fff", borderRadius: 18 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#002465" }]}
          onPress={() => navigation.navigate("Connexion")}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  if (theme === "secondary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            borderWidth: 2,
            borderColor: "#fff",
            color: "#fff",
            borderRadius: 18,
          },
        ]}
      >
        <Pressable
          style={[styles.button]}
          onPress={() => navigation.navigate("Inscription")}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if (theme === "Inscription") {
    return (
      <View
        style={[styles.buttonContainer, { color: "#fff", borderRadius: 18, margin : 35 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#002465" }]}
          onPress={() => navigation.navigate("Inscription")}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if (theme === "Match") {
    return (
      <View
        style={[styles.buttonContainer, { color: "#fff", borderRadius: 18 }]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#002465" }]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }



  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert("You pressed a button.")}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 150,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    margin: 10,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
