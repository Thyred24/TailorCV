"use client"

import { Box, Flex, Text, Link } from "@chakra-ui/react"
import Button from "../ui/button"
import { useRouter } from "next/navigation";

function Header() {

    const router = useRouter();

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
    };

    return (
        <Box bg="white" w="full" pl="40px" pr="40px" boxShadow={shadows.card} maxW="1400px" mx="auto" h="80px" borderRadius={radius.l} top="40px" position="sticky" zIndex="11">
            <Flex justifyContent="space-between" alignItems="center" h="full">
                <Text fontSize="2xl" fontWeight="bold" color={colors.text}>TailorCV</Text>
                <Flex gap="30px" >
                    <Link href="/" fontWeight="semibold" textDecoration="none" color={colors.primary}>Home</Link>
                    <Link href="/" textDecoration="none" color={colors.secondaryText}>Features</Link>
                    <Link href="/" textDecoration="none" color={colors.secondaryText}>Pricing</Link>
                    <Link href="/" textDecoration="none" color={colors.secondaryText}>FAQ</Link>
                    <Link href="/" textDecoration="none" color={colors.secondaryText}>Contact</Link>
                </Flex>
                <Flex gap="16px">
                    <Button variantType="primary" pl="32px" pr="32px" onClick={() => router.push("/login")} >Sign In</Button>
                    <Button variantType="secondary" pl="32px" pr="32px" onClick={() => router.push("/register")} >Sign Up</Button>
                </Flex>
            </Flex>
        </Box>  
    )
}

export default Header
