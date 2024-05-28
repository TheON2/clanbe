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
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import { EventType } from "../../types/types";
import { createEvent, deleteEvent, updateEvent } from "../service/schedule";
import SubmitModal from "./SubmitModal";

interface DateClickArguments {
  dateStr: string;
  allDay: boolean;
}

type ScheduleComponentProps = {
  events: EventType[];
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
  const {
    isOpen: submitModalOpen,
    onOpen: submitModalOnOpen,
    onClose: submitModalOnClose,
    onOpenChange: submitModalOnOpenChange,
  } = useDisclosure();
  const [submitModalTitle, setSubmitModalTitle] = useState("");
  const [submitModalText, setSubmitModalText] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventId, setEventId] = useState("");
  const [eventType, setEventType] = useState("general");
  const [eventSets, setEventSets] = useState([]);
  const [homeTeamName, setHomeTeamName] = useState("");
  const [awayTeamName, setAwayTeamName] = useState("");
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
    try {
      await createEvent(newEvent);
      setSubmitModalTitle("이벤트 생성");
      setSubmitModalText("이벤트가 성공적으로 생성되었습니다.");
      submitModalOnOpen();
      setEventName("");
      setEventDescription("");
      onClose();
    } catch (error) {
      setSubmitModalTitle("에러");
      setSubmitModalText("이벤트 생성 중 오류가 발생했습니다.");
      submitModalOnOpen();
    }
  };

  const fixEvent = async () => {
    const newEvent = {
      id: eventId,
      title: eventName,
      date: selectedDate || "",
      description: eventDescription,
      author: user?.email || "",
    };
    try {
      await updateEvent(newEvent);
      setSubmitModalTitle("이벤트 수정");
      setSubmitModalText("이벤트가 성공적으로 수정되었습니다.");
      submitModalOnOpen();
      setEventName("");
      setEventDescription("");
      eventOnClose();
    } catch (error) {
      setSubmitModalTitle("에러");
      setSubmitModalText("이벤트 수정 중 오류가 발생했습니다.");
      submitModalOnOpen();
    }
  };

  const delEvent = async () => {
    try {
      await deleteEvent(eventId);
      setSubmitModalTitle("이벤트 삭제");
      setSubmitModalText("이벤트가 성공적으로 삭제되었습니다.");
      submitModalOnOpen();
      setEventName("");
      setEventDescription("");
      eventOnClose();
    } catch (error) {
      setSubmitModalTitle("에러");
      setSubmitModalText("이벤트 삭제 중 오류가 발생했습니다.");
      submitModalOnOpen();
    }
  };

  const handleEventClick = (arg: EventClickArg) => {
    const { event } = arg;
    setEventType(event.extendedProps.type);

    setEventName(event.title);
    setEventDescription(event.extendedProps?.description ?? "");
    setEventId(event.id);

    if (event.extendedProps.type === "league") {
      setEventSets(event.extendedProps.sets);
      setHomeTeamName(event.extendedProps.homeTeamName);
      setAwayTeamName(event.extendedProps.awayTeamName);
    } else {
      setEventSets([]);
      setHomeTeamName("");
      setAwayTeamName("");
    }

    // 원본 이벤트 데이터 저장
    setOriginalEvent({
      title: event.title,
      description: event.extendedProps?.description ?? "",
    });
    eventOnOpen();
  };

  const handleEventDrop = async (info: EventDropArg) => {
    const { event } = info;
    if (event.extendedProps.type === "league") {
      setSubmitModalTitle("이동불가");
      setSubmitModalText("리그일정은 드래그앤 드랍이 불가능합니다.");
      submitModalOnOpen();
      info.revert(); // 리그 이벤트는 드래그 앤 드랍을 취소
      return;
    }

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
    } catch (error) {
      setSubmitModalTitle("에러");
      setSubmitModalText("이벤트 수정 중 오류가 발생했습니다.");
      submitModalOnOpen();
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
    eventOnClose(); // 모달 닫기
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (arg: DateClickArguments) => {
    setEventName("");
    setEventDescription("");
    setSelectedDate(arg.dateStr);
    onOpen();
  };

  const renderEventContent = (eventInfo: any) => {
    const title = eventInfo.event.title;
    const firstSpaceIndex = title.indexOf(" ");
    const titleParts =
      firstSpaceIndex !== -1
        ? [title.slice(0, firstSpaceIndex), title.slice(firstSpaceIndex + 1)]
        : [title];

    const isSmallScreen = window.innerWidth <= 600;

    return (
      <div className="whitespace-normal break-words">
        <b className={isSmallScreen ? "text-xs" : "text-base"}>
          {eventInfo.timeText}
        </b>
        <div>
          <i className={isSmallScreen ? "text-xs" : "text-base"}>
            {titleParts[0]}
          </i>
          {titleParts[1] && (
            <i className={isSmallScreen ? "text-xs block" : "text-base"}>
              <br />
              {titleParts[1]}
            </i>
          )}
        </div>
      </div>
    );
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
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventContent={renderEventContent}
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
                {eventType === "league" && (
                  <>
                    <div>
                      <Table aria-label="프로리그 세트 정보">
                        <TableHeader>
                          <TableColumn>
                            <div className="text-center">홈플레이어</div>
                          </TableColumn>
                          <TableColumn>
                            <div className="text-center">티어</div>
                          </TableColumn>
                          <TableColumn>
                            <div className="text-center">원정플레이어</div>
                          </TableColumn>
                        </TableHeader>
                        <TableBody>
                          {eventSets.map((set: any, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {" "}
                                <div className="text-center">
                                  {set.homePlayer}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-center">
                                  <p className="font-bold">{set.tier}</p>
                                  <p>{set.map}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                {" "}
                                <div className="text-center">
                                  {set.awayPlayer}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Link href="/proleague/schedule">자세히 보기</Link>
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {typeof userGrade === "number" && userGrade >= 4 && (
                  <>
                    {eventType === "general" ? (
                      <>
                        {isEditable ? (
                          <>
                            <Button color="primary" onPress={fixEvent}>
                              확인
                            </Button>
                            <Button color="danger" onPress={handleCancelEdit}>
                              취소
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button color="primary" onPress={handleEdit}>
                              수정
                            </Button>
                            <Button
                              color="danger"
                              variant="flat"
                              onPress={() => {
                                delEvent();
                              }}
                            >
                              삭제
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <Button color="danger" onPress={eventOnClose}>
                        닫기
                      </Button>
                    )}
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <SubmitModal
        title={submitModalTitle}
        text={submitModalText}
        isOpen={submitModalOpen}
        onClose={submitModalOnClose}
      />
    </div>
  );
}
