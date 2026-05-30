"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export function ButtonRefresh() {
    const router = useRouter();

    const handleRefresh = () => {
        router.refresh();
    }
    return (
        <Button onClick={handleRefresh} className="bg-brand-primary text-white hover:bg-brand-primary">
            <RefreshCcw className="w-5 h-5" />
        </Button>
    );
}