import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
} from "@doar/components";
import { debounce } from "lodash-es";
import LocationIcon from "src/components/svg/LocationIcon";
import classNames from "classnames";
import { FC, ChangeEvent, useState, useMemo, useEffect } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { doGetProcedures } from "src/redux/slices/settings/services/procedure";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
    StyledFilterProcedure,
    StyledInputWrapper,
    StyledItemsWrapper,
    StyledSearchInput,
    StyledSpinnerWrapper,
} from "./style";

interface IProps {
    selectedProcedure?: string;
    selectedStaffProcedure?: string;
    idStaff?: number;
    onSelectProcedure: (id: number) => void;
}
const ProcedureFilter: FC<IProps> = ({
    selectedProcedure,
    selectedStaffProcedure,
    idStaff,
    onSelectProcedure,
}) => {
    const dispatch = useAppDispatch();
    const { procedures, loading } = useAppSelector(
        (store) => store?.setting?.services?.procedure
    );
    const handleSearch = useMemo(
        () =>
            debounce(
                (name: string) =>
                    dispatch(doGetProcedures({ ...(name && { name }) })),
                500
            ),
        [dispatch]
    );
    const [isDropdownShow, setDropdownShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        dispatch(doGetProcedures(null));
    }, [dispatch]);

    const onChangeInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        setSearchValue(e.target.value);
        handleSearch(e.target.value);
    };

    const onSelectProcedureInDropdown = (id: number) => {
        setDropdownShow(false);
        onSelectProcedure(id);
    };

    return (
        <>
            {selectedStaffProcedure && (
                <StyledFilterProcedure>
                    <Dropdown
                        close={isDropdownShow}
                        direction="down"
                        getState={(state) => setDropdownShow(state)}
                    >
                        {selectedStaffProcedure === "+ assign location" ? (
                            <DropdownToggle
                                color="light"
                                shape="rounded"
                                size="sm"
                                variant="outlined"
                                className="dropdownToggleNoLocation"
                            >
                                <span className="selectedStaffProcedure">
                                    {selectedStaffProcedure || (
                                        <span>
                                            <Spinner size="xs" color="dark" />
                                        </span>
                                    )}
                                </span>
                            </DropdownToggle>
                        ) : (
                            <DropdownToggle
                                color="light"
                                shape="rounded"
                                size="sm"
                                variant="outlined"
                                className="dropdownToggle"
                            >
                                <LocationIcon />
                                <span className="selectedStaffProcedure">
                                    {selectedStaffProcedure || (
                                        <span>
                                            <Spinner size="xs" color="dark" />
                                        </span>
                                    )}
                                </span>
                            </DropdownToggle>
                        )}
                        <DropdownMenu
                            className={classNames({
                                dropdownMenuStaff: idStaff,
                            })}
                        >
                            <StyledInputWrapper>
                                <StyledSearchInput
                                    inputLoading={loading && !!searchValue}
                                    autoComplete="off"
                                    id="search-procedure-input"
                                    placeholder="Search Procedure"
                                    onChange={onChangeInput}
                                    value={searchValue}
                                />
                                {loading && (
                                    <StyledSpinnerWrapper>
                                        <Spinner size="xs" />
                                    </StyledSpinnerWrapper>
                                )}
                            </StyledInputWrapper>
                            <StyledItemsWrapper>
                                {procedures?.map((i) => {
                                    return (
                                        <DropdownItem
                                            path="#!"
                                            key={i.id}
                                            onClick={() =>
                                                onSelectProcedureInDropdown(
                                                    i.id
                                                )
                                            }
                                        >
                                            {i.name}
                                        </DropdownItem>
                                    );
                                })}
                            </StyledItemsWrapper>
                        </DropdownMenu>
                    </Dropdown>
                </StyledFilterProcedure>
            )}
            {selectedProcedure && (
                <StyledFilterProcedure>
                    <Dropdown
                        close={isDropdownShow}
                        direction="down"
                        getState={(state) => setDropdownShow(state)}
                    >
                        <DropdownToggle
                            color="light"
                            shape="rounded"
                            size="sm"
                            variant="outlined"
                            className="dropdownToggle"
                        >
                            <span className="selectedProcedure">
                                {selectedProcedure || (
                                    <span>
                                        <Spinner size="xs" color="dark" />
                                    </span>
                                )}
                            </span>
                            <span className="dropdownArrow">
                                {isDropdownShow ? (
                                    <ChevronUp />
                                ) : (
                                    <ChevronDown />
                                )}
                            </span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdownMenu">
                            <StyledInputWrapper>
                                <StyledSearchInput
                                    inputLoading={loading && !!searchValue}
                                    autoComplete="off"
                                    id="search-Procedure-input"
                                    placeholder="Search Procedure"
                                    onChange={onChangeInput}
                                    value={searchValue}
                                />
                                {loading && (
                                    <StyledSpinnerWrapper>
                                        <Spinner size="xs" />
                                    </StyledSpinnerWrapper>
                                )}
                            </StyledInputWrapper>
                            <StyledItemsWrapper>
                                {procedures?.map((i) => {
                                    return (
                                        <DropdownItem
                                            path="#!"
                                            key={i.id}
                                            onClick={() =>
                                                onSelectProcedureInDropdown(
                                                    i.id
                                                )
                                            }
                                        >
                                            {i.name}
                                        </DropdownItem>
                                    );
                                })}
                            </StyledItemsWrapper>
                        </DropdownMenu>
                    </Dropdown>
                </StyledFilterProcedure>
            )}
        </>
    );
};

export default ProcedureFilter;
