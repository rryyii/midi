import {useQuery} from "@tanstack/react-query";

export function useUser() {
    return useQuery({
        queryKey: ["user-info"],
        queryFn: async () => {
            const userString = localStorage.getItem("user-info");
            if (!userString) return null;
            return JSON.parse(userString);
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}
