import { CardBody } from "@doar/components";
import styled, { device, css, themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    height: 100%;
    ${device.small} {
        padding: 0rem;
    }
    & .container {
        max-width: 100%;
        height: 100%;
        margin: 0;

        & .rowHeight {
            height: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            @media (max-width: ${themeGet("breakpoints.0")}) {
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
            }

            & .colHeight {
                width: 280px;
                border-right: 1px solid #485e9029;
                background-color: #fff;
                padding: 0;
                height: 100vh;

                @media (max-width: ${themeGet("breakpoints.0")}) {
                    width: 100%;
                    height: auto;
                }
            }
            & .colMainHeight {
                height: 100%;
                width: 100%;
                padding: 0;
                margin-top: 15px;
                ${device.large} {
                    height: 100%;
                    margin-top: 0;
                }
                @media (max-width: ${themeGet("breakpoints.0")}) {
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
`;

export const StyledCardBody = styled(({ ...rest }) => <CardBody {...rest} />)<{
    $practiceInfo?: boolean;
}>`
    padding: 15px 15px 15px 15px;
    ${device.small} {
        padding: 25px 25px 25px 25px;
    }
    ${({ $practiceInfo }) =>
        $practiceInfo &&
        css`
            padding: 15px 0 15px 15px;
            ${device.small} {
                padding: 25px 0 25px 25px;
            }
        `}
`;

export const StyledLabel = styled.div`
    font-size: 15px;
    color: ${themeGet("colors.gray600")};
`;

export const StyledInfoWrap = styled.div`
    position: relative;
    width: calc(100% + 20px);
    left: -10px;
    display: flex;
    align-items: center;
    padding: 10px;
    font-weight: 500;
    min-height: 58px;
    & .d-none {
        display: none;
    }
    &:hover {
        background: ${themeGet("colors.gray100")};
        cursor: pointer;
        & .actionWrap {
            visibility: visible;
        }
    }
    &.practiceInfo {
        width: calc(100% - 5px);
    }
`;

export const StyledInfo = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

export const StyledContent = styled.div`
    background-color: #fff;
    @media (max-width: 991px) {
        background-color: ${themeGet("colors.whisper")};
    }
    height: 100%;
    flex: 1;
    position: relative;
    overflow: auto;
`;
