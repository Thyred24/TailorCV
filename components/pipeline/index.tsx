"use client"

import * as React from "react"
import {
  Box,
  Grid,
  Text,
  Flex,
  IconButton,
  Link,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react"
import {
  ViewIcon,
  SearchIcon,
  RepeatIcon,
  CalendarIcon,
  SettingsIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons"
import { LuSearch } from "react-icons/lu"
import { FiBell, FiMessageSquare, FiChevronDown } from "react-icons/fi"
import { Avatar } from "@chakra-ui/react"
import Button from "../ui/button"
import { Users, users as usersData } from "../ui/users"
import { useRouter } from "next/navigation"

const sidebarItems = [
  { label: "Dashboard", icon: ViewIcon },
  { label: "Candidates", icon: SearchIcon },
  { label: "Pipeline", icon: RepeatIcon },
  { label: "Interviews", icon: CalendarIcon },
  { label: "Settings", icon: SettingsIcon },
  { label: "Logout", icon: ArrowBackIcon },
] as const

const radius = {
  m: "16px",
  l: "24px",
  xl: "32px",
}

const colors = {
  primary: "#6366F1",
  text: "#0F172A",
  secondaryText: "#7688a2",
  ghostText: "#b8bdc6",
}

type PipelineStage =
  | "Applied"
  | "Screening"
  | "InReview"
  | "Interview"
  | "Offer"
  | "Rejected"

type NextStep =
  | "Review CV"
  | "Send Screening Email"
  | "Schedule Interview"
  | "Collect Feedback"
  | "Send Offer"
  | "Close"

type PipelineRow = {
  id: string
  candidateId: string
  name: string
  email: string
  avatar: string
  role: string
  location: string
  matchScore: number

  stage: PipelineStage
  stageEnteredAt: string
  lastActivityAt: string

  owner: {
    name: string
    avatar: string
  }

  nextStep: {
    label: NextStep
    dueAt?: string
  }

  tags: string[]
  overdue: boolean

  activities: Array<{
    id: string
    at: string
    type: "status" | "note" | "email" | "interview"
    title: string
    meta?: Record<string, string>
  }>
}

const stageOrder: PipelineStage[] = ["Applied", "Screening", "InReview", "Interview", "Offer", "Rejected"]

const stageLabel: Record<PipelineStage, string> = {
  Applied: "Applied",
  Screening: "Screening",
  InReview: "In Review",
  Interview: "Interview",
  Offer: "Offer",
  Rejected: "Rejected",
}

const pipelineRows: PipelineRow[] = [
  {
    id: "p1",
    candidateId: "c1",
    name: "Elif Yilmaz",
    email: "elif.yilmaz@example.com",
    avatar: "https://i.pravatar.cc/300?u=p1",
    role: "Frontend Engineer",
    location: "Istanbul, TR",
    matchScore: 92,
    stage: "Interview",
    stageEnteredAt: "January 20, 2026 11:05",
    lastActivityAt: "January 23, 2026 12:30",
    owner: { name: "Melissa Jones", avatar: "https://i.pravatar.cc/300?u=owner1" },
    nextStep: { label: "Schedule Interview", dueAt: "January 28, 2026 15:00" },
    tags: ["Top Match", "Fast Response"],
    overdue: false,
    activities: [
      {
        id: "p1a1",
        at: "January 20, 2026 11:05",
        type: "status",
        title: "Moved to Interview",
        meta: { from: "In Review", to: "Interview" },
      },
      {
        id: "p1a2",
        at: "January 23, 2026 09:10",
        type: "email",
        title: "Sent interview availability request",
        meta: { subject: "Technical interview availability" },
      },
      {
        id: "p1a3",
        at: "January 23, 2026 12:30",
        type: "note",
        title: "Note added",
        meta: { note: "Strong TypeScript, ask about SSR and testing." },
      },
    ],
  },
  {
    id: "p2",
    candidateId: "c2",
    name: "Mehmet Kaya",
    email: "mehmet.kaya@example.com",
    avatar: "https://i.pravatar.cc/300?u=p2",
    role: "UI Designer",
    location: "Ankara, TR",
    matchScore: 84,
    stage: "InReview",
    stageEnteredAt: "January 18, 2026 09:20",
    lastActivityAt: "January 19, 2026 10:40",
    owner: { name: "Daniel Carter", avatar: "https://i.pravatar.cc/300?u=owner2" },
    nextStep: { label: "Review CV", dueAt: "January 27, 2026 18:00" },
    tags: ["Portfolio Strong", "Remote Ready"],
    overdue: false,
    activities: [
      {
        id: "p2a1",
        at: "January 18, 2026 09:20",
        type: "status",
        title: "Moved to In Review",
        meta: { from: "Screening", to: "In Review" },
      },
      {
        id: "p2a2",
        at: "January 19, 2026 10:40",
        type: "email",
        title: "Requested case study link",
        meta: { subject: "Quick follow up: UI case study" },
      },
    ],
  },
  {
    id: "p3",
    candidateId: "c3",
    name: "Derya Demir",
    email: "derya.demir@example.com",
    avatar: "https://i.pravatar.cc/300?u=p3",
    role: "Product Designer",
    location: "Izmir, TR",
    matchScore: 88,
    stage: "Screening",
    stageEnteredAt: "January 10, 2026 13:10",
    lastActivityAt: "January 12, 2026 13:40",
    owner: { name: "Sophia Reed", avatar: "https://i.pravatar.cc/300?u=owner3" },
    nextStep: { label: "Send Screening Email", dueAt: "January 13, 2026 12:00" },
    tags: ["Top Match"],
    overdue: true,
    activities: [
      {
        id: "p3a1",
        at: "January 10, 2026 13:10",
        type: "interview",
        title: "Screening needed",
        meta: { hint: "No response yet" },
      },
      {
        id: "p3a2",
        at: "January 12, 2026 13:40",
        type: "note",
        title: "Note added",
        meta: { note: "Strong design systems thinking, ask about dev handoff." },
      },
    ],
  },
  {
    id: "p4",
    candidateId: "c4",
    name: "Ahmet Can",
    email: "ahmet.can@example.com",
    avatar: "https://i.pravatar.cc/300?u=p4",
    role: "Backend Engineer",
    location: "Bursa, TR",
    matchScore: 76,
    stage: "Offer",
    stageEnteredAt: "January 22, 2026 18:05",
    lastActivityAt: "January 22, 2026 18:20",
    owner: { name: "Olivia Hughes", avatar: "https://i.pravatar.cc/300?u=owner4" },
    nextStep: { label: "Collect Feedback", dueAt: "January 29, 2026 12:00" },
    tags: ["Salary High", "Urgent"],
    overdue: false,
    activities: [
      {
        id: "p4a1",
        at: "January 22, 2026 18:05",
        type: "status",
        title: "Moved to Offer",
        meta: { from: "Interview", to: "Offer" },
      },
      {
        id: "p4a2",
        at: "January 22, 2026 18:20",
        type: "email",
        title: "Offer sent",
        meta: { subject: "Offer details" },
      },
    ],
  },
  {
    id: "p5",
    candidateId: "c5",
    name: "Seda Acar",
    email: "seda.acar@example.com",
    avatar: "https://i.pravatar.cc/300?u=p5",
    role: "QA Engineer",
    location: "Antalya, TR",
    matchScore: 81,
    stage: "Rejected",
    stageEnteredAt: "January 15, 2026 16:10",
    lastActivityAt: "January 15, 2026 16:25",
    owner: { name: "Melissa Jones", avatar: "https://i.pravatar.cc/300?u=owner1" },
    nextStep: { label: "Close" },
    tags: ["Rejected"],
    overdue: false,
    activities: [
      {
        id: "p5a1",
        at: "January 15, 2026 16:10",
        type: "status",
        title: "Moved to Rejected",
        meta: { from: "In Review", to: "Rejected" },
      },
      {
        id: "p5a2",
        at: "January 15, 2026 16:25",
        type: "note",
        title: "Reason noted",
        meta: { note: "Not a fit for automation depth required." },
      },
    ],
  },
  {
    id: "p6",
    candidateId: "c6",
    name: "Kerem Arslan",
    email: "kerem.arslan@example.com",
    avatar: "https://i.pravatar.cc/300?u=p6",
    role: "Full Stack Engineer",
    location: "Istanbul, TR",
    matchScore: 86,
    stage: "Applied",
    stageEnteredAt: "January 26, 2026 10:03",
    lastActivityAt: "January 26, 2026 10:05",
    owner: { name: "Daniel Carter", avatar: "https://i.pravatar.cc/300?u=owner2" },
    nextStep: { label: "Review CV", dueAt: "January 27, 2026 16:00" },
    tags: ["Top Match"],
    overdue: false,
    activities: [
      {
        id: "p6a1",
        at: "January 26, 2026 10:03",
        type: "status",
        title: "New application received",
        meta: { source: "LinkedIn" },
      },
      {
        id: "p6a2",
        at: "January 26, 2026 10:05",
        type: "note",
        title: "Auto tag applied",
        meta: { tag: "Top Match" },
      },
    ],
  },
]

type DetailTab = "Summary" | "Activity"

function getMatchChip(score: number) {
  if (score >= 90) return { bg: "rgba(34, 197, 94, 0.12)", color: "#16A34A" }
  if (score >= 80) return { bg: "rgba(99, 102, 241, 0.12)", color: colors.primary }
  return { bg: "rgba(245, 158, 11, 0.12)", color: "#D97706" }
}

function getStagePill(stage: PipelineStage) {
  if (stage === "Rejected") {
    return { bg: "rgba(239, 68, 68, 0.10)", color: "#DC2626", border: "rgba(239, 68, 68, 0.25)" }
  }
  if (stage === "Offer") {
    return { bg: "rgba(34, 197, 94, 0.10)", color: "#16A34A", border: "rgba(34, 197, 94, 0.25)" }
  }
  if (stage === "Interview") {
    return { bg: "rgba(99, 102, 241, 0.10)", color: colors.primary, border: "rgba(99, 102, 241, 0.25)" }
  }
  return { bg: "rgba(148, 163, 184, 0.14)", color: "#475569", border: "rgba(148, 163, 184, 0.30)" }
}

export default function Pipeline() {
  const router = useRouter()

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const users = React.useMemo(() => usersData.slice(0, 1), [])

  const filteredRows = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pipelineRows
    return pipelineRows.filter((r) => {
      return (
        r.name.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.stage.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      )
    })
  }, [query])

  const [activeStage, setActiveStage] = React.useState<PipelineStage | "All">("All")

  const visibleRows = React.useMemo(() => {
    if (activeStage === "All") return filteredRows
    return filteredRows.filter((r) => r.stage === activeStage)
  }, [activeStage, filteredRows])

  const [selectedId, setSelectedId] = React.useState<string>(pipelineRows[0]?.id ?? "")

  React.useEffect(() => {
    if (visibleRows.length === 0) {
      if (selectedId) setSelectedId("")
      return
    }
    const exists = visibleRows.some((r) => r.id === selectedId)
    if (!exists) setSelectedId(visibleRows[0].id)
  }, [visibleRows, selectedId])

  const selected = React.useMemo(() => {
    if (!selectedId) return undefined
    return visibleRows.find((r) => r.id === selectedId) ?? visibleRows[0]
  }, [visibleRows, selectedId])

  const [detailTab, setDetailTab] = React.useState<DetailTab>("Summary")
  React.useEffect(() => {
    setDetailTab("Summary")
  }, [selectedId])

  const submit = () => {
    console.log("search submit:", query)
  }

  const onSidebarNav = (label: (typeof sidebarItems)[number]["label"]) => {
    if (label === "Dashboard") router.push("/dashboard")
    if (label === "Candidates") router.push("/dashboard/candidate")
    if (label === "Pipeline") router.push("/dashboard/pipeline")
    if (label === "Interviews") router.push("/dashboard/interviews")
    if (label === "Settings") router.push("/dashboard/settings")
    if (label === "Logout") router.push("/")
  }

  const tabStyle = (active: boolean) => {
    return {
      fontSize: "14px",
      cursor: "pointer",
      border: "1px solid",
      borderColor: active ? colors.primary : "transparent",
      borderRadius: radius.m,
      px: "12px",
      py: "10px",
      bg: active ? "rgba(99, 102, 241, 0.1)" : "transparent",
      color: active ? colors.primary : colors.secondaryText,
      boxShadow: active ? "inset 0px 0px 10px 2px rgba(99, 102, 241, 0.3)" : "none",
      transition: "all 0.15s ease",
      _hover: active
        ? undefined
        : {
            bg: "rgba(99, 102, 241, 0.06)",
            color: colors.primary,
          },
    } as const
  }

  const isAll = activeStage === "All"

  return (
    <Grid templateColumns="350px 1fr" bg="#F6F7FB" minH="100vh">
      <Box
        position="sticky"
        top="10px"
        h="98vh"
        bg="white"
        borderRadius="0px 32px 32px 0px"
        borderRight="2px solid #6366F1"
        p="40px"
        zIndex={10}
        alignSelf="start"
      >
        <Flex alignItems="center" gap="10px">
          <Link fontSize="24px" fontWeight="bold" color={colors.text} href="/">
            TailorCV
          </Link>
        </Flex>

        <Box mt="32px">
          {sidebarItems.slice(0, 4).map((item) => {
            const isActive = item.label === "Pipeline"
            return (
              <Flex
                key={item.label}
                alignItems="center"
                gap="10px"
                mb="20px"
                bg={
                  isActive
                    ? "linear-gradient(to left, rgba(99, 102, 241, 0.3) 0%, transparent 100%)"
                    : "transparent"
                }
                borderRadius="12px"
                p="6px"
                _hover={{ cursor: "pointer", bg: "rgba(99, 102, 241, 0.1)" }}
                onClick={() => onSidebarNav(item.label)}
              >
                <IconButton
                  aria-label={item.label}
                  bg="transparent"
                  color={isActive ? colors.primary : colors.secondaryText}
                >
                  <item.icon />
                </IconButton>
                <Text color={isActive ? colors.primary : colors.secondaryText} fontSize="18px" fontWeight="500">
                  {item.label}
                </Text>
              </Flex>
            )
          })}
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
              p="6px"
              _hover={{
                cursor: "pointer",
                bg:
                  item.label === "Logout"
                    ? "linear-gradient(to left, rgba(255, 0, 0, 0.5) 0%, transparent 100%)"
                    : "rgba(99, 102, 241, 0.1)",
              }}
              onClick={() => onSidebarNav(item.label)}
            >
              <IconButton aria-label={item.label} bg="transparent" color={colors.secondaryText}>
                <item.icon />
              </IconButton>
              <Text color={colors.secondaryText} fontSize="18px" fontWeight="500">
                {item.label}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>

      <Box color={colors.text} px="40px" pt="20px" pb="60px">
        <Grid templateColumns="1fr 1fr 1fr" alignItems="center" mb="14px">
          <Box>
            <Text fontSize="18px" fontWeight="800">
              Muhammet Taha Er
            </Text>
            <Text fontSize="14px" color={colors.secondaryText}>
              {formattedDate}
            </Text>
          </Box>

          <Box px="30px">
            <InputGroup
              endElement={
                <Box
                  w="45px"
                  h="45px"
                  bg={colors.primary}
                  borderRadius={radius.m}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.18)"
                  onClick={() => inputRef.current?.focus()}
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
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit()
                }}
                bg="white"
                border="none"
              />
            </InputGroup>
          </Box>

          <Flex justifyContent="flex-end" gap="10px" alignItems="center">
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

        <Flex justifyContent="space-between" alignItems="flex-end" gap="14px" flexWrap="wrap">
          <Box>
            <Text fontSize="36px" fontWeight="700">
              Pipeline
            </Text>
            <Text fontSize="14px" color={colors.secondaryText} mt="6px">
              Track progress, next steps, and bottlenecks by stage
            </Text>
          </Box>

          <Flex gap="10px" alignItems="center">
            <Box
              borderRadius="999px"
              px="12px"
              py="10px"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              fontSize="13px"
              fontWeight="800"
              color={colors.text}
            >
              Total {filteredRows.length}
            </Box>

            <Box
              borderRadius="999px"
              px="12px"
              py="10px"
              bg="rgba(239, 68, 68, 0.08)"
              border="1px solid"
              borderColor="rgba(239, 68, 68, 0.22)"
              fontSize="13px"
              fontWeight="800"
              color="#DC2626"
            >
              Overdue {filteredRows.filter((r) => r.overdue).length}
            </Box>
          </Flex>
        </Flex>

        <Grid templateColumns="1.15fr 0.85fr" gap="20px" mt="20px" alignItems="start">
          <Box bg="white" borderRadius={radius.xl} p="20px" border="1px solid" borderColor="gray.200">
            <Flex gap="10px" flexWrap="wrap" textAlign="center" alignItems="center">
              <Flex
                alignItems="center"
                gap="8px"
                borderRadius={radius.m}
                px="12px"
                py="10px"
                cursor="pointer"
                fontWeight="800"
                border="1px solid"
                borderColor={isAll ? colors.primary : "transparent"}
                bg={isAll ? "rgba(99, 102, 241, 0.1)" : "transparent"}
                color={isAll ? colors.primary : colors.secondaryText}
                boxShadow={isAll ? "inset 0px 0px 10px 2px rgba(99, 102, 241, 0.22)" : "none"}
                transition="all 0.15s ease"
                _hover={isAll ? undefined : { bg: "rgba(99, 102, 241, 0.06)", color: colors.primary }}
                onClick={() => setActiveStage("All")}
              >
                <Text fontSize="14px">All</Text>
                <Box
                  borderRadius="999px"
                  px="10px"
                  py="6px"
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  fontSize="12px"
                  fontWeight="900"
                  color="gray.700"
                >
                  {filteredRows.length}
                </Box>
              </Flex>

              {stageOrder.map((stage) => {
                const isActive = activeStage === stage

                return (
                  <Flex
                    key={stage}
                    alignItems="center"
                    gap="8px"
                    borderRadius={radius.m}
                    px="12px"
                    py="10px"
                    cursor="pointer"
                    fontWeight="800"
                    border="1px solid"
                    borderColor={isActive ? colors.primary : "transparent"}
                    bg={isActive ? "rgba(99, 102, 241, 0.06)" : "transparent"}
                    color={isActive ? colors.primary : colors.secondaryText}
                    boxShadow={isActive ? "inset 0px 0px 10px 2px rgba(99, 102, 241, 0.22)" : "none"}
                    transition="all 0.15s ease"
                    _hover={isActive ? undefined : { bg: "rgba(99, 102, 241, 0.06)", color: colors.primary }}
                    onClick={() => setActiveStage(stage)}
                  >
                    <Text fontSize="14px">{stageLabel[stage]}</Text>
                  </Flex>
                )
              })}
            </Flex>

            <Flex
              bg="#F9FAFB"
              px="12px"
              py="10px"
              borderRadius={radius.m}
              border="1px solid"
              borderColor="gray.100"
              fontWeight="800"
              color="gray.600"
              mt="20px"
            >
              <Text w="42%">Candidate</Text>
              <Text w="28%">Stage</Text>
              <Text w="20%">Next Step</Text>
              <Text w="10%" textAlign="right">
                Match
              </Text>
            </Flex>

            {visibleRows.length === 0 ? (
              <Box mt="14px" border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="14px" bg="gray.50">
                <Text fontSize="13px" color={colors.secondaryText} fontWeight="700">
                  No results
                </Text>
              </Box>
            ) : (
              visibleRows.map((row, idx) => {
                const isSelected = row.id === selectedId
                const chip = getMatchChip(row.matchScore)
                const stagePill = getStagePill(row.stage)

                return (
                  <Box key={row.id}>
                    <Flex
                      alignItems="center"
                      bg={isSelected ? "rgba(99, 102, 241, 0.06)" : "white"}
                      boxShadow={isSelected ? "inset 0px 0px 10px 2px rgba(99, 102, 241, 0.22)" : "none"}
                      px="12px"
                      py="12px"
                      borderRadius={radius.m}
                      mt="10px"
                      _hover={{
                        cursor: "pointer",
                        bg: "linear-gradient(to left, rgba(99, 102, 241, 0.3) 0%, transparent 100%)",
                      }}
                      onClick={() => setSelectedId(row.id)}
                    >
                      <Flex w="42%" alignItems="center" gap="10px" minW={0}>
                        <Avatar.Root size="sm">
                          <Avatar.Fallback name={row.name} />
                          <Avatar.Image src={row.avatar} />
                        </Avatar.Root>
                        <Box minW={0}>
                          <Text fontSize="15px" fontWeight="900">
                            {row.name}
                          </Text>
                          <Text fontSize="13px" color={colors.secondaryText}>
                            {row.role}
                          </Text>
                        </Box>
                      </Flex>

                      <Flex w="28%" alignItems="center">
                        <Box
                          borderRadius="999px"
                          px="10px"
                          py="6px"
                          bg={stagePill.bg}
                          border="1px solid"
                          borderColor={stagePill.border}
                          fontSize="12px"
                          fontWeight="900"
                          color={stagePill.color}
                        >
                          {stageLabel[row.stage]}
                        </Box>
                      </Flex>

                      <Flex w="20%" direction="column" minW={0}>
                        <Text fontSize="13px" fontWeight="900" color={row.overdue ? "#DC2626" : colors.text}>
                          {row.nextStep.label}
                        </Text>
                        <Text fontSize="12px" color={row.overdue ? "#DC2626" : colors.secondaryText}>
                          {row.nextStep.dueAt ? row.nextStep.dueAt : "No due date"}
                        </Text>
                      </Flex>

                      <Flex w="10%" justifyContent="flex-end">
                        <Box
                          borderRadius="999px"
                          px="10px"
                          py="6px"
                          fontSize="12px"
                          fontWeight="900"
                          bg={chip.bg}
                          color={chip.color}
                        >
                          {row.matchScore}%
                        </Box>
                      </Flex>
                    </Flex>

                    {idx !== visibleRows.length - 1 ? <Box h="1px" bg="gray.100" w="100%" mt="10px" /> : null}
                  </Box>
                )
              })
            )}
          </Box>

          <Box>
            <Box
              border="1px solid"
              borderColor="gray.200"
              borderTop="2px solid #6366F1"
              borderRadius={radius.xl}
              bg="white"
              p="20px"
            >
              {!selected ? (
                <Text fontSize="14px" color={colors.ghostText}>
                  Select a candidate
                </Text>
              ) : (
                <>
                  <Flex justifyContent="space-between" alignItems="center" gap="14px">
                    <Flex alignItems="center" gap="14px" minW={0}>
                      <Avatar.Root boxSize="90px">
                        <Avatar.Fallback name={selected.name} />
                        <Avatar.Image src={selected.avatar} />
                      </Avatar.Root>

                      <Box minW={0}>
                        <Text fontSize="20px" fontWeight="900">
                          {selected.name}
                        </Text>
                        <Text fontSize="14px" color={colors.secondaryText} fontWeight="700">
                          {selected.role}
                        </Text>
                        <Text fontSize="13px" color={colors.ghostText} mt="6px">
                          {selected.email}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex direction="column" alignItems="flex-end" gap="8px">
                      <Box
                        borderRadius="999px"
                        px="12px"
                        py="8px"
                        bg={getStagePill(selected.stage).bg}
                        border="1px solid"
                        borderColor={getStagePill(selected.stage).border}
                        fontSize="12px"
                        fontWeight="900"
                        color={getStagePill(selected.stage).color}
                      >
                        {stageLabel[selected.stage]}
                      </Box>

                      <Box
                        borderRadius="999px"
                        px="12px"
                        py="8px"
                        bg={getMatchChip(selected.matchScore).bg}
                        fontSize="12px"
                        fontWeight="900"
                        color={getMatchChip(selected.matchScore).color}
                      >
                        Match {selected.matchScore}%
                      </Box>
                    </Flex>
                  </Flex>

                  <Box h="1px" bg="gray.100" w="100%" mt="16px" />

                  <Flex alignItems="center" gap="10px" flexWrap="wrap" mt="16px">
                    <Text onClick={() => setDetailTab("Summary")} {...tabStyle(detailTab === "Summary")}>
                      Summary
                    </Text>
                    <Text onClick={() => setDetailTab("Activity")} {...tabStyle(detailTab === "Activity")}>
                      Activity
                    </Text>
                  </Flex>

                  {detailTab === "Summary" ? (
                    <VStack align="stretch" mt="16px" gap="12px">
                      <Grid templateColumns="1fr 1fr" gap="12px">
                        <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                          <Text fontSize="12px" color={colors.ghostText}>
                            Owner
                          </Text>
                          <Flex alignItems="center" gap="10px" mt="6px">
                            <Avatar.Root size="xs">
                              <Avatar.Fallback name={selected.owner.name} />
                              <Avatar.Image src={selected.owner.avatar} />
                            </Avatar.Root>
                            <Text fontSize="13px" fontWeight="900" color={colors.text}>
                              {selected.owner.name}
                            </Text>
                          </Flex>
                        </Box>

                        <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                          <Text fontSize="12px" color={colors.ghostText}>
                            Next step
                          </Text>
                          <Text fontSize="13px" fontWeight="900" color={colors.text} mt="6px">
                            {selected.nextStep.label}
                          </Text>
                          <Text
                            fontSize="12px"
                            color={selected.overdue ? "#DC2626" : colors.secondaryText}
                            mt="4px"
                        
                          >
                            {selected.nextStep.dueAt ? selected.nextStep.dueAt : "No due date"}
                          </Text>
                        </Box>

                        <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                          <Text fontSize="12px" color={colors.ghostText}>
                            Stage entered
                          </Text>
                          <Text fontSize="13px" fontWeight="900" color={colors.text} mt="6px">
                            {selected.stageEnteredAt}
                          </Text>
                        </Box>

                        <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                          <Text fontSize="12px" color={colors.ghostText}>
                            Last activity
                          </Text>
                          <Text fontSize="13px" fontWeight="900" color={colors.text} mt="6px">
                            {selected.lastActivityAt}
                          </Text>
                        </Box>
                      </Grid>

                      <Box>
                        <Text fontSize="13px" fontWeight="900" color={colors.text}>
                          Tags
                        </Text>
                        <Flex wrap="wrap" gap="8px" mt="8px">
                          {selected.tags.length === 0 ? (
                            <Text fontSize="13px" color={colors.ghostText} fontWeight="700">
                              No tags
                            </Text>
                          ) : (
                            selected.tags.map((t) => (
                              <Box
                                key={t}
                                borderRadius="999px"
                                px="10px"
                                py="6px"
                                border="1px solid"
                                borderColor="gray.200"
                                bg="gray.50"
                                fontSize="12px"
                                fontWeight="900"
                                color="gray.700"
                              >
                                {t}
                              </Box>
                            ))
                          )}
                        </Flex>
                      </Box>

                      <Flex gap="10px" mt="6px" flexWrap="wrap">
                        <Button variantType="primary" onClick={() => console.log("Next step done", selected.id)}>
                          Next step done
                        </Button>

                        <Button variantType="reject" onClick={() => console.log("Reject", selected.id)}>
                          Reject
                        </Button>
                      </Flex>
                    </VStack>
                  ) : (
                    <VStack align="stretch" mt="16px" gap="10px">
                      {selected.activities.length === 0 ? (
                        <Text fontSize="13px" color={colors.ghostText}>
                          No activity
                        </Text>
                      ) : (
                        selected.activities.map((a) => (
                          <Box key={a.id} border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                            <Flex justifyContent="space-between" alignItems="flex-start" gap="10px">
                              <Box>
                                <Text fontSize="13px" fontWeight="900" color={colors.text}>
                                  {a.title}
                                </Text>

                                {a.meta?.note ? (
                                  <Text fontSize="12px" color={colors.secondaryText} mt="4px">
                                    {a.meta.note}
                                  </Text>
                                ) : null}

                                {a.meta?.subject ? (
                                  <Text fontSize="12px" color={colors.secondaryText} mt="4px">
                                    {a.meta.subject}
                                  </Text>
                                ) : null}

                                <Text fontSize="12px" color={colors.ghostText} mt="6px">
                                  {a.at}
                                </Text>
                              </Box>

                              <Box
                                borderRadius="999px"
                                px="10px"
                                py="6px"
                                bg="rgba(148, 163, 184, 0.14)"
                                border="1px solid"
                                borderColor="rgba(148, 163, 184, 0.30)"
                                fontSize="12px"
                                fontWeight="900"
                                color="#475569"
                              >
                                {a.type}
                              </Box>
                            </Flex>
                          </Box>
                        ))
                      )}
                    </VStack>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  )
}
