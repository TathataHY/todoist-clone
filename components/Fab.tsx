import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";

export default function Fab() {
  const router = useRouter();

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/task/new");
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 1000,
    height: 56,
    width: 56,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
});
