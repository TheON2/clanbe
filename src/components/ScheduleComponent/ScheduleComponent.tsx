"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import koLocale from "@fullcalendar/core/locales/ko";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import { EventType } from "../../../types/types";
import { createEvent, deleteEvent, updateEvent } from "./actions";

interface DateClickArguments {
  dateStr: string;
  allDay: boolean;
}

type ScheduleComponentProps = {
  events: EventType;
};

export default function ScheduleComponent({ events }: ScheduleComponentProps) {
  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const userGrade = user?.grade;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: eventOpen,
    onOpen: eventOnOpen,
    onClose: eventOnClose,
    onOpenChange: eventOnOpenChange,
  } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventId, setEventId] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [originalEvent, setOriginalEvent] = useState({
    title: "",
    description: "",
  });

  const handleEdit = () => {
    setIsEditable(true); // 입력 가능 상태로 전환
  };

  const addEvent = async () => {
    const newEvent = {
      title: eventName,
      date: selectedDate || "",
      description: eventDescription,
      author: user?.email || "",
    };
    await createEvent(newEvent);
    setEventName("");
    setEventDescription("");
    onClose();
  };

  const fixEvent = async () => {
    const newEvent = {
      id: eventId,
      title: eventName,
      date: selectedDate || "",
      description: eventDescription,
      author: user?.email || "",
    };
    await updateEvent(newEvent);
    setEventName("");
    setEventDescription("");
    eventOnClose();
  };

  const delEvent = async () => {
    await deleteEvent(eventId);
    setEventName("");
    setEventDescription("");
    eventOnClose();
  };
  const handleEventClick = (arg: EventClickArg) => {
    const { event } = arg;
    setEventName(event.title);
    setEventDescription(event.extendedProps?.description ?? "");
    setEventId(event.id);
    // 원본 이벤트 데이터 저장
    setOriginalEvent({
      title: event.title,
      description: event.extendedProps?.description ?? "",
    });
    eventOnOpen();
  };
  const handleEventDrop = async (info: EventDropArg) => {
    const { event } = info;
    const startDate = event.startStr;

    const updatedEvent = {
      id: event.id,
      title: event.title,
      date: startDate,
      description: event.extendedProps.description,
      author: user?.email || "",
    };

    try {
      await updateEvent(updatedEvent);
      console.log("Event updated successfully");
    } catch (error) {
      console.error("Error updating event:", error);
      if (originalEvent) {
        event.setStart(info.event.startStr);
      }
    }
  };
  const handleCancelEdit = () => {
    // 원본 데이터로 필드 값 복원
    setEventName(originalEvent.title);
    setEventDescription(originalEvent.description);
    setIsEditable(false);
    // eventOnClose(); // 모달 닫기
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (arg: DateClickArguments) => {
    setEventName("");
    setEventDescription("");
    setSelectedDate(arg.dateStr);
    onOpen();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(null);
      setEventName("");
      setEventDescription("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!eventOpen) {
      setEventName("");
      setEventDescription("");
      setIsEditable(false);
    }
  }, [eventOpen]);

  return (
    <div className="calendar-container px-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="listWeek"
        weekends={true}
        locale={koLocale}
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "listWeek,dayGridMonth",
        }}
        height={"800px"}
        editable={typeof userGrade === "number" && userGrade > 4}
        eventClick={handleEventClick}
        dateClick={handleDateClick} // 날짜 클릭 핸들러 등록
        eventDrop={handleEventDrop}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                이벤트 등록
              </ModalHeader>
              <ModalBody>
                <p>{selectedDate}</p>
                <Input
                  label="이벤트 이름"
                  placeholder="이벤트 이름을 입력하세요"
                  variant="bordered"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
                <Textarea
                  label="이벤트 내용"
                  placeholder="이벤트 내용을 입력하세요"
                  variant="bordered"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  취소
                </Button>
                <Button color="primary" onPress={addEvent}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={eventOpen}
        onOpenChange={eventOnOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(eventOnClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">이벤트</ModalHeader>
              <ModalBody>
                <p>{selectedDate}</p>
                <Input
                  label="이벤트 이름"
                  placeholder="이벤트 이름을 입력하세요"
                  variant="bordered"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  readOnly={!isEditable}
                />
                <Textarea
                  label="이벤트 내용"
                  placeholder="이벤트 내용을 입력하세요"
                  variant="bordered"
                  value={eventDescription}
                  readOnly={!isEditable}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                {typeof userGrade === "number" && userGrade >= 4 && (
                  <>
                    {!isEditable ? (
                      <Button color="primary" onPress={handleEdit}>
                        수정
                      </Button>
                    ) : (
                      <Button color="primary" onPress={fixEvent}>
                        확인
                      </Button>
                    )}
                    {!isEditable ? (
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          delEvent();
                        }}
                      >
                        삭제
                      </Button>
                    ) : (
                      <Button color="danger" onPress={handleCancelEdit}>
                        취소
                      </Button>
                    )}
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
