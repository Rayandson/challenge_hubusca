import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { Text, View, Image, ScrollView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Repository from "../components/Repository";
import { UserData, UserRepo } from "../types";

export default function UserPage({
  route,
}: {
  route: { params: { userData: UserData } };
}) {
  const { userData } = route.params;
  const [userRepos, setUserRepos] = useState<UserRepo[] | []>([]);

  useEffect(() => {
    fetchUserRepos();
  }, [userData]);

  const fetchUserRepos = async () => {
    try {
      const response = await axios.get(userData.repos_url);
      setUserRepos(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <ScrollView>
      <Container>
        {userData && (
          <>
            <UserInfoContainer>
              <ProfilePhoto source={{ uri: userData.avatar_url }} />
              <ProfileInfo>
                <ProfileInfoText>Name: {userData.name}</ProfileInfoText>
                <ProfileInfoText>Login: {userData.login}</ProfileInfoText>
                <ProfileInfoText>Location: {userData.location}</ProfileInfoText>
              </ProfileInfo>
            </UserInfoContainer>
            <Title>Repositórios</Title>
            {userRepos.map((repo) => (
              <Repository key={repo.id} data={repo} />
            ))}
          </>
        )}
      </Container>
    </ScrollView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f0f0f0;
  padding: ${50 + getStatusBarHeight(true)}px 20px;
`;

const UserInfoContainer = styled.View`
  width: 100%;
  background-color: #fff;
  align-items: center;
  padding: 20px;
`;

const ProfilePhoto = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-bottom: 20px;
`;

const ProfileInfo = styled.View`
  margin-top: 10px;
`;

const ProfileInfoText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-top: 15px;
  margin-bottom: 20px;
`;
