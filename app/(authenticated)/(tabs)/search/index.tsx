import Fab from "@/components/Fab";
import { ScrollView, Text } from "react-native";

export default function Search() {
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Search</Text>
      </ScrollView>
      <Fab />
    </>
  );
}
