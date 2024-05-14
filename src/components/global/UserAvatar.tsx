import { getSession } from "@/auth/getSession";
import { useEffect } from "react";

export function UserAvatar() {
  useEffect(() => {
    getSession().then(console.log);
  }, []);

  return <div>hello world!</div>;
}
