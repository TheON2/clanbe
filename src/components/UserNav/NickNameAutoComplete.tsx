import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { User as MyUser } from "next-auth";

type NicknameAutocompleteProps = {
  label: string; // 입력 필드의 레이블
  value: string; // 현재 입력 필드의 값
  onChange: (value: string) => void; // 입력 필드 값이 변경될 때 호출될 함수
  users: MyUser[];
};

export const NicknameAutocomplete: React.FC<NicknameAutocompleteProps> = ({
  label,
  value,
  onChange,
  users,
}) => {
  return (
    <Autocomplete
      key={label}
      label={label}
      className="w-3/5"
      value={value}
      onInputChange={(value) => {
        if (value !== value) {
          onChange(value);
        }
      }}
    >
      {users.map((user) => (
        <AutocompleteItem key={user._id} value={user.nickname}>
          {user.nickname}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};
