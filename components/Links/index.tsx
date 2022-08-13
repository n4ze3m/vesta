import { Container} from "@mantine/core";
import React from "react";
import { useGetKeepsWithTypeQuery } from "graphql/generated/graphql";
import { useLocalStorage } from "@mantine/hooks";
import KeepLoading from "components/Common/Loading";
import CommonKeepDnd from "components/Common/CommonDnd";

export default function DashboardLink() {
  const [userId] = useLocalStorage({
    key: "userId",
  });

  const { data, isLoading } = useGetKeepsWithTypeQuery(
    {
      userId: userId,
      keep_type: "link",
    },
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Container>
      {isLoading && <KeepLoading />}

      {!isLoading && <CommonKeepDnd type="link" data={data!} />}
    </Container>
  );
}
