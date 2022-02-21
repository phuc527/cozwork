import styled, { css, device, space, themeGet } from "@doar/shared/styled";

export const StyledSidebar = styled.div``;
export const StyledGroup = styled.div`
    background-color: white;
`;
export const StyledTitle = styled.p`
    font-size: 16px;
    font-weight: 500;
    height: 51px;
    padding: 15px 20px;
    border-bottom: 1px solid #485e9029;
    margin-bottom: 10px;
    margin: 0;
`;
export const StyledTitleFilterBy = styled.div`
    color: #a2adbb;
    font-size: 10px;
    font-family: ${themeGet("fonts.interUi")};
    font-weight: 400;
    border-bottom: 1px solid #485e9029;
    letter-spacing: 0.5px;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    ${space}
`;

export const StyledBodyFilter = styled.div``;
export const StyledItemFilter = styled.div`
    cursor: pointer;
    border-bottom: 1px solid #485e9029;
    display: grid;
    grid-template-columns: 30px auto;
    padding: 15px 20px;
    align-items: center;
    &.selectFilter {
        grid-row-gap: 1px;
    }
    & .filter {
        color: ${themeGet("colors.text2")};
    }
    & .selectFilter {
        color: #0168fa;
    }
    color: ${themeGet("colors.text3")};
    ${device.large} {
        width: 100%;
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.dark")};
        `}
`;
