"use client"

import * as React from "react"
import { Box, Grid, Text, Flex, IconButton, Link, Input, InputGroup, VStack } from "@chakra-ui/react"
import { ViewIcon, SearchIcon, RepeatIcon, CalendarIcon, SettingsIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { LuSearch } from "react-icons/lu"
import { FiBell, FiMessageSquare, FiChevronDown } from "react-icons/fi"
import { Avatar } from "@chakra-ui/react"
import Button from "../ui/button"
import { Users, users as usersData } from "../ui/users"
import { useRouter } from "next/navigation"



type TabKey = "overview" | "activities" | "emails" | "files"

type CandidateRow = {
  id: string
  candidate: string
  role: string
  matchScore: number
  location: string
  experienceLevel: "Junior" | "Mid" | "Senior"
  workType: "Remote" | "Hybrid" | "Onsite"
  email: string
  applicationDate: string
  avatar: string

  overview: {
    tags: string[]
    phone: string
    sources: {
      primary: "LinkedIn" | "Referral" | "Website" | "Agency" | "Portfolio"
      detail?: string
    }
    social: {
      linkedin?: string
      github?: string
      behance?: string
      dribbble?: string
      website?: string
    }
    headline: string
    yearsOfExperience: number
    currentCompany: string
    salaryExpectation: string
    noticePeriod: string
    languages: string[]
    timezone: string
  }

  activities: Array<{
    id: string
    type: string
    title: string
    description?: string
    at: string
    by: {
      name: string
      avatar?: string
    }
    meta?: {
      fromStage?: string
      toStage?: string
      interviewType?: "Phone Screen" | "Technical" | "Onsite" | "HR"
      interviewAt?: string
      fileName?: string
      emailSubject?: string
    }
  }>

  emails: Array<{
    id: string
    subject: string
    preview: string
    status: string
    at: string
    from: { name: string; email: string }
    to: { name: string; email: string }
    threadId: string
    metrics?: { openedAt?: string; repliedAt?: string }
  }>

  myFiles: Array<{
    id: string
    name: string
    type: string
    size: string
    uploadedAt: string
    uploadedBy: string
    url: string
  }>
}

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

const rows: CandidateRow[] = [
  {
    id: "c1",
    candidate: "Elif Yilmaz",
    role: "Frontend Engineer",
    matchScore: 92,
    location: "Istanbul, TR",
    experienceLevel: "Mid",
    workType: "Hybrid",
    email: "elif.yilmaz@example.com",
    applicationDate: "2023-06-15 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user1",
    overview: {
      tags: ["Top Match", "Fast Response", "Portfolio Strong"],
      phone: "+90 532 111 22 33",
      sources: { primary: "LinkedIn", detail: "Inbound application" },
      social: {
        linkedin: "linkedin.com/in/elif-yilmaz",
        github: "github.com/elif-yilmaz",
        website: "elifyilmaz.dev",
      },
      headline: "React and Next.js focused frontend engineer building clean dashboards",
      yearsOfExperience: 4,
      currentCompany: "BluePeak Studio",
      salaryExpectation: "€3.5k - €4.2k",
      noticePeriod: "2 weeks",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a1",
        type: "profile_viewed",
        title: "Profile viewed",
        description: "Recruiter opened candidate profile from Candidates list",
        at: "2023-06-16 10:12",
        by: { name: "Melissa Jones" },
      },
      {
        id: "a2",
        type: "status_change",
        title: "Moved to Interview",
        description: "Shortlisted after portfolio review",
        at: "2023-06-16 11:05",
        by: { name: "Melissa Jones" },
        meta: { fromStage: "Screening", toStage: "Interview" },
      },
      {
        id: "a3",
        type: "interview_scheduled",
        title: "Interview scheduled",
        description: "Technical interview with the team",
        at: "2023-06-16 11:20",
        by: { name: "Melissa Jones" },
        meta: { interviewType: "Technical", interviewAt: "2023-06-18 15:00" },
      },
      {
        id: "a4",
        type: "file_uploaded",
        title: "File uploaded",
        description: "Updated CV uploaded by recruiter",
        at: "2023-06-16 12:10",
        by: { name: "Melissa Jones" },
        meta: { fileName: "Elif_Yilmaz_CV.pdf" },
      },
      {
        id: "a5",
        type: "note",
        title: "Internal note",
        description: "Strong TypeScript, good design sense, ask about SSR patterns and testing",
        at: "2023-06-16 12:30",
        by: { name: "Melissa Jones" },
      },
    ],
    emails: [
      {
        id: "e1",
        subject: "Next step for Frontend Engineer role",
        preview: "Hi Elif, thanks for applying. Can we schedule a technical interview this week?",
        status: "opened",
        at: "2023-06-16 11:22",
        from: { name: "Melissa Jones", email: "melissa.jones@tailorcv.io" },
        to: { name: "Elif Yilmaz", email: "elif.yilmaz@example.com" },
        threadId: "t1",
        metrics: { openedAt: "2023-06-16 11:44" },
      },
      {
        id: "e2",
        subject: "Interview details",
        preview: "Here is the meeting link and topics we will cover. Looking forward to it.",
        status: "delivered",
        at: "2023-06-16 11:55",
        from: { name: "Melissa Jones", email: "melissa.jones@tailorcv.io" },
        to: { name: "Elif Yilmaz", email: "elif.yilmaz@example.com" },
        threadId: "t1",
      },
    ],
    myFiles: [
      {
        id: "f1",
        name: "Elif_Yilmaz_CV.pdf",
        type: "CV",
        size: "312 KB",
        uploadedAt: "2023-06-16 12:10",
        uploadedBy: "Melissa Jones",
        url: "/mock/files/Elif_Yilmaz_CV.pdf",
      },
      {
        id: "f2",
        name: "Portfolio_Link.txt",
        type: "Portfolio",
        size: "1 KB",
        uploadedAt: "2023-06-15 09:10",
        uploadedBy: "System",
        url: "/mock/files/Portfolio_Link.txt",
      },
    ],
  },
  {
    id: "c2",
    candidate: "Mehmet Kaya",
    role: "UI Designer",
    matchScore: 84,
    location: "Ankara, TR",
    experienceLevel: "Junior",
    workType: "Remote",
    email: "mehmet.kaya@example.com",
    applicationDate: "2023-06-15 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user2",
    overview: {
      tags: ["Portfolio Strong", "Remote Ready", "Needs Review"],
      phone: "+90 535 444 55 66",
      sources: { primary: "Portfolio", detail: "Behance inbound" },
      social: {
        behance: "behance.net/mehmetkaya",
        dribbble: "dribbble.com/mehmetkaya",
        website: "mehmetkaya.design",
      },
      headline: "UI designer focused on SaaS dashboards, clean components and prototyping",
      yearsOfExperience: 2,
      currentCompany: "Freelance",
      salaryExpectation: "€2.0k - €2.6k",
      noticePeriod: "Immediate",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a6",
        type: "status_change",
        title: "Moved to Screening",
        description: "Portfolio looks good, check typography and spacing consistency",
        at: "2023-06-16 09:20",
        by: { name: "Daniel Carter" },
        meta: { fromStage: "Applied", toStage: "Screening" },
      },
      {
        id: "a7",
        type: "note",
        title: "Internal note",
        description: "Ask for a dashboard case study and component library approach",
        at: "2023-06-16 09:35",
        by: { name: "Daniel Carter" },
      },
      {
        id: "a8",
        type: "email",
        title: "Email sent",
        description: "Requested a short case study link",
        at: "2023-06-16 09:40",
        by: { name: "Daniel Carter" },
        meta: { emailSubject: "Quick follow up: UI case study" },
      },
    ],
    emails: [
      {
        id: "e3",
        subject: "Quick follow up: UI case study",
        preview: "Hi Mehmet, could you share a short dashboard case study and your role in it?",
        status: "delivered",
        at: "2023-06-16 09:40",
        from: { name: "Daniel Carter", email: "daniel.carter@tailorcv.io" },
        to: { name: "Mehmet Kaya", email: "mehmet.kaya@example.com" },
        threadId: "t2",
      },
    ],
    myFiles: [
      {
        id: "f3",
        name: "MehmetKaya_Portfolio.pdf",
        type: "Portfolio",
        size: "2.1 MB",
        uploadedAt: "2023-06-15 08:45",
        uploadedBy: "System",
        url: "/mock/files/MehmetKaya_Portfolio.pdf",
      },
    ],
  },
  {
    id: "c3",
    candidate: "Derya Demir",
    role: "Product Designer",
    matchScore: 88,
    location: "Izmir, TR",
    experienceLevel: "Mid",
    workType: "Remote",
    email: "derya.demir@example.com",
    applicationDate: "2023-04-24 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user3",
    overview: {
      tags: ["Top Match", "Portfolio Strong", "Remote Ready"],
      phone: "+90 539 777 88 99",
      sources: { primary: "LinkedIn", detail: "Direct message outreach" },
      social: {
        linkedin: "linkedin.com/in/derya-demir",
        behance: "behance.net/deryademir",
        website: "deryademir.design",
      },
      headline: "Product designer experienced in discovery, UX flows, and design systems",
      yearsOfExperience: 5,
      currentCompany: "NorthWave",
      salaryExpectation: "€3.2k - €3.9k",
      noticePeriod: "1 month",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a9",
        type: "profile_viewed",
        title: "Profile viewed",
        description: "Viewed from search results",
        at: "2023-04-25 13:10",
        by: { name: "Sophia Reed" },
      },
      {
        id: "a10",
        type: "note",
        title: "Internal note",
        description: "Strong DS thinking, ask about handoff with devs and metrics",
        at: "2023-04-25 13:40",
        by: { name: "Sophia Reed" },
      },
    ],
    emails: [
      {
        id: "e4",
        subject: "Product Designer role: quick intro",
        preview: "Hi Derya, would love to learn more about your recent product work. Are you free this week?",
        status: "opened",
        at: "2023-04-25 14:05",
        from: { name: "Sophia Reed", email: "sophia.reed@tailorcv.io" },
        to: { name: "Derya Demir", email: "derya.demir@example.com" },
        threadId: "t3",
        metrics: { openedAt: "2023-04-25 14:33" },
      },
    ],
    myFiles: [
      {
        id: "f4",
        name: "DeryaDemir_Resume.pdf",
        type: "CV",
        size: "402 KB",
        uploadedAt: "2023-04-24 10:10",
        uploadedBy: "System",
        url: "/mock/files/DeryaDemir_Resume.pdf",
      },
      {
        id: "f5",
        name: "DeryaDemir_CaseStudy.pdf",
        type: "Case Study",
        size: "3.4 MB",
        uploadedAt: "2023-04-24 10:12",
        uploadedBy: "System",
        url: "/mock/files/DeryaDemir_CaseStudy.pdf",
      },
    ],
  },
  {
    id: "c4",
    candidate: "Ahmet Can",
    role: "Backend Engineer",
    matchScore: 76,
    location: "Bursa, TR",
    experienceLevel: "Senior",
    workType: "Onsite",
    email: "ahmet.can@example.com",
    applicationDate: "2023-06-15 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user4",
    overview: {
      tags: ["Needs Review"],
      phone: "+90 530 222 33 44",
      sources: { primary: "Website", detail: "Career page form" },
      social: {
        linkedin: "linkedin.com/in/ahmet-can",
        github: "github.com/ahmetcan",
      },
      headline: "Backend engineer specialized in APIs, databases, and scalable systems",
      yearsOfExperience: 8,
      currentCompany: "CoreStack",
      salaryExpectation: "€4.8k - €6.0k",
      noticePeriod: "2 months",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a11",
        type: "status_change",
        title: "Moved to Offer",
        description: "Strong system design, good ownership",
        at: "2023-06-20 18:05",
        by: { name: "Olivia Hughes" },
        meta: { fromStage: "Interview", toStage: "Offer" },
      },
      {
        id: "a12",
        type: "email",
        title: "Offer sent",
        description: "Offer package shared with candidate",
        at: "2023-06-20 18:20",
        by: { name: "Olivia Hughes" },
        meta: { emailSubject: "Offer details" },
      },
    ],
    emails: [
      {
        id: "e5",
        subject: "Offer details",
        preview: "Hi Ahmet, attached you will find the offer details and next steps.",
        status: "delivered",
        at: "2023-06-20 18:20",
        from: { name: "Olivia Hughes", email: "olivia.hughes@tailorcv.io" },
        to: { name: "Ahmet Can", email: "ahmet.can@example.com" },
        threadId: "t4",
      },
    ],
    myFiles: [
      {
        id: "f6",
        name: "AhmetCan_CV.pdf",
        type: "CV",
        size: "520 KB",
        uploadedAt: "2023-06-15 10:02",
        uploadedBy: "System",
        url: "/mock/files/AhmetCan_CV.pdf",
      },
      {
        id: "f7",
        name: "Offer_AhmetCan.pdf",
        type: "Certificate",
        size: "180 KB",
        uploadedAt: "2023-06-20 18:19",
        uploadedBy: "Olivia Hughes",
        url: "/mock/files/Offer_AhmetCan.pdf",
      },
    ],
  },
  {
    id: "c5",
    candidate: "Seda Acar",
    role: "QA Engineer",
    matchScore: 81,
    location: "Antalya, TR",
    experienceLevel: "Mid",
    workType: "Hybrid",
    email: "seda.acar@example.com",
    applicationDate: "2023-06-15 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user5",
    overview: {
      tags: ["Fast Response", "Remote Ready"],
      phone: "+90 541 123 45 67",
      sources: { primary: "Agency", detail: "Agency shortlist" },
      social: {
        linkedin: "linkedin.com/in/seda-acar",
        github: "github.com/sedaacar",
      },
      headline: "QA engineer focused on automation, reliability, and release confidence",
      yearsOfExperience: 5,
      currentCompany: "Testify Labs",
      salaryExpectation: "€3.0k - €3.6k",
      noticePeriod: "3 weeks",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a13",
        type: "status_change",
        title: "Moved to Interview",
        description: "Good automation background, schedule a technical QA interview",
        at: "2023-06-17 12:05",
        by: { name: "Melissa Jones" },
        meta: { fromStage: "Screening", toStage: "Interview" },
      },
    ],
    emails: [
      {
        id: "e6",
        subject: "QA Interview scheduling",
        preview: "Hi Seda, can you share your availability for a QA automation interview?",
        status: "sent",
        at: "2023-06-17 12:10",
        from: { name: "Melissa Jones", email: "melissa.jones@tailorcv.io" },
        to: { name: "Seda Acar", email: "seda.acar@example.com" },
        threadId: "t5",
      },
    ],
    myFiles: [
      {
        id: "f8",
        name: "SedaAcar_CV.pdf",
        type: "CV",
        size: "355 KB",
        uploadedAt: "2023-06-15 10:01",
        uploadedBy: "System",
        url: "/mock/files/SedaAcar_CV.pdf",
      },
    ],
  },
  {
    id: "c6",
    candidate: "Kerem Arslan",
    role: "Full Stack Engineer",
    matchScore: 86,
    location: "Istanbul, TR",
    experienceLevel: "Mid",
    workType: "Hybrid",
    email: "kerem.arslan@example.com",
    applicationDate: "2023-06-15 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user6",
    overview: {
      tags: ["Top Match", "Fast Response", "Remote Ready"],
      phone: "+90 534 999 88 77",
      sources: { primary: "Website", detail: "Inbound application" },
      social: {
        linkedin: "linkedin.com/in/kerem-arslan",
        github: "github.com/keremarslan",
        website: "keremarslan.dev",
      },
      headline: "Full stack engineer building fast web apps with React, Node, and clean DX",
      yearsOfExperience: 5,
      currentCompany: "CloudCraft",
      salaryExpectation: "€3.8k - €4.6k",
      noticePeriod: "1 month",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a14",
        type: "profile_viewed",
        title: "Profile viewed",
        description: "Viewed from role filter",
        at: "2023-06-16 08:42",
        by: { name: "Daniel Carter" },
      },
      {
        id: "a15",
        type: "note",
        title: "Internal note",
        description: "Good breadth, ask about ownership and production incidents",
        at: "2023-06-16 09:10",
        by: { name: "Daniel Carter" },
      },
      {
        id: "a16",
        type: "email",
        title: "Email sent",
        description: "Requested availability for a short call",
        at: "2023-06-16 09:15",
        by: { name: "Daniel Carter" },
        meta: { emailSubject: "Availability for a quick call" },
      },
    ],
    emails: [
      {
        id: "e7",
        subject: "Availability for a quick call",
        preview: "Hi Kerem, are you available for a 15 minute intro call this week?",
        status: "opened",
        at: "2023-06-16 09:15",
        from: { name: "Daniel Carter", email: "daniel.carter@tailorcv.io" },
        to: { name: "Kerem Arslan", email: "kerem.arslan@example.com" },
        threadId: "t6",
        metrics: { openedAt: "2023-06-16 10:01" },
      },
    ],
    myFiles: [
      {
        id: "f9",
        name: "KeremArslan_CV.pdf",
        type: "CV",
        size: "410 KB",
        uploadedAt: "2023-06-15 10:03",
        uploadedBy: "System",
        url: "/mock/files/KeremArslan_CV.pdf",
      },
      {
        id: "f10",
        name: "KeremArslan_Portfolio.pdf",
        type: "Portfolio",
        size: "1.2 MB",
        uploadedAt: "2023-06-15 10:05",
        uploadedBy: "System",
        url: "/mock/files/KeremArslan_Portfolio.pdf",
      },
    ],
  },
  {
    id: "c7",
    candidate: "Zeynep Koc",
    role: "Data Analyst",
    matchScore: 79,
    location: "Ankara, TR",
    experienceLevel: "Junior",
    workType: "Remote",
    email: "zeynep.koc@example.com",
    applicationDate: "2023-08-24 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user7",
    overview: {
      tags: ["Remote Ready", "Needs Review"],
      phone: "+90 538 222 11 00",
      sources: { primary: "LinkedIn", detail: "Inbound application" },
      social: {
        linkedin: "linkedin.com/in/zeynep-koc",
        github: "github.com/zeynepkoc",
      },
      headline: "Junior analyst with strong SQL basics and clear reporting skills",
      yearsOfExperience: 1,
      currentCompany: "Internship",
      salaryExpectation: "€1.6k - €2.2k",
      noticePeriod: "Immediate",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a17",
        type: "note",
        title: "Internal note",
        description: "Ask for a small take home analysis or past report sample",
        at: "2023-08-25 10:05",
        by: { name: "Sophia Reed" },
      },
    ],
    emails: [
      {
        id: "e8",
        subject: "Data Analyst: quick screening call",
        preview: "Hi Zeynep, are you available for a short call to discuss your application?",
        status: "delivered",
        at: "2023-08-25 10:10",
        from: { name: "Sophia Reed", email: "sophia.reed@tailorcv.io" },
        to: { name: "Zeynep Koc", email: "zeynep.koc@example.com" },
        threadId: "t7",
      },
    ],
    myFiles: [
      {
        id: "f11",
        name: "ZeynepKoc_CV.pdf",
        type: "CV",
        size: "280 KB",
        uploadedAt: "2023-08-24 09:20",
        uploadedBy: "System",
        url: "/mock/files/ZeynepKoc_CV.pdf",
      },
    ],
  },
  {
    id: "c8",
    candidate: "Mert Sahin",
    role: "DevOps Engineer",
    matchScore: 83,
    location: "Izmir, TR",
    experienceLevel: "Senior",
    workType: "Remote",
    email: "mert.sahin@example.com",
    applicationDate: "2023-06-15 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user8",
    overview: {
      tags: ["Top Match", "Remote Ready"],
      phone: "+90 532 909 09 09",
      sources: { primary: "Referral", detail: "Referred by engineer" },
      social: {
        linkedin: "linkedin.com/in/mert-sahin",
        github: "github.com/mertsahin",
      },
      headline: "Senior DevOps engineer focused on reliability, CI CD, and infrastructure as code",
      yearsOfExperience: 9,
      currentCompany: "InfraForge",
      salaryExpectation: "€5.2k - €6.5k",
      noticePeriod: "2 months",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a18",
        type: "status_change",
        title: "Moved to Interview",
        description: "Schedule infra deep dive interview",
        at: "2023-06-16 17:10",
        by: { name: "Olivia Hughes" },
        meta: { fromStage: "Screening", toStage: "Interview" },
      },
      {
        id: "a19",
        type: "interview_scheduled",
        title: "Interview scheduled",
        description: "Onsite interview with infra lead",
        at: "2023-06-16 17:18",
        by: { name: "Olivia Hughes" },
        meta: { interviewType: "Technical", interviewAt: "2023-06-19 13:00" },
      },
    ],
    emails: [
      {
        id: "e9",
        subject: "DevOps interview scheduling",
        preview: "Hi Mert, can you confirm your availability for the interview next week?",
        status: "opened",
        at: "2023-06-16 17:20",
        from: { name: "Olivia Hughes", email: "olivia.hughes@tailorcv.io" },
        to: { name: "Mert Sahin", email: "mert.sahin@example.com" },
        threadId: "t8",
        metrics: { openedAt: "2023-06-16 17:42" },
      },
    ],
    myFiles: [
      {
        id: "f12",
        name: "MertSahin_CV.pdf",
        type: "CV",
        size: "510 KB",
        uploadedAt: "2023-06-15 10:04",
        uploadedBy: "System",
        url: "/mock/files/MertSahin_CV.pdf",
      },
      {
        id: "f13",
        name: "Certificates_MertSahin.pdf",
        type: "Certificate",
        size: "650 KB",
        uploadedAt: "2023-06-15 10:07",
        uploadedBy: "System",
        url: "/mock/files/Certificates_MertSahin.pdf",
      },
    ],
  },
  {
    id: "c9",
    candidate: "Ayse Nur Kaya",
    role: "Product Manager",
    matchScore: 74,
    location: "Bursa, TR",
    experienceLevel: "Mid",
    workType: "Onsite",
    email: "ayse.nur.kaya@example.com",
    applicationDate: "2023-06-15 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user9",
    overview: {
      tags: ["Needs Review"],
      phone: "+90 533 313 31 31",
      sources: { primary: "LinkedIn", detail: "Inbound application" },
      social: {
        linkedin: "linkedin.com/in/ayse-nur-kaya",
        website: "aysenurkaya.com",
      },
      headline: "PM with strong stakeholder management and clear product thinking",
      yearsOfExperience: 6,
      currentCompany: "Productory",
      salaryExpectation: "€3.8k - €4.7k",
      noticePeriod: "1 month",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a20",
        type: "note",
        title: "Internal note",
        description: "Ask about roadmap process and metrics ownership",
        at: "2023-06-16 15:30",
        by: { name: "Melissa Jones" },
      },
      {
        id: "a21",
        type: "email",
        title: "Email sent",
        description: "Requested availability for HR interview",
        at: "2023-06-16 15:35",
        by: { name: "Melissa Jones" },
        meta: { emailSubject: "HR interview availability" },
      },
    ],
    emails: [
      {
        id: "e10",
        subject: "HR interview availability",
        preview: "Hi Ayse, can you share times that work for an HR interview this week?",
        status: "delivered",
        at: "2023-06-16 15:35",
        from: { name: "Melissa Jones", email: "melissa.jones@tailorcv.io" },
        to: { name: "Ayse Nur Kaya", email: "ayse.nur.kaya@example.com" },
        threadId: "t9",
      },
    ],
    myFiles: [
      {
        id: "f14",
        name: "AyseNurKaya_CV.pdf",
        type: "CV",
        size: "390 KB",
        uploadedAt: "2023-06-15 10:06",
        uploadedBy: "System",
        url: "/mock/files/AyseNurKaya_CV.pdf",
      },
    ],
  },
  {
    id: "c10",
    candidate: "Onur Demir",
    role: "Mobile Developer",
    matchScore: 82,
    location: "Antalya, TR",
    experienceLevel: "Mid",
    workType: "Hybrid",
    email: "onur.demir@example.com",
    applicationDate: "2023-06-15 from LinkedIn",
    avatar: "https://i.pravatar.cc/300?u=user10",
    overview: {
      tags: ["Fast Response", "Remote Ready"],
      phone: "+90 536 404 04 04",
      sources: { primary: "LinkedIn", detail: "Inbound application" },
      social: {
        linkedin: "linkedin.com/in/onur-demir",
        github: "github.com/onurdemir",
        website: "onurdemir.dev",
      },
      headline: "Mobile developer building clean apps with React Native and good UX",
      yearsOfExperience: 4,
      currentCompany: "AppScale",
      salaryExpectation: "€3.0k - €3.8k",
      noticePeriod: "3 weeks",
      languages: ["Turkish", "English"],
      timezone: "Europe/Istanbul",
    },
    activities: [
      {
        id: "a22",
        type: "status_change",
        title: "Moved to Interview",
        description: "Schedule mobile technical interview",
        at: "2023-06-16 16:20",
        by: { name: "Daniel Carter" },
        meta: { fromStage: "Screening", toStage: "Interview" },
      },
      {
        id: "a23",
        type: "interview_scheduled",
        title: "Interview scheduled",
        description: "Technical interview with mobile lead",
        at: "2023-06-16 16:28",
        by: { name: "Daniel Carter" },
        meta: { interviewType: "Technical", interviewAt: "2023-06-18 11:00" },
      },
    ],
    emails: [
      {
        id: "e11",
        subject: "Mobile interview details",
        preview: "Hi Onur, here are the interview details and topics. See you soon.",
        status: "sent",
        at: "2023-06-16 16:30",
        from: { name: "Daniel Carter", email: "daniel.carter@tailorcv.io" },
        to: { name: "Onur Demir", email: "onur.demir@example.com" },
        threadId: "t10",
      },
    ],
    myFiles: [
      {
        id: "f15",
        name: "OnurDemir_CV.pdf",
        type: "CV",
        size: "335 KB",
        uploadedAt: "2023-06-15 10:08",
        uploadedBy: "System",
        url: "/mock/files/OnurDemir_CV.pdf",
      },
      {
        id: "f16",
        name: "OnurDemir_Portfolio.pdf",
        type: "Portfolio",
        size: "1.7 MB",
        uploadedAt: "2023-06-15 10:09",
        uploadedBy: "System",
        url: "/mock/files/OnurDemir_Portfolio.pdf",
      },
    ],
  },
]

function getMatchChip(score: number) {
  if (score >= 90) return { bg: "rgba(34, 197, 94, 0.12)", color: "#16A34A" }
  if (score >= 80) return { bg: "rgba(99, 102, 241, 0.12)", color: colors.primary }
  return { bg: "rgba(245, 158, 11, 0.12)", color: "#D97706" }
}

export default function Candidate() {
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const router = useRouter();

  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [selectedId, setSelectedId] = React.useState<string>(rows[0]?.id ?? "")
  const selected = React.useMemo(() => rows.find((r) => r.id === selectedId) ?? rows[0], [selectedId])

  const users = React.useMemo(() => usersData.slice(0, 1), [])

  const [activeTab, setActiveTab] = React.useState<TabKey>("overview")

  const tabStyle = (key: TabKey) => {
    const isActive = activeTab === key
    return {
      fontSize: "14px",
      cursor: "pointer",
      border: "1px solid",
      borderColor: isActive ? colors.primary : "transparent",
      borderRadius: radius.m,
      px: "12px",
      py: "10px",
      bg: isActive ? "rgba(99, 102, 241, 0.1)" : "transparent",
      color: isActive ? colors.primary : colors.secondaryText,
      boxShadow: isActive ? "inset 0px 0px 10px 2px rgba(99, 102, 241, 0.3)" : "none",
      transition: "all 0.15s ease",
      _hover: isActive
        ? undefined
        : {
            bg: "rgba(99, 102, 241, 0.06)",
            color: colors.primary,
          },
    } as const
  }

  const submit = () => {
    console.log("search submit:", query)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const renderTabContent = () => {
    if (!selected) return null

    if (activeTab === "overview") {
      return (
        <VStack align="stretch" mt="18px" gap="14px">
          <Box>
            <Text fontSize="13px" fontWeight="800" color={colors.text}>
              Headline
            </Text>
            <Text fontSize="13px" color={colors.secondaryText} mt="6px">
              {selected.overview.headline}
            </Text>
          </Box>

          <Grid templateColumns="1fr 1fr" gap="12px">
            <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
              <Text fontSize="12px" color={colors.ghostText}>
                Email
              </Text>
              <Text fontSize="13px" fontWeight="700" color={colors.text} mt="4px">
                {selected.email}
              </Text>
            </Box>

            <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
              <Text fontSize="12px" color={colors.ghostText}>
                Phone
              </Text>
              <Text fontSize="13px" fontWeight="700" color={colors.text} mt="4px">
                {selected.overview.phone}
              </Text>
            </Box>

            <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
              <Text fontSize="12px" color={colors.ghostText}>
                Source
              </Text>
              <Text fontSize="13px" fontWeight="700" color={colors.text} mt="4px">
                {selected.overview.sources.primary}
              </Text>
              {selected.overview.sources.detail ? (
                <Text fontSize="12px" color={colors.secondaryText} mt="2px">
                  {selected.overview.sources.detail}
                </Text>
              ) : null}
            </Box>

            <Box border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
              <Text fontSize="12px" color={colors.ghostText}>
                Work info
              </Text>
              <Text fontSize="13px" fontWeight="700" color={colors.text} mt="4px">
                {selected.experienceLevel} · {selected.workType}
              </Text>
              <Text fontSize="12px" color={colors.secondaryText} mt="2px">
                {selected.location}
              </Text>
            </Box>
          </Grid>

          <Box>
            <Text fontSize="13px" fontWeight="800" color={colors.text}>
              Tags
            </Text>
            <Flex wrap="wrap" gap="8px" mt="8px">
              {selected.overview.tags.map((t) => (
                <Box
                  key={t}
                  borderRadius="999px"
                  px="10px"
                  py="6px"
                  border="1px solid"
                  borderColor="gray.200"
                  bg="gray.50"
                  fontSize="12px"
                  fontWeight="700"
                  color="gray.700"
                >
                  {t}
                </Box>
              ))}
            </Flex>
          </Box>

          <Box>
            <Text fontSize="13px" fontWeight="800" color={colors.text}>
              Social
            </Text>
            <VStack align="stretch" gap="6px" mt="8px">
              {selected.overview.social.linkedin ? (
                <Text fontSize="13px" color={colors.secondaryText}>
                  LinkedIn · {selected.overview.social.linkedin}
                </Text>
              ) : null}
              {selected.overview.social.github ? (
                <Text fontSize="13px" color={colors.secondaryText}>
                  GitHub · {selected.overview.social.github}
                </Text>
              ) : null}
              {selected.overview.social.behance ? (
                <Text fontSize="13px" color={colors.secondaryText}>
                  Behance · {selected.overview.social.behance}
                </Text>
              ) : null}
              {selected.overview.social.dribbble ? (
                <Text fontSize="13px" color={colors.secondaryText}>
                  Dribbble · {selected.overview.social.dribbble}
                </Text>
              ) : null}
              {selected.overview.social.website ? (
                <Text fontSize="13px" color={colors.secondaryText}>
                  Website · {selected.overview.social.website}
                </Text>
              ) : null}
              {!selected.overview.social.linkedin &&
              !selected.overview.social.github &&
              !selected.overview.social.behance &&
              !selected.overview.social.dribbble &&
              !selected.overview.social.website ? (
                <Text fontSize="13px" color={colors.ghostText}>
                  No social links added yet
                </Text>
              ) : null}
            </VStack>
          </Box>
        </VStack>
      )
    }

    if (activeTab === "activities") {
      return (
        <VStack align="stretch" mt="18px" gap="10px">
          {selected.activities.length === 0 ? (
            <Text fontSize="13px" color={colors.ghostText}>
              No activities yet
            </Text>
          ) : (
            selected.activities.map((a) => (
              <Box key={a.id} border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                <Flex justifyContent="space-between" alignItems="flex-start" gap="10px">
                  <Box>
                    <Text fontSize="13px" fontWeight="800" color={colors.text}>
                      {a.title}
                    </Text>
                    {a.description ? (
                      <Text fontSize="12px" color={colors.secondaryText} mt="4px">
                        {a.description}
                      </Text>
                    ) : null}
                    <Text fontSize="12px" color={colors.ghostText} mt="6px">
                      {a.at} · {a.by.name}
                    </Text>
                  </Box>

                  <Box
                    borderRadius="999px"
                    px="10px"
                    py="6px"
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    fontSize="12px"
                    fontWeight="800"
                    color="gray.700"
                  >
                    {a.type}
                  </Box>
                </Flex>
              </Box>
            ))
          )}
        </VStack>
      )
    }

    if (activeTab === "emails") {
      return (
        <VStack align="stretch" mt="18px" gap="10px">
          {selected.emails.length === 0 ? (
            <Text fontSize="13px" color={colors.ghostText}>
              No emails yet
            </Text>
          ) : (
            selected.emails.map((m) => (
              <Box key={m.id} border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
                <Flex justifyContent="space-between" alignItems="flex-start" gap="10px">
                  <Box>
                    <Text fontSize="13px" fontWeight="800" color={colors.text}>
                      {m.subject}
                    </Text>
                    <Text fontSize="12px" color={colors.secondaryText} mt="4px">
                      {m.preview}
                    </Text>
                    <Text fontSize="12px" color={colors.ghostText} mt="6px">
                      {m.at} · {m.from.name}
                    </Text>
                  </Box>

                  <Box
                    borderRadius="999px"
                    px="10px"
                    py="6px"
                    bg="rgba(99, 102, 241, 0.08)"
                    border="1px solid"
                    borderColor="rgba(99, 102, 241, 0.2)"
                    fontSize="12px"
                    fontWeight="800"
                    color={colors.primary}
                  >
                    {m.status}
                  </Box>
                </Flex>
              </Box>
            ))
          )}
        </VStack>
      )
    }

    return (
      <VStack align="stretch" mt="18px" gap="10px">
        {selected.myFiles.length === 0 ? (
          <Text fontSize="13px" color={colors.ghostText}>
            No files yet
          </Text>
        ) : (
          selected.myFiles.map((f) => (
            <Box key={f.id} border="1px solid" borderColor="gray.100" borderRadius={radius.m} p="12px">
              <Flex justifyContent="space-between" alignItems="center" gap="10px">
                <Box>
                  <Text fontSize="13px" fontWeight="800" color={colors.text}>
                    {f.name}
                  </Text>
                  <Text fontSize="12px" color={colors.secondaryText} mt="4px">
                    {f.type} · {f.size}
                  </Text>
                  <Text fontSize="12px" color={colors.ghostText} mt="6px">
                    {f.uploadedAt} · {f.uploadedBy}
                  </Text>
                </Box>

                <Link
                  href={f.url}
                  fontSize="12px"
                  fontWeight="900"
                  color={colors.primary}
                  border="1px solid"
                  borderColor="rgba(99, 102, 241, 0.25)"
                  borderRadius="999px"
                  px="10px"
                  py="8px"
                  _hover={{ bg: "rgba(99, 102, 241, 0.06)" }}
                >
                  Open
                </Link>
              </Flex>
            </Box>
          ))
        )}
      </VStack>
    )
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
            const isActive = item.label === "Candidates"
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
                onClick={() => {
                        if (item.label === "Dashboard") {
                            router.push("/dashboard");
                        }
                        if (item.label === "Pipeline") {
                            router.push("/dashboard/pipeline");
                        }
                        if (item.label === "Interviews") {
                            router.push("/dashboard/interviews");
                        }
                    }} 
              >
                <IconButton aria-label={item.label} bg="transparent" color={isActive ? colors.primary : colors.secondaryText}>
                  <item.icon />
                </IconButton>
                <Text 
                    color={isActive ? colors.primary : colors.secondaryText} fontSize="18px" fontWeight="500"
                >
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
              onClick={() => {
                if (item.label === "Settings") {
                  router.push("/dashboard/settings");
                }
                if (item.label === "Logout") {
                  router.push("/");
                }
              }}
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
                  mr="-12px"
                  bg={colors.primary}
                  borderRadius={radius.m}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  boxShadow="-2px 0px 10px 0px rgba(0, 0, 0, 0.3)"
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
                onChange={onChange}
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

        <Text fontSize="36px" fontWeight="700">
          Candidates
        </Text>

        <Grid templateColumns="1.1fr 0.9fr" gap="20px" mt="20px" alignItems="start">
          <Box bg="white" borderRadius={radius.xl} p="20px" border="1px solid" borderColor="gray.200">
            <Flex gap="10px" flexWrap="wrap" textAlign="center" alignItems="center">
              <Box
                fontSize="14px"
                border="1px solid"
                borderColor={colors.primary}
                borderRadius={radius.m}
                px="12px"
                py="10px"
                cursor="pointer"
                boxShadow="inset 0px 0px 10px 2px rgba(99, 102, 241, 0.3)"
                bg="rgba(99, 102, 241, 0.1)"
                color={colors.primary}
                fontWeight="800"
              >
                All Candidates
              </Box>

              {["New", "InReview", "Assessment", "Interview"].map((t) => (
                <Box
                  key={t}
                  fontSize="14px"
                  cursor="pointer"
                  color={colors.secondaryText}
                  borderRadius={radius.m}
                  px="12px"
                  py="10px"
                  _hover={{ bg: "rgba(99, 102, 241, 0.06)", color: colors.primary }}
                  fontWeight="700"
                >
                  {t}
                </Box>
              ))}
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
              <Text w="50%">Candidate</Text>
              <Text w="35%">Role</Text>
              <Text w="15%" textAlign="right">
                Match
              </Text>
            </Flex>

            {rows.map((row, idx) => {
              const isSelected = row.id === selectedId
              const chip = getMatchChip(row.matchScore)

              return (
                <Box key={row.id}>
                  <Flex
                    alignItems="center"
                    bg={isSelected ? "rgba(99, 102, 241, 0.06)" : "white"}
                    boxShadow={isSelected ? "inset 0px 0px 10px 2px rgba(99, 102, 241, 0.3)" : "none"}
                    px="12px"
                    py="12px"
                    borderRadius={radius.m}
                    mt="10px"
                    _hover={{
                      cursor: "pointer",
                      bg: "linear-gradient(to left, rgba(99, 102, 241, 0.3) 0%, transparent 100%)",
                    }}
                    onClick={() => {
                      setSelectedId(row.id)
                      setActiveTab("overview")
                    }}
                  >
                    <Flex w="50%" alignItems="center" gap="10px">
                      <Avatar.Root size="sm">
                        <Avatar.Fallback name={row.candidate} />
                        <Avatar.Image src={row.avatar} />
                      </Avatar.Root>
                      <Box>
                        <Text fontSize="15px" fontWeight="900">
                          {row.candidate}
                        </Text>
                        <Text fontSize="13px" color={colors.secondaryText}>
                          {row.email}
                        </Text>
                      </Box>
                    </Flex>

                    <Text w="35%" color={colors.secondaryText} fontWeight="700">
                      {row.role}
                    </Text>

                    <Flex w="15%" justifyContent="flex-end">
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

                  {idx !== rows.length - 1 ? <Box h="1px" bg="gray.100" w="100%" mt="10px" /> : null}
                </Box>
              )
            })}
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
                  Select a candidate from the list
                </Text>
              ) : (
                <>
                  <Flex justifyContent="space-between" alignItems="center" gap="16px">
                    <Flex alignItems="center" gap="18px" minW={0}>
                      <Avatar.Root boxSize="110px">
                        <Avatar.Fallback name={selected.candidate} />
                        <Avatar.Image src={selected.avatar} />
                      </Avatar.Root>

                      <Box minW={0}>
                        <Text fontSize="22px" fontWeight="900">
                          {selected.candidate}
                        </Text>
                        <Text fontSize="15px" color={colors.secondaryText} fontWeight="700">
                          {selected.role} · {selected.location}
                        </Text>
                        <Text fontSize="13px" color={colors.ghostText} mt="10px">
                          {selected.applicationDate}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex gap="10px" alignItems="center">
                      <Button variantType="primary">Interview</Button>
                      <Button onClick={() => console.log("Reject", selected.id)} variantType="reject">
                        Reject
                      </Button>
                    </Flex>
                  </Flex>

                  <Box h="1px" bg="gray.100" w="100%" mt="18px" />

                  <Box mt="18px">
                    <Flex justifyContent="space-between" alignItems="center" gap="8px" flexWrap="wrap">
                      <Text onClick={() => setActiveTab("overview")} {...tabStyle("overview")}>
                        Overview
                      </Text>
                      <Text onClick={() => setActiveTab("activities")} {...tabStyle("activities")}>
                        Activities
                      </Text>
                      <Text onClick={() => setActiveTab("emails")} {...tabStyle("emails")}>
                        Emails
                      </Text>
                      <Text onClick={() => setActiveTab("files")} {...tabStyle("files")}>
                        My Files
                      </Text>
                    </Flex>

                    {renderTabContent()}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  )
}
