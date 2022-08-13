import { Anchor, Button, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { Puzzle } from "tabler-icons-react";

export default function BrowserButton() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();

  const [userId] = useLocalStorage({
    key: "userId",
  });

  const checkBroswerConfig = () => {
    if (window !== undefined) {
      try {
        chrome.runtime.sendMessage(
          "padcmadjpiaojlpieildhchmlpbcponf",
          { method: "connected" },
          function (response) {
            if (!window.chrome.runtime.lastError) {
              if (response) {
                setIsConnected(response.message);
              } else {
                setErrorMessage(
                  "It seems you don't have the extension installed. Please install it and try again."
                );
              }
            } else {
              setErrorMessage(
                "It seems you don't have the extension installed. Please install it and try again."
              );
            }
          }
        );
      } catch (e) {
        setErrorMessage(
          "Unable to find the extension. Please install it and try again."
        );
      }
      if (errorMessage) {
        throw new Error(errorMessage);
      }
    }
    return isConnected;
  };

  const { isLoading, isError, data, error } = useQuery<boolean, Error>(
    "browserConfig",
    checkBroswerConfig,
    {}
  );

  const onClick = async () => {
    chrome.runtime.sendMessage(
      "padcmadjpiaojlpieildhchmlpbcponf",
      { method: "connect", token: userId },
      function (response) {
        setIsConnected(response.message);
      }
    );
    return true;
  };

  const { mutate: connect, isLoading: isConnecting } = useMutation(onClick);
  return (
    <div>
      <Button
        leftIcon={<Puzzle />}
        color="teal"
        size="xs"
        loading={isLoading || isConnecting}
        loaderPosition={isConnecting ? "right" : "left"}
        disabled={data || isError || isConnected}
        onClick={() => connect()}
      >
        {isLoading
          ? "We are checking for the extension"
          : !isConnected
          ? "Connect to Keeppt"
          : "Connected to Keeppt"}
      </Button>
      {isError && (
        <Text mt="sm" color="red" size="sm">
          {error?.message}
        </Text>
      )}
      {isConnected && (
        <Text mt="sm" color="green" size="sm">
          Browser extension is connected with Keeppt.
        </Text>
      )}
      {!isConnected && (
        <Text mt="sm" size="sm">
          Install keeppt chrome extension from{" "}
          <Anchor
            href="https://chrome.google.com/webstore/detail/keeppt/padcmadjpiaojlpieildhchmlpbcponf"
            target="_blank"
          >
            Chrome Web Store
          </Anchor>
          .
        </Text>
      )}
    </div>
  );
}
