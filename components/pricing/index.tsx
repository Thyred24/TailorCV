import { Box, Flex, Text } from '@chakra-ui/react'
import Button from "../ui/button"
import { FiCheck } from 'react-icons/fi';

function Pricing() {

    const pricing = [
        {
            title: "Starter",
            description: "A simple way to organize candidates by stage and keep next steps clear. Great for trying the workflow on a real role and staying on track without spreadsheets or scattered notes.",
            price: "$0",
            features: [
                "1 active role",
                "Up to 30 candidates",
                "Pipeline board and list view",
                "Due dates and next steps",
                "Basic notes and activity tracking",
            ],
            buttonText: "Start for Free",
        },
        {
            title: "Team",
            description: "For teams that want consistent interviews and shared decisions. Use scorecards, collect feedback, assign owners, and keep candidates moving.",
            price: "$3.99 / month",
            features: [
                "Unlimited roles",
                "Unlimited candidates",
                "Interview scorecards",
                "Team feedback collection",
                "Assign owners and permissions",
                "Export reports",
            ],
            buttonText: "Upgrade to Team",
        },
        {
            title: "Business",
            description: "For higher volume hiring and more complex workflows. Get stronger visibility into bottlenecks, overdue steps, and team coordination so you can improve speed and decision quality.",
            price: "$9.99",
            features: [
                "Everything in Team",
                "Multi workspace or departments",
                "Advanced pipeline analytics",
                "SLA reminders and overdue tracking",
                "Priority support",
            ],
            buttonText: "Upgrade to Business",
        },
    ];

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

    const getTransform = (title: string) => {
        if (title === "Starter") return "rotate(5deg) translateX(100px) translateY(-30px)"
        if (title === "Business") return "rotate(-5deg) translateX(-100px) translateY(-30px)"
        return "none"
    }

  return (
    <Box mx="auto" mt="100px" maxWidth="1400px">
      <Box textAlign="center">
        <Text fontSize="48px" fontWeight="semibold" color={colors.text}>Simple Pricing for Hiring Teams</Text>
        <Text fontSize="24px" mt="10px" color={colors.secondaryText} maxW="900px" mx="auto">
            Choose a plan based on team size and how many roles you’re hiring for. Start free, then upgrade when your process is running.
        </Text>
      </Box>
      <Flex gap="20px" mt="60px"  >
            {pricing.map((plan, index) => (
                <Box 
                    key={index}
                    p="40px"
                    bg= {plan.title === "Team" ? "linear-gradient(to bottom, #6366F1 0%, #A855F7 100%)" : "white"}
                    borderRadius={radius.xl}
                    boxShadow= {plan.title === "Team" ? "inset 0px 0px 10px 3px rgba(255,255,255,0.2)" : "none"}
                    minHeight="600px"
                    position="relative"
                    transform={getTransform(plan.title)}
                    transition="transform 0.5s ease"
                    _hover={{
                        transition: "transform 0.5s ease",
                        transform: "none",
                    }}
                    zIndex={plan.title === "Team" ? 1 : 0}
                    >
                    <Text fontSize="32px" fontWeight="medium" color={plan.title === "Team" ? "white" : colors.text}>{plan.title}</Text>
                    <Text fontSize="16px" mt="10px" color={plan.title === "Team" ? "rgba(243, 240, 255, 0.7)" : "rgba(71, 85, 105, 0.7)"} maxW="900px" mx="auto">
                        {plan.description}
                    </Text>
                    <Text fontSize="36px" mt="10px" fontWeight="semibold" color={plan.title === "Team" ? "white" : colors.text}>{plan.price}</Text>
                    <Box mt="5px" h="1px" bg={plan.title === "Team" ? "rgba(255, 255, 255, 0.1)" : "rgba(99, 102, 241, 0.1)"} />
                    <Flex mt="10px" >
                        <Text fontSize="16px" color={plan.title === "Team" ? "#F3F0FF" : colors.secondaryText}>
                        {plan.features.map((feature, index) => (
                            <Flex key={index} gap="10px" alignItems="center" mt="10px">
                                <Box w="30px" h="30px" borderRadius="8px" bg= {plan.title === "Team" ? "rgba(243, 240, 255, 0.6)" : "#6366F1"} color={plan.title === "Team" ? "#6366F1" : "white"} display="flex" alignItems="center" justifyContent="center">
                                    <FiCheck />
                                </Box>
                                <Text>{feature}</Text>
                            </Flex>
                        ))}
                        </Text>
                    </Flex>
                    <Box position="absolute" left="50%" transform="translateX(-50%)" bottom="40px" bg="white" h="40px" borderRadius={radius.m}>
                        <Button
                        variantType="secondary"
                        mt="20px"
                        w="250px"
                        bottom="20px"
                        border= {plan.title === "Team" ? "none" : "1px solid #6366F1"}
                        boxShadow= {plan.title === "Team" ? "0px 0px 4px 0px rgba(255,255,255,0.25)" : "none"}
                        _hover={plan.title === "Team" ? { boxShadow: "inset 0px 0px 8px 0px rgba(0,0,0,0.4)" } : { boxShadow: " 0px 0px 8px 0px rgba(0,0,0,0.2)" }}
                        {...(plan.title === "Team"
                            ? {
                                bg: "linear-gradient(to right, #6366F1 0%, #A855F7 100%)",
                                bgClip: "text",
                                color: "transparent",
                              }
                            : {
                                color: "#6366F1",
                              })}
                        >
                        {plan.buttonText}
                        </Button>
                    </Box>
                </Box>
            ))}
      </Flex>
    </Box>
  )
}

export default Pricing
