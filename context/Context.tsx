import React from "react";
import { theme } from "../utils";

const GlobalContext = React.createContext({
  theme,
  rooms: [] as any[],
  setRooms: (value: any[]) => {},
  unfilteredRooms: [] as any[],
  setUnfilteredRooms: (value: any[]) => {},
});

export default GlobalContext;
