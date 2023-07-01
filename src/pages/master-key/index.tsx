import { Flex, Group } from '@mantine/core';
import { useState } from 'react';
import styled from 'styled-components';

const MasterKeyPage = ({
  question_number,
  all,
  setAll,
  clicked,
  setClicked,
  index,
}: {
  question_number: number;
  setAll: React.Dispatch<React.SetStateAction<{}>>;
  all: object;
  clicked: boolean;
  index: number;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const changeColor = () => {
    if (index === question_number) {
      setClicked(!clicked);
    }
  };

  return (
    <Flex
      gap={'sm'}
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <QuestionNumberStyles>{question_number}. </QuestionNumberStyles>
      <Group spacing={'xl'}>
        <ChoiceStyles
          index={index}
          question_number={question_number}
          clicked={clicked}
          onClick={() => {
            setAll({ ...all, [question_number]: 'A' });
            changeColor();
            console.log(index);
          }}
        >
          A
        </ChoiceStyles>
        <ChoiceStyles
          // clicked={clicked}
          onClick={() => {
            setAll({ ...all, [question_number]: 'B' });
            // setClicked(!clicked);
            console.log('second one');
          }}
        >
          B
        </ChoiceStyles>
        <ChoiceStyles
          // clicked={clicked}
          onClick={() => {
            setAll({ ...all, [question_number]: 'C' });
            // setClicked(!clicked);
          }}
        >
          C
        </ChoiceStyles>
        <ChoiceStyles
          onClick={() => setAll({ ...all, [question_number]: 'D' })}
        >
          D
        </ChoiceStyles>
      </Group>
    </Flex>
  );
};

export default MasterKeyPage;

const ChoiceStyles = styled.div<{
  clicked?: boolean;
  index?: number;
  question_number?: number;
  onClick?: () => void;
}>`
  background: ${({ clicked, index, question_number }) =>
    clicked ? (index === question_number ? 'red' : 'blue') : 'blue'};
  width: 3rem;
  height: 3rem;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const QuestionNumberStyles = styled.p`
  font-size: 1.5rem;
`;
