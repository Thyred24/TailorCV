import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

type MiniRingProps = {
  value: number;            // 0 ile 100
  size?: number;            // px
  thickness?: number;       // px
  color?: string;
  trackColor?: string;
  label?: string;
  labelColor?: string;
};

export function MiniRing({
  value,
  size = 52,
  thickness = 5,
  color = "#8B5CF6",
  trackColor = "#EDE9FE",
  label = "+5%",
  labelColor = "#111827",
}: MiniRingProps) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - v / 100);

  return (
    <Box position="relative" w={`${size}px`} h={`${size}px`}>
      <Box
        as="svg"
        w={`${size}px`}
        h={`${size}px`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="transparent"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Box>

      <Center position="absolute" inset="0">
        <Text fontSize="12px" fontWeight="700" color={labelColor}>
          {label}
        </Text>
      </Center>
    </Box>
  );
}