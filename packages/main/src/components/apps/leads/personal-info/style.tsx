import styled, { device, themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: auto;
    position: relative;
    ${device.large} {
        width: calc(100% - (280px + 350px + 400px));
    }
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        pointer-events: none;
    }
`;

export const StyledTitle = styled.div`
    font-weight: 500;
    color: ${themeGet("colors.gray600")};
    margin-bottom: 30px;
`;

export const StyledLabel = styled.div`
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 500;
`;

export const StyledInfo = styled.div`
    margin: 10px 0;
    color: ${themeGet("colors.text2")};
    display: flex;
    align-items: center;
    .providerName {
        font-size: 14px;
        color: ${themeGet("colors.text2")};
    }
`;

export const StyledButtonsWrap = styled.div`
    display: flex;
    position: absolute;
    top: 20px;
    right: 20px;
    .icon {
        position: relative;
        top: 2px;
        margin-right: 5px;
    }
`;

export const StyledNoInfo = styled.div`
    color: ${themeGet("colors.gray500")};
`;
