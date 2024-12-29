import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

export default function SearchLayout() {
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
          title: "Search",
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: "Tasks, projects and more",
            tintColor: Colors.primary,
          },
        }}
      />
    </Stack>
  );
}
