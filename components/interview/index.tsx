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

type PipelineStage = "Applied" | "Screening" | "InReview" | "Interview" | "Offer" | "Rejected"
type InterviewType = "Screening" | "Technical" | "Design" | "Culture" | "Final"
type InterviewStatus = "Scheduled" | "Completed" | "Canceled" | "NoShow"
type FeedbackStatus = "Pending" | "Submitted"
type Recommendation = "StrongYes" | "Yes" | "No" | "StrongNo" | "Hold"

type Person = {
  name: string
  avatar: string
  title: string
}

type InterviewRow = {
  id: string

  candidate: {
    id: string
    name: string
    email: string
    avatar: string
    role: string
    location: string
    matchScore: number
  }

  pipelineStage: PipelineStage

  interview: {
    type: InterviewType
    status: InterviewStatus
    scheduledAt: string
    durationMin: number
    mode: "Video" | "OnSite"
    link?: string
    room?: string
  }

  owner: Person
  interviewers: Person[]

  preparation: {
    checklist: Array<{
      id: string
      label: string
      done: boolean
    }>
  }

  feedback: {
    status: FeedbackStatus
    avgScore?: number
    recommendation?: Recommendation
    note?: string
    submittedAt?: string
  }

  lastActivityAt: string
  tags: string[]
}

const interviewRows: InterviewRow[] = [
  {
    id: "i1",
    candidate: {
      id: "c1",
      name: "Elif Yilmaz",
      email: "elif.yilmaz@example.com",
      avatar: "https://i.pravatar.cc/300?u=i1",
      role: "Frontend Engineer",
      location: "Istanbul, TR",
      matchScore: 92,
    },
    pipelineStage: "Interview",
    interview: {
      type: "Technical",
      status: "Scheduled",
      scheduledAt: "2026/01/28 15:00",
      durationMin: 60,
      mode: "Video",
      link: "https://meet.example.com/room1",
    },
    owner: { name: "Melissa Jones", avatar: "https://i.pravatar.cc/300?u=own1", title: "Recruiter" },
    interviewers: [
      { name: "Daniel Carter", avatar: "https://i.pravatar.cc/300?u=int1", title: "Engineering Manager" },
      { name: "Sophia Reed", avatar: "https://i.pravatar.cc/300?u=int2", title: "Senior FE" },
    ],
    preparation: {
      checklist: [
        { id: "t1", label: "CV review completed", done: true },
        { id: "t2", label: "Portfolio links checked", done: true },
        { id: "t3", label: "Interview kit shared with panel", done: false },
        { id: "t4", label: "Candidate reminder sent", done: false },
      ],
    },
    feedback: { status: "Pending" },
    lastActivityAt: "2026/01/27 10:20",
    tags: ["Top Match", "Fast Response"],
  },
  {
    id: "i2",
    candidate: {
      id: "c2",
      name: "Mehmet Kaya",
      email: "mehmet.kaya@example.com",
      avatar: "https://i.pravatar.cc/300?u=i2",
      role: "UI Designer",
      location: "Ankara, TR",
      matchScore: 84,
    },
    pipelineStage: "Interview",
    interview: {
      type: "Design",
      status: "Scheduled",
      scheduledAt: "2026/01/29 11:30",
      durationMin: 45,
      mode: "Video",
      link: "https://meet.example.com/room2",
    },
    owner: { name: "Daniel Carter", avatar: "https://i.pravatar.cc/300?u=own2", title: "Recruiter" },
    interviewers: [
      { name: "Olivia Hughes", avatar: "https://i.pravatar.cc/300?u=int3", title: "Design Lead" },
    ],
    preparation: {
      checklist: [
        { id: "t1", label: "Case study requested", done: true },
        { id: "t2", label: "Design rubric prepared", done: false },
        { id: "t3", label: "Reminder sent", done: false },
      ],
    },
    feedback: { status: "Pending" },
    lastActivityAt: "2026/01/27 18:40",
    tags: ["Portfolio Strong"],
  },
  {
    id: "i3",
    candidate: {
      id: "c3",
      name: "Derya Demir",
      email: "derya.demir@example.com",
      avatar: "https://i.pravatar.cc/300?u=i3",
      role: "Product Designer",
      location: "Izmir, TR",
      matchScore: 88,
    },
    pipelineStage: "Screening",
    interview: {
      type: "Screening",
      status: "Completed",
      scheduledAt: "2026/01/24 13:00",
      durationMin: 25,
      mode: "Video",
      link: "https://meet.example.com/room3",
    },
    owner: { name: "Sophia Reed", avatar: "https://i.pravatar.cc/300?u=own3", title: "Recruiter" },
    interviewers: [
      { name: "Sophia Reed", avatar: "https://i.pravatar.cc/300?u=own3", title: "Recruiter" },
    ],
    preparation: {
      checklist: [
        { id: "t1", label: "Screening questions ready", done: true },
        { id: "t2", label: "Candidate notes captured", done: true },
      ],
    },
    feedback: {
      status: "Submitted",
      avgScore: 4.2,
      recommendation: "Yes",
      note: "Strong product thinking, good communication, move to design interview.",
      submittedAt: "2026/01/24 14:10",
    },
    lastActivityAt: "2026/01/24 14:10",
    tags: ["Top Match"],
  },
  {
    id: "i4",
    candidate: {
      id: "c4",
      name: "Ahmet Can",
      email: "ahmet.can@example.com",
      avatar: "https://i.pravatar.cc/300?u=i4",
      role: "Backend Engineer",
      location: "Bursa, TR",
      matchScore: 76,
    },
    pipelineStage: "Offer",
    interview: {
      type: "Final",
      status: "Completed",
      scheduledAt: "2026/01/23 17:30",
      durationMin: 45,
      mode: "Video",
      link: "https://meet.example.com/room4",
    },
    owner: { name: "Olivia Hughes", avatar: "https://i.pravatar.cc/300?u=own4", title: "Recruiter" },
    interviewers: [
      { name: "Daniel Carter", avatar: "https://i.pravatar.cc/300?u=int1", title: "Engineering Manager" },
      { name: "Olivia Hughes", avatar: "https://i.pravatar.cc/300?u=own4", title: "Recruiter" },
    ],
    preparation: {
      checklist: [
        { id: "t1", label: "Offer range aligned", done: true },
        { id: "t2", label: "Final topics prepared", done: true },
      ],
    },
    feedback: { status: "Pending" },
    lastActivityAt: "2026/01/23 18:20",
    tags: ["Urgent", "Salary High"],
  },
  {
    id: "i5",
    candidate: {
      id: "c5",
      name: "Seda Acar",
      email: "seda.acar@example.com",
      avatar: "https://i.pravatar.cc/300?u=i5",
      role: "QA Engineer",
      location: "Antalya, TR",
      matchScore: 81,
    },
    pipelineStage: "Rejected",
    interview: {
      type: "Technical",
      status: "NoShow",
      scheduledAt: "2026/01/21 10:00",
      durationMin: 45,
      mode: "Video",
      link: "https://meet.example.com/room5",
    },
    owner: { name: "Melissa Jones", avatar: "https://i.pravatar.cc/300?u=own1", title: "Recruiter" },
    interviewers: [
      { name: "Sophia Reed", avatar: "https://i.pravatar.cc/300?u=int2", title: "Senior FE" },
    ],
    preparation: {
      checklist: [
        { id: "t1", label: "Reminder sent", done: true },
        { id: "t2", label: "Backup slot offered", done: true },
      ],
    },
    feedback: {
      status: "Submitted",
      avgScore: 0,
      recommendation: "No",
      note: "Candidate did not join. Follow up sent, no reply.",
      submittedAt: "2026/01/21 11:20",
    },
    lastActivityAt: "2026/01/21 11:20",
    tags: ["No Show"],
  },
  {
    id: "i6",
    candidate: {
      id: "c6",
      name: "Kerem Arslan",
      email: "kerem.arslan@example.com",
      avatar: "https://i.pravatar.cc/300?u=i6",
      role: "Full Stack Engineer",
      location: "Istanbul, TR",
      matchScore: 86,
    },
    pipelineStage: "InReview",
    interview: {
      type: "Culture",
      status: "Scheduled",
      scheduledAt: "2026/01/30 16:00",
      durationMin: 30,
      mode: "Video",
      link: "https://meet.example.com/room6",
    },
    owner: { name: "Daniel Carter", avatar: "https://i.pravatar.cc/300?u=own2", title: "Recruiter" },
    interviewers: [
      { name: "Olivia Hughes", avatar: "https://i.pravatar.cc/300?u=own4", title: "Recruiter" },
    ],
    preparation: {
      checklist: [
        { id: "t1", label: "Role expectations shared", done: true },
        { id: "t2", label: "Culture questions ready", done: false },
      ],
    },
    feedback: { status: "Pending" },
    lastActivityAt: "2026/01/26 10:05",
    tags: ["Top Match"],
  },
]

function getMatchChip(score: number) {
  if (score >= 90) return { bg: "rgba(34, 197, 94, 0.12)", color: "#16A34A" }
  if (score >= 80) return { bg: "rgba(99, 102, 241, 0.12)", color: colors.primary }
  return { bg: "rgba(245, 158, 11, 0.12)", color: "#D97706" }
}

function getStatusPill(status: InterviewStatus) {
  if (status === "Completed") return { bg: "rgba(34, 197, 94, 0.10)", color: "#16A34A", border: "rgba(34, 197, 94, 0.25)" }
  if (status === "Canceled") return { bg: "rgba(148, 163, 184, 0.14)", color: "#475569", border: "rgba(148, 163, 184, 0.30)" }
  if (status === "NoShow") return { bg: "rgba(239, 68, 68, 0.10)", color: "#DC2626", border: "rgba(239, 68, 68, 0.25)" }
  return { bg: "rgba(99, 102, 241, 0.10)", color: colors.primary, border: "rgba(99, 102, 241, 0.25)" }
}

function getTypePill(type: InterviewType) {
  if (type === "Technical") return { bg: "rgba(99, 102, 241, 0.10)", color: colors.primary, border: "rgba(99, 102, 241, 0.25)" }
  if (type === "Design") return { bg: "rgba(236, 72, 153, 0.10)", color: "#DB2777", border: "rgba(236, 72, 153, 0.25)" }
  if (type === "Culture") return { bg: "rgba(245, 158, 11, 0.12)", color: "#D97706", border: "rgba(245, 158, 11, 0.26)" }
  if (type === "Final") return { bg: "rgba(34, 197, 94, 0.10)", color: "#16A34A", border: "rgba(34, 197, 94, 0.25)" }
  return { bg: "rgba(148, 163, 184, 0.14)", color: "#475569", border: "rgba(148, 163, 184, 0.30)" }
}

function getFeedbackPill(status: FeedbackStatus) {
  if (status === "Submitted") return { bg: "rgba(34, 197, 94, 0.10)", color: "#16A34A", border: "rgba(34, 197, 94, 0.25)" }
  return { bg: "rgba(239, 68, 68, 0.08)", color: "#DC2626", border: "rgba(239, 68, 68, 0.22)" }
}

type FilterKey = "All" | "Upcoming" | "Completed" | "NeedsFeedback"

export default function InterviewsPage() {
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

  const [filter, setFilter] = React.useState<FilterKey>("All")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    let base = interviewRows

    if (filter === "Upcoming") base = base.filter((r) => r.interview.status === "Scheduled")
    if (filter === "Completed") base = base.filter((r) => r.interview.status === "Completed")
    if (filter === "NeedsFeedback") base = base.filter((r) => r.interview.status === "Completed" && r.feedback.status === "Pending")

    if (!q) return base

    return base.filter((r) => {
      return (
        r.candidate.name.toLowerCase().includes(q) ||
        r.candidate.role.toLowerCase().includes(q) ||
        r.interview.type.toLowerCase().includes(q) ||
        r.interview.status.toLowerCase().includes(q) ||
        r.candidate.location.toLowerCase().includes(q)
      )
    })
  }, [query, filter])

  const [selectedId, setSelectedId] = React.useState<string>(filtered[0]?.id ?? "")
  React.useEffect(() => {
    const exists = filtered.some((r) => r.id === selectedId)
    if (!exists) setSelectedId(filtered[0]?.id ?? "")
  }, [filtered, selectedId])

  const selected = React.useMemo(() => filtered.find((r) => r.id === selectedId) ?? filtered[0], [filtered, selectedId])

  const top = React.useMemo(() => {
    const total = interviewRows.length
    const upcoming = interviewRows.filter((r) => r.interview.status === "Scheduled").length
    const completed = interviewRows.filter((r) => r.interview.status === "Completed").length
    const needsFeedback = interviewRows.filter((r) => r.interview.status === "Completed" && r.feedback.status === "Pending").length
    return { total, upcoming, completed, needsFeedback }
  }, [])

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
      boxShadow: active ? "inset 0px 0px 10px 2px rgba(99, 102, 241, 0.22)" : "none",
      transition: "all 0.15s ease",
      _hover: active ? undefined : { bg: "rgba(99, 102, 241, 0.06)", color: colors.primary },
    } as const
  }

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
            const isActive = item.label === "Interviews"
            return (
              <Flex
                key={item.label}
                alignItems="center"
                gap="10px"
                mb="20px"
                bg={isActive ? "linear-gradient(to left, rgba(99, 102, 241, 0.3) 0%, transparent 100%)" : "transparent"}
                borderRadius="12px"
                p="6px"
                _hover={{ cursor: "pointer", bg: "rgba(99, 102, 241, 0.1)" }}
                onClick={() => onSidebarNav(item.label)}
              >
                <IconButton aria-label={item.label} bg="transparent" color={isActive ? colors.primary : colors.secondaryText}>
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
              Interviews
            </Text>
            <Text fontSize="14px" color={colors.secondaryText} mt="6px">
              Schedule, run, and capture feedback in one place
            </Text>
          </Box>

          <Flex gap="10px" alignItems="center" flexWrap="wrap">
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
              Total {top.total}
            </Box>

            <Box
              borderRadius="999px"
              px="12px"
              py="10px"
              bg="rgba(99, 102, 241, 0.08)"
              border="1px solid"
              borderColor="rgba(99, 102, 241, 0.22)"
              fontSize="13px"
              fontWeight="800"
              color={colors.primary}
            >
              Upcoming {top.upcoming}
            </Box>

            <Box
              borderRadius="999px"
              px="12px"
              py="10px"
              bg="rgba(34, 197, 94, 0.10)"
              border="1px solid"
              borderColor="rgba(34, 197, 94, 0.25)"
              fontSize="13px"
              fontWeight="800"
              color="#16A34A"
            >
              Completed {top.completed}
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
              Needs feedback {top.needsFeedback}
            </Box>
          </Flex>
        </Flex>

        <Grid templateColumns="1.15fr 0.85fr" gap="20px" mt="20px" alignItems="start">
          <Box bg="white" borderRadius={radius.xl} p="20px" border="1px solid" borderColor="gray.200">
            <Flex gap="8px" flexWrap="wrap" alignItems="center">
              <Text onClick={() => setFilter("All")} {...tabStyle(filter === "All")}>
                All
              </Text>
              <Text onClick={() => setFilter("Upcoming")} {...tabStyle(filter === "Upcoming")}>
                Upcoming
              </Text>
              <Text onClick={() => setFilter("Completed")} {...tabStyle(filter === "Completed")}>
                Completed
              </Text>
              <Text onClick={() => setFilter("NeedsFeedback")} {...tabStyle(filter === "NeedsFeedback")}>
                Needs feedback
              </Text>
            </Flex>

            <Flex
              bg="#F9FAFB"
              px="12px"
              py="10px"
              borderRadius={radius.m}
              border="1px solid"
              borderColor="gray.100"
              fontWeight="900"
              color="gray.600"
              mt="18px"
            >
              <Text w="38%">Candidate</Text>
              <Text w="22%">When</Text>
              <Text w="16%">Type</Text>
              <Text w="14%">Status</Text>
              <Text w="10%" textAlign="right">
                Feedback
              </Text>
            </Flex>

            {filtered.length === 0 ? (
              <Box mt="14px" p="14px" border="1px solid" borderColor="gray.100" borderRadius={radius.m} bg="white">
                <Text fontSize="13px" color={colors.ghostText} fontWeight="800">
                  No interviews found
                </Text>
              </Box>
            ) : (
              filtered.map((row, idx) => {
                const isSelected = row.id === selectedId
                const typePill = getTypePill(row.interview.type)
                const statusPill = getStatusPill(row.interview.status)
                const feedbackPill = getFeedbackPill(row.feedback.status)

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
                      <Flex w="38%" alignItems="center" gap="10px" minW={0}>
                        <Avatar.Root size="sm">
                          <Avatar.Fallback name={row.candidate.name} />
                          <Avatar.Image src={row.candidate.avatar} />
                        </Avatar.Root>
                        <Box minW={0}>
                          <Text fontSize="15px" fontWeight="900">
                            {row.candidate.name}
                          </Text>
                          <Text fontSize="13px" color={colors.secondaryText}>
                            {row.candidate.role}
                          </Text>
                        </Box>
                      </Flex>

                      <Box w="22%" minW={0}>
                        <Text fontSize="13px" fontWeight="900" color={colors.text}>
                          {row.interview.scheduledAt}
                        </Text>
                        <Text fontSize="12px" color={colors.secondaryText}>
                          {row.interview.durationMin} min
                        </Text>
                      </Box>

                      <Flex w="16%" alignItems="center">
                        <Box
                          borderRadius="999px"
                          px="10px"
                          py="6px"
                          bg={typePill.bg}
                          border="1px solid"
                          borderColor={typePill.border}
                          fontSize="12px"
                          fontWeight="900"
                          color={typePill.color}
                        >
                          {row.interview.type}
                        </Box>
                      </Flex>

                      <Flex w="14%" alignItems="center">
                        <Box
                          borderRadius="999px"
                          px="10px"
                          py="6px"
                          bg={statusPill.bg}
                          border="1px solid"
                          borderColor={statusPill.border}
                          fontSize="12px"
                          fontWeight="900"
                          color={statusPill.color}
                        >
                          {row.interview.status}
                        </Box>
                      </Flex>

                      <Flex w="10%" justifyContent="flex-end">
                        <Box
                          borderRadius="999px"
                          px="10px"
                          py="6px"
                          bg={feedbackPill.bg}
                          border="1px solid"
                          borderColor={feedbackPill.border}
                          fontSize="12px"
                          fontWeight="900"
                          color={feedbackPill.color}
                        >
                          {row.feedback.status}
                        </Box>
                      </Flex>
                    </Flex>

                    {idx !== filtered.length - 1 ? <Box h="1px" bg="gray.100" w="100%" mt="10px" /> : null}
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
                  Select an interview
                </Text>
              ) : (
                <>
                  <Flex justifyContent="space-between" alignItems="center" gap="14px">
                    <Flex alignItems="center" gap="14px" minW={0}>
                      <Avatar.Root boxSize="90px">
                        <Avatar.Fallback name={selected.candidate.name} />
                        <Avatar.Image src={selected.candidate.avatar} />
                      </Avatar.Root>

                      <Box minW={0}>
                        <Text fontSize="20px" fontWeight="900">
                          {selected.candidate.name}
                        </Text>
                        <Text fontSize="14px" color={colors.secondaryText} fontWeight="800">
                          {selected.candidate.role}
                        </Text>
                        <Text fontSize="13px" color={colors.ghostText} mt="6px">
                          {selected.candidate.email}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex direction="column" alignItems="flex-end" gap="8px">
                      <Box
                        borderRadius="999px"
                        px="12px"
                        py="8px"
                        bg={getMatchChip(selected.candidate.matchScore).bg}
                        fontSize="12px"
                        fontWeight="900"
                        color={getMatchChip(selected.candidate.matchScore).color}
                      >
                        Match {selected.candidate.matchScore}%
                      </Box>

                      <Flex alignItems="center" gap="6px" cursor="pointer">
                        <Text fontSize="12px" color={colors.secondaryText} fontWeight="900">
                          More
                        </Text>
                        <FiChevronDown />
                      </Flex>
                    </Flex>
                  </Flex>

                  <Box h="1px" bg="gray.100" w="100%" mt="16px" />

                  <VStack align="stretch" mt="16px" gap="12px">
                    <Grid templateColumns="1fr 1fr" gap="12px">
                      <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                        <Text fontSize="12px" color={colors.ghostText}>
                          When
                        </Text>
                        <Text fontSize="13px" fontWeight="900" color={colors.text} mt="6px">
                          {selected.interview.scheduledAt}
                        </Text>
                        <Text fontSize="12px" color={colors.secondaryText} mt="4px">
                          {selected.interview.durationMin} min, {selected.interview.mode}
                        </Text>
                      </Box>

                      <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                        <Text fontSize="12px" color={colors.ghostText}>
                          Status
                        </Text>
                        <Flex mt="6px" gap="8px" flexWrap="wrap" alignItems="center">
                          <Box
                            borderRadius="999px"
                            px="10px"
                            py="6px"
                            bg={getStatusPill(selected.interview.status).bg}
                            border="1px solid"
                            borderColor={getStatusPill(selected.interview.status).border}
                            fontSize="12px"
                            fontWeight="900"
                            color={getStatusPill(selected.interview.status).color}
                          >
                            {selected.interview.status}
                          </Box>
                          <Box
                            borderRadius="999px"
                            px="10px"
                            py="6px"
                            bg={getTypePill(selected.interview.type).bg}
                            border="1px solid"
                            borderColor={getTypePill(selected.interview.type).border}
                            fontSize="12px"
                            fontWeight="900"
                            color={getTypePill(selected.interview.type).color}
                          >
                            {selected.interview.type}
                          </Box>
                        </Flex>
                      </Box>

                      <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                        <Text fontSize="12px" color={colors.ghostText}>
                          Owner
                        </Text>
                        <Flex alignItems="center" gap="10px" mt="6px">
                          <Avatar.Root size="xs">
                            <Avatar.Fallback name={selected.owner.name} />
                            <Avatar.Image src={selected.owner.avatar} />
                          </Avatar.Root>
                          <Box>
                            <Text fontSize="13px" fontWeight="900" color={colors.text}>
                              {selected.owner.name}
                            </Text>
                            <Text fontSize="12px" color={colors.secondaryText}>
                              {selected.owner.title}
                            </Text>
                          </Box>
                        </Flex>
                      </Box>

                      <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                        <Text fontSize="12px" color={colors.ghostText}>
                          Join
                        </Text>
                        {selected.interview.link ? (
                          <Link
                            href={selected.interview.link}
                            fontSize="13px"
                            fontWeight="900"
                            color={colors.primary}
                            mt="6px"
                            display="inline-block"
                          >
                            Open meeting
                          </Link>
                        ) : (
                          <Text fontSize="13px" fontWeight="900" color={colors.text} mt="6px">
                            No link
                          </Text>
                        )}
                        {selected.interview.room ? (
                          <Text fontSize="12px" color={colors.secondaryText} mt="4px">
                            {selected.interview.room}
                          </Text>
                        ) : null}
                      </Box>
                    </Grid>

                    <Box>
                      <Text fontSize="13px" fontWeight="900" color={colors.text}>
                        Interviewers
                      </Text>
                      <Flex gap="10px" flexWrap="wrap" mt="8px">
                        {selected.interviewers.map((p) => (
                          <Flex
                            key={p.name}
                            alignItems="center"
                            gap="10px"
                            border="1px solid"
                            borderColor="gray.100"
                            bg="gray.50"
                            borderRadius="999px"
                            px="10px"
                            py="8px"
                          >
                            <Avatar.Root size="xs">
                              <Avatar.Fallback name={p.name} />
                              <Avatar.Image src={p.avatar} />
                            </Avatar.Root>
                            <Box>
                              <Text fontSize="12px" fontWeight="900" color={colors.text} lineHeight="1.1">
                                {p.name}
                              </Text>
                              <Text fontSize="11px" color={colors.secondaryText} lineHeight="1.1">
                                {p.title}
                              </Text>
                            </Box>
                          </Flex>
                        ))}
                      </Flex>
                    </Box>

                    <Box>
                      <Text fontSize="13px" fontWeight="900" color={colors.text}>
                        Preparation
                      </Text>

                      <VStack align="stretch" mt="10px" gap="8px">
                        {selected.preparation.checklist.map((c) => (
                          <Flex
                            key={c.id}
                            justifyContent="space-between"
                            alignItems="center"
                            border="1px solid"
                            borderColor="gray.100"
                            borderRadius={radius.m}
                            p="12px"
                          >
                            <Text fontSize="13px" fontWeight="900" color={c.done ? "#16A34A" : colors.text}>
                              {c.label}
                            </Text>
                            <Box
                              borderRadius="999px"
                              px="10px"
                              py="6px"
                              bg={c.done ? "rgba(34, 197, 94, 0.10)" : "rgba(148, 163, 184, 0.14)"}
                              border="1px solid"
                              borderColor={c.done ? "rgba(34, 197, 94, 0.25)" : "rgba(148, 163, 184, 0.30)"}
                              fontSize="12px"
                              fontWeight="900"
                              color={c.done ? "#16A34A" : "#475569"}
                            >
                              {c.done ? "Done" : "Todo"}
                            </Box>
                          </Flex>
                        ))}
                      </VStack>
                    </Box>

                    <Box>
                      <Text fontSize="13px" fontWeight="900" color={colors.text}>
                        Feedback
                      </Text>

                      <Box mt="10px" border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                        <Flex justifyContent="space-between" alignItems="center" gap="10px" flexWrap="wrap">
                          <Box>
                            <Text fontSize="12px" color={colors.ghostText}>
                              Status
                            </Text>
                            <Box
                              mt="6px"
                              borderRadius="999px"
                              px="10px"
                              py="6px"
                              bg={getFeedbackPill(selected.feedback.status).bg}
                              border="1px solid"
                              borderColor={getFeedbackPill(selected.feedback.status).border}
                              fontSize="12px"
                              fontWeight="900"
                              color={getFeedbackPill(selected.feedback.status).color}
                              display="inline-block"
                            >
                              {selected.feedback.status}
                            </Box>
                          </Box>

                          <Box textAlign="right">
                            <Text fontSize="12px" color={colors.ghostText}>
                              Last activity
                            </Text>
                            <Text fontSize="13px" fontWeight="900" color={colors.text} mt="6px">
                              {selected.lastActivityAt}
                            </Text>
                          </Box>
                        </Flex>

                        {selected.feedback.status === "Submitted" ? (
                          <Box mt="12px">
                            <Flex gap="10px" flexWrap="wrap">
                              {typeof selected.feedback.avgScore === "number" ? (
                                <Box
                                  borderRadius="999px"
                                  px="10px"
                                  py="6px"
                                  bg="gray.50"
                                  border="1px solid"
                                  borderColor="gray.200"
                                  fontSize="12px"
                                  fontWeight="900"
                                  color="gray.700"
                                >
                                  Avg {selected.feedback.avgScore}
                                </Box>
                              ) : null}

                              {selected.feedback.recommendation ? (
                                <Box
                                  borderRadius="999px"
                                  px="10px"
                                  py="6px"
                                  bg="gray.50"
                                  border="1px solid"
                                  borderColor="gray.200"
                                  fontSize="12px"
                                  fontWeight="900"
                                  color="gray.700"
                                >
                                  {selected.feedback.recommendation}
                                </Box>
                              ) : null}

                              {selected.feedback.submittedAt ? (
                                <Box
                                  borderRadius="999px"
                                  px="10px"
                                  py="6px"
                                  bg="gray.50"
                                  border="1px solid"
                                  borderColor="gray.200"
                                  fontSize="12px"
                                  fontWeight="900"
                                  color="gray.700"
                                >
                                  {selected.feedback.submittedAt}
                                </Box>
                              ) : null}
                            </Flex>

                            {selected.feedback.note ? (
                              <Text fontSize="13px" color={colors.secondaryText} mt="10px" fontWeight="700">
                                {selected.feedback.note}
                              </Text>
                            ) : null}
                          </Box>
                        ) : (
                          <Text fontSize="13px" color={colors.secondaryText} mt="12px" fontWeight="700">
                            Feedback not submitted yet
                          </Text>
                        )}
                      </Box>
                    </Box>
                  </VStack>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  )
}

export { interviewRows }
