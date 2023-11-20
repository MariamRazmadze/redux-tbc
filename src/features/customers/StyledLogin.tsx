import styled from "styled-components";

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  background-image: url("background.svg");
  background-repeat: no-repeat;
  background-size: cover;
`;

export const StyledAuth = styled.section`
  margin: 5%;
  width: 500px;
  z-index: 0;
  transition-delay: 100ms;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 5px rgba(0, 0, 0, 0.06),
    0 1px 10px rgba(0, 0, 0, 0.1);
  padding: 4rem;
  @media (max-width: 768px) {
    box-shadow: none;
    max-width: none;
    width: 100%;
    margin: 1rem auto;
  }
`;

export const WaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
  background-color: #8e1ca5;
  color: white;
  height: 60px;
  min-width: 128px;
  padding: 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  align-items: center;
  border: 1px solid #8e1ca5;
  transition: all 250ms;
  border-radius: 4px;

  &:hover {
    background-color: #721684;
  }
`;

export const AuthFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 350px;
`;

export const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const AuthP = styled.p`
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 24px;
`;

export const Star = styled.span`
  color: ${({ theme }) => theme.greenAccent};
`;

export const AuthPAccent = styled(AuthP)`
  color: ${({ theme }) => theme.greenAccent};
  font-weight: 700;
`;
export const AuthHeader = styled.h1`
  /* text-align: center; */
  margin-bottom: 3rem;
  font-weight: 900;
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const AuthFooterButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  a {
    text-decoration: none;
  }
`;
