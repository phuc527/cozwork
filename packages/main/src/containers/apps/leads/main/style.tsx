import styled, { device } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    position: absolute;
    top: 55px;
    z-index: 10;
    height: calc(100vh - 60px);
    display: flex;
    ${device.medium} {
        top: 60px;
    }
`;
