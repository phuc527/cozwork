import { FC, useEffect, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "@doar/components";
import classNames from "classnames";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import { ChevronDown, ChevronRight, ChevronUp } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetStaffs } from "src/redux/slices/settings/manage-users/active-staffs";
import { Staff } from "src/types/api/staff";
import { StyledForm, StyledItemsWrapper, StyledFilterProvider, StyledItemSelect } from "./style";


interface Props {
    selectFilter: (data: boolean, name: string) => void;
    openFilter: boolean;
}
const ServiceProviderFilter: FC<Props> = ({
    selectFilter,
    openFilter
}) => {
    const [open, setOpen] = useState(false);
    const { staffs } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const dispatch = useAppDispatch();
    const [defaultStaff, setDefaultStaff] = useState<Staff[] | []>([]);


    useEffect(() => {
        dispatch(doGetStaffs({
            page: 1,
            limit: 10,
            keyword: null
        }))
    }, [dispatch])

    useEffect(() => {
        if (staffs) {
            setDefaultStaff(staffs)
        }
    }, [staffs])

    useEffect(() => {
        setOpen(openFilter)
    }, [openFilter])

    const [isDropdownShow, setDropdownShow] = useState(false)
    const { idLocation, inputValue, idProcedure, stage, createdFrom, createdTo, source } = useAppSelector(store => store.contact.search_filter);
    const [providerSelect, setProviderSelect] = useState('')

    const onSelectProviderInDropdown = (data: Staff) => {
        dispatch(doGetLeads({
            ...(data.id && { staff_id: data.id }),
            location_id: idLocation || 0,
            keyword: inputValue || null,
            procedure_id: idProcedure || 0,
            stage: stage || null,
            source: source || null,
            created_from: createdFrom,
            created_to: createdTo,
        }))
        const name = [data?.first_name, data?.last_name].join(" ");
        setDropdownShow(false)
        setProviderSelect(name)
    }

    return (
        <>
            <StyledForm onClick={() => {
                setOpen(!open)
                selectFilter(!open, 'service_provider')
            }} >
                Service Provider
                {open ? <ChevronRight onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'service_provider')
                }} size={20} /> : <ChevronDown onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'service_provider')
                }} size={20} />}
            </StyledForm>
            <StyledItemSelect className={classNames({
                'selectOpen': open
            })}>
                {
                    open && (
                        <StyledFilterProvider>
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
                                    <span className="selectedProvider">
                                        {providerSelect || 'Select provider'}
                                    </span>
                                    <span className="dropdownArrow">
                                        {isDropdownShow
                                            ? <ChevronUp />
                                            : <ChevronDown />}
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdownMenu">
                                    <StyledItemsWrapper>
                                        {defaultStaff.map(i => {
                                            return (
                                                <DropdownItem path="#!"
                                                    key={i.id}
                                                    onClick={() => onSelectProviderInDropdown(i)}
                                                >
                                                    {i.first_name} {' '} {i.last_name}
                                                </DropdownItem>
                                            )
                                        })}
                                    </StyledItemsWrapper>
                                </DropdownMenu>
                            </Dropdown>
                        </StyledFilterProvider>
                    )
                }
            </StyledItemSelect>
        </>
    );
};

export default ServiceProviderFilter;
