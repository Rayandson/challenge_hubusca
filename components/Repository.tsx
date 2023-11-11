import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";

interface UserRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  created_at: string | null;
  pushed_at: string | null;
}

export default function Repository({ data }: { data: UserRepo }) {
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
          </Container>
        </TouchableContainer>
      );
    }
    
const TouchableContainer = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: #fff;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
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
