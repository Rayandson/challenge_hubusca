import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, UserData } from "../types";
import { saveRecentSearch } from "../utils/storageUtil";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function HomePage({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );

      if (response.data) {
        const {
          id,
          avatar_url,
          name,
          login,
          location,
          followers,
          public_repos,
          repos_url,
        } = response.data;

        const user = {
          id,
          avatar_url,
          name,
          login,
          location,
          followers,
          public_repos,
          repos_url,
        };

        setUserData(user);

        saveRecentSearch(user);
        setError(null);
      }
    } catch (error) {
      setUserData(null);

      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;

        if (status === 404) {
          setError("Usuário não encontrado");
          return;
        }

        if (status === 500) {
          setError(
            "Erro interno do servidor. Por favor, tente novamente mais tarde."
          );
          return;
        }

        setError(
          "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
        );
        return;
      }

      setError(
        "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
      );
    }
  };

  const handleSearch = () => {
    fetchUserData();
  };

  return (
    <Container>
      <Title>HUBusca</Title>
      <SearchView>
        <Input
          placeholder="Pesquisar usuário..."
          placeholderTextColor="#999"
          value={username}
          onChangeText={(text: string) => setUsername(text)}
        />
        <SearchButton onPress={handleSearch}>
          <Icon name="search" size={22} color="#FFF" />
        </SearchButton>
      </SearchView>

      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        userData && (
          <UserResult
            onPress={() => {
              setUsername("");
              navigation.navigate("UserPage", { userData: userData });
            }}
          >
            <Image
              source={{ uri: userData.avatar_url }}
              style={{ width: 130, height: 130, borderRadius: 65 }}
            />
            <UserInfo>
              <UserInfoText>Name: {userData.name}</UserInfoText>
              <UserInfoText>Login: {userData.login}</UserInfoText>
              <UserInfoText>Location: {userData.location}</UserInfoText>
            </UserInfo>
          </UserResult>
        )
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f0f0f0;
  padding: ${50 + getStatusBarHeight(true)}px 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const SearchView = styled.View`
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

const UserResult = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;
  margin-top: 20px;
  padding: 15px;
  align-items: center;
`;

const UserInfo = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const ErrorMessage = styled.Text`
  color: red;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

const UserInfoText = styled.Text`
  font-size: 19px;
`;
