import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, UserData } from "../types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface UserCardProps {
  navigation: HomeScreenNavigationProp;
  userData: UserData;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}
export default function UserCard({
  navigation,
  userData,
  setUsername,
  setUserData,
}: UserCardProps) {
  return (
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
  );
}

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
