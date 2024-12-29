import { Colors } from "@/constants/Colors";
import migrations from "@/drizzle/migrations";
import { addDummyData } from "@/utils/add-dummy-data";
import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import React, { Suspense, useEffect } from "react";
import { ActivityIndicator, LogBox, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

LogBox.ignoreLogs(["Clerk: Clerk has been loaded with development keys"]);

const Providers = ({ children }: { children: React.ReactNode }) => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  const db = openDatabaseSync("todoist-clone");
  const drizzleDb = drizzle(db);

  const { success } = useMigrations(drizzleDb, migrations);

  useEffect(() => {
    if (!success) {
      return;
    }
    addDummyData(drizzleDb);
  }, [success]);

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Suspense fallback={<Loading />}>
          <SQLiteProvider
            databaseName="todoist-clone.db"
            options={{ enableChangeListener: true }}
            useSuspense
          >
            {children}
          </SQLiteProvider>
        </Suspense>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default function RootLayout() {
  const router = useRouter();
  const segment = useSegments();
  const pathname = usePathname();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <Content segment={segment} pathname={pathname} router={router} />
        <Toaster />
      </Providers>
    </GestureHandlerRootView>
  );
}

const Content = ({
  segment,
  pathname,
  router,
}: {
  segment: string[];
  pathname: string;
  router: any;
}) => {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    const isAuthenticated = segment[0] === "(authenticated)";
    if (!isSignedIn && !isAuthenticated) {
      router.replace("/(authenticated)/(tabs)/today");
    } else if (!isSignedIn && pathname !== "/") {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(authenticated)" />
    </Stack>
  );
};
