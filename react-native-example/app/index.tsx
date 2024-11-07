import { Button, Text, View } from "react-native";
import { trackPageView, trackStructEvent } from "./tracking";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    trackPageView();
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        <Button
          onPress={trackStructEvent}
          title="Track a structured event"
        ></Button>
      </Text>
    </View>
  );
}
