/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { CSSTransition } from "react-transition-group";
import { ArrowLeft, ArrowRight, Settings, ChevronDown } from "react-feather";
import React, {
    FC,
    useState,
    ChangeEvent,
    useCallback,
    useEffect,
    forwardRef,
    useRef,
} from "react";
import { shallowEqual } from "react-redux";
import { Button, Spinner, Avatar } from "@doar/components";
import { debounce } from "lodash-es";
import { Staff } from "src/types/api/staff";
import { getStaffsApi } from "src/api/staff/staff";
import { useClickOutside } from "@doar/shared/hooks";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
    StyledInputWrapper,
    StyledSearchInput,
    StyledSpinnerWrapper,
    StyledStaffName,
} from "../../../../../components/apps/ticket/right-action-buttons/style";
import {
    StyledDropdown,
    StyledMenu,
    StyledNavItem,
    StyledNavbar,
    StyledNavbarNav,
    StyledMenuItem,
    StyledIconButton,
} from "./style";
import { updateBatched } from "../../../../../redux/slices/ticket/list";
import AssignContainer from "./assign-container";

type DropdownMenuProps = {
    onClose: () => void;
};

export const DropdownMenu: FC = () => {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dispatch = useAppDispatch();

    const calcHeight = (el: any) => {
        const height = el.offsetHeight;

        setMenuHeight(height);
    };

    const DropdownItem: FC<any> = (props) => {
        const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (props.onClick) {
                return props.onClick(e);
            }

            return props.goToMenu && setActiveMenu(props.goToMenu);
        };
        return (
            <StyledMenuItem variant="texted" onClick={handleOnClick}>
                {props.leftIcon && (
                    <StyledIconButton>{props.leftIcon}</StyledIconButton>
                )}
                {props.children}
                {props.rightIcon && (
                    <span className="test-icon-right">{props.rightIcon}</span>
                )}
            </StyledMenuItem>
        );
    };

    const onUpdateBatched = (type: "assigned" | "deleted" | "closed") => {
        dispatch(updateBatched({ type }));
    };

    return (
        <StyledDropdown
            style={{
                minHeight: activeMenu === "main" ? 111 : menuHeight || 150,
            }}
        >
            <CSSTransition
                in={activeMenu === "main"}
                timeout={0}
                unmountOnExit
                onEnter={calcHeight}
            >
                <StyledMenu>
                    <DropdownItem onClick={() => onUpdateBatched("closed")}>
                        Mark As Closed
                    </DropdownItem>
                    <DropdownItem goToMenu="assign">Assign</DropdownItem>
                    <DropdownItem onClick={() => onUpdateBatched("deleted")}>
                        Delete
                    </DropdownItem>
                </StyledMenu>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "assign"}
                timeout={0}
                unmountOnExit
                onEnter={calcHeight}
            >
                <StyledMenu>
                    <DropdownItem leftIcon={<ArrowLeft />} goToMenu="main">
                        Back
                    </DropdownItem>
                    <AssignContainer />
                </StyledMenu>
            </CSSTransition>
        </StyledDropdown>
    );
};

export const Navbar: FC = (props) => {
    const [open, setOpen] = useState(false);

    const { selectedTicketIds } = useAppSelector(
        (state) => ({
            selectedTicketIds: state.ticket.list.selectedTicketIds,
        }),
        shallowEqual
    );
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    const containerRef = useClickOutside<HTMLUListElement>(onClose);
    return (
        <StyledNavbar>
            <StyledNavbarNav ref={containerRef}>
                <StyledNavItem>
                    <Button onClick={() => setOpen(!open)} variant="texted">
                        ({selectedTicketIds.length}) <ChevronDown />
                    </Button>

                    {open && <DropdownMenu />}
                </StyledNavItem>
            </StyledNavbarNav>
        </StyledNavbar>
    );
};

DropdownMenu.displayName = "DropdownMenu";
