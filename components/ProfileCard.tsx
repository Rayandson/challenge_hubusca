import React from "react";
import styled from "styled-components/native";
import { UserData } from "../types";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ProfileCard({ userData }: { userData: UserData }) {
  return (
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
  );
}

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
