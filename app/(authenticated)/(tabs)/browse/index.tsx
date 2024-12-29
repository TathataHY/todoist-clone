import Fab from "@/components/Fab";
import { Colors } from "@/constants/Colors";
import { projects } from "@/db/schema";
import { useRevenueCat } from "@/providers/RevenueCat";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { eq } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import Animated, { LinearTransition } from "react-native-reanimated";
import * as ContextMenu from "zeego/context-menu";

export default function Browse() {
  const { signOut } = useAuth();
  const router = useRouter();
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const { isPro } = useRevenueCat();

  const { data } = useLiveQuery(drizzleDb.select().from(projects), []);

  const onNewProject = () => {
    if (!isPro && data?.length >= 5) {
      goPro();
    } else {
      router.push("/browse/new-project");
    }
  };

  const goPro = async () => {
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall({
      displayCloseButton: false,
    });

    switch (paywallResult) {
      case PAYWALL_RESULT.NOT_PRESENTED:
      case PAYWALL_RESULT.ERROR:
      case PAYWALL_RESULT.CANCELLED:
        return false;
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      default:
        return false;
    }
  };

  const onDeleteProject = async (id: number) => {
    await drizzleDb.delete(projects).where(eq(projects.id, id));
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Projects</Text>
          <TouchableOpacity onPress={onNewProject}>
            <Ionicons name="add" size={24} color={Colors.dark} />
          </TouchableOpacity>
        </View>
        <Animated.FlatList
          style={styles.content}
          data={data}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item }) => (
            <ContextMenu.Root key={item.id}>
              <ContextMenu.Trigger>
                <TouchableOpacity style={styles.projectItem}>
                  <Text style={{ color: item.color }}>#</Text>
                  <Text style={styles.projectItemText}>{item.name}</Text>
                </TouchableOpacity>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item
                  key="delete"
                  onSelect={() => onDeleteProject(item.id)}
                >
                  <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                  <ContextMenu.ItemIcon androidIconName="ic_delete" />
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={() => signOut()}
            >
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          }
        />
      </View>
      <Fab />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  content: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightBorder,
  },
  signOutButton: {
    padding: 14,
    backgroundColor: Colors.background,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  signOutButtonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  projectItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 14,
    borderRadius: 5,
    gap: 14,
  },
  projectItemText: {
    fontSize: 16,
  },
});
