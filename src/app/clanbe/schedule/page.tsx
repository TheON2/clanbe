import ScheduleComponent from "@/components/ScheduleComponent";
import { getEvent } from "@/service/schedule";

export default async function SchedulePage() {
  const schedule = await getEvent();
  return <ScheduleComponent events={schedule} />;
}
