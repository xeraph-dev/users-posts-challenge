import type { User } from "@/schemas/user"
import { useQuery } from "@tanstack/react-query"

export const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"]
  })
}
