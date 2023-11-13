import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { ActivityIndicator, ScrollView } from "react-native";
import Repository from "../components/Repository";
import { RootStackParamList, UserData, UserRepo } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserPage"
>;

export default function UserPage({
  route,
  navigation,
}: {
  route: { params: { userData: UserData } };
  navigation: ProfileScreenNavigationProp;
}) {
  const { userData } = route.params;
  const [userRepos, setUserRepos] = useState<UserRepo[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserRepos();
  }, [userData]);

  const fetchUserRepos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(userData.repos_url);

      setUserRepos(response.data);

      if (response.data.length === 0) {
        setError("O usuário não possui repositórios.");
      } else {
        setError(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;

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

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <NavBar title={userData.name} goBack={goBack} />
      <ScrollView>
        <Container>
          <Content>
          {userData && (
            <>
            <ProfileCard userData={userData}/>
              <Title>Repositórios</Title>
              {isLoading ? (
                <LoadingContainer>
                  <ActivityIndicator size="large" color="#333" />
                </LoadingContainer>
              ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
              ) : (
                userRepos.map((repo) => (
                  <Repository key={repo.id} data={repo} />
                ))
              )}
            </>
          )}
          </Content>
        </Container>
      </ScrollView>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #FFF;
`;

const Content = styled.View`
  padding: 10px 10px;
  background-color: #f0f0f0;
  max-width: 700px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-top: 25px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.Text`
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
`;

const LoadingContainer = styled.View`
  margin-top: 50px;
`;
