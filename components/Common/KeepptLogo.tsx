import React from "react";
import { useMantineTheme } from "@mantine/core";

interface VestaLogoProps extends React.ComponentPropsWithoutRef<"svg"> {
  variant?: "white" | "default";
  width?: number;
}

export function VestaLogo({
  variant = "default",
  width = 110,
  ...others
}: VestaLogoProps) {
  const theme = useMantineTheme();
  return (
    <svg
      {...others}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 623 163"
      width={width}
    >
      <path
        fill={
          variant === "white" ? "#FFF" : theme.colors[theme.primaryColor][6]
        }
        d="M437 3178c-9-2204-9-2928 1-2928 6 0 141 112 420 349 63 53 132 111 155 129 23 19 53 43 67 55s52 44 85 72c33 27 92 77 130 110 39 34 84 72 101 86 37 29 207 171 214 179 17 18 109 90 116 90 5 0 20-10 34-23 14-12 52-45 86-72 62-51 419-350 440-370 7-5 58-49 115-97 276-230 458-383 502-419l47-40v3310l-982 3-983 3-75 23c-155 48-272 134-334 246-90 161-59 344 80 478 56 53 147 105 239 136l80 27 988 3c861 2 987 4 987 17s81 15 620 15h620V3073c0-993 4-1500 10-1525 42-149 236-169 319-34l21 34-2 1588-3 1589-25 37c-32 47-60 63-143 82-59 14-165 16-743 16-443 0-674 3-674 10s-424 10-1253 10H443l-6-1702z"
        transform="matrix(.1 0 0 -.1 0 512)"
      ></path>
      <path
        fill={
          variant === "white" ? "#FFF" : theme.colors[theme.primaryColor][6]
        }
        d="M852 4190c-36-22-68-69-78-113-4-20 2-44 20-82 21-42 36-58 70-74 42-21 48-21 1348-21h1305l6-212c4-116 7-789 7-1495 0-1397-3-1319 56-1375 77-72 194-59 260 28l29 37v3204l-28 36c-16 21-47 47-70 60l-42 22-1425 3c-1409 2-1425 2-1458-18z"
        transform="matrix(.1 0 0 -.1 0 512)"
      ></path>
    </svg>
  );
}
