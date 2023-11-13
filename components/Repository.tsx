import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";
import { UserRepo } from "../types";

export default function Repository({ data }: { data: UserRepo }) {
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleRepositoryPress = () => {
    Linking.openURL(data.html_url);
  };

  return (
    <TouchableContainer onPress={handleRepositoryPress}>
      <Container>
        <TopInfo>
          <Title>{data.name}</Title>
          <Language>{data.language}</Language>
        </TopInfo>
        <Description>{data.description}</Description>
        <DateInfo>
          <DateText>Criado em: {formatDate(data.created_at)}</DateText>
          <DateText>Último push: {formatDate(data.pushed_at)}</DateText>
        </DateInfo>
      </Container>
    </TouchableContainer>
  );
}
    
const TouchableContainer = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: #fff;
  width: 100%;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #333;
`;

const Description = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #666;
  margin-top: 5px;
  line-height: 20px;
`;

const TopInfo = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Language = styled.Text`
  font-size: 13px;
  color: #666;
`;


const DateInfo = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  gap:25px;
  justify-content: space-between;
`;

const DateText = styled.Text`
  color: #333;
`;