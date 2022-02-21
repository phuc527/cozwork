import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import LocationFilter from "../../../settings/location-filter";
import { StyledForm, StyledItemSelect } from "./style";

interface Props {
    selectFilter: (data: boolean, name: string) => void;
    openFilter: boolean;
}
const LocationsFilter: FC<Props> = ({
    selectFilter,
    openFilter
}) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const { stage, inputValue, idProcedure, idStaff, createdFrom, createdTo, source } = useAppSelector(store => store?.contact.search_filter);
    const { locations } = useAppSelector(store => store?.setting?.practice?.location);
    const [locationName, setLocationName] = useState('')

    const onSelectLocation = (id: number) => {
        const locationTemp = locations?.find(i => i.id === id)
        if (locationTemp) {
            setLocationName(locationTemp.name)
        }
        dispatch(doGetLeads({
            ...(id && { location_id: id }),
            source: source || null,
            keyword: inputValue || null,
            stage: stage || null,
            procedure_id: idProcedure || 0,
            staff_id: idStaff || 0,
            created_from: createdFrom,
            created_to: createdTo
        }))
    }

    useEffect(() => {
        setOpen(openFilter)
    }, [openFilter])
    return (
        <>
            <StyledForm onClick={() => {
                setOpen(!open)
                selectFilter(!open, 'locations')
            }}>
                Locations
                {open ? <ChevronRight onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'locations')
                }} size={20} /> : <ChevronDown onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'locations')
                }} size={20} />}
            </StyledForm>
            <StyledItemSelect className={classNames({
                'selectOpen': open
            })}>
                {
                    open && (
                        <LocationFilter
                            selectedLocation={locationName || 'Select Locations'}
                            onSelectLocation={onSelectLocation}
                        />
                    )
                }
            </StyledItemSelect>
        </>
    );
};

export default LocationsFilter;
