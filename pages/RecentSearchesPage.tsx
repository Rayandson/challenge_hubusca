import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { RootStackParamList, UserData } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import NavBar from "../components/NavBar";
import { Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getRecentSearches } from "../utils/storageUtil";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecentSearchesPage"
>;

export default function RecentSearchesPage({
  navigation,
}: {
  navigation: ProfileScreenNavigationProp;
}) {
  const [recentSearches, setRecentSearches] = useState<UserData[]>([]);

  useEffect(() => {
    const retrieveRecentSearches = async () => {
      const searches = await getRecentSearches();
      setRecentSearches(searches);
    };
    retrieveRecentSearches();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <NavBar title="Pesquisas recentes" goBack={goBack} />
      <ScrollView>
        <Container>
          <Content>
            <TitleView>
              <Title>Usuários</Title>
            </TitleView>

            {recentSearches.map((item) => (
              <UserResult
                key={item.id}
                onPress={() => {
                  navigation.navigate("UserPage", { userData: item });
                }}
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
            ))}
          </Content>
        </Container>
      </ScrollView>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Content = styled.View`
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  background-color: #f0f0f0;
  max-width: 700px;
`;

const TitleView = styled.View`
  width: 90%;
`;

const Title = styled.Text`
  font-size: 23px;
  font-weight: 700;
  color: #333;
  margin-top: 25px;
  margin-bottom: 10px;
`;

const UserResult = styled.TouchableOpacity`
  width: 90%;
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;
  padding: 15px;
  align-items: center;
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
