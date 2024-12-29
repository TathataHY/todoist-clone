import MoreButton from "@/components/MoreButton";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function UpcomingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Upcoming",
          headerLargeTitle: true,
          headerRight: () => <MoreButton pageName="Upcoming" />,
        }}
      />
    </Stack>
  );
}
