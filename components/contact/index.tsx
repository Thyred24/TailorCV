import { Box, Flex, Text, Input, Textarea } from '@chakra-ui/react'
import Button from "../ui/button"

function Contact() {
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
  return (
    <Flex maxWidth="1400px" mx="auto" justifyContent="space-between" mt="100px"> 
      <Box maxWidth="660px" justifyContent="center" alignItems="left" display="flex" flexDirection="column">
        <Text fontSize="48px" fontWeight="semibold" color={colors.text}>Talk to the TailorCV Team</Text>
        <Text fontSize="20px" color={colors.secondaryText} maxW="900px" mx="auto" mt="5px">
            Have questions about plans, features, or setting up your hiring workflow? We can help you build a clean pipeline, structure interviews, and keep next steps clear. Reach out anytime.
        </Text>
        <Box mt="20px">
            <Text fontSize="16px" color={colors.secondaryText}>
                Email:
            </Text>
            <Text fontSize="28px" color={colors.text}>
                support@tailorcv.com
            </Text>
        </Box>
        <Box mt="20px">
            <Text fontSize="16px" color={colors.secondaryText}>
                Phone:
            </Text>
            <Text fontSize="28px" color={colors.text}>
                +1 555-555-5555
            </Text>
        </Box>
      </Box>
      <Box bg="white" p="40px" w="660px" borderRadius={radius.xl} boxShadow="0px 0px 10px 1px rgba(99, 102, 241, 0.25)" color={colors.text}>
        <Flex gap="20px">
            <Box w="50%">
                <Text fontSize="14px">First Name</Text>
                <Box >
                    <Input borderRadius={radius.m} placeholder="Enter Your First Name" />
                </Box>
            </Box>
            <Box w="50%">
                <Text fontSize="14px">Last Name</Text>
                <Box>
                    <Input borderRadius={radius.m} placeholder="Enter Your Last Name"/>
                </Box>
            </Box>
        </Flex>
        <Box mt="20px">
            <Text fontSize="14px">Email</Text>
            <Box>
                <Input borderRadius={radius.m} placeholder="Enter Your Email" />
            </Box>
        </Box>
        <Box mt="20px">
            <Text fontSize="14px">Message</Text>

            <Textarea
                borderRadius={radius.m}
                placeholder="Enter Your Message"
                p="20px"
                minH="120px"
                resize="vertical"
            />
        </Box>
        <Button variantType="secondary" mt="20px" w="100%" >
            Send Message
        </Button>
      </Box>
    </Flex>
  )
}

export default Contact
