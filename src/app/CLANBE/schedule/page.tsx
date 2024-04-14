"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import koLocale from "@fullcalendar/core/locales/ko";
import { useState } from "react";

export default function SchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 이벤트 클릭 핸들러
  const handleEventClick = ({ event }: { event: any }) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    alert(`이벤트: ${event.title}`);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="listWeek"
        weekends={true}
        locale={koLocale}
        events={[
          { title: "이벤트 1", date: "2024-04-01" },
          { title: "이벤트 1", date: "2024-04-01" },
          { title: "이벤트 1", date: "2024-04-01" },
          { title: "이벤트 2", start: "2024-04-02" },
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "listWeek,dayGridMonth",
        }}
        height={"800px"}
        editable={true}
        // titleFormat={{
        //   year: "numeric",
        //   month: "2-digit",
        // }}
        eventClick={handleEventClick} // 이벤트 클릭 핸들러 등록
      />
    </div>
  );
}
