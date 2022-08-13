import React from "react";
import BrowserButton from "./BrowserButton";
import DangerZone from "./DangerZone";
import SettingsCard from "./SettingsCard";

export default function SettingsBody() {
  return (
    <div className="p-3">
      <SettingsCard title="Sync with Keeppt Browser extension" component={<BrowserButton />} />
      <SettingsCard title="Danger" color="red" component={<DangerZone />} />
    </div>
  );
}
