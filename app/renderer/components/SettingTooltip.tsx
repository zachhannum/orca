import { useEffect, useRef, useState } from 'react';
import { ContextMenu } from 'renderer/components';
import { useIsHovering } from 'renderer/hooks';
import styled, { useTheme } from 'styled-components';

type SettingTooltipProps = {
  children?: React.ReactNode;
};

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  cursor: pointer;
`;

const TooltipContainer = styled.div`
  display: flex;
  max-width: 500px;
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  padding: 2px;
  &:after {
    content: '?';
  }
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  border: rgba(255, 255, 255, 0.4) 1px solid;
`;

export const SettingTooltip = ({ children }: SettingTooltipProps) => {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isHovering = useIsHovering(tooltipRef);
  const theme = useTheme();

  useEffect(() => {
    if (isHovering) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isHovering]);

  return (
    <Container>
      <InfoIcon ref={tooltipRef} />
      <ContextMenu
        showMenu={show}
        onCloseMenu={() => {}}
        position={{
          x: tooltipRef.current
            ? tooltipRef.current?.offsetLeft + tooltipRef.current?.clientWidth
            : 0,
          y: tooltipRef.current
            ? tooltipRef.current?.offsetTop +
              tooltipRef.current?.clientHeight +
              3
            : 0,
        }}
      >
        <TooltipContainer>{children}</TooltipContainer>
      </ContextMenu>
    </Container>
  );
};
