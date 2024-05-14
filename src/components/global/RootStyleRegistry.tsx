"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { cache as lgCache } from "@leafygreen-ui/emotion";

export function RootStyleRegistry({ children }: { children: JSX.Element }) {
  const [cache] = useState(() => {
    const cache = createCache({ key: "docs" });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")} ${
          lgCache.key
        } ${Object.keys(lgCache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: `${Object.values(cache.inserted).join(" ")} ${Object.values(
            lgCache.inserted
          ).join(" ")}`,
        }}
      />
    );
  });

  return (
    <CacheProvider value={{ ...cache, ...lgCache }}>{children}</CacheProvider>
  );
}
