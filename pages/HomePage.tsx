import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, UserData } from "../types";
import { getRecentSearches, saveRecentSearch } from "../utils/storageUtil";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomePage({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<UserData[]>([]);
  const inputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const retriveSearches = async () => {
      const retrievedSearches = await getRecentSearches();
      setRecentSearches(retrievedSearches);
    };

    retriveSearches();
  }, [userData]);

  const fetchUserData = async () => {
    setIsLoading(true);
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

        setIsLoading(false);

        if (status === 404) {
          setError("Usuário não encontrado.");
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
    setIsLoading(false);
  };

  const handleSearch = () => {
    fetchUserData();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" onScroll={Keyboard.dismiss}>
      <Container>
        <Title>HUBusca</Title>
        <SearchView>
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
        </SearchView>
        <ResultView>
            {isLoading ? (
              <ActivityIndicator size="large" color="#333" />
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : userData ? (
              <UserResult
                onPress={() => {
                  setUsername("");
                  navigation.navigate("UserPage", {
                    userData: { ...userData },
                  });
                  setUserData(null);
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
            ) : (
              <TouchableOpacity onPress={() => inputRef.current?.focus()}>
                <FindUsersText>
                  Encontre usuários do GitHub{" "}
                  <Icon name="search" size={15} color="#000" />
                </FindUsersText>
              </TouchableOpacity>
            )}
        </ResultView>
        <Title>Pesquisas recentes</Title>
        <RecentSearchesContainer>
          {recentSearches.map((user: UserData, index) => {
            return (
              <UserResult
                key={index}
                onPress={() => {
                  navigation.navigate("UserPage", { userData: user });
                }}
              >
                <Image
                  source={{ uri: user.avatar_url }}
                  style={{ width: 130, height: 130, borderRadius: 65 }}
                />
                <UserInfo>
                  <UserInfoText>Name: {user.name}</UserInfoText>
                  <UserInfoText>Login: {user.login}</UserInfoText>
                  <UserInfoText>Location: {user.location}</UserInfoText>
                </UserInfo>
              </UserResult>
            );
          })}
        </RecentSearchesContainer>
      </Container>
    </ScrollView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f0f0f0;
  padding: ${40 + getStatusBarHeight(true)}px 20px;
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

const ResultView = styled.View`
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;

const UserResult = styled.TouchableOpacity`
  width: 80%;
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;
  padding: 15px;
  align-items: center;
`;

const FindUsersText = styled.Text`
  font-size: 15px;
`

const UserInfo = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

const UserInfoText = styled.Text`
  font-size: 19px;
`;

const RecentSearchesContainer = styled.View`
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
