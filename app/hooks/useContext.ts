import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
