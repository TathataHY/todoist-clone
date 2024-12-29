import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { toast } from "sonner-native";
import * as DropdownMenu from "zeego/dropdown-menu";

type MoreButtonProps = {
  pageName: string;
};

export default function MoreButton({ pageName }: MoreButtonProps) {
  const router = useRouter();

  const handleCopy = async () => {
    const path = `todoist-clone://(authenticated)/(tabs)/${pageName.toLowerCase()}`;
    await Clipboard.setStringAsync(path);
    toast.success("Copied to clipboard");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity style={styles.moreButton} activeOpacity={0.6}>
          <Ionicons
            name="ellipsis-horizontal-outline"
            size={30}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="link" onSelect={handleCopy}>
          <DropdownMenu.ItemTitle>Copy</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon>
            <Ionicons name="copy" size={24} color="black" />
          </DropdownMenu.ItemIcon>
        </DropdownMenu.Item>

        <DropdownMenu.Group>
          <DropdownMenu.Item key="select">
            <DropdownMenu.ItemTitle>Select Tasks</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon>
              <Ionicons name="square-sharp" size={24} color="black" />
            </DropdownMenu.ItemIcon>
          </DropdownMenu.Item>

          <DropdownMenu.Item key="view">
            <DropdownMenu.ItemTitle>View</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon>
              <Ionicons name="settings" size={24} color="black" />
            </DropdownMenu.ItemIcon>
          </DropdownMenu.Item>

          <DropdownMenu.Item key="activity">
            <DropdownMenu.ItemTitle>Activity Log</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon>
              <Ionicons name="bar-chart" size={24} color="black" />
            </DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

// 1:08:40 YT: ERROR CONTEXT MENU

const styles = StyleSheet.create({
  moreButton: {
    padding: 10,
  },
});
