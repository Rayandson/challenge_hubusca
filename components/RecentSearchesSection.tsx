import React from "react";
import styled from "styled-components/native";
import { FlatList, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, UserData } from "../types";
import Icon from "react-native-vector-icons/MaterialIcons";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  recentSearches: UserData[];
  navigation: HomeScreenNavigationProp;
}

export default function RecentSearchesSection({
  recentSearches,
  navigation,
}: Props) {

  return (
    <>
      <TitleView>
      <Title>Pesquisas recentes</Title>
      <SeeAll  onPress={() => {
                navigation.navigate("RecentSearchesPage", { recentSearches: recentSearches });
              }}><SeeAllText>Ver todos</SeeAllText></SeeAll>
      </TitleView>
      <RecentSearchesContainer>
        <FlatList
          data={recentSearches.slice(0, 6)}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <UserResult
              onPress={() => {
                navigation.navigate("UserPage", { userData: item });
              }}
              style={{ marginLeft: index === 0 ? 20 : 0 }}
            >
              <Image
                source={{ uri: item.avatar_url }}
                style={{ width: 130, height: 130, borderRadius: 65 }}
              />
              <UserInfo>
                {item.name && <Name>{item.name}</Name>}
                <UserInfoText>{item.login}</UserInfoText>
                {item.location && (
                  <Location>
                    <Icon name="place" size={18} color="#665" />
                    <LocationText> {item.location}</LocationText>
                  </Location>
                )}
              </UserInfo>
            </UserResult>
          )}
        />
      </RecentSearchesContainer>
    </>
  );
}

const TitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  margin-left: 20px;
  margin-right: 20px;
`

const Title = styled.Text`
  font-size: 22.5px;
  font-weight: bold;
  color: #333;
`;

const SeeAll = styled.TouchableOpacity`
  font-size: 17.5px;
  font-weight: 600;
  color: #333;
`;

const SeeAllText = styled.Text`
  font-size: 17.5px;
  font-weight: 600;
  color: #333;
`;

const RecentSearchesContainer = styled.View`
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 20px;
  
`;

const UserResult = styled.TouchableOpacity`
  width: 280px;
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;
  padding: 15px;
  align-items: center;
  margin-right: 15px;
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
