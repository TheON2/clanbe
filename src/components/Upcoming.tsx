"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import koLocale from "@fullcalendar/core/locales/ko";
import styles from "../styles/style.module.css";
import { DayHeaderContentArg, EventClickArg } from "@fullcalendar/core";

const renderEventContent = (eventInfo: any) => {
  const title = eventInfo.event.title;
  const firstSpaceIndex = title.indexOf(" ");
  const titleParts =
    firstSpaceIndex !== -1
      ? [title.slice(0, firstSpaceIndex), title.slice(firstSpaceIndex + 1)]
      : [title];

  return (
    <div className="whitespace-normal break-words">
      <b>{eventInfo.timeText}</b>
      <div className="text-xs">
        <i>{titleParts[0]}</i>
        {titleParts[1] && (
          <i className="hidden sm:inline">
            <br />
            {titleParts[1]}
          </i>
        )}
      </div>
    </div>
  );
};

const renderDayHeaderContent = (headerInfo: DayHeaderContentArg) => {
  return (
    <div className="flex items-center justify-center text-center h-[10px]">
      <p className="text-xs text-black">
        {headerInfo.sideText} {headerInfo.text[0]}
      </p>
    </div>
  );
};

const Upcoming = ({ events }: any) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState("general");
  const [eventSets, setEventSets] = useState([]);

  const handleEventClick = (arg: EventClickArg) => {
    const { event } = arg;
    setEventType(event.extendedProps.type);

    setEventName(event.title);
    setEventDescription(event.extendedProps?.description ?? "");

    if (event.extendedProps.type === "league") {
      setEventSets(event.extendedProps.sets);
    } else {
      setEventSets([]);
    }

    onOpen();
  };

  return (
    <Card className={`w-full lg:w-1/2 ${styles.customCard} h-[400px]`}>
      <CardHeader className="flex gap-3">
        <Image alt="nextui logo" height={60} src="/Belogo.png" width={60} />
        <div className="flex flex-col">
          <Link href={"/clanbe/schedule"}>
            <p className="text-lg font-bold hover:text-blue-default cursor-pointer">
              클랜 일정
            </p>
          </Link>
          <p className="text-small text-default-500">이번주 일정</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="calendar-container px-2">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            initialView="listWeek"
            weekends={true}
            locale={koLocale}
            events={events}
            height={"300px"}
            headerToolbar={{
              right: "prev,next today",
              center: "",
              left: "listWeek,dayGridMonth",
            }}
            titleFormat={{
              month: "long",
              year: "numeric",
              day: "numeric",
              weekday: "long",
            }}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            dayHeaderContent={renderDayHeaderContent}
          />
        </div>
      </CardBody>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">이벤트</ModalHeader>
          <ModalBody>
            <p>{eventName}</p>
            <p>{eventDescription}</p>
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
                            <div className="text-center">{set.homePlayer}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <p className="font-bold">{set.tier}</p>
                              <p>{set.map}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">{set.awayPlayer}</div>
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
            <Button color="danger" onPress={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default Upcoming;
