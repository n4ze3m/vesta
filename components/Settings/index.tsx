import { User } from "@supabase/supabase-js";
import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import React from "react";
import BrowserButton from "./BrowserButton";
import DangerZone from "./DangerZone";
import SettingsCard from "./SettingsCard";

export default function SettingsBody() {
  const [user, setUser] = React.useState<User | null>();
  const router = useRouter();
  const session = Auth.useUser();
  React.useEffect(() => {
    if (session.user === null) {
      router.push("/login");
    } else {
      setUser(session.user);
    }
  }, []);

  return (
    <div className="p-3">
      <SettingsCard title="Sync with Vesta Browser extension" component={<BrowserButton />} />
      <SettingsCard title="Danger" color="red" component={<DangerZone />} />
    </div>
  );
}
