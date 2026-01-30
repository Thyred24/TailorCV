"use client"

import { Box, Text, Flex, IconButton } from '@chakra-ui/react'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { useState } from 'react'

function Faq() {

    const faq = [
        {
            question: "What is TailorCV?",
            answer: "TailorCV is a hiring workflow system that helps your team manage candidates in one place, move them through clear stages, and make consistent decisions with structured interviews and feedback."
        },
        {
            question: "How does the pipeline work?",
            answer: "Each candidate moves through stages like Applied, Screening, InReview, Interview, Offer, and Rejected. Every stage shows what is next, who owns it, and when it last changed, so you do not lose time asking basic status questions."
        },
        {
            question: "What does next step and overdue mean?",
            answer: "Next step tells the team what should happen now. Due dates and overdue signals make delays visible so candidates do not get stuck and cool off while waiting."
        },
        {
            question: "How do interviews and scorecards work?",
            answer: "Interviews are treated as a real process step, not just a calendar event. You can track type, time, interviewers, preparation checklist, and whether feedback is still pending or submitted. When feedback is missing, it stays visible so decisions do not stall."
        },
        {
            question: "Is my data private and secure?",
            answer: "Candidate data is private inside your workspace. You control who can view candidates, leave feedback, and manage stages, so access stays limited to the right people."
        }
    ]

    const colors = {
        primary: "#6366F1",
        text: "#0F172A",
        secondaryText: "#7688a2",
        ghostText: "#b8bdc6",
      };
      const radius = {
        xl: "32px",
      };

      const [openIndex, setOpenIndex] = useState<number | null>(null)

    const handleToggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index))
    }

  return (
    <Box mt="100px" maxWidth="1400px" mx="auto">
      <Box textAlign="center">
        <Text fontSize="48px" fontWeight="semibold" color={colors.text}>
          Frequently Asked Questions
        </Text>
        <Text fontSize="24px" color={colors.secondaryText} maxW="900px" mx="auto">
          Clear answers before you set up your hiring pipeline. TailorCV is built to keep stage, next step, owner, and last activity visible so your team moves faster with less chaos
        </Text>
      </Box>

      <Box mt="40px" bg="white" p="40px" borderRadius={radius.xl} boxShadow="0px 0px 10px 1px rgba(99, 102, 241, 0.25)">
        {faq.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <Box key={index} py="12px">
              <Flex justifyContent="space-between" alignItems="center" gap="16px">
                <Text
                  fontSize="20px"
                  fontWeight="semibold"
                  color={colors.text}
                >
                  {item.question}
                </Text>

                <IconButton
                  aria-label={isOpen ? "Close answer" : "Open answer"}
                  bg={isOpen ? "linear-gradient(to right, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)" : "linear-gradient(to right, rgba(99, 102, 241, 1) 0%, rgba(168, 85, 247, 1) 100%)"}
                  color={isOpen ? "rgba(99, 102, 241, 1)" : "white"}
                  borderRadius="8px"
                  minW="40px"
                  h="40px"
                  onClick={() => handleToggle(index)}
                >
                    {isOpen ? <FiMinus /> : <FiPlus />}
                </IconButton>
              </Flex>

              <Box display={isOpen ? "block" : "none"}>
                <Text
                  fontSize="18px"
                  color={colors.secondaryText}
                  mt="8px"
                >
                  {item.answer}
                </Text>
              </Box>

              <Box h="1px" bg={colors.ghostText} mt="16px" />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Faq
