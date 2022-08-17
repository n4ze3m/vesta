import { Container, Button } from "@mantine/core";
import React from "react";
import CreateKeep from "./CreateKeepModal";

export default function DashboardHome() {
  const [opened, setOpened] = React.useState(false);



  return (
    <Container>
      <CreateKeep opened={opened} onClose={() => setOpened(false)} />
      {/* {isLoading && <KeepLoading />}

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
      )} */}
    </Container>
  );
}
