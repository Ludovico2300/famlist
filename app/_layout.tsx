import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { TailwindProvider } from "tailwind-rn";
import utilities from "../tailwind.json";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    //@ts-ignore
    <TailwindProvider utilities={utilities}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="LoginScreen" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="AddItemToListScreen"
          options={{
            presentation: "modal",
            title: "Aggiungi alla lista della spesa",
          }}
        />
        <Stack.Screen
          name="AddItemToItemsDBScreen"
          options={{
            presentation: "modal",
            title: "Aggiungi al DataBase",
          }}
        />
        <Stack.Screen
          name="ItemDetailScreen"
          options={{
            presentation: "modal",
            title: "Dettaglio Prodotto",
          }}
        />
      </Stack>
    </TailwindProvider>
  );
}
