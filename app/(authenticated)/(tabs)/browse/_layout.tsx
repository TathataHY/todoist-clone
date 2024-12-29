import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Link, router, Stack } from "expo-router";
import { Button, Image, StyleSheet } from "react-native";

export default function BrowseLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.backgroundAlt },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Browse",
          headerLargeTitle: true,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="new-project"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          presentation: "modal",
          headerTransparent: true,
          headerRight: () => (
            <Button
              title="Done"
              onPress={() => router.dismiss()}
              color={Colors.primary}
            />
          ),
        }}
      />
    </Stack>
  );
}

function HeaderLeft() {
  const { user } = useUser();
  return <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />;
}

function HeaderRight() {
  return (
    <Link href="/">
      <Ionicons name="settings-outline" size={24} color={Colors.primary} />
    </Link>
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
