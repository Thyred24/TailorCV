import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

type DonutItem = { label: string; value: number; color: string };

function buildSegments(items: DonutItem[], startAt = 270) {
  const total = items.reduce((a, i) => a + i.value, 0);

  let cursor = startAt;

  return items.map((item) => {
    const sweep = total === 0 ? 0 : (item.value / total) * 360;
    const segment = {
      ...item,
      startAngle: cursor,
      sweep,
      total,
    };
    cursor += sweep;
    return segment;
  });
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  sweepAngle: number
) {
  const endAngle = startAngle + sweepAngle;
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = sweepAngle > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export function MiniDonutPipeline({
  items,
  size = 56,
  thickness = 5,
  trackColor = "#EEF2FF",
  defaultCenterText = "Pipeline",
}: {
  items: DonutItem[];
  size?: number;
  thickness?: number;
  trackColor?: string;
  defaultCenterText?: string;
}) {
  const [hovered, setHovered] = React.useState<string | null>(null);

  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;


  const segments = React.useMemo(() => buildSegments(items, 270), [items]);


  return (
    <Box position="relative" w={`${size}px`} h={`${size}px`}>
      <Box as="svg" w={`${size}px`} h={`${size}px`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
        />

        {segments.map((seg) => {
      const d = arcPath(cx, cy, r, seg.startAngle, seg.sweep);

      return (
        <path
          key={seg.label}
          d={d}
          fill="none"
          stroke={seg.color}
          strokeWidth={thickness}
          strokeLinecap="round"
          cursor="pointer"
          onMouseEnter={() => setHovered(seg.label)}
          onMouseLeave={() => setHovered(null)}
        >
          <title>{`${seg.label}: ${seg.value}`}</title>
        </path>
      );
    })}
      </Box>

      <Center position="absolute" inset="0">
        <Text fontSize="11px" fontWeight="700" color="gray.800" textAlign="center" px="6px">
          {hovered ?? defaultCenterText}
        </Text>
      </Center>
    </Box>
  );
}
