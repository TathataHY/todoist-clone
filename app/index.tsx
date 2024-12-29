import { Colors } from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const handleAppleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log("createdSessionId", createdSessionId);
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();
      console.log("createdSessionId", createdSessionId);
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openBrowser = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image
        source={require("@/assets/images/todoist-logo.png")}
        style={styles.logo}
      />
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.banner}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAppleLogin}>
          <Ionicons name="logo-apple" size={24} />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Ionicons name="logo-google" size={24} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="mail" size={24} />
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          By continuing, you agree to Todoist's{" "}
          <Text style={styles.footerLink}>Terms of Service</Text> and{" "}
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  logo: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },
  banner: {
    height: 280,
    resizeMode: "contain",
    alignSelf: "center",
  },
  buttonsContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 12,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.lightText,
  },
  footerLink: {
    textDecorationLine: "underline",
  },
});
