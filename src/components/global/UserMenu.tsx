import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import Button from "@leafygreen-ui/button";
// @ts-expect-error
import CaretDownIcon from "@leafygreen-ui/icon/dist/CaretDown";
// @ts-expect-error
import LogOutIcon from "@leafygreen-ui/icon/dist/LogOut";
import { Menu, MenuItem } from "@leafygreen-ui/menu";
import { Body, Description } from "@leafygreen-ui/typography";
import { spacing } from "@leafygreen-ui/tokens";
import { getSession } from "@/auth/getSession";
import { logout } from "@/auth/logout";
import { LogIn } from "./LogIn";

export function UserMenu() {
  const [session, setSession] = useState();

  useEffect(() => {
    getSession().then(console.log);
  }, []);

  return session ? (
    <div
      className={css`
        z-index: 1;
      `}
    >
      <Menu
        trigger={
          <Button
            size="small"
            className={css`
              border-radius: 50px;
              margin-right: ${spacing[400]}px;
            `}
            rightGlyph={<CaretDownIcon />}
          >
            {session?.user?.name}
          </Button>
        }
      >
        <MenuItem>
          <Body>{session?.user?.name}</Body>
          <Description>{session?.user?.email}</Description>
        </MenuItem>
        <MenuItem glyph={<LogOutIcon />} onClick={() => logout()}>
          Log out
        </MenuItem>
      </Menu>
    </div>
  ) : (
    <LogIn />
  );
}
