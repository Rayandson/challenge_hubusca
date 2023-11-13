import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, UserData } from "../types";
import Icon from "react-native-vector-icons/MaterialIcons";

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
        {userData.name && <Name>{userData.name}</Name>}
        <UserInfoText>{userData.login}</UserInfoText>
        {userData.location && (
          <Location>
            <Icon name="place" size={18} color="#665" />
            <LocationText> {userData.location}</LocationText>
          </Location>
        )}
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
  margin-top: 12px;
`;

const UserInfo = styled.View`
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

const UserInfoText = styled.Text`
  font-size: 17px;
`;

const Location = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const LocationText = styled.Text`
  font-size: 16px;
  line-height: 19px;
`;
