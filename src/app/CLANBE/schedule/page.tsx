import ScheduleComponent from "@/components/ScheduleComponent/ScheduleComponent";
import { getEvent } from "./action";

export default async function SchedulePage() {
  const schedule = await getEvent();
  return <ScheduleComponent events={schedule.events} />;
}
