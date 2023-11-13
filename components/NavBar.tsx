import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

interface NavBarProps {
    username: string;
    goBack: () => void;
}
export default function NavBar({username, goBack}: NavBarProps) {
  return (
    <NavBarContainer>
        <BackButton onPress={goBack}>
          <Icon name="arrow-back" size={25} color="#333" />
        </BackButton>
        <NavBarTitle>{username}</NavBarTitle>
      </NavBarContainer>
  )
}

const NavBarContainer = styled.View`
  width: 100%;
  max-width: 700px;
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