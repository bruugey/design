import { css } from "@emotion/css";
import Button from "@leafygreen-ui/button";
import { login } from "@/auth/login";
import { spacing } from "@leafygreen-ui/tokens";

export function LogIn() {
  return (
    <Button
      size="small"
      onClick={() => login()}
      className={css`
        border-radius: 50px;
        margin-right: ${spacing[400]}px;
      `}
    >
      Log In
    </Button>
  );
}
