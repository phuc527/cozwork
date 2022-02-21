import { FC, useMemo, useState, ChangeEvent } from "react";
import { debounce } from "lodash-es";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import { StyledForm, StyledInput } from "./style";

const SearchForm: FC = () => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState("");
    const { idLocation, stage, idProcedure, idStaff, createdFrom, source, createdTo } = useAppSelector(store => store.contact.search_filter);


    const handleFilter = useMemo(() =>
        debounce((keyword: string) => dispatch(doGetLeads({
            ...(keyword && { keyword }),
            location_id: idLocation || 0,
            stage: stage || null,
            procedure_id: idProcedure || 0,
            staff_id: idStaff || 0,
            created_from: createdFrom,
            created_to: createdTo,
            source: source || null,
        })), 500)
        , [dispatch, stage, idLocation, idProcedure, idStaff, createdFrom, createdTo, source]);

    const onChangeInput = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        setInputValue(e.target.value);
        handleFilter(e.target.value);
    };

    return (
        <StyledForm>
            <StyledInput
                autoComplete="off"
                id="search-input"
                onChange={onChangeInput}
                value={inputValue}
                placeholder="Search Contacts"
            />
        </StyledForm>
    );
};

export default SearchForm;
