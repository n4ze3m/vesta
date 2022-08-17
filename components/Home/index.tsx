import { Container, Button } from "@mantine/core";
import CommonKeepDnd from "components/Common/CommonDnd";
import KeepLoading from "components/Common/Loading";
import React from "react";
import CreateKeep from "./CreateVestModal";

export default function DashboardHome({ status, data }: any) {
  const [opened, setOpened] = React.useState(false);

  return (
    <Container>
      <CreateKeep opened={opened} onClose={() => setOpened(false)} />
      {status === "loading" && <KeepLoading />}

      {status === "success" && (
        <>
          <Button
            onClick={() => setOpened(true)}
            fullWidth
            variant="outline"
            color="gray"
          >
            Click to add a link or a note
          </Button>
          <br />
          <CommonKeepDnd type="inbox" data={data!} />
        </>
      )}
    </Container>
  );
}
