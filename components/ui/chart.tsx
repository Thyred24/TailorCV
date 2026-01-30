"use client"

import * as React from "react"
import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"

type Row = {
  role: string
  applicants: number
  viewed: number
}

type Key = "viewed" | "applicants"

const data: Row[] = [
  { role: "UI UX", applicants: 846, viewed: 1240 },
  { role: "Frontend", applicants: 548, viewed: 860 },
  { role: "Backend", applicants: 357, viewed: 720 },
  { role: "Marketing", applicants: 152, viewed: 540 },
  { role: "Data", applicants: 118, viewed: 420 },
  { role: "Support", applicants: 92, viewed: 300 },
  { role: "HR", applicants: 67, viewed: 190 },
  { role: "DevOps", applicants: 42, viewed: 280 },
]

type TooltipItem = {
  dataKey?: string
  value?: number | string
}

type ApplicationsTooltipProps = {
  active?: boolean
  payload?: TooltipItem[]
  label?: string | number
}

function getNumber(payload: TooltipItem[] | undefined, key: Key) {
  const raw = payload?.find((p) => p.dataKey === key)?.value ?? 0
  return typeof raw === "number" ? raw : Number(raw) || 0
}

function ApplicationsTooltip({ active, payload, label }: ApplicationsTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const viewed = getNumber(payload, "viewed")
  const applicants = getNumber(payload, "applicants")
  const rate = applicants > 0 ? Math.round((applicants / viewed) * 100) : 0

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="12px"
      p="10px"
      boxShadow="md"
      minW="180px"
    >
      <Text fontSize="12px" fontWeight="800" color="gray.800">
        {String(label ?? "")}
      </Text>

      <VStack align="stretch" mt="8px" gap="6px">
        <HStack justify="space-between">
          <HStack gap="8px">
            <Box w="8px" h="8px" borderRadius="999px" bg="#93C5FD" />
            <Text fontSize="12px" color="gray.600">
              Viewed
            </Text>
          </HStack>
          <Text fontSize="12px" fontWeight="800" color="gray.800">
            {viewed}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <HStack gap="8px">
            <Box w="8px" h="8px" borderRadius="999px" bg="#2563EB" />
            <Text fontSize="12px" color="gray.600">
              Applicants
            </Text>
          </HStack>
          <Text fontSize="12px" fontWeight="800" color="gray.800">
            {applicants}
          </Text>
        </HStack>

        <Text fontSize="11px" color="gray.500">
          Application rate {rate}%
        </Text>
      </VStack>
    </Box>
  )
}

export function ApplicationsReceivedChart() {
  const chart = useChart({
    data,
    series: [
      { name: "viewed", color: "blue.muted" },
      { name: "applicants", color: "blue.solid" },
    ],
  })

  return (
    <Box 
        bg="white" 
        borderRadius="32px" 
        p="20px" 
        borderBottom="1px solid"
        borderColor="#6366F1"
    >
      <HStack justify="space-between" mb="12px">
        <Text fontSize="14px" fontWeight="800" color="gray.800">
          Applications Received
        </Text>

        <Text fontSize="12px" color="gray.500">
          Roles
        </Text>
      </HStack>

      <Chart.Root chart={chart} h="270px" w="full">
        <BarChart data={chart.data} barCategoryGap={18} barGap={8}>
          <XAxis
            dataKey={chart.key("role")}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontSize={12}
            tickFormatter={(v) => String(v).slice(0, 6)}
          />

          <YAxis hide />

          <Tooltip cursor={{ fill: "transparent" }} content={<ApplicationsTooltip />} />

          <Bar
            dataKey={chart.key("viewed")}
            fill="#93C5FD"
            radius={[10, 10, 0, 0]}
            isAnimationActive={false}
            barSize={18}
          />

          <Bar
            dataKey={chart.key("applicants")}
            fill="#2563EB"
            radius={[10, 10, 0, 0]}
            isAnimationActive={false}
            barSize={18}
          />
        </BarChart>
      </Chart.Root>
    </Box>
  )
}
