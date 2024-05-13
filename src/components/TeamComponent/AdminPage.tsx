"use client";

import { useEffect, useMemo, useState } from "react";
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
  Switch,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import Image from "next/image";
import { Team } from "../../../types/types";
import ProfileCard from "../ProfileCard";
import ProleagueProfileCard from "../ProleagueProfileCard";
import ProleagueAvatarCard from "../ProleagueAvatarCard";
import { createTeamData, deleteTeamData, updateTeamData } from "@/service/team";

interface UserItem {
  nickname: string;
  tier: string;
  race: string;
  wins: number;
  losses: number;
  belo: number;
  [key: string]: string | number; // 인덱스 시그니처 추가
}

const AdminPage = ({ teams, users }: any) => {
  const [selectedTeamName, setSelectedTeamName] = useState("");
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

  // 선택한 팀 객체를 찾습니다.
  const selectedTeam = useMemo(
    () => teams.find((team: Team) => team.name === selectedTeamName),
    [selectedTeamName, teams]
  );

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
      alert("팀 정보가 업데이트 되었습니다.");
    } catch (error: any) {
      alert(`업데이트 실패: ${error.message}`);
    }
  };

  const deleteTeamDetails = async () => {
    // API 호출을 통해 서버에 데이터 저장
    try {
      const result = await deleteTeamData(selectedTeamName);
      alert("팀 정보가 삭제되었습니다.");
      setSelectedTeamName("");
    } catch (error: any) {
      alert(`삭제 실패: ${error.message}`);
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
      alert("팀 정보가 생성되었습니다.");
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
      alert(`생성 실패: ${error.message}`);
    }
  };

  return (
    <div className="w-full">
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
    </div>
  );
};

export default AdminPage;
