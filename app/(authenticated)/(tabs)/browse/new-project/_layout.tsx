import { Colors } from "@/constants/Colors";
import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function NewProjectLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.backgroundAlt },
        headerTintColor: Colors.primary,
        headerTitleStyle: { color: "#000" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "New Project",
          headerTransparent: true,
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.dismiss()}
              color={Colors.primary}
            />
          ),
        }}
      />
      <Stack.Screen
        name="color-select"
        options={{
          title: "Color",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
