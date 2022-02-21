import { Button } from "@doar/components";
import { FC, useEffect, useMemo, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Share, Trash, X, Edit } from "react-feather";
import ModalDelete from "src/components/apps/contacts/main/modal-delete";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ModalEdit from "src/components/apps/contacts/main/modal-edit";
import PersonalDetails from "src/components/apps/contacts/main/personal-details";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";

import {
    StyledMain,
    SidebarButton,
    StyledButton,
    StyledTypeCheck,
    StyledHeader,
    StyledTitle,
} from "./style";

const Main: FC = () => {
    const [leadCheck, setLeadCheck] = useState<number[]>([]);
    // create memory leadCheck
    const [memoryLeadCheck, setMemoryLeadCheck] = useState<number[]>([]);
    let { memoryCheckedItem } = useAppSelector((store) => store.contact.lead);
    const {
        stage,
        idLocation,
        idProcedure,
        idStaff,
        createdFrom,
        createdTo,
        source,
        inputValue,
    } = useAppSelector((store) => store.contact.search_filter);
    const defaultType = useMemo(
        () => ({
            keyword: "",
            created_from: 0,
            created_to: 0,
            source: "",
            procedure_id: 0,
            stage: "",
            location_id: 0,
            staff_id: 0,
        }),
        []
    );

    const [typeCheck, setTypeCheck] = useState(defaultType);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            stage ||
            idLocation ||
            idProcedure ||
            idStaff ||
            createdFrom ||
            createdTo ||
            source ||
            inputValue
        ) {
            setTypeCheck({
                keyword: inputValue || defaultType.keyword,
                created_from: createdFrom || defaultType.created_from,
                created_to: createdTo || defaultType.created_to,
                source: source || defaultType.source,
                procedure_id: idProcedure || defaultType.procedure_id,
                stage: stage || defaultType.stage,
                location_id: idLocation || defaultType.location_id,
                staff_id: idStaff || defaultType.staff_id,
            });
        }
    }, [
        stage,
        idLocation,
        idProcedure,
        idStaff,
        createdFrom,
        createdTo,
        source,
        defaultType,
        inputValue,
    ]);
    const onReset = () => {
        setLeadCheck([]);
    };

    const onselectLead = (array: number[]) => {
        const tempNewArray =
            array.length > 0 ? array.filter((i) => i !== undefined) : [];
        setLeadCheck(tempNewArray);
        setMemoryLeadCheck(tempNewArray);

        memoryCheckedItem = memoryLeadCheck;
    };

    console.log(memoryCheckedItem);

    const [showDelete, setShowDelete] = useState(false);
    const handleModalDelete = () => {
        setShowDelete((prev) => !prev);
    };

    const [showEdit, setShowEdit] = useState(false);
    const handleModalEdit = () => {
        setShowEdit((prev) => !prev);
    };

    const handleRemoveFilter = (type: keyof typeof typeCheck) => {
        switch (type) {
            case "created_from":
            case "created_to":
            case "location_id":
            case "procedure_id":
            case "staff_id":
                setTypeCheck({ ...typeCheck, [type]: 0 });
                dispatch(
                    doGetLeads({
                        ...typeCheck,
                        [type]: 0,
                    })
                );
                break;
            case "source":
            case "stage":
                setTypeCheck({ ...typeCheck, [type]: "" });
                dispatch(
                    doGetLeads({
                        ...typeCheck,
                        [type]: "",
                    })
                );
                break;
            default:
                break;
        }
    };
    return (
        <StyledMain className="main-content">
            <StyledHeader>
                <StyledTitle className="headerTitle"> Contacts </StyledTitle>
                {typeCheck.created_from !== 0 && typeCheck.created_to !== 0 && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("created_from")}
                            className="pointer"
                        />
                        <p>Type:Date</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.staff_id !== 0 && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("staff_id")}
                            className="pointer"
                        />
                        <p>Type:Staff</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.location_id !== 0 && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("location_id")}
                            className="pointer"
                        />
                        <p>Type:Location</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.procedure_id !== 0 && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("procedure_id")}
                            className="pointer"
                        />
                        <p>Type:Procedure</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.stage && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("stage")}
                            className="pointer"
                        />
                        <p>Type:Stage</p>
                    </StyledTypeCheck>
                )}
                {typeCheck.source && (
                    <StyledTypeCheck className="mobile">
                        <X
                            size={15}
                            onClick={() => handleRemoveFilter("source")}
                            className="pointer"
                        />
                        <p>Type:Source</p>
                    </StyledTypeCheck>
                )}
            </StyledHeader>
            <SidebarButton>
                {leadCheck.length > 0 ? (
                    <>
                        <StyledButton>
                            <p className="itemSelected">
                                {leadCheck.length} items selected
                            </p>
                            <Button
                                variant="outlined"
                                color="light"
                                className="exportBtn"
                            >
                                <span className="shareIcon">
                                    <Share size={18} />
                                </span>
                                Export
                            </Button>
                            <Button
                                variant="outlined"
                                color="light"
                                className="deleteBtn"
                                onClick={handleModalDelete}
                            >
                                <span className="deleteIcon">
                                    <Trash size={18} />
                                </span>
                                Delete
                            </Button>
                            <ModalDelete
                                show={showDelete}
                                onClose={handleModalDelete}
                                idLeadCheck={leadCheck}
                                onReset={onReset}
                            />
                            {leadCheck.length === 1 && (
                                <>
                                    <Button
                                        variant="outlined"
                                        color="light"
                                        className="editBtn"
                                        onClick={handleModalEdit}
                                    >
                                        <span className="editIcon">
                                            <Edit size={18} />
                                        </span>
                                        Edit
                                    </Button>
                                    <ModalEdit
                                        show={showEdit}
                                        onClose={handleModalEdit}
                                        idLeadCheck={leadCheck}
                                    />
                                </>
                            )}
                        </StyledButton>
                        <PersonalDetails
                            onSelect={onselectLead}
                            onReset={onReset}
                        />
                    </>
                ) : (
                    <>
                        <StyledButton className="noSelect">
                            <Button
                                variant="outlined"
                                color="light"
                                disabled
                                className="disabledExport"
                            >
                                <span className="shareIcon">
                                    <Share size={18} />
                                </span>
                                Export
                            </Button>
                        </StyledButton>
                        <PersonalDetails
                            onSelect={onselectLead}
                            onReset={onReset}
                            className="noCheck"
                        />
                    </>
                )}
            </SidebarButton>
        </StyledMain>
    );
};

export default Main;
