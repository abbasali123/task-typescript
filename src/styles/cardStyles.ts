import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 200px;
  background: gray;
  border-radius: 20px;
  margin-bottom: 4rem;
  cursor: pointer;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2rem;
`;

export const CardDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
`;

export const CardItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  &:not(:last-child) {
    margin-right: 2.5rem;
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.4rem;

  @media only screen and (max-width: 700px) {
    font-size: 1.2rem;
  }
`;

export const CardItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2.5rem;
`;

export const CardText = styled.p`
  font-size: 1.4rem;

  @media only screen and (max-width: 700px) {
    font-size: 1.2rem;
  }
`;

export const InputCardWrapper = styled.div`
  display:flex
  justify-content:center
  alignItems:center
`;

export const InputCard = styled.div`
  position: absolute;
  width: 300;
  height: 50%;
  z-index: 15;
  top: 30%;
  left: 50%;
  margin: -180px 0 0 -150px;
  background: skyblue;
  border-radius: 40px;
  padding: 30px;
`;
