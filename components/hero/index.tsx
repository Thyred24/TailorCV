"use client"

import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import Button from "../ui/button"
import { useRouter } from "next/navigation";

function Hero() {

    const shadows = {
        card: "0px 4px 5px -2px rgba(0,0,0,0.25)",
    };
    const radius = {
        m: "16px",
        l: "24px",
        xl: "32px",
    };

    const colors = {
        primary: "#6366F1",
        text: "#0F172A",
        secondaryText: "#7688a2",
        ghostText: "#b8bdc6",
    };

    const oliviaCarterData = {
  name: "OOlivia Carter",
  title: "HHammond Chair Professor of Cognitive Linguistics",

  contact: {
    address: "SStanford University, 450 Serra Mall, Stanford, CA 94305, USA",
    phone: "(650) 555-9821",
    email: "o.carter@stanford.edu",
    linkedin: "https://linkedin.com/in/oliviacarter",
    twitter: "https://twitter.com/profocarter"
  },

  bio: `Prof. Carter is a cognitive linguist whose research explores how language shapes thought, memory formation, and decision-making. With over 15 years of teaching and research experience, her work bridges linguistics, psychology, and computational modeling. She has published extensively on semantic cognition and leads multiple interdisciplinary research projects focused on language-driven reasoning patterns.`,

  education: [
    {
      years: "2011–2016",
      institution: "Harvard University, Cambridge, MA",
      degree: "PhD in Cognitive Linguistics",
      department: "Department of Linguistics",
      dissertation:
        "Semantic Frames and Human Decision-Making: A Computational Study",
      details: [
        "Advisor: Prof. Jonathan Marks",
        "Research focus in cognitive semantics, neural language modeling, and conceptual metaphor theory",
        "Teaching Fellow for “Introduction to Linguistic Theory” and “Language & Mind”"
      ]
    },
    {
      years: "2009–2011",
      institution: "University of Toronto, Toronto, ON",
      degree: "MA in Linguistics",
      thesis: "Cross-Lingual Variation in Categorical Perception",
      details: [
        "Conducted cross-cultural psycholinguistic experiments",
        "Presented findings at NAPHLA 2011",
        "Graduate assistant in the Language Processing Lab"
      ]
    },
    {
      years: "2005–2009",
      institution: "University of Washington, Seattle, WA",
      degree: "BA in Psychology & Linguistics",
      details: [
        "Graduated with Honors",
        "President of Linguistics Society",
        "Awarded Undergraduate Research Fellowship, 2007"
      ]
    }
  ],

  professionalAppointments: [
    {
      years: "2021–present",
      position: "Hammond Chair Professor of Cognitive Linguistics",
      institution: "Stanford University",
      responsibilities: [
        "Leads interdisciplinary research group on semantic cognition and neural reasoning patterns",
        "Supervises PhD and Master’s researchers",
        "Coordinates annual Stanford Cognitive & Language Symposium"
      ]
    },
    {
      years: "2016–2021",
      position: "Assistant Professor of Linguistics",
      institution: "University of Colorado Boulder",
      responsibilities: [
        "Taught graduate courses in cognitive semantics, research methodology, and linguistic data analysis",
        "Managed NSF-funded project on metaphor comprehension in bilingual speakers"
      ]
    }
  ],

  books: [
    {
      year: 2022,
      title: "Language and the Mind’s Architecture",
      publisher: "Princeton University Press"
    },
    {
      year: 2018,
      title: "Patterns of Thought: How Language Shapes Human Reasoning",
      publisher: "MIT Press"
    },
    {
      year: 2016,
      title: "Frames We Live By: A Study of Semantic Structures in Modern Communication",
      publisher: "Oxford University Press"
    }
  ],

  publications: [
    {
      year: 2024,
      title:
        "Neural Correlates of Framing Effects in Multilingual Speakers.",
      journal: "Journal of Cognitive Neuroscience"
    },
    {
      year: 2021,
      title:
        "Modeling Conceptual Metaphors in Neural Language Systems.",
      journal: "Cognitive Science Review"
    },
    {
      year: 2019,
      title:
        "Semantic Priming in Decision-Making Tasks: A Cross-Lingual Study.",
      journal: "Linguistic Inquiry"
    }
  ],

  grantsAndAwards: [
    "NSF Cognitive Systems Grant, 2023",
    "Stanford Interdisciplinary Innovation Award, 2022",
    "Early Career Research Excellence Award, 2019",
    "ACL Outstanding Paper Award, 2018"
  ]
};

function useTypewriter(text: string, speed = 40) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplay("");

    const interval = setInterval(() => {
      setDisplay((prev) => prev + text.charAt(i));
      i += 1;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return display;
}

const nameTyped = useTypewriter(oliviaCarterData.name, 35);
const titleTyped = useTypewriter(oliviaCarterData.title, 25);
const addressTyped = useTypewriter(oliviaCarterData.contact.address, 45);
const phoneTyped = useTypewriter(oliviaCarterData.contact.phone, 45);
const emailTyped = useTypewriter(oliviaCarterData.contact.email, 45);
const bioTyped = useTypewriter(oliviaCarterData.bio, 10);

const MotionBox = motion(Box);

const router = useRouter();

  return (
    <Box maxW="1400px" mx="auto" position="relative" top="120px" h="100vh">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
            <Box p="8px 24px" bg="white" boxShadow={shadows.card} borderRadius={radius.m} w="max-content">
                <Flex gap="10px" alignItems="center" >
                    <Image src="/icon/magicpen.svg" alt="Logo" />
                    <Text color={colors.primary} fontSize="12px">Hiring pipeline for modern teams</Text>
                </Flex>
            </Box>
            <Box maxW="660px" mt="40px">
                <Text fontSize="60px" fontWeight="bold" color="gray.800">
                    Hire the right person faster All candidates and interviews in one place{" "}
                    <Text as="span" background="linear-gradient(to right, #6366F1 0%, #A855F7 100%)" backgroundClip="text" color="transparent">
                        Clear Next Steps
                    </Text>
                </Text>
                <Text fontSize="22px" mt="20px" color={colors.secondaryText}>Track every candidate by stage, assign owners, and keep next steps clear. Collect structured feedback and make confident decisions.</Text>
            </Box>
            <Box position="absolute" mt="40px">
                <Flex gap="20px" >
                    <Button variantType="primary">
                        <Flex justifyContent="center" gap="10px" alignItems="center" w="250px" >
                            <Image src="/icon/magicpenwhite.png" alt="Logo" />
                            <Text>Start Free</Text>
                        </Flex>
                    </Button>
                    <Button variantType="secondary" w="250px" onClick={() => router.push("/dashboard")}>
                        View Demo
                    </Button>
                </Flex>
                <Box mt="20px" textAlign="center" position="absolute" left="50%" transform="translateX(-50%)" minW="300px" >
                    <Text fontSize="12px" color={colors.ghostText}>No credit card required. Set up your pipeline in minutes.</Text>
                </Box>
            </Box>
        </Box>
        <Box maxW="660px" bgGradient="linear-gradient(to bottom, #fff 0%, transparent 100%)" borderRadius={radius.m} p="40px">
            <Box>
                <Text fontSize="24px" fontWeight="bold" color={colors.primary}>{nameTyped}</Text>
                <Text fontSize="16px" fontWeight="semibold" color={colors.text}>{titleTyped}</Text>
            </Box>
            <Box mt="10px">
                <Text fontSize="12px" color={colors.text}>{addressTyped}</Text>
                <Text fontSize="12px" color={colors.text}>{phoneTyped}</Text>
                <Text fontSize="12px" color={colors.text}>{emailTyped}</Text>
            </Box>
            <Box mt="10px">
                <Text fontSize="12px" color={colors.text}>{bioTyped}</Text>
            </Box>
            <Flex mt="10px" gap="50px" opacity="0.6" >
                <Box  fontWeight="semibold">
                    <Text fontSize="12px" color={colors.text}>{oliviaCarterData.education[0].years}</Text>
                    <Text fontSize="12px" color={colors.text}>{oliviaCarterData.education[0].institution}</Text>
                </Box>
                <Box >
                    <Text fontSize="12px" color={colors.text}>{oliviaCarterData.education[0].degree}</Text>
                    <Text fontSize="12px" color={colors.text}>{oliviaCarterData.education[0].department}</Text>
                    <Text fontSize="12px" color={colors.text}>{oliviaCarterData.education[0].dissertation}</Text>
                    <Text fontSize="12px" color={colors.text}>{oliviaCarterData.education[0].details}</Text>
                </Box>
            </Flex>
            <Flex mt="10px" gap="30px" >
                <Box mt="10px">
                <Text opacity="0.4" fontSize="12px" color={colors.text}>{oliviaCarterData.books[0].year}</Text>
                <Text opacity="0.2" fontSize="12px" color={colors.secondaryText}>{oliviaCarterData.books[0].title}</Text>
                <Text opacity="0.2" fontSize="12px" color={colors.secondaryText}>{oliviaCarterData.books[0].publisher}</Text>
            </Box>
            <Box mt="10px">
                <Text opacity="0.4" fontSize="12px" color={colors.text}>{oliviaCarterData.publications[1].year}</Text>
                <Text opacity="0.2" fontSize="12px" color={colors.secondaryText}>{oliviaCarterData.publications[1].title}</Text>
                <Text opacity="0.2" fontSize="12px" color={colors.secondaryText}>{oliviaCarterData.publications[1].journal}</Text>
            </Box>
            </Flex>
            <Box mt="10px">
                <Text opacity="0.1" fontSize="12px"  color={colors.text}>{oliviaCarterData.grantsAndAwards[0]}</Text>
                <Text opacity="0.1" fontSize="12px"  color={colors.text}>{oliviaCarterData.grantsAndAwards[1]}</Text>
            </Box>
            <Box position="absolute" left="87%" transform="translateX(-50%)" top="5%" zIndex="10" >
                <Image src="/img/profile.png" alt="Logo" />
            </Box>
            <MotionBox
                position="absolute"
                left="78%"
                transform="translateX(-50%)"
                top="1%"
                w="250px"
                h="250px"
                borderRadius="full"
                bg="transparent"
                bgImage="radial-gradient(circle, rgba(101, 101, 241, 0) 0%, rgba(102, 102, 241, 0.5) 100%)"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            />
            <MotionBox
                position="absolute"
                left="76%"
                transform="translateX(-50%)"
                top="-2%"
                w="300px"
                h="300px"
                borderRadius="full"
                bg="transparent"
                bgImage="radial-gradient(circle, rgba(101, 101, 241, 0) 0%, rgba(102, 102, 241, 0.2) 100%)"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            />
            <MotionBox
                position="absolute"
                left="74%"
                transform="translateX(-50%)"
                top="-4%"
                w="350px"
                h="350px"
                borderRadius="full"
                bg="transparent"
                bgImage="radial-gradient(circle, rgba(101, 101, 241, 0) 0%, rgba(102, 102, 241, 0.05) 100%)"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            />
        </Box>
        <MotionBox 
          display="flex" 
          position="absolute" 
          left="55%" 
          transform="translateX(-50%)" 
          top="15%" 
          gap="5px" 
          bg="white" 
          borderRadius={radius.l} 
          p="10px 20px" 
          boxShadow={shadows.card} 
          border="1px solid #6366F1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transform: "translateX(-30px)" }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
            <Text as="span" fontSize="24px" fontWeight="bold" background="linear-gradient(to right, #6366F1 0%, #A855F7 100%)" backgroundClip="text" color="transparent">
                3
            </Text>
            <Text fontSize="24px" color={colors.text}>Overdue Steps</Text>
        </MotionBox>
        <MotionBox 
          position="absolute" 
          left="95%" 
          transform="translateX(-50%)" 
          top="30%" 
          bg="linear-gradient(to right, #6366F1 0%, #A855F7 100%)" 
          borderRadius={radius.l} 
          p="10px 20px" 
          boxShadow={shadows.card} 
          border="1px solid #6366F1" 
          w="300px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transform: "translateX(-200px)" }}
          transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
        >
            <Flex gap="10px" alignItems="center" minW="250px">
                <Image src="/icon/gps.png" alt="Logo" />
                <Text fontSize="24px" fontWeight="semibold" color="white">Scorecards Ready</Text>
            </Flex>
            <Text fontSize="12px" color="gray.200">Feedback collected from 3 reviewers</Text>
        </MotionBox>
        <MotionBox 
          position="absolute" 
          color={colors.text} 
          left="55%" 
          transform="translateX(-50%)" 
          top="40%" 
          bg="white" 
          borderRadius={radius.l} 
          p="10px 20px" 
          boxShadow={shadows.card} 
          border="1px solid #6366F1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transform: "translateX(-30px)" }}
          transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
        >
            <Text fontSize="18px" fontWeight="semibold">
                Next Step
            </Text>
            <Box mt="10px">
                <Flex gap="10px" alignItems="center">
                    <Box w="8px" h="8px" borderRadius="full" bg="linear-gradient(to right, #6366F1 0%, #A855F7 100%)"></Box>
                    <Text fontSize="14px">Schedule Interview</Text>
                </Flex>
                <Flex gap="10px" alignItems="center">
                    <Box w="8px" h="8px" borderRadius="full" bg="linear-gradient(to right, #6366F1 0%, #A855F7 100%)"></Box>
                    <Text fontSize="14px">Assign Owner</Text>
                </Flex>
            </Box>
        </MotionBox>
      </Flex>
    </Box>
  )
}

export default Hero
