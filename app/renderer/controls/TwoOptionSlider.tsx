import { useEffect, useState } from 'react';
import styled, { useTheme, css } from 'styled-components';
import SwitchBase from './SwitchBase';

type TwoOptionSliderProps = {
  defaultValue?: string;
  type?: 'alt' | 'default';
  onChange?: (value: string) => void;
  disabled?: boolean;
  value?: string | undefined;
  optionOne: string;
  optionTwo: string;
};

const StyledSliderContainer = styled.div`
  position: relative;
`;

const LabelsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: none;
  justify-content: space-between;
  align-items: center;
  top: 0;
  height: 35px;
  width: 110px;
  pointer-events: none;
  margin: 0px 5px;
`;

type LabelProps = {
  selected: boolean;
};

const Label = styled.span<LabelProps>`
  color: ${(p) => p.theme.optionSliderText};
  font-size: 0.8em;
  width: 55px;
  text-align: center;
  user-select: none;
  ${(p) =>
    p.selected &&
    css`
      font-weight: 600;
    `}
`;

const TwoOptionSlider = ({
  type = 'default',
  disabled = false,
  onChange,
  value = undefined,
  optionOne,
  optionTwo,
  defaultValue = optionOne,
}: TwoOptionSliderProps) => {
  const theme = useTheme();

  const [toggleValue, setToggleValue] = useState<boolean | undefined>(
    undefined
  );

  const [selectedOption, setSelectedOption] = useState(defaultValue);

  useEffect(() => {
    if (value) {
      if (value === optionOne) {
        setToggleValue(false);
      } else {
        setToggleValue(true);
      }
    }
  }, [value]);

  return (
    <StyledSliderContainer>
      <SwitchBase
        horizontalPadding={5}
        thumbHeight={25}
        thumbWidth={55}
        thumbAnimateWidth={70}
        thumbBorderRadius={9}
        thumbCheckedColor={theme.optionSliderFg[type]}
        thumbUncheckedColor={theme.optionSliderFg[type]}
        baseHeight={35}
        baseWidth={120}
        baseBorderRadius={13}
        baseCheckedColor={theme.optionSliderBg[type]}
        baseUncheckedColor={theme.optionSliderBg[type]}
        defaultValue={defaultValue === optionTwo}
        onChange={(value: boolean) => {
          const selected = value ? optionTwo : optionOne;
          setSelectedOption(selected);
          if (onChange) {
            onChange(selected);
          }
        }}
        disabled={disabled}
        value={toggleValue}
      />
      <LabelsContainer>
        <Label selected={selectedOption === optionOne}>{optionOne}</Label>
        <Label selected={selectedOption === optionTwo}>{optionTwo}</Label>
      </LabelsContainer>
    </StyledSliderContainer>
  );
};

export default TwoOptionSlider;
