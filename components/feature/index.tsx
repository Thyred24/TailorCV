"use client"

import { Box, Flex, Text } from '@chakra-ui/react'
import { PiMagicWand } from "react-icons/pi"
import { TbBrain } from "react-icons/tb"
import { HiOutlineTemplate } from "react-icons/hi"
import { BiFile } from "react-icons/bi"
import { BiSitemap } from "react-icons/bi"
import { TbGitBranch } from "react-icons/tb"
import { FiEdit3 } from "react-icons/fi"
import { HiRefresh } from "react-icons/hi"
import { motion } from "framer-motion"

function Feature() {
    const colors = {
        primary: "#6366F1",
        text: "#0F172A",
        secondaryText: "#7688a2",
        ghostText: "#b8bdc6",
    };
    const radius = {
        m: "16px",
        l: "24px",
        xl: "32px",
    };

    const data = [
        {
            title: "Next Step Reminders",
            description: "Set owners and due dates so nothing gets stuck. See what needs attention today in one glance.",
            icon1: PiMagicWand,
            icon2: TbBrain
        },
        {
            title: "Custom Stages for Every Role",
            description: "Create the stages that match your hiring process. View candidates as a board or list and keep everything organized.",
            icon1: HiOutlineTemplate,
            icon2: BiFile
        },
        {
            title: "Interview Scorecards",
            description: "Run consistent interviews with shared questions and scorecards. Collect feedback from reviewers and keep decisions aligned.",
            icon1: BiSitemap,
            icon2: TbGitBranch
        },
        {
            title: "Instant Updates for Everyone",
            description: "Update stages, owners, and next steps in seconds. Everyone sees the latest status instantly.",
            icon1: FiEdit3,
            icon2: HiRefresh
        },
    ]

    
    const MotionBox = motion(Box);
    const MotionCircle = motion(Box);
    const MotionLine = motion(Box);
    const MotionIcon = motion(Box);

  return (
    <Box maxW="1400px" mx="auto" >
      <Box textAlign="center">
        <Text fontSize="48px" fontWeight="semibold" color={colors.text}>
            Everything Your Team Needs to Hire With Clarity
        </Text>
        <Text fontSize="24px" mt="10px" color={colors.secondaryText} maxW="900px" mx="auto">
            TailorCV keeps every candidate moving with clear stages, owners, and next steps. Run consistent interviews, collect feedback, and make decisions faster.
        </Text>
      </Box>
      <Flex justifyContent="space-between" alignItems="center" mt="50px" gap="20px">
  {data.map((item, index) => (
    <MotionBox
      key={index}
      position="relative"
      bg="white"
      borderRadius={radius.xl}
      p="40px 20px"
      role="group"
      whileHover={{
        y: -6,
        boxShadow: "0 18px 40px rgba(99, 102, 241, 0.25)",
      }}
      transition={{ duration: 0.25 }}
    >
      {/* ÜST İKONLAR */}
      <Box>
        <MotionIcon
          bg="rgba(99, 102, 241, 0.3)"
          borderRadius={radius.m}
          p="10px"
          maxW="max-content"
          variants={{
            rest: { x: 0 },
            hover: { x: -6 }
          }}
          transition={{ duration: 0.25 }}
        >
          <item.icon1 size={40} color={colors.primary} />
        </MotionIcon>

        <MotionIcon
          bg="rgba(99, 102, 241, 0.3)"
          borderRadius={radius.m}
          p="10px"
          maxW="max-content"
          ml="240px"
          variants={{
            rest: { x: 0 },
            hover: { x: 6 }
          }}
          transition={{ duration: 0.25 }}
        >
          <item.icon2 size={40} color={colors.primary} />
        </MotionIcon>
      </Box>

      <Text mt="40px" fontSize="20px" fontWeight="semibold" color={colors.text}>
        {item.title}
      </Text>
      <Text mt="5px" fontSize="14px" color={colors.secondaryText}>
        {item.description}
      </Text>

      {/* CIRCLE ANİMASYONLARI */}
      <MotionCircle
        w="60px"
        h="60px"
        bg="#6366F1"
        borderRadius="full"
        border="1px solid rgba(172, 173, 255, 0.43)"
        position="absolute"
        top="21%"
        left="42.5%"
        transform="translateX(-50%)"
        boxShadow="inset 0px 0px 5px 3px rgba(10,10,10,0.14)"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <MotionCircle
        w="120px"
        h="120px"
        borderRadius="full"
        border="1px solid rgba(99, 102, 241, 0.4)"
        position="absolute"
        top="12%"
        left="34%"
        transform="translateX(-50%)"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <MotionCircle
        w="180px"
        h="180px"
        borderRadius="full"
        border="1px solid rgba(99, 102, 241, 0.2)"
        position="absolute"
        top="3%"
        left="25%"
        transform="translateX(-50%)"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ÇİZGİLER VE NOKTALAR */}
      <MotionBox>
        <MotionLine
          w="100px"
          h="2px"
          borderRadius="full"
          bg="linear-gradient(to right, #6366F1 0%, transparent 100%)"
          position="absolute"
          top="30%"
          left="65%"
          transform="translateX(-50%)"
          variants={{
            rest: { opacity: 0.4 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.25 }}
        />

        <MotionCircle
          w="8px"
          h="8px"
          borderRadius="full"
          bg="#6366F1"
          border="1px solid white"
          position="absolute"
          top="29%"
          left="59%"
          variants={{
            rest: { x: 0 },
            hover: { x: 4 }
          }}
          transition={{ duration: 0.25 }}
        />
      </MotionBox>

      <MotionBox>
        <MotionLine
          w="100px"
          h="2px"
          borderRadius="full"
          bg="linear-gradient(to left, #6366F1 0%, transparent 100%)"
          position="absolute"
          top="30%"
          left="27%"
          transform="translateX(-50%)"
          variants={{
            rest: { opacity: 0.4 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.25 }}
        />

        <MotionCircle
          w="8px"
          h="8px"
          borderRadius="full"
          bg="#6366F1"
          border="1px solid white"
          position="absolute"
          top="29%"
          left="41%"
          variants={{
            rest: { x: 0 },
            hover: { x: -4 }
          }}
          transition={{ duration: 0.25 }}
        />
      </MotionBox>
    </MotionBox>
  ))}
</Flex>
    </Box>
  )
}

export default Feature
