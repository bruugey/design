"use client";

import Button from "@leafygreen-ui/button";
import { BasicEmptyState } from "@leafygreen-ui/empty-state";
// @ts-expect-error
import ArrowLeftIcon from "@leafygreen-ui/icon/dist/ArrowLeft";
import { NotFound } from "@/components/glyphs";
import { useRouter } from "next/navigation";

export default function NotFoundComponent() {
  const router = useRouter();

  return (
    <div>
      <BasicEmptyState
        title="Sorry, we can’t find that page"
        description="The page may have moved or been deleted"
        graphic={<NotFound />}
        primaryButton={
          <Button
            leftGlyph={<ArrowLeftIcon />}
            onClick={() => router.push("/")}
          >
            Return to home
          </Button>
        }
      />
    </div>
  );
}
