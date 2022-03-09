import React from "react";
import { useRouter } from "next/router";

const PasswordResetConfirm = () => {
  const router = useRouter();

  const { query } = router;
  return (
    <div>
      <div>
        {query.uid} {query.token}
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
