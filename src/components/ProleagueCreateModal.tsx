import React, { useMemo, useState, ChangeEvent } from "react";
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
import { Team } from "../../types/types";
import { User } from "next-auth";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  users: User[];
};

const dummy = [
  {
    homeId: "660cc0e452afd8daf291b3b9",
    awayId: "660cc0e452afd8daf291b3b9",
    date: "2024-05-13",
    sets: [
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 2,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 0,
      },
    ],
  },
  {
    homeId: "660cc0e452afd8daf291b3b9",
    awayId: "660cc0e452afd8daf291b3b9",
    date: "2024-05-13",
    sets: [
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 2,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 0,
      },
    ],
  },
  {
    homeId: "660cc0e452afd8daf291b3b9",
    awayId: "660cc0e452afd8daf291b3b9",
    date: "2024-05-13",
    sets: [
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 1,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 2,
      },
      {
        homePlayer: "sniperad@naver.com",
        awayPlayer: "sniperad@naver.com",
        map: "투혼",
        tier: "A+/A",
        result: 0,
      },
    ],
  },
];

const ProleagueCreateModal = ({
  title,
  isOpen,
  onClose,
  teams,
  users,
}: Props) => {
  const { onOpenChange } = useDisclosure();
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");
  const [sets, setSets] = useState([
    { homePlayer: "", awayPlayer: "", map: "", tier: "" },
    { homePlayer: "", awayPlayer: "", map: "", tier: "" },
    { homePlayer: "", awayPlayer: "", map: "", tier: "" },
    { homePlayer: "", awayPlayer: "", map: "", tier: "" },
    { homePlayer: "", awayPlayer: "", map: "", tier: "" },
  ]);

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

  const handleSave = () => {
    // 리그 정보 저장 로직 추가
    console.log({ homeTeam, awayTeam, sets });
    //handleClose();
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
          <ModalBody className="max-h-[70vh] overflow-y-auto">
            <div className="flex gap-2">
              <Select
                label="Home Team"
                placeholder="Select Home Team"
                onChange={handleSelectChange(setHomeTeam)}
                className="mb-4"
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
                onChange={handleSelectChange(setAwayTeam)}
                className="mb-4"
              >
                {teams.map((team) => (
                  <SelectItem key={team._id} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {sets.map((set, index) => (
              <div
                key={index}
                className="mb-4 flex justify-center items-center"
              >
                <div className="flex flex-col gap-2 mb-2">
                  <div className="flex gap-2 w-2/3">
                    <Select
                      label={`Set ${index + 1} Map`}
                      placeholder="Select Map"
                      value={set.map}
                      onChange={(e) =>
                        handleSetChange(index, "map", e.target.value)
                      }
                    >
                      {maps.map((map) => (
                        <SelectItem key={map.name} value={map.name}>
                          {map.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label={`Set ${index + 1} Tier`}
                      placeholder="Select Tier"
                      value={set.tier}
                      onChange={(e) =>
                        handleSetChange(index, "tier", e.target.value)
                      }
                    >
                      {tiers.map((tier) => (
                        <SelectItem key={tier} value={tier}>
                          {tier}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex gap-2 ">
                    <Autocomplete
                      label={`Set ${index + 1} Home Player`}
                      placeholder="Home"
                      value={set.homePlayer}
                      onInputChange={(value) =>
                        handleSetChange(index, "homePlayer", value)
                      }
                    >
                      {getFilteredPlayers(homeTeamPlayers, set.tier).map(
                        (player) => (
                          <AutocompleteItem
                            key={String(player.email)}
                            value={player.nickname}
                          >
                            {player.nickname}
                          </AutocompleteItem>
                        )
                      )}
                    </Autocomplete>
                    <Autocomplete
                      label={`Set ${index + 1} Away Player`}
                      placeholder="Away"
                      value={set.awayPlayer}
                      onInputChange={(value) =>
                        handleSetChange(index, "awayPlayer", value)
                      }
                    >
                      {getFilteredPlayers(awayTeamPlayers, set.tier).map(
                        (player) => (
                          <AutocompleteItem
                            key={String(player.email)}
                            value={player.nickname}
                          >
                            {player.nickname}
                          </AutocompleteItem>
                        )
                      )}
                    </Autocomplete>
                  </div>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default ProleagueCreateModal;
