"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { User } from "next-auth";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CircularProgress,
  Divider,
  Button,
  Autocomplete,
  AutocompleteItem,
  Chip,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import Image from "next/image";
import { Team } from "../../../types/types";
import ProleagueAvatarCard from "../ProleagueAvatarCard";
import {
  createTeamData,
  deleteTeamData,
  updateTeamData,
  updateUserTeam,
} from "@/service/team";
import SubmitModal from "../SubmitModal";
import { useSession } from "next-auth/react";
import { EyeIcon } from "../../../public/EyeIcon";
import { DeleteIcon } from "../../../public/DeleteIcon";
import { useRouter } from "next/navigation";
import { EditIcon } from "../../../public/EditIcon";

interface UserItem {
  nickname: string;
  tier: string;
  race: string;
  wins: number;
  losses: number;
  belo: number;
  team?: string;
  [key: string]: string | number | undefined; // 인덱스 시그니처 추가
}

interface Column {
  name: string;
  uid: string;
  sortable: boolean;
  align?: "center" | "start" | "end";
  width?: number;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

const tierColorMap: Record<string, string> = {
  "S+": "bg-green-100",
  S: "bg-green-200",
  "A+": "bg-blue-100",
  A: "bg-blue-200",
  "B+": "bg-yellow-100",
  B: "bg-yellow-200",
  C: "bg-red-100",
  D: "bg-red-200",
};

const AdminPage = ({ teams, users }: any) => {
  type User = (typeof users)[0];
  // 모달 상태 추가
  const router = useRouter();
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [selectedTeamChange, setSelectedTeamChange] = useState("");
  const [teamDetails, setTeamDetails] = useState({
    name: "",
    leader: "",
    subleader: "",
    avatar: "",
  });
  const [newTeamDetails, setNewTeamDetails] = useState({
    name: "",
    leader: "",
    subleader: "",
    avatar: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [leaderNicknameKey, setLeaderNicknameKey] = useState<any>("leader");
  const [subLeaderNicknameKey, setSubLeaderNicknameKey] =
    useState<any>("subleader");

  const [newPreviewImage, setNewPreviewImage] = useState("");
  const [newLeaderNicknameKey, setNewLeaderNicknameKey] = useState<any>("");
  const [newSubLeaderNicknameKey, setNewSubLeaderNicknameKey] =
    useState<any>("");

  // 모달 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [teamPage, setTeamPage] = useState(1);
  const [noTeamPage, setNoTeamPage] = useState(1);
  const rowsPerPage = 10;

  // 선택한 팀 객체를 찾습니다.
  const selectedTeam = useMemo(
    () => teams.find((team: Team) => team.name === selectedTeamName),
    [selectedTeamName, teams]
  );

  const getTeamNameById = useCallback(
    (teamId: string) => {
      const team = teams.find((team: Team) => team._id === teamId);
      return team ? team.name : "";
    },
    [teams]
  );

  const { data: session, status } = useSession(); // 세션 데이터와 상태 가져오기
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const userGrade = user?.grade ?? 0;

  // 팀 선택 시 팀 상세 정보 업데이트
  useEffect(() => {
    if (selectedTeam) {
      setTeamDetails({
        name: selectedTeam.name,
        leader: selectedTeam.leader,
        subleader: selectedTeam.subleader,
        avatar: selectedTeam.avatar,
      });
      setPreviewImage(selectedTeam.avatar);
    }
  }, [selectedTeam]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTeamDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewTeamDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("진입");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setTeamDetails((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("진입");
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPreviewImage(reader.result as string);
        setNewTeamDetails((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateTeamDetails = async () => {
    // 필수 필드 검증
    if (
      !teamDetails.name ||
      !teamDetails.leader ||
      !teamDetails.subleader ||
      !previewImage
    ) {
      alert(
        "모든 필드를 채워주세요. 팀 이름, 팀장, 부팀장 및 이미지는 필수입니다."
      );
      return; // 함수 실행 중단
    }
    const formData = new FormData();

    // 텍스트 필드 추가
    formData.append("name", selectedTeamName);
    formData.append("newname", teamDetails.name);
    formData.append("leader", teamDetails.leader);
    formData.append("subleader", teamDetails.subleader);
    formData.append("avatar", teamDetails.avatar);

    // 이미지 파일 추가 (newPreviewImage가 Base64 문자열이면 파일로 변환 필요)
    if (previewImage && typeof previewImage === "string") {
      // Base64 문자열에서 Blob으로 변환
      const blob = await fetch(previewImage).then((res) => res.blob());
      formData.append("upload", blob, "team-avatar.jpg"); // 파일 이름 "team-avatar.jpg"는 예시입니다.
    }
    try {
      const result = await updateTeamData(formData);
      setModalMessage("팀 정보가 업데이트 되었습니다.");
      setIsModalOpen(true);
    } catch (error: any) {
      setModalMessage(`업데이트 실패: ${error.message}`);
      setIsModalOpen(true);
    }
  };

  const deleteTeamDetails = async () => {
    // API 호출을 통해 서버에 데이터 저장
    try {
      const result = await deleteTeamData(selectedTeamName);
      setModalMessage("팀 정보가 삭제되었습니다.");
      setIsModalOpen(true);
      setSelectedTeamName("");
    } catch (error: any) {
      setModalMessage(`삭제 실패: ${error.message}`);
      setIsModalOpen(true);
    }
  };

  const createTeamDetails = async () => {
    // 필수 필드 검증
    if (
      !newTeamDetails.name ||
      !newTeamDetails.leader ||
      !newTeamDetails.subleader ||
      !newPreviewImage
    ) {
      alert(
        "모든 필드를 채워주세요. 팀 이름, 팀장, 부팀장 및 이미지는 필수입니다."
      );
      return; // 함수 실행 중단
    }
    const formData = new FormData();

    // 텍스트 필드 추가
    formData.append("name", newTeamDetails.name);
    formData.append("leader", newTeamDetails.leader);
    formData.append("subleader", newTeamDetails.subleader);

    // 이미지 파일 추가 (newPreviewImage가 Base64 문자열이면 파일로 변환 필요)
    if (newPreviewImage && typeof newPreviewImage === "string") {
      // Base64 문자열에서 Blob으로 변환
      const blob = await fetch(newPreviewImage).then((res) => res.blob());
      formData.append("upload", blob, "team-avatar.jpg"); // 파일 이름 "team-avatar.jpg"는 예시입니다.
    }

    try {
      const result = await createTeamData(formData);
      setModalMessage("팀 정보가 생성되었습니다.");
      setIsModalOpen(true);
      // 성공 후 입력 필드 초기화
      setNewTeamDetails({
        name: "",
        leader: "",
        subleader: "",
        avatar: "",
      });
      setNewPreviewImage("");
      setNewLeaderNicknameKey("");
      setNewSubLeaderNicknameKey("");
    } catch (error: any) {
      setModalMessage(`생성 실패: ${error.message}`);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await updateUserTeam(userId, "");
      if (response) {
        setModalMessage("성공적으로 팀에서 제외 했습니다.");
      } else {
        setModalMessage("유저 삭제에 실패했습니다.");
      }
      setIsModalOpen(true);
    } catch (error) {
      setModalMessage("유저 삭제 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  const handleUpdate = async (userId: string, teamId: string) => {
    try {
      const response = await updateUserTeam(userId, teamId);
      if (response) {
        setModalMessage("성공적으로 팀을 변경했습니다.");
      } else {
        setModalMessage("팀정보 변경 실패");
      }
      setIsModalOpen(true);
    } catch (error) {
      setModalMessage("유저 정보변경 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  const teamUsers = useMemo(() => {
    return users
      .filter((user: any) => user.team)
      .map((user: any) => ({
        nickname: user.nickname,
        email: user.email,
        tier: user.tear,
        race: user.league.race,
        wins: user.league.tw + user.league.pw + user.league.zw,
        losses: user.league.tl + user.league.pl + user.league.zl,
        belo: user.BELO.belo,
        teamid: user.team,
        teamname: getTeamNameById(user.team),
      }));
  }, [users, getTeamNameById]);

  const noTeamUsers = useMemo(() => {
    return users
      .filter((user: any) => !user.team)
      .map((user: any) => ({
        nickname: user.nickname,
        email: user.email,
        tier: user.tear,
        race: user.league.race,
        wins: user.league.tw + user.league.pw + user.league.zw,
        losses: user.league.tl + user.league.pl + user.league.zl,
        belo: user.BELO.belo,
        teamid: user.team,
        teamname: getTeamNameById(user.team),
      }));
  }, [users, getTeamNameById]);

  const renderCell = useCallback(
    (user: User, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof User];

      switch (columnKey) {
        case "nickname":
          return <div>{cellValue}</div>;
        case "tier":
          return <p className="text-black">{cellValue}</p>;
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {user.team}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => router.push(`/user/profile/${user.email}`)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleDelete(user.nickname)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <Popover placement={"right"}>
                  <PopoverTrigger>
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <div className="flex flex-col gap-1">
                      {teams.map((team: any) => (
                        <Chip
                          key={team._id}
                          className="w-full text-sm text-center cursor-pointer"
                          size="sm"
                          color="primary"
                          onClick={() => handleUpdate(user.nickname, team._id)}
                        >
                          <div className="w-[70px]">{team.name}</div>
                        </Chip>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [teams, router]
  );

  const columns: Column[] = [
    { name: "티어", uid: "tier", sortable: true, align: "start", width: 30 },
    {
      name: "닉네임",
      uid: "nickname",
      sortable: true,
      align: "center",
      width: 30,
    },
    { name: "종족", uid: "race", sortable: true, align: "start", width: 30 },
    {
      name: "소속 팀",
      uid: "teamname",
      sortable: true,
      align: "start",
      width: 30,
    },
  ];

  if (userGrade >= 4) {
    columns.push({
      name: "Actions",
      uid: "actions",
      sortable: true,
      align: "center",
      width: 30,
    });
  }

  return (
    <div className="w-full">
      <SubmitModal
        title={"알림"}
        text={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* 팀 리스트 */}
      <Card className="m-2">
        <CardHeader>
          <p className="font-bold text-3xl ml-2">팀 리스트</p>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4 justify-center flex-wrap">
            {" "}
            {/* flex-wrap 추가로 반응형 처리 */}
            {teams.map((team: Team) => (
              <div
                key={team._id}
                onClick={() => {
                  setSelectedTeamName(team.name);
                }}
              >
                <Card key={team._id} className="w-[220px] h-full">
                  <CardBody>
                    <Image
                      src={team.avatar}
                      height={200}
                      width={200}
                      alt="team"
                    />
                  </CardBody>
                  <CardFooter>
                    <div className="flex justify-center items-center w-full">
                      <p className="font-bold text-2xl">{team.name}</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      {/* 팀 수정삭제 컴포넌트 */}
      {selectedTeamName !== "" && (
        <Card className="m-2">
          <p className="font-bold text-3xl ml-2 p-2">팀 수정/삭제</p>
          <CardBody>
            <div className="flex flex-wrap my-2 justify-center items-center gap-4">
              <Card key={selectedTeam?._id} className="w-[220px] h-full">
                <CardBody>
                  <Image
                    src={selectedTeam?.avatar}
                    height={200}
                    width={200}
                    alt="team"
                  />
                </CardBody>
                <CardFooter>
                  <div className="flex justify-center items-center w-full">
                    <p className="font-bold text-2xl">{selectedTeam?.name}</p>
                  </div>
                </CardFooter>
              </Card>
              <div>
                <div className="flex flex-col gap-2 mt-4 justify-center items-center">
                  <p className="mx-4 font-bold text-2xl">
                    팀장 : {selectedTeam?.leader}
                  </p>
                  <p className="mx-4 font-bold text-2xl">
                    팀장 : {selectedTeam?.subleader}
                  </p>
                </div>
                <div className="flex m-4 justify-center items-center"></div>
              </div>
              <Divider />
              <Card key={teamDetails?.avatar} className="h-full">
                <CardBody className="flex justify-center items-center">
                  <Image
                    src={previewImage || "/Belogo.png"}
                    height={200}
                    width={200}
                    alt="team"
                  />
                </CardBody>
                <CardFooter>
                  <input type="file" onChange={handleImageChange} />
                </CardFooter>
              </Card>
              <div>
                <div className="flex flex-col gap-4 mt-4 justify-center items-center">
                  <div className="flex flex-col gap-4">
                    <Input
                      label="팀 이름"
                      name="name"
                      value={teamDetails.name}
                      onChange={handleInputChange}
                    />
                    <Autocomplete
                      label="팀장 닉네임"
                      value={teamDetails.leader}
                      onInputChange={(value) => {
                        if (value !== teamDetails.leader) {
                          setTeamDetails((prev) => ({
                            ...prev,
                            leader: value,
                          }));
                        }
                      }}
                      selectedKey={leaderNicknameKey}
                      onSelectionChange={setLeaderNicknameKey}
                    >
                      {users.map((user: any) => (
                        <AutocompleteItem
                          key={String(user.name)}
                          value={user.nickname}
                        >
                          {user.nickname}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                    <Autocomplete
                      label="부팀장 닉네임"
                      value={teamDetails.subleader}
                      onInputChange={(value) => {
                        if (value !== teamDetails.subleader) {
                          setTeamDetails((prev) => ({
                            ...prev,
                            subleader: value,
                          }));
                        }
                      }}
                      selectedKey={subLeaderNicknameKey}
                      onSelectionChange={setSubLeaderNicknameKey}
                    >
                      {users.map((user: any) => (
                        <AutocompleteItem
                          key={String(user.name)}
                          value={user.nickname}
                        >
                          {user.nickname}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                    <Button color="primary" onClick={updateTeamDetails}>
                      팀 수정
                    </Button>
                    <Button color="danger" onClick={deleteTeamDetails}>
                      팀 삭제
                    </Button>
                  </div>
                </div>
                <div className="flex m-4 justify-center items-center"></div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      {/* 팀 생성 컴포넌트 */}
      <Card className="m-2">
        <p className="font-bold text-3xl ml-2 p-2">팀 생성</p>
        <CardBody>
          <div className="flex flex-wrap my-2 justify-center items-center gap-4">
            <Card key={newTeamDetails?.avatar} className="h-full">
              <CardBody className="flex justify-center items-center">
                <Image
                  src={newPreviewImage || "/Belogo.png"}
                  height={200}
                  width={200}
                  alt="team"
                />
              </CardBody>
              <CardFooter>
                <input type="file" onChange={handleNewImageChange} />
              </CardFooter>
            </Card>
            <div>
              <div className="flex flex-col gap-4 mt-4 justify-center items-center">
                <div className="flex flex-col gap-4">
                  <Input
                    label="팀 이름"
                    name="name"
                    value={newTeamDetails.name}
                    onChange={handleNewInputChange}
                  />
                  <Autocomplete
                    label="팀장 닉네임"
                    name="leader"
                    value={newTeamDetails.leader}
                    onInputChange={(value) => {
                      if (value !== newTeamDetails.leader) {
                        setNewTeamDetails((prev) => ({
                          ...prev,
                          leader: value,
                        }));
                      }
                    }}
                    selectedKey={newLeaderNicknameKey}
                    onSelectionChange={setNewLeaderNicknameKey}
                  >
                    {users.map((user: any) => (
                      <AutocompleteItem
                        key={String(user.name)}
                        value={user.nickname}
                      >
                        {user.nickname}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    label="부팀장 닉네임"
                    name="subleader"
                    value={newTeamDetails.subleader}
                    onInputChange={(value) => {
                      if (value !== newTeamDetails.subleader) {
                        setNewTeamDetails((prev) => ({
                          ...prev,
                          subleader: value,
                        }));
                      }
                    }}
                    selectedKey={newSubLeaderNicknameKey}
                    onSelectionChange={setNewSubLeaderNicknameKey}
                  >
                    {users.map((user: any) => (
                      <AutocompleteItem
                        key={String(user.name)}
                        value={user.nickname}
                      >
                        {user.nickname}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Button color="primary" onClick={createTeamDetails}>
                    팀 생성
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* 팀에 소속된 유저 리스트 */}
      <Card className="m-2">
        <CardHeader>
          <p className="font-bold text-3xl ml-2">팀에 소속된 유저 리스트</p>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="팀에 소속된 유저 리스트"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={teamPage}
                  total={Math.ceil(teamUsers.length / rowsPerPage)}
                  onChange={(page) => setTeamPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.align}
                  width={column.width}
                  className="text-center"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={teamUsers.slice(
                (teamPage - 1) * rowsPerPage,
                teamPage * rowsPerPage
              )}
            >
              {(item: any) => (
                <TableRow key={item.nickname} className="text-center">
                  {(columnKey) => (
                    <TableCell
                      className={
                        columnKey === "tier"
                          ? `${
                              tierColorMap[item.tier] || "bg-gray-100"
                            } text-center`
                          : "text-center"
                      }
                    >
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      {/* 팀에 소속되지 않은 유저 리스트 */}
      <Card className="m-2">
        <CardHeader>
          <p className="font-bold text-3xl ml-2">
            팀에 소속되지 않은 유저 리스트
          </p>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="팀에 소속되지 않은 유저 리스트"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={noTeamPage}
                  total={Math.ceil(noTeamUsers.length / rowsPerPage)}
                  onChange={(page) => setNoTeamPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.align}
                  width={column.width}
                  className="text-center"
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={noTeamUsers.slice(
                (noTeamPage - 1) * rowsPerPage,
                noTeamPage * rowsPerPage
              )}
            >
              {(item: any) => (
                <TableRow key={item.nickname} className="text-center">
                  {(columnKey) => (
                    <TableCell
                      className={
                        columnKey === "tier"
                          ? `${
                              tierColorMap[item.tier] || "bg-gray-100"
                            } text-center`
                          : "text-center"
                      }
                    >
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminPage;
