"use client"

import { Box, Grid, Text, Flex, IconButton, Link } from '@chakra-ui/react'
import { ViewIcon, SearchIcon, RepeatIcon, CalendarIcon, SettingsIcon, ArrowBackIcon} from '@chakra-ui/icons'
import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import React from 'react';
import { MiniRing } from '../ui/miniring';
import { MiniDonutPipeline } from '../ui/ministack';
import { FiBell } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import { Users } from '../ui/users';
import { users as usersData } from '../ui/users';
import { FiChevronDown } from "react-icons/fi";
import Button from '../ui/button';
import { ApplicationsReceivedChart } from '../ui/chart';
import { useRouter } from 'next/navigation';


const Dashboard = () => {

  const router = useRouter();

  const sidebarItems = [
  { label: "Dashboard", icon: ViewIcon },
  { label: "Candidates", icon: SearchIcon  },
  { label: "Pipeline", icon: RepeatIcon },
  { label: "Interviews", icon: CalendarIcon  },
  { label: "Settings", icon: SettingsIcon },
  { label: "Logout", icon: ArrowBackIcon },
];

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

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const [query, setQuery] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const submit = () => {
    console.log("search submit:", query);
  };

  const users = usersData.slice(0, 1);

  const applications = usersData.slice(1, 6);

  const calendarEvents = [
    {
      day: "TODAY",
      title: "UI/UX Engineer Interview",
      description: "Onboarding",
      date: "23 Jan",
      color: "green",
    },
    {
      day: "UPCOMING",
      title: "Project Deadline",
      description: "Final submission",
      date: "25 Jan",
      color: "orange",
    },
    {
      day: "UPCOMING",
      title: "Team Meeting",
      description: "Weekly sync",
      date: "25 Jan",
      color: "orange",
    },
  ];

  type Row = {
  candidate: string
  role: string
  matchScore: number
  location: string
  experienceLevel: string
  workType: string
}

const rows: Row[] = [
  {
    candidate: "Elif Yilmaz",
    role: "Frontend Engineer",
    matchScore: 92,
    location: "Istanbul, TR",
    experienceLevel: "Mid",
    workType: "Hybrid",
  },
  {
    candidate: "Mehmet Kaya",
    role: "UI Designer",
    matchScore: 84,
    location: "Ankara, TR",
    experienceLevel: "Junior",
    workType: "Remote",
  },
  {
    candidate: "Derya Demir",
    role: "Product Designer",
    matchScore: 88,
    location: "Izmir, TR",
    experienceLevel: "Mid",
    workType: "Remote",
  },
  {
    candidate: "Ahmet Can",
    role: "Backend Engineer",
    matchScore: 76,
    location: "Bursa, TR",
    experienceLevel: "Senior",
    workType: "Onsite",
  },
  {
    candidate: "Seda Acar",
    role: "QA Engineer",
    matchScore: 81,
    location: "Antalya, TR",
    experienceLevel: "Mid",
    workType: "Hybrid",
  },
  {
    candidate: "Kerem Arslan",
    role: "Full Stack Engineer",
    matchScore: 86,
    location: "Istanbul, TR",
    experienceLevel: "Mid",
    workType: "Hybrid",
  },
  {
    candidate: "Zeynep Koc",
    role: "Data Analyst",
    matchScore: 79,
    location: "Ankara, TR",
    experienceLevel: "Junior",    
    workType: "Remote",
  },
  {
    candidate: "Mert Sahin",
    role: "DevOps Engineer",
    matchScore: 83,
    location: "Izmir, TR",
    experienceLevel: "Senior",
    workType: "Remote",
  },
  {
    candidate: "Ayse Nur Kaya",
    role: "Product Manager",
    matchScore: 74,
    location: "Bursa, TR",
    experienceLevel: "Mid",
    workType: "Onsite",
  },
  {
    candidate: "Onur Demir",
    role: "Mobile Developer",
    matchScore: 82,
    location: "Antalya, TR",
    experienceLevel: "Mid",
    workType: "Hybrid",
  },
]


  return (
    <Grid templateColumns="350px 2fr" bg="#F6F7FB">
      <Box w="350px" />
      <Box 
        position="fixed"
        top="10px"
        left="0"
        w="350px"
        h="98vh"
        bg="white"
        borderRadius="0px 32px 32px 0px"
        borderRight="2px solid #6366F1"
        p="40px"
        zIndex={10}
      >
        <Flex alignItems="center" gap="10px">
          <Link fontSize="24px" fontWeight="bold" color={colors.text} href="/">
            TailorCV
          </Link>
        </Flex>
        <Box mt="32px">
          {sidebarItems.slice(0, 4).map((item) => (
            <Flex 
              key={item.label} 
              alignItems="center" 
              gap="10px" 
              mb="20px" 
              bg={item.label === "Dashboard" ? "linear-gradient(to left, rgba(99, 102, 241, 0.3) 0%, transparent 100%)" : "transparent"}
              borderRadius="12px"
              p="4px"
              _hover={{
                cursor: "pointer",
                bg: "rgba(99, 102, 241, 0.1)",
              }}
              onClick={() => {
                if (item.label === "Candidates") {
                  router.push("/dashboard/candidate");
                }
                if (item.label === "Pipeline") {
                  router.push("/dashboard/pipeline");
                }
                if (item.label === "Interviews") {
                  router.push("/dashboard/interviews");
                }
                if (item.label === "Settings") {
                  router.push("/dashboard/settings");
                }
                if (item.label === "Logout") {
                  router.push("/");
                }
              }}
            >
              <IconButton 
                aria-label="icon" 
                cursor="pointer" 
                color={item.label === "Dashboard" ? "#6366F1" : colors.secondaryText}
                bg="transparent"
              >
                <item.icon />
              </IconButton>
              <Text color={item.label === "Dashboard" ? "#6366F1" : colors.secondaryText} fontSize="18px">
                {item.label}
              </Text>
            </Flex>
          ))}
        </Box>
        <Box h="1px" bg="gray.200" />
        <Box mt="32px">
          {sidebarItems.slice(4, 6).map((item) => (
            <Flex 
              key={item.label} 
              alignItems="center" 
              gap="10px" 
              mb="20px" 
              borderRadius="12px"
              p="4px"
              _hover={{
                cursor: "pointer",
                bg: item.label === "Logout" ? "linear-gradient(to left, rgba(255, 0, 0, 0.5) 0%, transparent 100%)" : "rgba(99, 102, 241, 0.1)",
              }}
            >
              <IconButton bg="transparent" aria-label="icon" cursor="pointer" color={colors.secondaryText}>
                <item.icon />
              </IconButton>
              <Text color={colors.secondaryText} fontSize="18px">
                {item.label}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>
      <Box color={colors.text} pl="100px" pt="20px">
        <Grid templateColumns="1fr 1fr 1fr" justifyContent="space-between">
          <Box mt="10px">
            <Text fontSize="18px" fontWeight="bold">
              Muhammet Taha Er
            </Text>
            <Text fontSize="14px" color={colors.secondaryText}>
             {formattedDate}
            </Text>
          </Box>
          <Box mr="100px" mt="10px">
            <InputGroup
              flex="1"
              endElement={
                <Box
                  w="45px"
                  h="45px"
                  mr="-12px"
                  bg={colors.primary}
                  borderRadius={radius.m}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  boxShadow="-2px 0px 10px 0px rgba(0, 0, 0, 0.3)"
                >
                  <LuSearch color="white" size={18} />
                </Box>
              }
            >
              <Input
                ref={inputRef}
                placeholder="Search..."
                borderRadius={radius.m}
                value={query}
                onChange={onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                }}
                bg="white"
                border="none"
              />
            </InputGroup>
          </Box>
          <Flex gap="10px" alignItems="center">
            <Box
              border="1px solid"
              borderColor={colors.ghostText}
              p="15px"
              borderRadius={radius.m}
              color={colors.secondaryText}
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              bg="white"
            >
              <FiBell />
            </Box>
            
            <Box
              border="1px solid"
              borderColor={colors.ghostText}
              p="15px"
              borderRadius={radius.m}
              color={colors.secondaryText}
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              bg="white"
            >
              <FiMessageSquare />
            </Box>
            <Flex alignItems="center" gap="10px" ml="10px" cursor="pointer">
              <Users users={users} />
              <Box alignItems="center">
                <FiChevronDown />
              </Box>
            </Flex>
          </Flex>
        </Grid>
        <Grid templateColumns="repeat(4, 1fr) " mt="40px" gap="20px">
          <Box>
            <Grid templateColumns="repeat(4, 1fr)" gap="20px">
              <Flex bg="white" borderBottom="1px solid" borderBottomColor={colors.primary} p="20px 20px" justifyContent="space-between" borderRadius={radius.l}>
                <Box>
                  <Text color={colors.secondaryText}>Total Candidates</Text>
                  <Text color={colors.text} fontSize="24px" fontWeight="bold">1,293</Text>
                  <Text color={colors.ghostText} fontSize="14px" mt="5px">
                    <span style={{ color: "green", opacity: "0.6" }}>+289</span> this week
                  </Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <MiniRing value={70} label="+12%" />
                </Box>
              </Flex>
              <Flex bg="white" borderBottom="1px solid" borderBottomColor={colors.primary} p="20px 20px" justifyContent="space-between" borderRadius={radius.l}>
                <Box>
                  <Text color={colors.secondaryText}>Applications Overview</Text>
                  <Text color={colors.text} fontSize="24px" fontWeight="bold">864</Text>
                  <Text color={colors.ghostText} fontSize="14px" mt="5px">
                    <span style={{ color: "green", opacity: "0.6" }}>+18%</span> last month
                  </Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <MiniRing value={52} label="+18%" />
                </Box>
              </Flex>
              <Flex bg="white" borderBottom="1px solid" borderBottomColor={colors.primary} p="20px 20px" justifyContent="space-between" borderRadius={radius.l}>
                <Box>
                  <Text color={colors.secondaryText}>Active Applicants</Text>
                  <Text color={colors.text} fontSize="24px" fontWeight="bold">482</Text>
                  <Grid templateColumns="repeat(3, 1fr)" gap="10px">
                    <Flex alignItems="center" gap="5px">
                      <Box w="10px" h="10px" bg="#a78bfa" borderRadius="50%" />
                      <Text color={colors.ghostText} fontSize="14px" mt="5px">
                        Screening
                      </Text>
                    </Flex>
                    <Flex alignItems="center" gap="5px">
                      <Box w="10px" h="10px" bg="#60a5fa" borderRadius="50%" />
                      <Text color={colors.ghostText} fontSize="14px" mt="5px">
                        Interview
                      </Text>
                    </Flex>
                    <Flex alignItems="center" gap="5px">
                      <Box w="10px" h="10px" bg="#34d399" borderRadius="50%" />
                      <Text color={colors.ghostText} fontSize="14px" mt="5px">
                        Offer
                      </Text>
                    </Flex>
                  </Grid>
                </Box>
                <Box >
                  <MiniDonutPipeline
                    items={[
                      { label: "Screening", value: 120, color: "#A78BFA" },
                      { label: "Interview", value: 260, color: "#60A5FA" },
                      { label: "Offer", value: 102, color: "#34D399" },
                    ]}
                    defaultCenterText="Stages"
                  />

                </Box>
              </Flex>
              <Flex bg="white" borderBottom="1px solid" borderBottomColor={colors.primary} p="20px 20px" justifyContent="space-between" borderRadius={radius.l}>
                <Box>
                  <Text color={colors.secondaryText}>Candidates in Pipeline</Text>
                  <Text color={colors.text} fontSize="24px" fontWeight="bold">317</Text>
                  <Grid templateColumns="repeat(3, 1fr)" gap="10px">
                    <Flex alignItems="center" gap="5px">
                      <Box w="10px" h="10px" bg="#a78bfa" borderRadius="50%" />
                      <Text color={colors.ghostText} fontSize="14px" mt="5px">
                        Screening
                      </Text>
                    </Flex>
                    <Flex alignItems="center" gap="5px">
                      <Box w="10px" h="10px" bg="#60a5fa" borderRadius="50%" />
                      <Text color={colors.ghostText} fontSize="14px" mt="5px">
                        Interview
                      </Text>
                    </Flex>
                    <Flex alignItems="center" gap="5px">
                      <Box w="10px" h="10px" bg="#34d399" borderRadius="50%" />
                      <Text color={colors.ghostText} fontSize="14px" mt="5px">
                        Offer
                      </Text>
                    </Flex>
                  </Grid>
                  <Text color={colors.ghostText} fontSize="14px" mt="5px">
                    18% drop at interview stage
                  </Text>
                </Box>
                <Box>
                  <MiniDonutPipeline
                    items={[
                      { label: "Screening", value: 210, color: "#A78BFA" },
                      { label: "Interview", value: 80, color: "#60A5FA" },
                      { label: "Offer", value: 27, color: "#34D399" },
                    ]}
                    defaultCenterText="Stages"
                  />

                </Box>
              </Flex>
            </Grid>
          </Box>
          <Box bg="white" p="20px" borderRadius={radius.l}>
            <Text fontSize="18px">
              Send New Announcement
            </Text>
            <Text color={colors.secondaryText} fontSize="14px" mt="5px">
              Create a new job announcement or start from an existing template.
            </Text>
            <Flex gap="10px" mt="10px">
              <Button variantType="secondary">Select Template <FiChevronDown /> </Button>
              <Button variantType="primary">Create New </Button>
            </Flex>
          </Box>
        </Grid>
        <Grid templateColumns="2fr 1fr" gap="20px" mt="20px">
          <Box>
            <ApplicationsReceivedChart />
          </Box>
          <Box bg="white" p="20px" borderRadius={radius.xl} maxW="385px">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="18px" fontWeight="600">
                Calendar
              </Text>
              <Text fontSize="14px" color={colors.primary} cursor="pointer">
                See All
              </Text>
            </Flex>
            <Box mt="20px">
              {calendarEvents.map((event, index) => (
                <Box key={index}>
                  <Text fontSize="16px" color={colors.secondaryText} mt="10px">{event.day}</Text>
                  <Flex justifyContent="space-between" gap="10px" mt="10px">
                    <Box w="4px" h="40px" bg={event.color} borderRadius="8px" />
                    <Box flex="1">
                      <Text fontSize="14px" fontWeight="600">{event.title}</Text>
                      <Text fontSize="14px">{event.description}</Text>
                    </Box>
                    <Text fontSize="14px" color={colors.ghostText}>{event.date}</Text>
                  </Flex>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid templateColumns="2fr 1fr" gap="20px" mt="20px">
          <Box bg="white" p="20px" borderRadius={radius.xl}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="18px" fontWeight="600">
                Candidates Database
              </Text>
              <Text fontSize="14px" color={colors.primary} cursor="pointer">
                See All
              </Text>
            </Flex>
            <Flex
              bg="white"
              px="12px"
              py="10px"
              borderRadius={radius.m}
              border="1px solid"
              borderColor="gray.100"
              fontWeight="700"
              color="gray.600"
              mt="20px"
            >
              <Text w="22%">Candidate</Text>
              <Text w="18%">Role</Text>
              <Text w="12%">Match</Text>
              <Text w="18%">Location</Text>
              <Text w="15%">Experience</Text>
              <Text w="15%" textAlign="right">Work Type</Text>
            </Flex>

            {rows.slice(0, 8).map((row, index) => (
              <Flex
                key={row.candidate + index}
                justifyContent="space-between"
                alignItems="center"
                bg={index % 2 === 0 ? "#F9FAFB" : "white"}
                px="12px"
                py="10px"
                borderRadius={radius.m}
                mt="10px"
              >
                <Text w="22%" fontWeight="600">
                  {row.candidate}
                </Text>

                <Text w="18%" color="gray.600">
                  {row.role}
                </Text>

                <Text 
                  w="12%" 
                  fontWeight="700" 
                  borderRadius={radius.m} 
                  color="black"
                >
                  {row.matchScore}%
                </Text>

                <Text w="18%" color="gray.600"> 
                  {row.location}
                </Text>

                <Text w="15%" color="gray.600">
                  {row.experienceLevel}
                </Text>

                <Text w="15%" textAlign="right" color="gray.600">
                  {row.workType}
                </Text>
              </Flex>
        ))}
          </Box>
          <Box bg="white" p="20px" borderRadius={radius.xl} maxW="385px">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="18px" fontWeight="600">
                New Applications
              </Text>
              <Text fontSize="14px" color={colors.primary} cursor="pointer">
                See All
              </Text>
            </Flex>
            <Box mt="30px">
              <Users users={applications} />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  )
}

export default Dashboard