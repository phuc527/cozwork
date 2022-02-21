import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "@doar/components";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import { STAGE } from "../constants";
import { StyledForm, StyledItemsWrapper, StyledFilterStage, StyledItemSelect } from "./style";

interface Props {
    selectFilter: (data: boolean, name: string) => void;
    openFilter: boolean;
}
const StageFilter: FC<Props> = ({
    selectFilter,
    openFilter
}) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [isDropdownShow, setDropdownShow] = useState(false)
    const { idLocation, inputValue, idProcedure, idStaff, createdFrom, createdTo, source } = useAppSelector(store => store.contact.search_filter);
    const [stageSelect, setStageSelect] = useState('')

    const onSelectStageInDropdown = (id: string, name: string) => {
        dispatch(doGetLeads({
            ...(id && { stage: id }),
            location_id: idLocation || 0,
            keyword: inputValue || null,
            procedure_id: idProcedure || 0,
            created_from: createdFrom,
            created_to: createdTo,
            source: source || null,
            staff_id: idStaff || 0
        }))
        setDropdownShow(false)
        setStageSelect(name)
    }

    useEffect(() => {
        setOpen(openFilter)
    }, [openFilter])
    return (
        <>
            <StyledForm onClick={() => {
                setOpen(!open)
                selectFilter(!open, 'stage')
            }}>
                Stage
                {open ? <ChevronRight onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'stage')
                }} size={20} /> : <ChevronDown onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'stage')
                }} size={20} />}
            </StyledForm>
            <StyledItemSelect className={classNames({
                'selectOpen': open
            })}>
                {
                    open && (
                        <StyledFilterStage>
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
                                    <span className="selectedStage">
                                        {stageSelect || 'Select stage'}
                                    </span>
                                    <span className="dropdownArrow">
                                        {isDropdownShow
                                            ? <ChevronUp />
                                            : <ChevronDown />}
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdownMenu">
                                    <StyledItemsWrapper>
                                        {STAGE.map(i => {
                                            return (
                                                <DropdownItem path="#!"
                                                    key={i.id}
                                                    onClick={() => onSelectStageInDropdown(i.id, i.name)}
                                                >
                                                    {i.name}
                                                </DropdownItem>
                                            )
                                        })}
                                    </StyledItemsWrapper>
                                </DropdownMenu>
                            </Dropdown>
                        </StyledFilterStage>
                    )
                }
            </StyledItemSelect>
        </>
    );
};

export default StageFilter;
