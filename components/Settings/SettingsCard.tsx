import { Card, Text, Divider, DefaultMantineColor  } from "@mantine/core";
import React from "react";

type Props = {
  title: string;
  color?: DefaultMantineColor;
  component?: React.ReactNode;
};

export default function SettingsCard(props: Props) {
  return (
    <Card mb="sm">
      <Divider color={props.color} label={props.title} />
      <div className="mt-3">
        {props.component}
      </div>
    </Card>
  );
}
