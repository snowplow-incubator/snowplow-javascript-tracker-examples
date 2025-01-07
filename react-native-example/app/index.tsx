import { Button, Text, View } from "react-native";
import {
  trackPageView,
  trackScreenView,
  trackScrollChanged,
  trackStructEvent,
  trackProductViewEvent,
  trackTransactionEvent,
} from "./tracking";
import { useEffect } from "react";
import { WebView } from "react-native-webview";
import { getWebViewCallback } from "@snowplow/react-native-tracker";
import { Dimensions } from "react-native";

const webViewEndpoint = "";

export default function Index() {
  useEffect(() => {
    trackScreenView("Home");
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Basic Events</Text>
      <Button
        onPress={trackStructEvent}
        title="Track a structured event"
      ></Button>
      <Button onPress={trackPageView} title="Track a page view event"></Button>
      <Button
        onPress={() => trackScreenView("Other")}
        title="Track a screen view event"
      ></Button>
      <Button
        onPress={() => trackScrollChanged()}
        title="Track a scroll changed event"
      ></Button>
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
        E-commerce Events
      </Text>
      <Button
        onPress={() => trackProductViewEvent()}
        title="Track a product view"
      ></Button>
      <Button
        onPress={() => trackTransactionEvent()}
        title="Track a transaction"
      ></Button>

      {webViewEndpoint ? (
        <WebView
          onMessage={getWebViewCallback()}
          source={{ uri: webViewEndpoint }}
          style={{
            width: Dimensions.get("window").width,
          }}
        />
      ) : null}
    </View>
  );
}
