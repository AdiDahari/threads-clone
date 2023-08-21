import React from "react";
import PropTypes from "prop-types";
import { Thread } from "../types/threads";
import { Text, View } from "./Themed";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { timeAgo } from "../utils/time-ago";
import { StyleSheet, useColorScheme } from "react-native";
import { Image } from "expo-image";

const blurHash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ThreadItem = (thread: Thread): JSX.Element => {
  return (
    <View style={styles.container}>
      <ThreadLeftSide {...thread} />
      <View style={{ gap: 6, flexShrink: 1 }}>
        <ThreadHeading
          name={thread.author.name}
          createdAt={thread.createdAt}
          verified={thread.author.verified}
        />
        <Text>{thread.content}</Text>
        {thread.image && (
          <Image
            source={thread.image}
            style={{ width: "100%", minHeight: 300, borderRadius: 10 }}
            placeholder={blurHash}
            contentFit="cover"
            transition={200}
          />
        )}
        <ThreadActions />
        <ThreadFooter likes={thread.likesCount} replies={thread.repliesCount} />
      </View>
    </View>
  );
};

const ThreadLeftSide = (thread: Thread) => {
  const theme = useColorScheme();
  const borderColor = theme === "dark" ? "#ffffff50" : "#00000050";

  return (
    <View style={{ justifyContent: "space-between" }}>
      <Image
        source={thread.author.photo}
        style={styles.image}
        placeholder={blurHash}
        contentFit="cover"
        transition={500}
      />
      <View
        style={{
          borderWidth: 1,
          alignSelf: "center",
          borderColor,
          flexGrow: 1,
        }}
      />
      <View
        style={{
          width: 20,
          alignItems: "center",
          alignSelf: "center",
          gap: 3,
        }}
      >
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            source={thread.replies?.[index - 1]?.author.photo}
            style={{ width: index * 9, height: index * 9, borderRadius: 15 }}
            placeholder={blurHash}
            contentFit="cover"
            transition={500}
          />
        ))}
      </View>
    </View>
  );
};

const ThreadHeading = ({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
        {verified && (
          <MaterialIcons name="verified" size={14} color="#60a4fa" />
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ color: "gray" }}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
};

const ThreadActions = () => {
  const iconSize = 20;
  const theme = useColorScheme();
  const iconColor = theme === "dark" ? "lightgray" : "darkgray";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} />
      <AntDesign name="retweet" size={iconSize} color={iconColor} />
      <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      <Feather name="send" size={iconSize} color={iconColor} />
    </View>
  );
};

const ThreadFooter = ({
  replies,
  likes,
}: {
  replies: number;
  likes: number;
}) => {
  return (
    <Text style={{ color: "gray" }}>
      {replies > 0 && `${replies} replies • `}
      {likes > 0 && `${likes} likes`}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default ThreadItem;
