import React, { useEffect, useMemo, useState } from "react";
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
  Input,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
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
  getLocalTimeZone,
  CalendarDate,
} from "@internationalized/date";
import { UserTwitterCard } from ".././UserTwitterCard";
import { User as MyUser } from "next-auth";
import { Team } from "../../../types/types";
import { UserSettingIcon } from "../../../public/UserSettingIcon";
import { LogoutIcon } from "../../../public/logout";
import { tabs } from "../../../public/data";
import { signOut } from "next-auth/react";
import { useDateFormatter } from "@react-aria/i18n";
import { useRouter } from "next/navigation";
import { createMatch } from "@/service/match";

type UserTabProps = {
  user: MyUser;
  teams: Team[];
  users: MyUser[];
};

const UserTab = ({ user, teams, users }: UserTabProps) => {
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
  const [winnerRace, setWinnerRace] = useState("");
  const [loserRace, setLoserRace] = useState("");
  const [selectedMap, setSelectedMap] = useState("");
  const [matchDateValue, setMatchDateValue] = useState(parseDate("2024-04-04"));
  const [matchDate, setMatchDate] = useState(new Date());

  const [winnerNicknameKey, setWinnerNicknameKey] = useState<any>("winner");
  const [loserNicknameKey, setLoserNicknameKey] = useState<any>("loser");
  const [winnerRaceKey, setWinnerRaceKey] = useState("z");
  const [loserRaceKey, setLoserRaceKey] = useState("z");
  const [mapKey, setMapKey] = useState(0);

  const totalWins = user.BELO.pw + user.BELO.tw + user.BELO.zw;
  const totalLosses = user.BELO.pl + user.BELO.tl + user.BELO.zl;

  const totalGames = totalWins + totalLosses;

  const winRateTotal = useMemo(() => {
    const totalWins = user.BELO.pw + user.BELO.tw + user.BELO.zw;
    const totalGames = totalWins + (user.BELO.pl + user.BELO.tl + user.BELO.zl);
    return (totalWins / totalGames) * 100;
  }, [user.BELO]);

  const winRateP = useMemo(() => {
    return (user.BELO.pw / (user.BELO.pw + user.BELO.pl)) * 100;
  }, [user.BELO.pw, user.BELO.pl]);

  const winRateT = useMemo(() => {
    return (user.BELO.tw / (user.BELO.tw + user.BELO.tl)) * 100;
  }, [user.BELO.tw, user.BELO.tl]);

  const winRateZ = useMemo(() => {
    return (user.BELO.zw / (user.BELO.zw + user.BELO.zl)) * 100;
  }, [user.BELO.zw, user.BELO.zl]);

  // 레벨과 경험치 백분율 계산
  const level = Math.floor(user.point / 1000);
  const expPercentage = (user.point % 1000) / 10;

  const myTeam = teams?.find((team: Team) => team._id === user.team);

  const winRateTeam = myTeam ? (myTeam.w / (myTeam.w + myTeam.l)) * 100 : 0;
  // myTeam이 undefined일 경우 승률을 0으로 설정

  // 팀 이미지 경로 매핑
  const teamImagePaths: { [key: string]: string } = {
    갈락티코: "/grtc.jpg",
    버킹엄: "/bk.jpg",
    원: "/one.jpg",
  };

  // 선택한 팀에 따른 이미지 경로 결정
  const imagePath = teamImagePaths[user.team] || "/Belogo.png";

  let formatter = useDateFormatter({ dateStyle: "full" });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // CalendarDate를 Date 객체로 변환
    const newDate = new Date(
      matchDateValue.year,
      matchDateValue.month - 1,
      matchDateValue.day
    );
    setMatchDate(newDate);
  }, [matchDateValue]);

  const handleDateChange = (newDateValue: CalendarDate) => {
    setMatchDateValue(newDateValue);
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
      alert("모든 필드를 채워주세요.");
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
      //onOpenChange();
    } catch (error) {
      alert("등록실패");
    }
  };

  const resetData = () => {
    setWinnerNickname("");
    setLoserNickname("");
    setWinnerRace("");
    setLoserRace("");
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

  return (
    <>
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        <Tab key={"BELO"} title={"BELO"}>
          <Card>
            <CardBody className="">
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <p className="font-bold font-mono text-3xl text-blue text-center">
                    {user.role}
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
                    onPress={() => router.push(`/user/profile/${user.email}`)}
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
                <div className="flex items-center m-2 gap-4 ">
                  {/* Avatar 위치를 조정합니다. */}
                  <Avatar src={user.avatar} className="w-20 h-20 text-large" />
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">{user.nickname}</p>
                    <p className="font-bold text-md text-blue">@{user.name}</p>
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
                  <p className="mx-2 font-bold text-2xl">{user.tear} Tier</p>
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
                    vs P <br /> {user.BELO.pw}W {user.BELO.pl}L
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
                    vs Z <br /> {user.BELO.zw}W {user.BELO.zl}L
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
                    vs T <br /> {user.BELO.tw}W {user.BELO.tl}L
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
                    {user.role}
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
                    onPress={() => router.push(`/user/profile/${user.email}`)}
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
                  <Avatar src={user.avatar} className="w-20 h-20 text-large" />
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">{user.nickname}</p>
                    <p className="font-bold text-md text-blue">@{user.name}</p>
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
              <div className="flex flex-col mx-auto my-4">
                <p>Next Match</p>
                <div className="p-4">
                  <Popover showArrow placement="bottom">
                    <PopoverTrigger>
                      <User
                        as="button"
                        name="갈락티코"
                        description="1위 3승 1패"
                        className="transition-transform"
                        avatarProps={{
                          src: "/grtc.jpg",
                        }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="p-1">
                      <UserTwitterCard />
                    </PopoverContent>
                  </Popover>
                </div>
                <Tooltip showArrow={true} content="D-2">
                  <Button>2023-07-04</Button>
                </Tooltip>
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
                    onSelectionChange={setWinnerNicknameKey}
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
                    defaultSelectedKeys={["z"]}
                    key={winnerRaceKey}
                    onChange={(e) => {
                      setWinnerRaceKey(e.target.value);
                      setWinnerRace(e.target.value);
                    }}
                    selectedKeys={winnerRaceKey}
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
                    onSelectionChange={setLoserNicknameKey}
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
                    key={loserRaceKey}
                    value={loserRace}
                    defaultSelectedKeys={["z"]}
                    onChange={(e) => {
                      setLoserRace(e.target.value);
                      setLoserRaceKey(e.target.value);
                    }}
                    selectedKeys={loserRaceKey}
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
    </>
  );
};

export default UserTab;
