import React, { Key, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CircularProgress,
  Divider,
  Image,
  Progress,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
  Tabs,
  Tab,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  Input,
} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import {
  DateValue,
  parseDate,
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from "@internationalized/date";
import { UserTwitterCard } from "../UserTwitterCard";
import { User as MyUser } from "next-auth";
import { Point, Team } from "../../../types/types";
import { UserSettingIcon } from "../../../public/UserSettingIcon";
import { LogoutIcon } from "../../../public/logout";
import { PointIcon } from "../../../public/point";
import { ListIcon } from "../../../public/list";
import { tabs } from "../../../public/data";
import { signOut } from "next-auth/react";
import { useDateFormatter } from "@react-aria/i18n";
import { useRouter } from "next/navigation";
import { createMatch } from "@/service/match";
import TextModal from "../TextModal"; // TextModal 컴포넌트를 가져옵니다.
import SubmitModal from "../SubmitModal";
import { sendPoint } from "@/service/point";
import { formatDateOnly } from "@/utils/dateUtils";

type UserTabProps = {
  user: MyUser;
  teams: Team[];
  users: MyUser[];
  points: Point[];
};
function PointTable({ data }: { data: any[] }) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>SEND</TableColumn>
        <TableColumn>RECEIVE</TableColumn>
        <TableColumn>POINT</TableColumn>
        <TableColumn>MESSAGE</TableColumn>
        <TableColumn>CREATED AT</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.senduser}</TableCell>
            <TableCell>{item.receiveuser}</TableCell>
            <TableCell>{item.point}</TableCell>
            <TableCell>{item.message}</TableCell>
            <TableCell>{formatDateOnly(item.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const UserTab = ({ user: sessionUser, teams, users, points }: UserTabProps) => {
  const router = useRouter();
  const maps = [
    { id: "1", name: "폴리포이드" },
    { id: "2", name: "투혼" },
    { id: "3", name: "블리츠" },
    { id: "4", name: "다크오리진" },
    { id: "5", name: "아포칼립스" },
    { id: "6", name: "시타델" },
    { id: "7", name: "라데온" },
    { id: "8", name: "레트로" },
    { id: "9", name: "레트로" },
    { id: "10", name: "버미어" },
  ];

  const [winnerNickname, setWinnerNickname] = useState("");
  const [loserNickname, setLoserNickname] = useState("");
  const [winnerRace, setWinnerRace] = useState("z");
  const [loserRace, setLoserRace] = useState("z");
  const [selectedMap, setSelectedMap] = useState("");
  const [matchDateValue, setMatchDateValue] = useState<DateValue | null>(null);
  const [matchDate, setMatchDate] = useState(new Date());
  const [point, setPoint] = useState("0");
  const [message, setMessage] = useState("");

  const [winnerNicknameKey, setWinnerNicknameKey] = useState<string>("winner");
  const [loserNicknameKey, setLoserNicknameKey] = useState<string>("loser");
  const [winnerRaceKey, setWinnerRaceKey] = useState<string>("z");
  const [loserRaceKey, setLoserRaceKey] = useState<string>("z");
  const [mapKey, setMapKey] = useState<string>("0");

  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isPointOpen,
    onOpen: onPointOpen,
    onOpenChange: onPointChange,
    onClose: onPointClose,
  } = useDisclosure();
  const {
    isOpen: isPointDataOpen,
    onOpen: onPointDataOpen,
    onOpenChange: onPointDataChange,
    onClose: onPointDataClose,
  } = useDisclosure();

  // Find the current user from the users array based on email
  let currentUser = users.find((u) => u.email === sessionUser.email);

  if (!currentUser) {
    currentUser = sessionUser;
  }

  const totalWins =
    currentUser?.BELO.pw + currentUser?.BELO.tw + currentUser?.BELO.zw;
  const totalLosses =
    currentUser?.BELO.pl + currentUser?.BELO.tl + currentUser?.BELO.zl;

  const totalGames = totalWins + totalLosses;

  const winRateTotal = useMemo(() => {
    const totalWins =
      currentUser?.BELO.pw + currentUser?.BELO.tw + currentUser?.BELO.zw;
    const totalGames =
      totalWins +
      (currentUser?.BELO.pl + currentUser?.BELO.tl + currentUser?.BELO.zl);
    return (totalWins / totalGames) * 100;
  }, [currentUser?.BELO]);

  const winRateP = useMemo(() => {
    return (
      (currentUser?.BELO.pw / (currentUser?.BELO.pw + currentUser?.BELO.pl)) *
      100
    );
  }, [currentUser?.BELO.pw, currentUser?.BELO.pl]);

  const winRateT = useMemo(() => {
    return (
      (currentUser?.BELO.tw / (currentUser?.BELO.tw + currentUser?.BELO.tl)) *
      100
    );
  }, [currentUser?.BELO.tw, currentUser?.BELO.tl]);

  const winRateZ = useMemo(() => {
    return (
      (currentUser?.BELO.zw / (currentUser?.BELO.zw + currentUser?.BELO.zl)) *
      100
    );
  }, [currentUser?.BELO.zw, currentUser?.BELO.zl]);

  // 레벨과 경험치 백분율 계산
  const level = Math.floor(currentUser?.point / 1000);
  const expPercentage = (currentUser?.point % 1000) / 10;

  const myTeam = teams?.find((team: Team) => team._id === currentUser?.team);

  const winRateTeam = myTeam ? (myTeam.w / (myTeam.w + myTeam.l)) * 100 : 0;
  // myTeam이 undefined일 경우 승률을 0으로 설정

  // 팀 이미지 경로 매핑
  const teamImagePaths: { [key: string]: string } = {
    갈락티코: "/grtc.jpg",
    버킹엄: "/bk.jpg",
    원: "/one.jpg",
  };

  // 선택한 팀에 따른 이미지 경로 결정
  const imagePath = teamImagePaths[currentUser?.team] || "/Belogo.png";

  let formatter = useDateFormatter({ dateStyle: "full" });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      setMatchDateValue(parseDate(new Date().toISOString().split("T")[0]));
    }
  }, [isOpen]);

  const handleDateChange = (
    newDateValue: CalendarDate | CalendarDateTime | ZonedDateTime
  ) => {
    // newDateValue가 CalendarDate 타입인지 확인합니다.
    if (newDateValue instanceof CalendarDate) {
      setMatchDateValue(newDateValue);
    }
    // newDateValue가 CalendarDateTime 타입인지 확인합니다.
    else if (newDateValue instanceof CalendarDateTime) {
      setMatchDateValue(
        new CalendarDate(
          newDateValue.year,
          newDateValue.month,
          newDateValue.day
        )
      );
    }
    // newDateValue가 ZonedDateTime 타입인지 확인합니다.
    else if (newDateValue instanceof ZonedDateTime) {
      setMatchDateValue(
        new CalendarDate(
          newDateValue.year,
          newDateValue.month,
          newDateValue.day
        )
      );
    }
  };

  const handleWinnerSelection = (nickname: string) => {
    const selectedUser = users.find((u) => u.nickname === nickname);
    if (selectedUser) {
      setWinnerNickname(nickname);
      setWinnerRace(selectedUser.BELO.race);
      setWinnerRaceKey(selectedUser.BELO.race);
    }
  };

  const handleLoserSelection = (nickname: string) => {
    const selectedUser = users.find((u) => u.nickname === nickname);
    if (selectedUser) {
      setLoserNickname(nickname);
      setLoserRace(selectedUser.BELO.race);
      setLoserRaceKey(selectedUser.BELO.race);
    }
  };

  const handleWinnerSelectionChange = (key: Key | null) => {
    setWinnerNicknameKey(key as string);
  };

  const handleLoserSelectionChange = (key: Key | null) => {
    setLoserNicknameKey(key as string);
  };

  const swapUsers = () => {
    // 닉네임과 종족 정보를 교환
    const tempNickname = winnerNickname;
    const tempRace = winnerRace;
    const tempRaceKey = winnerRaceKey;

    setWinnerNickname(loserNickname);
    setWinnerRace(loserRace);
    setWinnerRaceKey(loserRaceKey);

    setLoserNickname(tempNickname);
    setLoserRace(tempRace);
    setLoserRaceKey(tempRaceKey);

    setWinnerNicknameKey(loserNicknameKey);
    setLoserNicknameKey(winnerNicknameKey);
  };

  const addMatch = async () => {
    // 입력 값 검사
    if (
      !winnerNickname ||
      !loserNickname ||
      !winnerRace ||
      !loserRace ||
      !selectedMap ||
      !matchDate
    ) {
      setModalTitle("입력 오류");
      setModalText("모든 필드를 채워주세요.");
      onModalOpen();
      return;
    }

    if (winnerNickname === loserNickname) {
      setModalTitle("입력 오류");
      setModalText("같은 상대끼리 전적을 등록 할 수 없습니다.");
      onModalOpen();
      return;
    }

    const newMatch = {
      name: "BELO",
      winner: winnerNickname,
      wrace: winnerRace,
      loser: loserNickname,
      lrace: loserRace,
      map: selectedMap,
      date: matchDate,
    };

    try {
      await createMatch(newMatch);
      setModalTitle("등록 성공");
      setModalText("경기 결과가 성공적으로 등록되었습니다.");
      onModalOpen();
    } catch (error) {
      setModalTitle("등록 실패");
      setModalText("등록에 실패했습니다.");
      onModalOpen();
    }
  };

  const sendPointData = async () => {
    // 입력 값 검사
    if (!point || !winnerNickname) {
      setModalTitle("입력 오류");
      setModalText("모든 필드를 채워주세요.");
      onModalOpen();
      return;
    }

    const newPointData = {
      senduser: currentUser.nickname,
      receiveuser: winnerNickname,
      point,
      message,
    };

    try {
      await sendPoint(newPointData);
      setModalTitle("포인트 전송 성공");
      setModalText("성공적으로 포인트를 보냈습니다.");
      onModalOpen();
    } catch (error) {
      setModalTitle("포인트 전송 실패");
      setModalText("포인트 전송에 실패했습니다.");
      onModalOpen();
    }
  };

  const resetData = () => {
    setWinnerNickname("");
    setLoserNickname("");
    setWinnerRace("z");
    setLoserRace("z");
    setSelectedMap("");
    setMatchDateValue(parseDate("2024-04-04"));
    setMatchDate(new Date());

    setWinnerNicknameKey("1");
    setLoserNicknameKey("2");
    setWinnerRaceKey("z");
    setLoserRaceKey("z");
    setMapKey((prevKey) => prevKey + 1);
  };

  const closeModal = () => {
    resetData();
    onOpenChange();
  };

  const sendData = points.filter(
    (item) => item.senduser === currentUser.nickname
  );
  const receiveData = points.filter(
    (item) => item.receiveuser === currentUser.nickname
  );

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        <Tab key={"BELO"} title={"BELO"}>
          <Card>
            <CardBody className="">
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <p className="font-bold font-mono text-3xl text-blue text-center">
                    {currentUser.role}
                  </p>
                </div>
                <div>
                  <Button
                    isIconOnly
                    variant="light"
                    color="primary"
                    startContent={
                      <UserSettingIcon filled={"none"} height={24} width={24} />
                    }
                    onPress={() =>
                      router.push(`/user/profile/${currentUser.email}`)
                    }
                  ></Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    startContent={
                      <LogoutIcon filled={"none"} height={24} width={24} />
                    }
                    onPress={() => signOut()}
                  ></Button>
                </div>
              </div>
              <Divider />
              <div className="mt-4 mb-6">
                <div className="flex items-center m-2 gap-2 ">
                  {/* Avatar 위치를 조정합니다. */}
                  <Avatar
                    src={currentUser.avatar}
                    className="w-20 h-20 text-large"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">{currentUser.nickname}</p>
                    <p className="font-bold text-md text-blue">
                      @{currentUser.name}
                    </p>
                  </div>
                </div>
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md border border-default",
                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                    label: "tracking-wider font-medium text-default-600",
                    value: "text-foreground/60",
                  }}
                  label={"LV" + level}
                  value={expPercentage}
                  showValueLabel={true}
                />
                <div className="mt-2 flex items-center justify-center gap-2">
                  <p className="font-bold text-md text-center">
                    POINT {currentUser.point}
                  </p>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    startContent={
                      <PointIcon filled={"none"} height={24} width={24} />
                    }
                    onPress={() => onPointOpen()}
                  ></Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="primary"
                    startContent={
                      <ListIcon filled={"none"} height={24} width={24} />
                    }
                    onPress={() => onPointDataOpen()}
                  ></Button>
                </div>
              </div>
              <div className="flex my-4 ">
                <CircularProgress
                  aria-label="Loading..."
                  classNames={{
                    svg: "w-20 h-20",
                  }}
                  value={winRateTotal}
                  color={winRateTotal >= 50 ? "success" : "danger"}
                  showValueLabel={true}
                />
                <div>
                  <p className="mx-2 font-bold text-xl">
                    {totalWins}W {totalLosses}L
                  </p>
                  <p className="mx-2 font-bold text-2xl">
                    {currentUser.tear} Tier
                  </p>
                </div>
              </div>
              <div className="flex flex-col ml-4">
                <div className="flex my-2">
                  <CircularProgress
                    aria-label="Loading..."
                    size="lg"
                    value={winRateP}
                    color={winRateP >= 50 ? "success" : "danger"}
                    showValueLabel={true}
                  />
                  <p className="mx-4 font-bold">
                    vs P <br /> {currentUser.BELO.pw}W {currentUser.BELO.pl}L
                  </p>
                </div>
                <div className="flex my-2">
                  <CircularProgress
                    aria-label="Loading..."
                    size="lg"
                    value={winRateZ}
                    color={winRateZ >= 50 ? "success" : "danger"}
                    showValueLabel={true}
                  />
                  <p className="mx-4 font-bold">
                    vs Z <br /> {currentUser.BELO.zw}W {currentUser.BELO.zl}L
                  </p>
                </div>
                <div className="flex my-2">
                  <CircularProgress
                    aria-label="Loading..."
                    size="lg"
                    value={winRateT}
                    color={winRateT >= 50 ? "success" : "danger"}
                    showValueLabel={true}
                  />
                  <p className="mx-4 font-bold">
                    vs T <br /> {currentUser.BELO.tw}W {currentUser.BELO.tl}L
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 my-4">
                <Button color="primary" onPress={onOpen}>
                  BELO 등록
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key={"LEAGUE"} title={"LEAGUE"}>
          <Card>
            <CardBody className="">
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <p className="font-bold font-mono text-3xl text-blue text-center">
                    {currentUser.role}
                  </p>
                </div>
                <div>
                  <Button
                    isIconOnly
                    variant="light"
                    color="primary"
                    startContent={
                      <UserSettingIcon filled={"none"} height={24} width={24} />
                    }
                    onPress={() =>
                      router.push(`/user/profile/${currentUser.email}`)
                    }
                  ></Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    startContent={
                      <LogoutIcon filled={"none"} height={24} width={24} />
                    }
                    onPress={() => signOut()}
                  ></Button>
                </div>
              </div>
              <Divider />
              <div className="mt-4 mb-6">
                <div className="flex items-center m-2 gap-4">
                  {/* Avatar 위치를 조정합니다. */}
                  <Avatar
                    src={currentUser.avatar}
                    className="w-20 h-20 text-large"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">{currentUser.nickname}</p>
                    <p className="font-bold text-md text-blue">
                      @{currentUser.name}
                    </p>
                  </div>
                </div>
                <Progress
                  size="sm"
                  radius="sm"
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md border border-default",
                    indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                    label: "tracking-wider font-medium text-default-600",
                    value: "text-foreground/60",
                  }}
                  label={"LV" + level}
                  value={expPercentage}
                  showValueLabel={true}
                />
              </div>
              <Image
                alt="Card background"
                src={myTeam?.avatar}
                width={200}
                height={200}
                className="my-4"
              />
              <p className="font-bold font-mono text-3xl text-blue text-center">
                {myTeam?.name}
              </p>
              <div className="flex my-2">
                <CircularProgress
                  aria-label="Loading..."
                  classNames={{
                    svg: "w-20 h-20",
                  }}
                  value={winRateTeam}
                  color={winRateTeam >= 50 ? "success" : "danger"}
                  showValueLabel={true}
                />
                <div>
                  <p className="mx-4 font-bold">
                    {myTeam?.ranking}위 {myTeam?.w}W {myTeam?.l}L
                  </p>
                  <p className="mx-4 font-bold">득실 {myTeam?.point}</p>
                  <p className="mx-4 font-bold">승점 {myTeam?.winpoint}</p>
                </div>
              </div>
              <div className="flex flex-col w-full gap-3 my-4">
                <Popover showArrow placement="top">
                  <PopoverTrigger>
                    <Button color="primary">내 리그정보</Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-1">
                    <div className="flex my-4 ">
                      <CircularProgress
                        aria-label="Loading..."
                        classNames={{
                          svg: "w-20 h-20",
                        }}
                        value={winRateTotal}
                        color={winRateTotal >= 50 ? "success" : "danger"}
                        showValueLabel={true}
                      />
                      <div>
                        <p className="mx-2 font-bold text-xl">
                          {totalWins}W {totalLosses}L
                        </p>
                        <p className="mx-2 font-bold text-2xl">
                          {currentUser.tear} Tier
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col ml-4">
                      <div className="flex my-2">
                        <CircularProgress
                          aria-label="Loading..."
                          size="lg"
                          value={winRateP}
                          color={winRateP >= 50 ? "success" : "danger"}
                          showValueLabel={true}
                        />
                        <p className="mx-4 font-bold">
                          vs P <br /> {currentUser.BELO.pw}W{" "}
                          {currentUser.BELO.pl}L
                        </p>
                      </div>
                      <div className="flex my-2">
                        <CircularProgress
                          aria-label="Loading..."
                          size="lg"
                          value={winRateZ}
                          color={winRateZ >= 50 ? "success" : "danger"}
                          showValueLabel={true}
                        />
                        <p className="mx-4 font-bold">
                          vs Z <br /> {currentUser.BELO.zw}W{" "}
                          {currentUser.BELO.zl}L
                        </p>
                      </div>
                      <div className="flex my-2">
                        <CircularProgress
                          aria-label="Loading..."
                          size="lg"
                          value={winRateT}
                          color={winRateT >= 50 ? "success" : "danger"}
                          showValueLabel={true}
                        />
                        <p className="mx-4 font-bold">
                          vs T <br /> {currentUser.BELO.tw}W{" "}
                          {currentUser.BELO.tl}L
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  color="primary"
                  onPress={() => router.push("/PROLEAGUE/schedule")}
                >
                  프로리그 일정
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      <Modal isOpen={isOpen} onOpenChange={closeModal} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                BELO 등록
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2 mx-4">
                  <Autocomplete
                    label="승자 닉네임"
                    className="w-3/5"
                    value={winnerNickname}
                    onInputChange={(value) => {
                      if (value !== winnerNickname) {
                        handleWinnerSelection(value);
                      }
                    }}
                    selectedKey={winnerNicknameKey}
                    onSelectionChange={handleWinnerSelectionChange}
                  >
                    {users.map((user) => (
                      <AutocompleteItem
                        key={String(user.name)}
                        value={user.nickname}
                      >
                        {user.nickname}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Select
                    className="w-2/5"
                    aria-label="Select winner race"
                    value={winnerRace}
                    onChange={(key) => {
                      setWinnerRace(String(key));
                      setWinnerRaceKey(String(key));
                    }}
                    selectedKeys={new Set([winnerRaceKey])}
                  >
                    <SelectItem key="z">Zerg</SelectItem>
                    <SelectItem key="t">Terran</SelectItem>
                    <SelectItem key="p">Protoss</SelectItem>
                  </Select>
                </div>
                <div className="flex gap-2 mx-4">
                  <Autocomplete
                    label="패자 닉네임"
                    className="w-3/5"
                    value={loserNickname}
                    onInputChange={(value) => {
                      if (value !== loserNickname) {
                        handleLoserSelection(value);
                      }
                    }}
                    selectedKey={loserNicknameKey}
                    onSelectionChange={handleLoserSelectionChange}
                  >
                    {users.map((user) => (
                      <AutocompleteItem
                        key={String(user.name)}
                        value={user.nickname}
                      >
                        {user.nickname}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Select
                    className="w-2/5"
                    aria-label="Select loser race"
                    value={loserRace}
                    onChange={(key) => {
                      setLoserRace(String(key));
                      setLoserRaceKey(String(key));
                    }}
                    selectedKeys={new Set([loserRaceKey])}
                  >
                    <SelectItem key="z">Zerg</SelectItem>
                    <SelectItem key="t">Terran</SelectItem>
                    <SelectItem key="p">Protoss</SelectItem>
                  </Select>
                </div>
                <div className="flex gap-2 mx-4">
                  <Autocomplete
                    label="맵 선택"
                    className="w-3/5"
                    key={mapKey}
                    value={selectedMap}
                    onInputChange={(value) => {
                      if (value !== selectedMap) {
                        setSelectedMap(value);
                      }
                    }}
                  >
                    {maps.map((map) => (
                      <AutocompleteItem key={map.id} value={map.name}>
                        {map.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <DatePicker
                    label="Match date"
                    value={matchDateValue}
                    onChange={handleDateChange}
                    className="w-2/5"
                  />
                </div>
                <p className="font-bold text-lg">경기결과</p>
                <Card className="w-full mx-2">
                  <Table aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>승자</TableColumn>
                      <TableColumn>종족</TableColumn>
                      <TableColumn>패배자</TableColumn>
                      <TableColumn>종족</TableColumn>
                      <TableColumn>맵</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>{winnerNickname}</TableCell>
                        <TableCell>{winnerRace}</TableCell>
                        <TableCell>{loserNickname}</TableCell>
                        <TableCell>{loserRace}</TableCell>
                        <TableCell>{selectedMap}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={swapUsers}>
                  유저전환
                </Button>
                <Button color="primary" variant="flat" onPress={resetData}>
                  초기화
                </Button>
                <Button color="danger" variant="flat" onPress={closeModal}>
                  닫기
                </Button>
                <Button color="success" onPress={addMatch}>
                  등록
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isPointOpen}
        onOpenChange={onPointChange}
        placement="top-center"
      >
        <ModalContent>
          {(onPointClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                포인트 전송
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2 mx-4 justify-center items-center">
                  <div className="flex w-full justify-center items-center gap-2">
                    <Autocomplete
                      label="클랜원"
                      className=""
                      value={winnerNickname}
                      onInputChange={(value) => {
                        if (value !== winnerNickname) {
                          handleWinnerSelection(value);
                        }
                      }}
                      selectedKey={winnerNicknameKey}
                      onSelectionChange={handleWinnerSelectionChange}
                    >
                      {users.map((user) => (
                        <AutocompleteItem
                          key={String(user.name)}
                          value={user.nickname}
                        >
                          {user.nickname}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                    <Input
                      type="number"
                      name="point"
                      labelPlacement={"outside"}
                      placeholder="보낼 포인트"
                      value={point}
                      className="py-4"
                      size="lg"
                      onChange={(e) => {
                        setPoint(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      name="message"
                      labelPlacement={"outside"}
                      placeholder="보낼 메세지"
                      value={message}
                      className="py-4"
                      size="lg"
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-full px-4">
                    <p className="font-bold">
                      전송 전 포인트 : {currentUser.point}
                    </p>
                    <p className="font-bold">
                      전송 후 포인트 : {currentUser.point - Number(point)}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onPointClose}>
                  닫기
                </Button>
                <Button color="success" onPress={sendPointData}>
                  보내기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isPointDataOpen}
        onOpenChange={onPointDataChange}
        placement="top-center"
      >
        <ModalContent>
          {(onPointDataClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                포인트 내역 조회
              </ModalHeader>
              <ModalBody>
                <div>
                  <Tabs aria-label="Dynamic tabs">
                    <Tab key={"send"} title={"포인트 전송내역"}>
                      <PointTable data={sendData} />
                    </Tab>
                    <Tab key={"recieve"} title={"포인트 수신내역"}>
                      <PointTable data={receiveData} />
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onPointDataClose}
                >
                  닫기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <SubmitModal
        title={modalTitle}
        text={modalText}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </>
  );
};

export default UserTab;
