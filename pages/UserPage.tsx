import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { ActivityIndicator, ScrollView } from "react-native";
import Repository from "../components/Repository";
import { RootStackParamList, UserData, UserRepo } from "../types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";

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
      <NavBar>
        <BackButton onPress={goBack}>
          <Icon name="arrow-back" size={25} color="#333" />
        </BackButton>
        <NavBarTitle>{userData.name}</NavBarTitle>
      </NavBar>
      <ScrollView>
        <Container>
          {userData && (
            <>
              <UserInfoContainer>
                <ProfilePhoto source={{ uri: userData.avatar_url }} />
                <ProfileInfo>
                  {userData.name && <UserName>{userData.name}</UserName>}
                  <SecondaryInfo>
                    <ProfileInfoText>{userData.login}</ProfileInfoText>
                    {userData.location && (
                      <Location>
                        <Icon name="place" size={18} color="#665" />
                        <LocationText>{userData.location}</LocationText>
                      </Location>
                    )}
                  </SecondaryInfo>
                </ProfileInfo>
                <Stats>
                  <StatContainer>
                    <Quantity>{userData.public_repos}</Quantity>
                    <StatText>Repositórios</StatText>
                  </StatContainer>
                  <StatContainer>
                    <Quantity>{userData.followers}</Quantity>
                    <StatText>Seguidores</StatText>
                  </StatContainer>
                </Stats>
              </UserInfoContainer>
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
        </Container>
      </ScrollView>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f0f0f0;
  padding: 10px 10px;
`;

const NavBar = styled.View`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 1;
  padding: 0 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  flex-direction: row;
  align-items: center;
`;

const NavBarTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 15px;
  padding: 12px 4px;
`;

const UserInfoContainer = styled.View`
  width: 100%;
  background-color: #fff;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
`;

const UserName = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`;

const ProfilePhoto = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-bottom: 8px;
`;

const ProfileInfo = styled.View`
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
`;

const SecondaryInfo = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const Location = styled.View`
  flex-direction: row;
  gap: 1px;
`;

const LocationText = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 20px;
`;

const ProfileInfoText = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 20px;
`;

const Stats = styled.View`
  width: 75%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const StatContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;
const Quantity = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #000;
`;

const StatText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #333;
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
