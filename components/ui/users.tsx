import { Avatar, HStack, Stack, Text } from "@chakra-ui/react"


export const Users = ({ users }: { users: typeof import('./users').users }) => {
  return (
    <Stack gap="8">
      {users.map((user) => (
        <HStack key={user.email} gap="4">
          <Avatar.Root>
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.avatar} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="medium">{user.name}</Text>
            <Text color="fg.muted" textStyle="sm">
              {user.email}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {user.job}
            </Text>
          </Stack>
        </HStack>
      ))}
    </Stack>
  )
}

export const users = [
  {
    id: "1",
    name: "John Mason",
    email: "john.mason@example.com",
    job: "Frontend Engineer",
    avatar: "https://i.pravatar.cc/300?u=user1",
  },
  {
    id: "2",
    name: "Melissa Jones",
    email: "melissa.jones@example.com",
    job: "Recruiter",
    avatar: "https://i.pravatar.cc/300?u=user2",
  },
  {
    id: "3",
    name: "Daniel Carter",
    email: "daniel.carter@example.com",
    job: "Product Designer",
    avatar: "https://i.pravatar.cc/300?u=user3",
  },
  {
    id: "4",
    name: "Sophia Reed",
    email: "sophia.reed@example.com",
    job: "QA Engineer",
    avatar: "https://i.pravatar.cc/300?u=user4",
  },
  {
    id: "5",
    name: "Ethan Walker",
    email: "ethan.walker@example.com",
    job: "Backend Engineer",
    avatar: "https://i.pravatar.cc/300?u=user5",
  },
  {
    id: "6",
    name: "Ava Bennett",
    email: "ava.bennett@example.com",
    job: "UI Designer",
    avatar: "https://i.pravatar.cc/300?u=user6",
  },
  {
    id: "7",
    name: "Noah Turner",
    email: "noah.turner@example.com",
    job: "Data Analyst",
    avatar: "https://i.pravatar.cc/300?u=user7",
  },
  {
    id: "8",
    name: "Grace Collins",
    email: "grace.collins@example.com",
    job: "Talent Acquisition Specialist",
    avatar: "https://i.pravatar.cc/300?u=user8",
  },
  {
    id: "9",
    name: "Liam Parker",
    email: "liam.parker@example.com",
    job: "DevOps Engineer",
    avatar: "https://i.pravatar.cc/300?u=user9",
  },
  {
    id: "10",
    name: "Olivia Hughes",
    email: "olivia.hughes@example.com",
    job: "HR Manager",
    avatar: "https://i.pravatar.cc/300?u=user10",
  },
]
