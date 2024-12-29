import MoreButton from "@/components/MoreButton";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function TodayLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Today",
          headerLargeTitle: true,
          headerRight: () => <MoreButton pageName="Today" />,
        }}
      />
    </Stack>
  );
}
