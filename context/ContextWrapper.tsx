import React, { useState } from "react";
import Context from "./Context";
import { theme } from "../utils";

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState<any[]>([]);
  return (
    <Context.Provider
      value={{ theme, rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}
    >
      {children}
    </Context.Provider>
  );
}
