import styled, { device, themeGet, css } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    background: #fff;
    height: 100%;
    border-right: 1px solid ${themeGet("colors.border")};
    ${device.small} {
        width: 350px;
    }
    .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }
`;

export const StyledHeader = styled.div`
    text-align: center;
    padding: 20px;
    position: relative;
    overflow: auto;
    & .backArrow {
        position: absolute;
        top: 30px;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }
    & .leadInfo {
        & .leadName {
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 5px;
        }
    }
    & .nameIconWrap {
        overflow: hidden;
        position: absolute;
        width: 80px;
        height: 80px;
        top: 0;
        right: 0;
        & .nameIcon {
            width: 80px;
            height: 80px;
            position: absolute;
            top: -25px;
            right: -25px;
            background: #564ef2;
            border-radius: 50%;
            & .nameInitial {
                color: #fff;
                font-size: 17px;
                position: absolute;
                top: 38px;
                right: 40px;
                font-weight: 500;
                text-transform: uppercase;
            }
        }
    }
`;

export const StyledMediaWrap = styled.div`
    display: flex;
    justify-content: center;
`;

export const StyledMedia = styled.div<{ $color?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 5px;
    & .button {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        ${({ $color }) =>
            $color &&
            css`
                background: ${$color};
            `}
        & .icon {
            height: 20px;
        }
        &:hover {
            filter: brightness(95%);
        }
    }
    & .textMedia {
        font-size: 12px;
        margin-top: 2px;
    }
`;

export const StyledStatisticsWrap = styled.div`
    padding: 10px;
`;

export const StyledOption = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
        background: ${themeGet("colors.catskill")};
    }
    & .icon {
        height: 18px;
        margin-right: 10px;
    }
    & .number {
        color: #fff;
        margin-left: auto;
        background: ${themeGet("colors.gray500")};
        border-radius: 5px;
        font-size: 15px;
        font-weight: 500;
        width: 36px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &.active {
        border-radius: 5px;
        background: ${themeGet("colors.catskill")};
        & .optionName {
            font-weight: 500;
            color: ${themeGet("colors.primary")};
        }
    }
`;
