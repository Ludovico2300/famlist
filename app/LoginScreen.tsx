import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { Link } from "expo-router";
import useAuthFirebase from "./hooks/useAuthFirebase";

const LoginScreen = () => {
  const { login, currentUser, signout } = useAuthFirebase();
  const tw = useTailwind();
  const user = currentUser?.email;
  return (
    <SafeAreaView
      style={tw("flex items-center justify-around h-full w-screen")}
    >
      {!currentUser ? (
        <>
          <Text style={tw("font-bold text-3xl")}>Chi sei?</Text>
          <View style={tw("flex flex-col items-center w-[30%] ")}>
            <Link
              href="/ShoppingListScreen"
              style={tw(
                "bg-blue-500 py-2 px-4 rounded-lg my-3 w-full text-center"
              )}
              onPress={() => login("adminantonella@mail.com", "admin161271")}
            >
              <Text style={tw("text-white font-bold")}>Antonella</Text>
            </Link>
            <Link
              href="/ShoppingListScreen"
              style={tw(
                "bg-blue-500 py-2 px-4 rounded-lg my-3 w-full text-center"
              )}
              onPress={() => login("adminluca@mail.com", "admin310367")}
            >
              <Text style={tw("text-white font-bold ")}>Luca</Text>
            </Link>
            <Link
              href="/ShoppingListScreen"
              style={tw(
                "bg-blue-500 py-2 px-4 rounded-lg my-3 w-full text-center"
              )}
              onPress={() => login("adminludovico@mail.com", "admin231100")}
            >
              <Text style={tw("text-white font-bold ")}>Ludo</Text>
            </Link>
          </View>
        </>
      ) : (
        <>
          <Text style={tw("font-bold")}>Ciao {user}</Text>
          <View style={tw("flex flex-col items-center w-[30%]")}>
            <Link
              href="/ShoppingListScreen"
              style={tw(
                "bg-blue-500 py-2 px-4 rounded-lg my-3 w-full text-center"
              )}
            >
              <Text style={tw("text-white font-bold")}>Vai alla Lista</Text>
            </Link>
            <Link
              href="/"
              style={tw(
                "bg-red-500 py-2 px-4 rounded-lg my-3 w-full text-center"
              )}
              onPress={() => signout()}
            >
              <Text style={tw("text-white font-bold")}>Esci</Text>
            </Link>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
