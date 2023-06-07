'use client'

import React from "react";
import Button from "./components/modals/Button";
import Heading from "./components/modals/Heading";
import { useRouter } from "next/navigation";

interface emptyPageProps {
  title ?: string;
  subtitle?: string;
  showReset ?: boolean;
}
const EmptyPage: React.FC<emptyPageProps> = ({
  title = 'No Exact matches',
  subtitle = 'Try changing or removing some of your filter',
  showReset = true,
}) => {
  const router = useRouter()
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
      {showReset && (
        <Button rounded label={"remove all filters"} onCLick={() => {router.push("/")}} outline />
      )}
      </div>
      
    </div>
  );
};
export default EmptyPage;
