import styled, {
    color as colorStyles,
    ColorProps,
    device,
    themeGet,
    css,
} from "@doar/shared/styled";
import { tinycolor } from "@doar/shared";
import { Avatar, NavLink, Button } from "@doar/components";

export const StyledBtns = styled.nav`
    display: flex;
    width: 100%;
    justify-content: center;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledNavBtn = styled(({ bg, ...rest }) => (
    <button {...rest} type="button" />
)) <ColorProps>`
    display: block;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 5px;
    width: 34px;
    height: 34px;
    border-radius: 100%;
    color: #fff;
    border: none;
    &:not(:first-of-type) {
        margin-left: 8px;
    }
    svg {
        width: 16px;
        margin-top: 4px;
        stroke-width: 2.6px;
    }
    &#phoneCall:hover {
        background-color: #009999;        
    }
    &#videoCall:hover {
        background-color: #B00056;
    }
    &#sendMessage:hover {
        background-color: #002AAB;
    }
    ${colorStyles};
`;
export const StyledName = styled.h6`
    font-size: 14px;
    margin-left: 5px;
    margin-bottom: 0;
    ${device.xlarge} {
        font-size: 16px;
    }
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 220px;
`;
export const StyledEmail = styled.span`
    margin-left: 5px;
    margin-top: 5px;
    display: block;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 220px;
`;

export const StyledTicketCountItem = styled.span`
    margin-left: auto;
    background-color: ${themeGet("colors.gray500")};
    border-radius: 9999;
    height: 20px;
    width: 30px;
    display: flex;
    color: ${themeGet("colors.white")};
    justify-content: center;
    align-items: center;
    border-radius: 30%;
`;
export const StyledAvatar = styled((props) => <Avatar {...props} />)`
    position: absolute;
    right: -30px;
    top: -15px;
`;

export const StyledNavLink = styled(({ ...rest }) => <NavLink {...rest} />)`
    padding: 8px 10px;
    align-items: center;
    display: flex;
    color: ${themeGet("colors.text3")};
    ${({ $active }) =>
        !!$active &&
        css`
            color: ${themeGet("colors.primary")};
        `}
`;


export const StyledDropdown = styled.div`
    position: absolute;
    left: 165px;
    background-color: #fff;
    overflow: hidden;
    transition: height 400ms ease;
    min-width: 5rem;
    font-size: 0.875rem;
    border: 1px solid
        ${(props) =>
        tinycolor(props.theme.colors.text3).setAlpha(0.27).toString()};
    border-radius: 0.25rem;
    box-shadow: 0 0 8px 2px rgb(28 39 60 / 4%);
    z-index: 100;
`;

export const StyledMenu = styled.div`
    .dropdownInSide {
        padding: 5px;
        z-index: 10;
    }
    .dropdownOutSide {
        z-index: 10;
    }
`;

export const StyledText = styled.div`
`;

export const StyledNavItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.3rem;
    position: relative;
`;

export const StyledNavbar = styled.nav``;

export const StyledNavbarNav = styled.ul`
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const StyledMenuItem = styled(({ ...rest }) => <Button {...rest} />)`
    display: flex;
    align-items: center;
    background: transparent;
    width: 100%;
    padding: 0.5rem 1rem;
    min-width: calc(200px - 2rem);
    width: 100%;
    text-align: left;
    justify-content: space-between;
    color: ${themeGet("colors.text")};
    &:hover {
        color: ${themeGet("colors.heading")};
        background-color: ${themeGet("colors.light")};
    }
    &.disabled{
        pointer-events: none;
        background-color: ${themeGet("colors.light")};
    }   
`;

export const StyledIconButton = styled.div`
    border-radius: 50%;
    padding-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${themeGet("colors.text")};
`;
