import { Container, Button } from "@mantine/core";
import React from "react";
import CreateKeep from "./CreateKeepModal";
import { useGetKeepsWithTypeQuery } from "graphql/generated/graphql";
import { useLocalStorage } from "@mantine/hooks";
import KeepLoading from "components/Common/Loading";
import CommonKeepDnd from "components/Common/CommonDnd";

export default function DashboardHome() {
  const [opened, setOpened] = React.useState(false);

  const [userId] = useLocalStorage({
    key: "userId",
  });

  const { data, isLoading } = useGetKeepsWithTypeQuery(
    {
      userId: userId,
      keep_type: "inbox",
    },
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Container>
      <CreateKeep opened={opened} onClose={() => setOpened(false)} />
      {isLoading && <KeepLoading />}

      {!isLoading && (
        <>
          <Button
            onClick={() => setOpened(true)}
            fullWidth
            variant="outline"
            color="gray"
          >
            Click to add keep
          </Button>
          <br />
          <CommonKeepDnd type="inbox" data={data!} />
        </>
      )}
    </Container>
  );
}
