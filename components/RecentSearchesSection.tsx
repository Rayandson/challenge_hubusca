import React from 'react'
import styled from 'styled-components/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, UserData } from "../types";
import { Image } from 'react-native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList,"Home">;

interface Props {
    recentSearches: UserData[], 
    navigation: HomeScreenNavigationProp
}

export default function RecentSearchesSection({recentSearches, navigation}: Props) {
  return (
    <>
    <Title>Pesquisas recentes</Title>
        <RecentSearchesContainer>
          {recentSearches.map((user: UserData) => {
            return (
              <UserResult
                key={user.id}
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
    </>
  )
}

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const RecentSearchesContainer = styled.View`
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const UserResult = styled.TouchableOpacity`
  width: 80%;
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;
  padding: 15px;
  align-items: center;
`;

const UserInfo = styled.View`
  width: 100%;
  margin-top: 20px;
`;

const UserInfoText = styled.Text`
  font-size: 19px;
`;
