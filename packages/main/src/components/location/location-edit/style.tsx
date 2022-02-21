import styled, { themeGet, css } from "@doar/shared/styled";
import { ModalClose, ModalFooter, CardHeader, Input, Dropdown } from "@doar/components";

export const StyledClose = styled(({ ...rest }) => <ModalClose {...rest} />)`
    font-weight: 300;
    font-size: 28px;
    line-height: 0.87;
    position: absolute;
    top: 15px;
    right: 15px;
`;

export const StyledDropDownList = styled.div`
    border: 1px solid ${themeGet("colors.gray200")};
    border-radius: 0.25rem;
    box-shadow: 0 0 8px 2px rgb(28 39 60 / 4%);
    position: absolute;
    background: #fff;
    z-index: 1000;
    padding: 5px;
    max-height: 100px;
    overflow: auto;
`;

export const StyledInput = styled(({ ...rest }) => <Input {...rest} />)`
`;

export const StyledDropdownItem = styled.div`
    padding: 0.5rem 0.5rem;
    &:hover {
        background: ${themeGet("colors.gray100")};
    }
`;

export const StyledBody = styled.div`
    width: 100%;
    display: grid;
    grid-auto-flow: row;
`;

export const StyledHeader = styled(({ ...rest }) => <CardHeader {...rest} />)`
    display: flex;
    margin-left: 10px;
    font-size: 25px;
    justify-content: space-between;
    align-items: center;
`;

export const StyledWrap = styled(({ ...rest }) => <Dropdown {...rest} />)`
    .dropdown {
        &-toggle {
            height: 39px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 20px;
            padding-right: 15px;
            position: relative;
            z-index: 5;
            width: 100%;
            font-size: 14px;
            text-align: left;
        }
        &-menu {
            box-shadow: none;
            max-height: 100px;
            width: 100%;
            overflow: auto;
            max-width: 255px;
            border-width: 0 0 1px 1px;
            border-color: ${themeGet("colors.border")};
            padding: 10px;
            margin: 60px -5px 0 -1px;
            @media (max-width: 768px) {
                margin: 0;
            } 
            border-radius: 0;
            transform: none !important;
            &:before {
                content: "";
                position: absolute;
                top: -10px;
                right: 15px;
                border-bottom: 10px solid rgba(192, 204, 218, 0.53);
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
            }
            &:after {
                content: "";
                position: absolute;
                top: -8.5px;
                right: 16px;
                border-bottom: 9px solid #fff;
                border-left: 9px solid transparent;
                border-right: 9px solid transparent;
            }
            @media (min-width: 480px) {
                border-width: 0 0 1px;
                width: 100%;
                max-width: none;
                margin: 0;
            }
        }
        &-item {
            display: flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 0.25rem;
            svg {
                width: 16px;
                margin-right: 10px;
            }
        }
        &-divider {
            margin: 5px 10px;
        }
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            .dropdown {
                &-toggle {
                    & > span {
                        color: ${themeGet("colors.gray800")};
                    }
                    &:hover,
                    &:focus {
                        > span {
                            color: ${themeGet("colors.gray300")};
                        }
                    }
                }
                &-menu {
                    background-color: ${themeGet("colors.darkdarken2")};

                    &::before {
                        border-bottom-color: rgba(255, 255, 255, 0.08);
                    }
                    &::after {
                        border-bottom-color: ${themeGet("colors.darkdarken2")};
                    }
                }
                &-item {
                    color: ${themeGet("colors.gray500")};
                    &:hover,
                    &:focus {
                        color: #fff;
                        background-color: ${themeGet("colors.darklighten2")};
                    }
                }
            }
        `}
`;

StyledWrap.displayName = "Dropdown";

export const StyledActionButtons = styled.div`
    position: relative;
    margin-left: auto;
    height: 38px;
    width: 150px;
    text-align: left;
    @media (max-width: 460px) {
        width: 130px;
    }
`;

export const StyledBodyItem = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-family: muli,sans-serif;
    font-style: normal;
    font-variant: normal;
    margin-right: 5px;
    margin-left: 5px;
    @media (max-width: 992px) {
        grid-column-start: span 9;
    }
`;

export const StyledBodyItemTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 5px;
`;

export const StyledBodyItemInput = styled.div`
    height: 48px;
    min-height: 48px;
    & .disabled {
        pointer-events: none;
        background-color: #f5f6fa;
    }
`;

export const StyledTitle = styled.h6`
    letter-spacing: 0.5px;
    font-size: 17px;
    margin-bottom: 0px;
`;

export const StyledFooter = styled(({ ...rest }) => <ModalFooter {...rest} />)`
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
`;
