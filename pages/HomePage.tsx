import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/MaterialIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, UserData } from "../types";
import { getRecentSearches, saveRecentSearch } from "../utils/storageUtil";
import RecentSearchesSection from "../components/RecentSearchesSection";
import UserCard from "../components/UserCard";
import SearchView from "../components/SearchView";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

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
    Keyboard.dismiss();
  };

  const generateResultContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#333" />;
    } else if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    } else if (userData) {
      return (
        <UserCard
          navigation={navigation}
          userData={userData}
          setUsername={setUsername}
          setUserData={setUserData}
        />
      );
    } else {
      return (
        <ResultPlaceholder onPress={() => inputRef.current?.focus()}>
          <IonIcon name="logo-github" size={45} color="#000" />
          <FindUsersText>
            Encontre usuários do GitHub{" "}
            <Icon name="search" size={15} color="#000" />
          </FindUsersText>
        </ResultPlaceholder>
      );
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" onScroll={Keyboard.dismiss}>
      <Container>
        <Content>
          <SearchSection>
            <Title>HUBusca</Title>
            <SearchView
              inputRef={inputRef}
              username={username}
              setUsername={setUsername}
              setUserData={setUserData}
              handleSearch={handleSearch}
            />
            <ResultView>{generateResultContent()}</ResultView>
          </SearchSection>
          <RecentSearchesSection
            recentSearches={recentSearches}
            navigation={navigation}
          />
        </Content>
      </Container>
    </ScrollView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Content = styled.View`
  padding-top: ${40 + getStatusBarHeight(true)}px;
  padding-bottom: 40px;
  background-color: #f0f0f0;
  max-width: 700px;
`;

const SearchSection = styled.View`
  flex: 1;
  padding: 0 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ResultView = styled.View`
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;

const ResultPlaceholder = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const FindUsersText = styled.Text`
  font-size: 15px;
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;
