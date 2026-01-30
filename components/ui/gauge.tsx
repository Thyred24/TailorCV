"use client";

import { Box } from "@chakra-ui/react";

type GaugeProps = {
  // 0 ile 100 arası skor
  value?: number;
};

const Gauge: React.FC<GaugeProps> = ({ value = 50 }) => {
  const clamped = Math.min(100, Math.max(0, value));
  // 0 → 100 degeri   -90 → 90 dereceye mapleniyor
  const angle = -90 + (clamped / 100) * 180;

  return (
    <Box position="relative" w="100px" h="50px">
      {/* Yarım daire (gradientli) */}
      <Box
        as="svg"
        w="100%"
        h="100%"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F97373" />    {/* kırmızı */}
            <stop offset="50%" stopColor="#FACC15" />   {/* sarı */}
            <stop offset="100%" stopColor="#22C55E" />  {/* yeşil */}
          </linearGradient>
        </defs>

        {/* Yarım daire yay */}
        <path
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </Box>

      {/* İbre */}
      <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform={`translateX(-50%) rotate(${angle}deg)`}
        transformOrigin="bottom center"
        w="0"
        h="0"
        borderLeft="4px solid transparent"
        borderRight="4px solid transparent"
        borderBottom="30px solid #6366F1" // mor ibre
      />

      {/* İbrenin yuvarlak merkezi */}
      <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform="translateX(-50%) translateY(4px)"
        w="14px"
        h="14px"
        borderRadius="full"
        bg="white"
        border="3px solid #6366F1"
      />
    </Box>
  );
};

export default Gauge;
