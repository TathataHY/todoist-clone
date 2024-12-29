import { Tabs } from "@/components/Tabs";
import { Colors } from "@/constants/Colors";
import { RevenueCatProvider } from "@/providers/RevenueCat";

export default function RootLayout() {
  return (
    <RevenueCatProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.dark,
        }}
      >
        <Tabs.Screen
          name="browse"
          options={{
            title: "Browse",
            // tabBarIcon: ({ focused }) => ({
            //   sfSymbol: focused ? "doc.text.image.fill" : "doc.text.image",
            // }),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            // tabBarIcon: ({ focused }) => ({
            //   sfSymbol: focused ? "text.magnifyingglass" : "magnifyingglass",
            // }),
          }}
        />
        <Tabs.Screen
          name="today"
          options={{
            title: "Today",
            // tabBarIcon: ({ focused }) => ({
            //   sfSymbol: focused ? "calendar.circle.fill" : "calendar.circle",
            // }),
          }}
        />
        <Tabs.Screen
          name="upcoming"
          options={{
            title: "Upcoming",
            // tabBarIcon: () => ({ sfSymbol: "clock" }),
          }}
        />
      </Tabs>
    </RevenueCatProvider>
  );
}
