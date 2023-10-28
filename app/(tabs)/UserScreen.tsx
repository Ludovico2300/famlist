import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { Link } from "expo-router";
import useAuthFirebase from "../hooks/useAuthFirebase";

const UserScreen = () => {
  const { currentUser, signout } = useAuthFirebase();
  const tw = useTailwind();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      if (currentUser.email === "adminantonella@mail.com")
        setUserName("Antonella");
      if (currentUser.email === "adminluca@mail.com") setUserName("Luca");
      if (currentUser.email === "adminludovico@mail.com")
        setUserName("Ludovico");
    }
  }, [currentUser]);
  return (
    <View style={tw("flex items-center justify-around h-full w-screen")}>
      <Text style={tw("font-bold text-3xl")}>Ciao {userName}</Text>
      <View style={tw("flex flex-col items-center w-[30%]")}>
        <Link
          href="/"
          style={tw("bg-red-500 py-2 px-4 rounded-lg my-3 w-full text-center")}
          onPress={() => signout()}
        >
          <Text style={tw("text-white font-bold")}>Esci</Text>
        </Link>
      </View>
    </View>
  );
};

export default UserScreen;
