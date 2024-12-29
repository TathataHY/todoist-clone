import Fab from "@/components/Fab";
import TaskRow from "@/components/TaskRow";
import { Colors } from "@/constants/Colors";
import { projects, todos } from "@/db/schema";
import { Todo } from "@/types/interfaces";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Section {
  title: string;
  data: Todo[];
}

export default function Today() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  useDrizzleStudio(db);

  const { top } = useSafeAreaInsets();

  const [listData, setListData] = useState<Section[]>([]);

  const { data } = useLiveQuery(
    drizzleDb
      .select()
      .from(todos)
      .leftJoin(projects, eq(todos.project_id, projects.id))
      .where(eq(todos.completed, 0))
  );

  useEffect(() => {
    const formatedData = data?.map((todo) => ({
      ...todo.todos,
      project_name: todo.projects?.name,
      project_color: todo.projects?.color,
    }));

    const groupedByDay = formatedData?.reduce(
      (acc: { [key: string]: Todo[] }, task) => {
        const day = format(
          new Date(task.due_date || new Date()),
          "d MMM · eee"
        );
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(task);
        return acc;
      },
      {}
    );

    const listData: Section[] = Object.entries(groupedByDay || {}).map(
      ([day, tasks]) => ({
        title: day,
        data: tasks,
      })
    );

    // Sort sections by date
    listData.sort((a, b) => {
      const dateA = new Date(a.data[0].due_date || new Date());
      const dateB = new Date(b.data[0].due_date || new Date());
      return dateA.getTime() - dateB.getTime();
    });

    setListData(listData);
  }, [data]);

  return (
    <>
      <View style={[styles.container, { paddingTop: top + 20 }]}>
        <SectionList
          sections={listData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TaskRow task={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => {}} />
          }
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        />
      </View>
      <Fab />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
  },
  sectionHeader: {
    fontSize: 16,
    backgroundColor: Colors.background,
    fontWeight: "bold",
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightBorder,
  },
});
