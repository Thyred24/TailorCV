"use client"

import { Box, Flex, Input, InputGroup, Text } from '@chakra-ui/react'
import { LuLock, LuMail, LuUser, LuX } from 'react-icons/lu'
import Button from '../ui/button'
import { useRouter } from 'next/navigation';

function SignUp() {

    const radius = {
        m: "16px",
        l: "24px",
        xl: "32px",
    };

    const router = useRouter();

  return (
    <Box 
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        gap={4} 
        bg="linear-gradient(to top, #060846 0%, #6366F1 100%)"
        p="100px"
        borderRadius={radius.xl}
        color="black"
    >
        <Box>
            <Flex justifyContent="space-between">
                <Text fontSize="16px" color="whiteAlpha.700">
                    Sign Up your account
                </Text>
                <Box onClick={() => router.push("/")} borderRadius="8px" p="5px" bg="white" cursor="pointer" opacity="0.7" >
                    <LuX color="black" />
                </Box>
            </Flex>
            <Text fontSize="54px" fontWeight="semibold" color="white">
                Get Started Now
            </Text>
            <Text fontSize="14px" color="whiteAlpha.500">
                Create your account to get started
            </Text>
        </Box>
        <Box mt="40px">
            <Box>
                <Text fontSize="14px" color="whiteAlpha.500">
                    Full Name
                </Text>
                <InputGroup 
                    startElement={<LuUser color="#FFFFFF5C" />} 
                    borderRadius={radius.m}
                    color="white"
                    mt="5px"
                    border="1px solid"
                    borderColor="whiteAlpha.500"
                >
                    <Input 
                        border="none" 
                        placeholder="Enter Your Full Name" 
                        color="white" 
                        borderRadius={radius.m} 
                        _focus={{
                            border: "none",
                            boxShadow: "inset 0px 0px 10px 0px #6366F1",
                        }}
                        type='text'
                    />
                </InputGroup>
            </Box>
            <Box mt="20px">
                <Text fontSize="14px" color="whiteAlpha.500">
                    Email address
                </Text>
                <InputGroup 
                    startElement={<LuMail color="#FFFFFF5C" />} 
                    borderRadius={radius.m}
                    color="white"
                    mt="5px"
                    border="1px solid"
                    borderColor="whiteAlpha.500"
                >
                    <Input 
                        border="none" 
                        placeholder="Enter Your Email" 
                        color="white" 
                        borderRadius={radius.m} 
                        _focus={{
                            border: "none",
                            boxShadow: "inset 0px 0px 10px 0px #6366F1",
                        }}
                        type='email'
                    />
                </InputGroup>
            </Box>
            <Box mt="20px">
                <Text fontSize="14px" color="whiteAlpha.500">
                    Password
                </Text>
                <InputGroup 
                    startElement={<LuLock color="#FFFFFF5C" />} 
                    borderRadius={radius.m}
                    color="white"
                    mt="5px"
                    border="1px solid"
                    borderColor="whiteAlpha.500"
                >
                    <Input 
                        border="none" 
                        placeholder="Enter Your Password" 
                        color="white" 
                        borderRadius={radius.m} 
                        _focus={{
                            border: "none",
                            boxShadow: "inset 0px 0px 10px 0px #6366F1",
                        }}
                        type='password'
                    />
                </InputGroup>
            </Box>
            <Box mt="20px">
                <Text fontSize="14px" color="whiteAlpha.500">
                    Confirm Password
                </Text>
                <InputGroup 
                    startElement={<LuLock color="#FFFFFF5C" />} 
                    borderRadius={radius.m}
                    color="white"
                    mt="5px"
                    border="1px solid"
                    borderColor="whiteAlpha.500"
                >
                    <Input 
                        border="none" 
                        placeholder="Enter Your Confirm Password" 
                        color="white" 
                        borderRadius={radius.m} 
                        _focus={{
                            border: "none",
                            boxShadow: "inset 0px 0px 10px 0px #6366F1",
                        }}
                        type='password'
                    />
                </InputGroup>
            </Box>
            <Box mt="20px">
                <Text fontSize="14px" color="whiteAlpha.700" cursor="pointer" onClick={() => router.push("/login")}>
                    Sign In
                </Text>
            </Box>
            <Box mt="20px">
                <Button w="100%" variantType="secondary" >Sign Up</Button>
            </Box>
        </Box>
    </Box>
  )
}

export default SignUp
