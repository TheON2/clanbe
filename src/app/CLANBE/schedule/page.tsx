import ScheduleComponent from "@/components/ScheduleComponent";
import { getEvent } from "./action";

export default async function SchedulePage() {
  const schedule = await getEvent();
  // console.log(schedule);
  return <ScheduleComponent events={schedule} />;
}
