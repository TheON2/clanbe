"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";

export default function SchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 이벤트 클릭 핸들러
  const handleEventClick = ({ event }) => {
    // 선택된 이벤트 정보를 상태에 저장하고 모달을 엽니다.
    setSelectedEvent(event);
    setIsModalOpen(true);
    // 간단한 예제를 위해 alert로 대체합니다.
    alert(`이벤트: ${event.title}`);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: "이벤트 1", date: "2024-04-01" },
          { title: "이벤트 1", date: "2024-04-01" },
          { title: "이벤트 1", date: "2024-04-01" },
          { title: "이벤트 2", start: "2024-04-02" },
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        height={"800px"}
        editable={true}
        titleFormat={{
          year: "numeric",
          month: "2-digit",
        }}
        eventClick={handleEventClick} // 이벤트 클릭 핸들러 등록
      />

      {/* 모달이 열려있는 경우, 모달 컴포넌트를 렌더링합니다. */}
      {isModalOpen && (
        <div className="modal">
          <p>이벤트 제목: {selectedEvent?.title}</p>
          <button onClick={() => setIsModalOpen(false)}>닫기</button>
        </div>
      )}
    </div>
  );
}
