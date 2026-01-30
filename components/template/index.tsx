"use client";

import { Box, Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../ui/button";

function Template() {
  const colors = {
    primary: "#6366F1",
    text: "#0F172A",
    secondaryText: "#7688a2",
    ghostText: "#b8bdc6",
  };

  const templates = [
    { id: 1, image: "/img/template1.png" },
    { id: 2, image: "/img/template2.png" },
    { id: 3, image: "/img/template3.png" },
    { id: 4, image: "/img/template4.png" },
    { id: 5, image: "/img/template5.png" },
    { id: 6, image: "/img/template6.png" },
    { id: 7, image: "/img/template7.png" },
  ];

  const VISIBLE_COUNT = 5;

  const [startIndex, setStartIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const maxStartIndex = Math.max(0, templates.length - VISIBLE_COUNT);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  const visibleTemplates = templates.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  return (
    <Box mx="auto" mt="100px" maxWidth="1800px">
      <Box textAlign="center">
        <Text fontSize="48px" fontWeight="semibold" color={colors.text}>
          Choose Your Perfect Template
        </Text>
        <Text
          fontSize="24px"
          mt="10px"
          color={colors.secondaryText}
          maxW="900px"
          mx="auto"
        >
          Explore professional, creative, and minimal designs tailored for every
          career field, optimized for ATS and powered by AI styling.
        </Text>
      </Box>

      <Flex justifyContent="space-between" overflowX="scroll" position="relative" mt="40px" css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none", // IE & Edge
        "scrollbar-width": "none", // Firefox
      }}>
        <IconButton
          aria-label="Previous templates"
          borderRadius="full"
          bg="rgba(99, 102, 241, 1)"
          color="white"
          onClick={handlePrev}
          position="absolute"
          left="2%"
          top="50%"
          zIndex="111"
        >
          <FiChevronLeft />
        </IconButton>

        {visibleTemplates.map((template, i) => {
          const isFirst = i === 0;
          const isLast = i === visibleTemplates.length - 1;
          const isHovered = hoveredId === template.id;

          return (
            <Box
              key={template.id}
              role="group"
              p="11px"
              bg="white"
              borderRadius="xl"
              position="relative"
              transition=" all 0.3s ease"
              _hover={{
                cursor: "pointer",
                bg: "rgba(99, 102, 241, 0.1)",
                transition: " all 0.3s ease",
              }}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                WebkitMaskImage: isFirst
                  ? "linear-gradient(to right, transparent 0%, black 60%, black 100%)"
                  : isLast
                  ? "linear-gradient(to left, transparent 0%, black 60%, black 100%)"
                  : "none",
                maskImage: isFirst
                  ? "linear-gradient(to right, transparent 0%, black 60%, black 100%)"
                  : isLast
                  ? "linear-gradient(to left, transparent 0%, black 60%, black 100%)"
                  : "none",
              }}
            >
              <Image
                src={template.image}
                alt={`template${template.id}`}
                borderRadius="lg"
              />

              <Button
                variantType="primary"
                size="sm"
                position="absolute"
                bottom="10px"
                left="50%"
                transform={
                  isHovered
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(8px)"
                }
                zIndex={2}
                opacity={isHovered ? 1 : 0}
                pointerEvents={isHovered ? "auto" : "none"}
                transition="all 0.25s ease"
              >
                Use This Template
              </Button>
            </Box>
          );
        })}

        <IconButton
          aria-label="Next templates"
          borderRadius="full"
          bg="rgba(99, 102, 241, 1)"
          color="white"
          onClick={handleNext}
          position="absolute"
          right="2%"
          top="50%"
          zIndex="111"
        >
          <FiChevronRight />
        </IconButton>
      </Flex>
    </Box>
  );
}

export default Template;
