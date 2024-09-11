import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function Tank() {
  const { tank } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Details of user {tank} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
