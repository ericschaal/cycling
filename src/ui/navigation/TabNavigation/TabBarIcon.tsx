import { Ionicons } from "@expo/vector-icons";
import * as React from "react";

export default function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
