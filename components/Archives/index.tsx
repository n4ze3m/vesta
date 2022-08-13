import { Container } from "@mantine/core";
import React from "react";
import { useGetKeepsWithTypeQuery } from "graphql/generated/graphql";
import { useLocalStorage } from "@mantine/hooks";
import KeepLoading from "components/Common/Loading";
import CommonKeepDnd from "components/Common/CommonDnd";

export default function DashboardArchives() {
  const [userId] = useLocalStorage({
    key: "userId",
  });

  const { data, isLoading } = useGetKeepsWithTypeQuery(
    {
      userId: userId,
      keep_type: "archive",
    },
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Container>
      {isLoading && <KeepLoading />}

      {!isLoading && <CommonKeepDnd type="archive" data={data!} />}
    </Container>
  );
}
