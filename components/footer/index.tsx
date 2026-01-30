"use client";

import { Box, Flex, Text, Link, IconButton, Stack } from "@chakra-ui/react";
import { FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  const colors = {
    primary: "#6366F1",
    text: "#0F172A",
    secondaryText: "#475569",
  };

  return (
    <Box
      mt="120px"
      bg="linear-gradient(to bottom, #FFFFFF 0%, #F3F0FF 100%)"
      py="60px"
      px="20px"
    >
      {/* CONTENT WRAPPER */}
      <Flex
        maxW="1400px"
        mx="auto"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={{ base: "40px", md: "0px" }}
      >
        {/* COLUMN 1 – BRAND */}
        <Box maxW="300px">
          <Text fontSize="28px" fontWeight="bold" color={colors.text}>
            TailorCV
          </Text>
          <Text mt="10px" fontSize="16px" color={colors.secondaryText}>
            A simple hiring workflow that keeps candidates organized by stage, owner, and next step so your team can move faster and decide with confidence.
          </Text>

          <Text mt="20px" fontSize="14px" color={colors.secondaryText}>
            © {new Date().getFullYear()} TailorCV. All rights reserved.
          </Text>
        </Box>

        {/* COLUMN 2 – PRODUCT */}
        <Box>
          <Text fontSize="20px" fontWeight="semibold" color={colors.text}>
            Product
          </Text>

          <Stack mt="16px" fontSize="16px">
            <Link color={colors.secondaryText} _hover={{ color: colors.primary }}>
              Pipeline
            </Link>
            <Link color={colors.secondaryText} _hover={{ color: colors.primary }}>
              Interviews
            </Link>
            <Link color={colors.secondaryText} _hover={{ color: colors.primary }}>
              Pricing
            </Link>
            <Link color={colors.secondaryText} _hover={{ color: colors.primary }}>
              FAQ
            </Link>
          </Stack>
        </Box>

        {/* COLUMN 3 – RESOURCES */}
        <Box>
          <Text fontSize="20px" fontWeight="semibold" color={colors.text}>
            Resources
          </Text>

          <Stack mt="16px" fontSize="16px">
            <Link color={colors.secondaryText} _hover={{ color: colors.primary }}>
              Hiring Guide
            </Link>
            <Link color={colors.secondaryText} _hover={{ color: colors.primary }}>
              Interview Questions
            </Link>
            <Link color={colors.secondaryText} _hover={{ color: colors.primary }}>
              Support
            </Link>
            <Link color={colors.secondaryText} _hover={{ color: colors.primary }}>
              Blog (coming soon)
            </Link>
          </Stack>
        </Box>

        {/* COLUMN 4 – CONTACT */}
        <Box>
          <Text fontSize="20px" fontWeight="semibold" color={colors.text}>
            Contact Us
          </Text>

          <Stack mt="16px" fontSize="16px">
            <Text color={colors.secondaryText}>support@tailorcv.ai</Text>
            <Text color={colors.secondaryText}>+1 (415) 555-0132</Text>
            <Text color={colors.secondaryText}>Antalya, Turkey</Text>
          </Stack>

          {/* SOCIAL ICONS */}
          <Flex mt="20px" gap="12px">
            <IconButton
              aria-label="LinkedIn"
              bg="#ffffff"
              borderRadius="full"
              boxShadow="md"
              _hover={{ bg: "#EEF2FF", color: colors.primary }}
            >
                <FiLinkedin size={20} />
            </IconButton>

            <IconButton
              aria-label="Twitter"
              bg="#ffffff"
              borderRadius="full"
              boxShadow="md"
              _hover={{ bg: "#EEF2FF", color: colors.primary }}
            >
                <FiTwitter size={20} />
            </IconButton>

            <IconButton
              aria-label="Instagram"
              bg="#ffffff"
              borderRadius="full"
              boxShadow="md"
              _hover={{ bg: "#EEF2FF", color: colors.primary }}
            >
                <FiInstagram size={20} />
            </IconButton>
          </Flex>
        </Box>
      </Flex>

      {/* BOTTOM BADGE */}
      <Text
        textAlign="center"
        fontSize="14px"
        mt="50px"
        opacity={0.6}
        color={colors.text}
      >
        Made by Thyred
      </Text>
    </Box>
  );
}
