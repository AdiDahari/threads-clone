import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Lottie from "lottie-react-native";
import Colors from "../../constants/Colors";
import { useContext, useRef } from "react";
import { ThreadsContext } from "../../context/threads-context";
import ThreadItem from "../../components/ThreadItem";

export default function TabOneScreen() {
  const animationRef = useRef<Lottie>(null);
  const threads = useContext(ThreadsContext);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignSelf: "center",
          width: "90%",
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              animationRef.current?.play();
            }}
            tintColor={"transparent"}
          />
        }
      >
        <Lottie
          ref={animationRef}
          source={require("../../assets/animations/animation_llkpr1fd.json")}
          loop={false}
          autoPlay
          style={{ width: 90, height: 80, alignSelf: "center" }}
        />

        {threads.map((thread) => (
          <ThreadItem key={thread.id} {...thread} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
