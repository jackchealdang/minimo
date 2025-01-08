import { Skeleton } from "../ui/skeleton";

export function TodoSkeleton() {
    return (
        <div className="flex flex-col gap-y-2">
            <Skeleton className="h-5 w-52"/>
            <Skeleton className="h-5 w-44"/>
            <Skeleton className="h-5 w-56"/>
            <Skeleton className="h-5 w-52"/>
            <Skeleton className="h-5 w-44"/>
            <Skeleton className="h-5 w-52"/>
        </div>
    )
}