import { FC, useEffect, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "@doar/components";
import classNames from "classnames";
import { ChevronDown, ChevronRight, ChevronUp } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetSourceLeads, doGetLeads } from "src/redux/slices/contacts/lead";
import { StyledForm, StyledItemsWrapper, StyledFilterSource, StyledItemSelect } from "./style";

interface Props {
    selectFilter: (data: boolean, name: string) => void;
    openFilter: boolean;
}
const SourceFilter: FC<Props> = ({
    selectFilter,
    openFilter
}) => {
    const dispatch = useAppDispatch();
    const { source } = useAppSelector(store => store.contact.lead);
    const [open, setOpen] = useState(false);
    const { idLocation, inputValue, idProcedure, idStaff, createdFrom, createdTo, stage } = useAppSelector(store => store.contact.search_filter);
    const [isDropdownShow, setDropdownShow] = useState(false)

    useEffect(() => {
        dispatch(doGetSourceLeads())
    }, [dispatch])

    useEffect(() => {
        setOpen(openFilter)
    }, [openFilter])

    const [stageSelect, setStageSelect] = useState('')

    const onSelectSourceInDropdown = (name: string) => {
        dispatch(doGetLeads({
            ...(name && { source: name }),
            location_id: idLocation || 0,
            keyword: inputValue || null,
            stage: stage || null,
            procedure_id: idProcedure || 0,
            created_from: createdFrom,
            created_to: createdTo,
            staff_id: idStaff || 0
        }))
        setDropdownShow(false)
        setStageSelect(name)
    }

    return (
        <>
            <StyledForm onClick={() => {
                setOpen(!open)
                selectFilter(!open, 'source')
            }} >
                Source
                {open ? <ChevronRight onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'source')
                }} size={20} /> : <ChevronDown onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'source')
                }} size={20} />}
            </StyledForm>
            <StyledItemSelect className={classNames({
                'selectOpen': open
            })}>
                {
                    open && (
                        <StyledFilterSource>
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
                                    <span className="selectedSource">
                                        {stageSelect || 'Select Source'}
                                    </span>
                                    <span className="dropdownArrow">
                                        {isDropdownShow
                                            ? <ChevronUp />
                                            : <ChevronDown />}
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdownMenu">
                                    <StyledItemsWrapper>
                                        {source?.map(i => {
                                            return (
                                                <>
                                                    {i.source !== null && (
                                                        <DropdownItem path="#!"
                                                            key={i.source}
                                                            onClick={() => onSelectSourceInDropdown(i.source)}
                                                        >
                                                            {i.source}
                                                        </DropdownItem>
                                                    )}
                                                </>
                                            )
                                        })}

                                    </StyledItemsWrapper>
                                </DropdownMenu>
                            </Dropdown>
                        </StyledFilterSource>
                    )
                }
            </StyledItemSelect>
        </>
    );
};

export default SourceFilter;
