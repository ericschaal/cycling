import { Ionicons } from "@expo/vector-icons";
import React from "react";

export function DrawerIcon(props: { name: string; color: string }) {
  return <Ionicons size={26} style={{ marginBottom: -3 }} {...props} />;
}