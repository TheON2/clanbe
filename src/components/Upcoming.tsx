"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/style.module.css";
import { getEvent } from "@/app/CLANBE/schedule/action";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import koLocale from "@fullcalendar/core/locales/ko";
import Link from "next/link";

const Upcoming = ({ events }: any) => {
  return (
    <Card className={`w-full lg:w-1/2 ${styles.customCard} h-[400px]`}>
      <CardHeader className="flex gap-3">
        <Image alt="nextui logo" height={60} src="/Belogo.png" width={60} />
        <div className="flex flex-col">
          <Link href={"/CLANBE/schedule"}>
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
            headerToolbar={false}
            titleFormat={{
              month: "long",
              year: "numeric",
              day: "numeric",
              weekday: "long",
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Upcoming;
