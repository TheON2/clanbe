import React, { useMemo, useState, useEffect, ChangeEvent } from "react";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Calendar, Divider } from "@nextui-org/react";
import { parseDate, DateValue } from "@internationalized/date";
import { Team } from "../../types/types";
import { User } from "next-auth";
import { createLeagueEvent } from "@/service/leagueevent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SubmitModal from "./SubmitModal";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  users: User[];
  matchData?: {
    homeId: string;
    awayId: string;
    date: string;
    sets: {
      id: string;
      homePlayer: string;
      awayPlayer: string;
      map: string;
      tier: string;
    }[];
  };
};

const ProleagueUpdateModal = ({
  title,
  isOpen,
  onClose,
  teams,
  users,
  matchData,
}: Props) => {
  const { onOpenChange } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalClose,
  } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");
  const [sets, setSets] = useState([
    { id: "1", homePlayer: "", awayPlayer: "", map: "", tier: "" },
    { id: "2", homePlayer: "", awayPlayer: "", map: "", tier: "" },
    { id: "3", homePlayer: "", awayPlayer: "", map: "", tier: "" },
    { id: "4", homePlayer: "", awayPlayer: "", map: "", tier: "" },
    { id: "5", homePlayer: "", awayPlayer: "", map: "", tier: "" },
  ]);

  useEffect(() => {
    if (isOpen) {
      if (matchData) {
        setSelectedDate(parseDate(matchData.date));
        setHomeTeam(matchData.homeId);
        setAwayTeam(matchData.awayId);
        setSets(matchData.sets);
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

  const homeTeamPlayers = useMemo(
    () => users.filter((user) => user.team === homeTeam),
    [homeTeam, users]
  );

  const awayTeamPlayers = useMemo(
    () => users.filter((user) => user.team === awayTeam),
    [awayTeam, users]
  );

  const handleSetChange = (index: number, key: string, value: string) => {
    setSets((prevSets) =>
      prevSets.map((set, i) => (i === index ? { ...set, [key]: value } : set))
    );
  };

  const handleSave = async () => {
    // 기본 필드 검사
    if (!homeTeam || !awayTeam || !selectedDate) {
      setModalTitle("입력 오류");
      setModalText("모든 필드를 채워주세요.");
      onModalOpen();
      return;
    }

    // 1~4세트의 필드 검사
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
      homeId: homeTeam,
      awayId: awayTeam,
      date: selectedDate?.toString() || "",
      sets: sets.map((set) => ({
        homePlayer: set.homePlayer,
        awayPlayer: set.awayPlayer,
        map: set.map,
        tier: set.tier,
        result: 0,
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

  const handleClose = () => {
    onOpenChange();
    onClose();
  };

  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value);
    };

  const getFilteredPlayers = (teamPlayers: User[], tier: string) => {
    const [tier1, tier2] = tier.split("/");
    return teamPlayers.filter(
      (player) => player.tear === tier1 || player.tear === tier2
    );
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
        onOpenChange={onOpenChange}
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
                value={homeTeam}
                onChange={handleSelectChange(setHomeTeam)}
                className=""
              >
                {teams.map((team) => (
                  <SelectItem key={team._id} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Away Team"
                placeholder="Select Away Team"
                value={awayTeam}
                onChange={handleSelectChange(setAwayTeam)}
                className=""
              >
                {teams.map((team) => (
                  <SelectItem key={team._id} value={team.name}>
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
                              <div className="flex gap-2 w-2/3">
                                <Select
                                  label={`Set ${index + 1} Tier`}
                                  placeholder="Select Tier"
                                  value={set.tier}
                                  onChange={(e) =>
                                    handleSetChange(
                                      index,
                                      "tier",
                                      e.target.value
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
                                  value={set.map}
                                  onChange={(e) =>
                                    handleSetChange(
                                      index,
                                      "map",
                                      e.target.value
                                    )
                                  }
                                >
                                  {maps.map((map) => (
                                    <SelectItem key={map.name} value={map.name}>
                                      {map.name}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </div>
                              <div className="flex gap-2">
                                <Autocomplete
                                  label={`Set ${index + 1} Home Player`}
                                  placeholder="Home"
                                  value={set.homePlayer}
                                  onInputChange={(value) =>
                                    handleSetChange(index, "homePlayer", value)
                                  }
                                >
                                  {getFilteredPlayers(
                                    homeTeamPlayers,
                                    set.tier
                                  ).map((player) => (
                                    <AutocompleteItem
                                      key={String(player.email)}
                                      value={player.nickname}
                                    >
                                      {player.nickname}
                                    </AutocompleteItem>
                                  ))}
                                </Autocomplete>
                                <Autocomplete
                                  label={`Set ${index + 1} Away Player`}
                                  placeholder="Away"
                                  value={set.awayPlayer}
                                  onInputChange={(value) =>
                                    handleSetChange(index, "awayPlayer", value)
                                  }
                                >
                                  {getFilteredPlayers(
                                    awayTeamPlayers,
                                    set.tier
                                  ).map((player) => (
                                    <AutocompleteItem
                                      key={String(player.email)}
                                      value={player.nickname}
                                    >
                                      {player.nickname}
                                    </AutocompleteItem>
                                  ))}
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
            <Button color="secondary" variant="flat" onPress={handleClose}>
              취소
            </Button>
            <Button color="primary" onPress={handleSave}>
              저장
            </Button>
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

export default ProleagueUpdateModal;
