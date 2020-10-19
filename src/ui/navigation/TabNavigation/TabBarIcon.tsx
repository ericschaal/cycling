import { AntDesign } from "@expo/vector-icons";
import * as React from "react";

export default function TabBarIcon(props: { name: string; color: string }) {
  return <AntDesign size={24} style={{ marginBottom: 0 }} {...props} />;
}
