import React, { useMemo, useState, useEffect, ChangeEvent, Key } from "react";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Calendar, Divider } from "@nextui-org/react";
import { parseDate, DateValue } from "@internationalized/date";
import { Team } from "../../types/types";
import { User } from "next-auth";
import { createLeagueEvent, updateLeagueEvent } from "@/service/leagueevent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SubmitModal from "./SubmitModal";
import { useFilter } from "@react-aria/i18n";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  users: User[];
  matchData?: {
    _id: string;
    homeId: string;
    awayId: string;
    date: string;
    sets: {
      id: string;
      homePlayer: string;
      awayPlayer: string;
      map: string;
      tier: string;
      result: number; // 추가된 부분
    }[];
  };
};

const ProleagueCreateModal = ({
  title,
  isOpen,
  onClose,
  teams,
  users,
  matchData,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalClose,
  } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [homeTeam, setHomeTeam] = useState<Selection>(new Set());
  const [awayTeam, setAwayTeam] = useState<Selection>(new Set());
  const [sets, setSets] = useState([
    { id: "1", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
    { id: "2", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
    { id: "3", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
    { id: "4", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
    { id: "5", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
  ]);

  useEffect(() => {
    if (isOpen) {
      if (matchData) {
        setSelectedDate(parseDate(matchData.date));
        setHomeTeam(new Set([matchData.homeId]));
        setAwayTeam(new Set([matchData.awayId]));
        setSets(
          matchData.sets.map((set, index) => ({
            ...set,
            id: `${index + 1}`,
          }))
        );
      } else {
        setSelectedDate(parseDate(new Date().toISOString().split("T")[0]));
      }
    }
  }, [isOpen, matchData]);

  const maps = [
    { id: "1", name: "폴리포이드" },
    { id: "2", name: "투혼" },
    { id: "3", name: "블리츠" },
    { id: "4", name: "다크오리진" },
    { id: "5", name: "아포칼립스" },
    { id: "6", name: "시타델" },
    { id: "7", name: "라데온" },
    { id: "8", name: "레트로" },
    { id: "9", name: "버미어" },
  ];

  const tiers = ["S+/S", "A+/A", "B+/B", "C+/D"];
  const results = [
    { id: "0", name: "경기전" },
    { id: "1", name: "홈승" },
    { id: "2", name: "원정승" },
  ];

  const homeTeamPlayers = useMemo(
    () => users.filter((user) => user.team === Array.from(homeTeam).join("")),
    [homeTeam, users]
  );

  const awayTeamPlayers = useMemo(
    () => users.filter((user) => user.team === Array.from(awayTeam).join("")),
    [awayTeam, users]
  );

  const handleSetChange = (index: number, key: string, value: string) => {
    setSets((prevSets) =>
      prevSets.map((set, i) => (i === index ? { ...set, [key]: value } : set))
    );
  };

  const handleSave = async () => {
    if (!homeTeam || !awayTeam || !selectedDate) {
      setModalTitle("입력 오류");
      setModalText("모든 필드를 채워주세요.");
      onModalOpen();
      return;
    }

    const incompleteSet = sets
      .slice(0, 4)
      .some(
        (set) => !set.homePlayer || !set.awayPlayer || !set.map || !set.tier
      );

    if (incompleteSet) {
      setModalTitle("입력 오류");
      setModalText("1세트부터 4세트까지 모든 필드를 채워주세요.");
      onModalOpen();
      return;
    }

    const leagueEvent = {
      homeId: Array.from(homeTeam).join(""),
      awayId: Array.from(awayTeam).join(""),
      date: selectedDate?.toString() || "",
      sets: sets.map((set) => ({
        homePlayer: set.homePlayer,
        awayPlayer: set.awayPlayer,
        map: set.map,
        tier: set.tier,
        result: set.result, // result 값 포함
      })),
    };

    try {
      const result = await createLeagueEvent(leagueEvent);
      if (result) {
        setModalTitle("등록 성공");
        setModalText("경기 이벤트가 성공적으로 등록되었습니다.");
        onModalOpen();
        handleClose();
      } else {
        throw new Error("Error saving league event.");
      }
    } catch (error) {
      setModalTitle("등록 실패");
      setModalText("등록에 실패했습니다.");
      onModalOpen();
    }
  };

  const handleUpdate = async () => {
    if (!homeTeam || !awayTeam || !selectedDate) {
      setModalTitle("입력 오류");
      setModalText("모든 필드를 채워주세요.");
      onModalOpen();
      return;
    }

    const incompleteSet = sets
      .slice(0, 4)
      .some(
        (set) => !set.homePlayer || !set.awayPlayer || !set.map || !set.tier
      );

    if (incompleteSet) {
      setModalTitle("입력 오류");
      setModalText("1세트부터 4세트까지 모든 필드를 채워주세요.");
      onModalOpen();
      return;
    }

    const leagueEvent = {
      id: matchData?._id || "",
      homeId: Array.from(homeTeam).join(""),
      awayId: Array.from(awayTeam).join(""),
      date: selectedDate?.toString() || "",
      sets: sets.map((set) => ({
        homePlayer: set.homePlayer,
        awayPlayer: set.awayPlayer,
        map: set.map,
        tier: set.tier,
        result: set.result, // result 값 포함
      })),
    };

    try {
      const result = await updateLeagueEvent(leagueEvent);
      if (result) {
        setModalTitle("업데이트 성공");
        setModalText("경기 이벤트가 성공적으로 수정되었습니다.");
        onModalOpen();
        handleClose();
      } else {
        throw new Error("Error saving league event.");
      }
    } catch (error) {
      setModalTitle("등록 실패");
      setModalText("등록에 실패했습니다.");
      onModalOpen();
    }
  };

  const handleClose = () => {
    setSelectedDate(null);
    setHomeTeam(new Set());
    setAwayTeam(new Set());
    setSets([
      { id: "1", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
      { id: "2", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
      { id: "3", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
      { id: "4", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
      { id: "5", homePlayer: "", awayPlayer: "", map: "", tier: "", result: 0 },
    ]);
    onClose();
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedSets = Array.from(sets);
    const [removed] = reorderedSets.splice(result.source.index, 1);
    reorderedSets.splice(result.destination.index, 0, removed);

    setSets(reorderedSets);
  };

  return (
    <div className="">
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onClose}
        onClose={onClose}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent className="max-h-[80vh] overflow-y-auto">
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody className="max-h-[70vh] overflow-y-auto flex items-center">
            <div className="mb-4">
              {selectedDate && (
                <Calendar
                  aria-label="Date (Controlled)"
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              )}
            </div>
            <Divider />
            <div className="flex gap-4 w-full">
              <Select
                label="Home Team"
                placeholder="Select Home Team"
                selectedKeys={homeTeam}
                onSelectionChange={setHomeTeam}
                className=""
              >
                {teams.map((team) => (
                  <SelectItem key={team._id} value={team._id}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Away Team"
                placeholder="Select Away Team"
                selectedKeys={awayTeam}
                onSelectionChange={setAwayTeam}
                className=""
              >
                {teams.map((team) => (
                  <SelectItem key={team._id} value={team._id}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Divider />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="sets">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sets.map((set, index) => (
                      <Draggable
                        key={set.id}
                        draggableId={set.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-4 flex justify-center items-center"
                          >
                            <div className="flex flex-col gap-2 mb-2">
                              <div className="flex gap-2 w-full">
                                <Select
                                  label={`Set ${index + 1} Tier`}
                                  placeholder="Select Tier"
                                  selectedKeys={new Set([set.tier])}
                                  onSelectionChange={(key) =>
                                    handleSetChange(
                                      index,
                                      "tier",
                                      Array.from(key).join("")
                                    )
                                  }
                                >
                                  {tiers.map((tier) => (
                                    <SelectItem key={tier} value={tier}>
                                      {tier}
                                    </SelectItem>
                                  ))}
                                </Select>
                                <Select
                                  label={`Set ${index + 1} Map`}
                                  placeholder="Select Map"
                                  selectedKeys={new Set([set.map])}
                                  onSelectionChange={(key) =>
                                    handleSetChange(
                                      index,
                                      "map",
                                      Array.from(key).join("")
                                    )
                                  }
                                >
                                  {maps.map((map) => (
                                    <SelectItem key={map.name} value={map.name}>
                                      {map.name}
                                    </SelectItem>
                                  ))}
                                </Select>
                                <Select
                                  label={`Set ${index + 1} Result`}
                                  placeholder="Select Result"
                                  selectedKeys={new Set([String(set.result)])}
                                  onSelectionChange={(key) =>
                                    handleSetChange(
                                      index,
                                      "result",
                                      Array.from(key).join("")
                                    )
                                  }
                                >
                                  {results.map((result) => (
                                    <SelectItem
                                      key={result.id}
                                      value={result.id}
                                    >
                                      {result.name}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </div>
                              <div className="flex gap-2">
                                <Autocomplete
                                  label={`Set ${index + 1} Home Player`}
                                  placeholder="Home"
                                  inputValue={set.homePlayer}
                                  items={homeTeamPlayers}
                                  selectedKey={set.homePlayer}
                                  onInputChange={(value) =>
                                    handleSetChange(index, "homePlayer", value)
                                  }
                                  onSelectionChange={(key) =>
                                    handleSetChange(
                                      index,
                                      "homePlayer",
                                      String(key)
                                    )
                                  }
                                >
                                  {(item) => (
                                    <AutocompleteItem
                                      key={String(item.email)}
                                      value={item.nickname}
                                    >
                                      {item.nickname}
                                    </AutocompleteItem>
                                  )}
                                </Autocomplete>
                                <Autocomplete
                                  label={`Set ${index + 1} Away Player`}
                                  placeholder="Away"
                                  inputValue={set.awayPlayer}
                                  items={awayTeamPlayers}
                                  selectedKey={set.awayPlayer}
                                  onInputChange={(value) =>
                                    handleSetChange(index, "awayPlayer", value)
                                  }
                                  onSelectionChange={(key) =>
                                    handleSetChange(
                                      index,
                                      "awayPlayer",
                                      String(key)
                                    )
                                  }
                                >
                                  {(item) => (
                                    <AutocompleteItem
                                      key={String(item.email)}
                                      value={item.nickname}
                                    >
                                      {item.nickname}
                                    </AutocompleteItem>
                                  )}
                                </Autocomplete>
                              </div>
                              <Divider />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleClose}>
              취소
            </Button>
            {matchData ? (
              <>
                <Button color="primary" onPress={handleUpdate}>
                  수정
                </Button>
              </>
            ) : (
              <>
                <Button color="primary" onPress={handleSave}>
                  저장
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SubmitModal
        title={modalTitle}
        text={modalText}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
    </div>
  );
};

export default ProleagueCreateModal;
