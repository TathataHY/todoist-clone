import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { Button, useWindowDimensions, View } from "react-native";

export default function RootLayout() {
  const { height } = useWindowDimensions();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="task/[id]"
        options={{
          title: "",
          presentation: "formSheet",
          sheetAllowedDetents: height > 700 ? [0.22] : "fitToContents",
          sheetGrabberVisible: false,
          sheetCornerRadius: 10,
          sheetExpandsWhenScrolledToEdge: false,
        }}
      />
      <Stack.Screen
        name="task/new"
        options={{
          title: "",
          presentation: "formSheet",
          sheetAllowedDetents: height > 700 ? [0.22] : "fitToContents",
          sheetGrabberVisible: false,
          sheetCornerRadius: 10,
          sheetExpandsWhenScrolledToEdge: false,
        }}
      />
      <Stack.Screen
        name="task/date-select"
        options={{
          title: "Schedule",
          presentation: "formSheet",
          sheetAllowedDetents: height > 700 ? [0.6, 0.9] : "fitToContents",
          sheetGrabberVisible: true,
          sheetCornerRadius: 10,
          sheetExpandsWhenScrolledToEdge: false,
          unstable_sheetFooter: () => (
            <View style={{ height: 400, backgroundColor: "#fff" }} />
          ),
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.back()}
              color={Colors.primary}
            />
          ),
        }}
      />
    </Stack>
  );
}
