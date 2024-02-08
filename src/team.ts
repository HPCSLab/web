import type { TeamKind } from "@content";

export function teamToIcon(team: TeamKind): string {
  switch (team) {
    case "Architecture":
      return "material-symbols:architecture-rounded";
    case "Algorithm":
      return "fluent:flowchart-32-regular";
    case "System Software":
      return "material-symbols:home-storage-outline-rounded";
    case "FPGA":
      return "ph:circuitry-bold";
    case "PA":
      return "icons8:parallel-tasks";
    case "Performance":
      return "ic:baseline-speed";
  }
}

export function teamColor(team: TeamKind): string {
  switch (team) {
    case "Architecture":
      return "team-color-1";
    case "Algorithm":
      return "team-color-2";
    case "System Software":
      return "team-color-3";
    case "FPGA":
      return "team-color-4";
    case "PA":
      return "team-color-5";
    case "Performance":
      return "team-color-6";
  }
}
