import React from "react";
import { TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components/native";
import { UserData } from "../types";

interface SearchViewProps {
  username: string;
  inputRef: React.RefObject<TextInput>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  handleSearch: () => void;
}

export default function SearchView({
  username,
  setUsername,
  setUserData,
  inputRef,
  handleSearch,
}: SearchViewProps) {
  return (
    <SearchViewContainer>
      <Input
        ref={inputRef}
        placeholder="Pesquisar usuário..."
        placeholderTextColor="#999"
        value={username}
        onChangeText={(text: string) => {
          setUsername(text);
          setUserData(null);
        }}
      />
      <SearchButton onPress={handleSearch}>
        <Icon name="search" size={22} color="#FFF" />
      </SearchButton>
    </SearchViewContainer>
  );
}

const SearchViewContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  padding: 12px 15px;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
`;

const SearchButton = styled.TouchableOpacity`
  width: 50px;
  background-color: #000;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;
