import React, { useState } from "react";
import Context from "./Context";
import { theme } from "../utils";

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rooms, setRooms] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);
  return <Context.Provider value={{ theme }}>{children}</Context.Provider>;
}