import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import ProcedureFilter from "../../../settings/procedure-filter";
import { StyledForm, StyledItemSelect } from "./style";

interface Props {
    selectFilter: (data: boolean, name: string) => void;
    openFilter: boolean;
}
const ProceduresFilter: FC<Props> = ({ selectFilter, openFilter }) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const {
        stage,
        inputValue,
        idLocation,
        idStaff,
        createdFrom,
        createdTo,
        source,
    } = useAppSelector((store) => store?.contact.search_filter);
    const { procedures } = useAppSelector(
        (store) => store?.setting?.services?.procedure
    );
    const [procedureName, setProcedureName] = useState("");

    const onSelectProcedure = (id: number) => {
        const procedureTemp = procedures?.find((i) => i.id === id);
        if (procedureTemp) {
            setProcedureName(procedureTemp.name);
        }
        dispatch(
            doGetLeads({
                ...(id && { procedure_id: id }),
                source: source || null,
                keyword: inputValue || null,
                stage: stage || null,
                location_id: idLocation || 0,
                staff_id: idStaff || 0,
                created_from: createdFrom,
                created_to: createdTo,
            })
        );
    };

    useEffect(() => {
        setOpen(openFilter);
    }, [openFilter]);
    return (
        <>
            <StyledForm
                onClick={() => {
                    setOpen(!open);
                    selectFilter(!open, "procedures");
                }}
            >
                Procedures interested in
                {open ? (
                    <ChevronRight
                        onClick={() => {
                            setOpen(!open);
                            selectFilter(!open, "procedures");
                        }}
                        size={20}
                    />
                ) : (
                    <ChevronDown
                        onClick={() => {
                            setOpen(!open);
                            selectFilter(!open, "procedures");
                        }}
                        size={20}
                    />
                )}
            </StyledForm>
            <StyledItemSelect
                className={classNames({
                    selectOpen: open,
                })}
            >
                {open && (
                    <ProcedureFilter
                        selectedProcedure={procedureName || "Select Procedures"}
                        onSelectProcedure={onSelectProcedure}
                    />
                )}
            </StyledItemSelect>
        </>
    );
};

export default ProceduresFilter;
