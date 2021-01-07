import { useEffect, useState } from "react";
import { UserFragment } from "./graphql/client/fragments/user.graphql";
import { iClaimsToUser } from "./user-utils";

function getFetchOptions(cookie: string) {
  if (!cookie) return {};

  return { headers: { cookie } };
}

export async function fetchUser(cookie = ""): Promise<UserFragment | null> {
  if (typeof window !== "undefined" && window.__user) {
    return window.__user;
  }

  const res = await fetch("/api/me", getFetchOptions(cookie));

  if (!res.ok) {
    delete window.__user;
    return null;
  }

  const json = await res.json();
  const user = json ? iClaimsToUser(json) : null;
  if (typeof window !== "undefined") {
    window.__user = user;
  }
  return user;
}

type Opts = { required?: boolean };

export function useFetchUser({ required }: Opts = {}): { user: UserFragment | null; loading: boolean } {
  const [loading, setLoading] = useState(() => !(typeof window !== "undefined" && window.__user));
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.__user || null;
  });

  useEffect(
    () => {
      if (!loading && user) {
        return;
      }
      setLoading(true);
      let isMounted = true;

      fetchUser().then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = "/api/login";
            return;
          }
          setUser(user);
          setLoading(false);
        }
      });

      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { user, loading };
}
