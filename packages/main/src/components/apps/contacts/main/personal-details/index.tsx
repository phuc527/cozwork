import classNames from "classnames";
import { ChevronDown } from "react-feather";
import { useClickOutside } from "@doar/shared/hooks";
import noResult from "@doar/shared/images/no_result.png";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ModalEdit from "src/components/apps/contacts/main/modal-edit";
import { Image, Spinner } from "@doar/components";
import { FC, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import {
    doGetLeads,
    doGetAllLeads,
    doGetCheckAllPage,
} from "src/redux/slices/contacts/lead";
import { Lead } from "src/types/api/ticket";
import { CSSTransition } from "react-transition-group";
import moment from "moment";
import Pagination from "../../../settings/pagination";
import {
    StyledCheckBoxText,
    StyledMenuItem,
    StyledMenu,
    StyledDropdown,
    StyledCard,
    StyledCheckBox,
    StyledTable,
    StyledCardBody,
    StyledTd,
    StyledTdHeader,
    StyledWrap,
    StyledBadge,
    StyledLoadingWrap,
    StyledNoResults,
    StyledDropdownItem,
    StyledNameAndEmail,
} from "./style";

interface Props {
    isCheckedAllPage: boolean;
    isCheckedAllContacts: boolean;
    onPageLead: Lead[];
    onSelectAllContacts: (data: boolean) => void;
    onSelectAllPage: (data: boolean) => void;
}

export const HandleCheckBox: FC<Props> = ({
    isCheckedAllPage,
    onPageLead,

    isCheckedAllContacts,
    onSelectAllContacts,
    onSelectAllPage,
}) => {
    const activeMenu = "main";

    // const dispatch = useAppDispatch();
    const { receivingAllLeads } = useAppSelector((store) => store.contact.lead);
    const DropdownItem: FC = ({ children }) => {
        return (
            <>
                <StyledMenuItem>{children}</StyledMenuItem>
            </>
        );
    };
    const handleSelectAllContacts = () => {
        if (isCheckedAllContacts) {
            onSelectAllContacts(false);
        } else {
            onSelectAllContacts(true);
        }
    };
    const handleSelectAllPage = () => {
        if (isCheckedAllPage) {
            onSelectAllPage(false);
        } else {
            onSelectAllPage(true);
        }
    };

    return (
        <>
            <StyledDropdown>
                <CSSTransition
                    in={activeMenu === "main"}
                    timeout={0}
                    unmountOnExit
                >
                    <StyledMenu>
                        <StyledDropdownItem
                            onClick={handleSelectAllPage}
                            aria-hidden="true"
                            className={classNames({
                                disabled: receivingAllLeads,
                            })}
                        >
                            <DropdownItem>
                                <StyledCheckBox
                                    id="allSelect"
                                    name="allSelect"
                                    onChange={handleSelectAllPage}
                                    checked={isCheckedAllPage}
                                    className={classNames({
                                        disabled: receivingAllLeads,
                                    })}
                                />
                                <StyledCheckBoxText
                                    className={classNames({
                                        disabled: receivingAllLeads,
                                    })}
                                >
                                    Select page ({onPageLead.length})
                                </StyledCheckBoxText>
                            </DropdownItem>
                        </StyledDropdownItem>
                        <StyledDropdownItem
                            onClick={handleSelectAllContacts}
                            aria-hidden="true"
                            className={classNames({
                                disabled: receivingAllLeads,
                            })}
                        >
                            <DropdownItem>
                                <StyledCheckBox
                                    id="selectAllContact"
                                    name="selectAllContact"
                                    onChange={handleSelectAllContacts}
                                    checked={isCheckedAllContacts}
                                    className={classNames({
                                        disabled: receivingAllLeads,
                                    })}
                                />
                                <StyledCheckBoxText
                                    className={classNames({
                                        disabled: receivingAllLeads,
                                    })}
                                >
                                    Select all contacts
                                </StyledCheckBoxText>
                            </DropdownItem>
                        </StyledDropdownItem>
                    </StyledMenu>
                </CSSTransition>
            </StyledDropdown>
        </>
    );
};
interface IProps {
    onSelect: (array: number[]) => void;
    onReset: () => void;
    className?: string;
}

const PersonalDetails: FC<IProps> = ({ className, onSelect, onReset }) => {
    const dispatch = useAppDispatch();
    const [defaultLead, setDefaultLead] = useState<Lead[] | []>([]);
    const [isCheckedContact, setCheckedContact] = useState<boolean[]>([]);
    const [isCheckedAllContacts, setCheckedAllContacts] = useState(false);
    const [isChecked, setChecked] = useState<boolean[]>([]);
    const [isCheckedAllPage, setCheckedAllPage] = useState(false);

    const { loading, pagination, leads } = useAppSelector(
        (store) => store.contact.lead
    );
    const {
        stage,
        idLocation,
        inputValue,
        idProcedure,
        idStaff,
        createdFrom,
        createdTo,
        source,
    } = useAppSelector((store) => store.contact.search_filter);

    // get all list
    useEffect(() => {
        dispatch(
            doGetLeads({
                page: 1,
                limit: 25,
            })
        );
    }, [dispatch]);
    const onNextPage = () => {
        onReset();
        setCheckedAllPage(false);

        dispatch(
            doGetLeads({
                limit: pagination.limit,
                page: Number(pagination.currentPage) + 1,
                keyword: inputValue || null,
                location_id: idLocation || 0,
                stage: stage || null,
                procedure_id: idProcedure || 0,
                staff_id: idStaff || 0,
                created_from: createdFrom,
                created_to: createdTo,
                source: source || null,
            })
        );
    };
    const onPrevPage = () => {
        onReset();
        setCheckedAllPage(false);
        dispatch(
            doGetLeads({
                limit: pagination.limit,
                page: Number(pagination.currentPage) - 1,
                keyword: inputValue || null,
                location_id: idLocation || 0,
                stage: stage || null,
                procedure_id: idProcedure || 0,
                staff_id: idStaff || 0,
                created_from: createdFrom,
                created_to: createdTo,
                source: source || null,
            })
        );
    };

    useEffect(() => {
        if (leads) {
            const newLeads: Lead[] | null = leads;
            setChecked(newLeads.map(() => false));
            setDefaultLead(newLeads);
        }
    }, [leads]);

    const afterSelectPage = (array: boolean[]) => {
        const selectedLeads: number[] = [];

        array.forEach((i, index) => {
            if (i) {
                selectedLeads.push(defaultLead ? defaultLead[index]?.id : 0);
            }
        });
        onSelect(selectedLeads);
    };

    const afterSelectContacts = (array: boolean[], allLeads?: Lead[]) => {
        const selectedLeads: number[] = [];
        array.forEach((i, index) => {
            if (i) {
                selectedLeads.push(allLeads ? allLeads[index]?.id : 0);
            }
        });
        onSelect(selectedLeads);
    };

    const onSelectLeads = (index: number) => {
        const tempArr = [...isChecked];
        tempArr[index] = !isChecked[index];
        setChecked(tempArr);

        const isHasUnChecked = tempArr.find((i) => !i);
        if (isHasUnChecked === false) {
            setCheckedAllPage(false);
        }
        afterSelectPage(tempArr);
    };

    const onSelectAllLeads = () => {
        let tempArray: boolean[] = [];
        if (isCheckedAllPage) {
            tempArray = isChecked.map(() => false);
            setCheckedAllPage(false);
        } else {
            tempArray = isChecked.map(() => true);
            setCheckedAllContacts(false);
            setCheckedAllPage(true);
        }
        setChecked(tempArray);
        afterSelectPage(tempArray);
    };

    const [open, setOpen] = useState(false);
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    const containerRef = useClickOutside<HTMLUListElement>(onClose);

    const onSelectAllContacts = (data: boolean) => {
        let tempArrayContacts: boolean[] = [];
        if (data) {
            dispatch(
                doGetAllLeads({
                    select_all: true,
                    select: "id",
                    onSuccess: (allLeads: Lead[]) => {
                        const newAllLeads: Lead[] | null = allLeads;
                        setCheckedContact(newAllLeads.map(() => true));
                        tempArrayContacts = newAllLeads.map(() => true);
                        setCheckedAllContacts(true);
                        setCheckedAllPage(false);
                        setChecked(tempArrayContacts);
                        afterSelectContacts(tempArrayContacts, allLeads);
                    },
                })
            );
        } else {
            tempArrayContacts = isCheckedContact.map(() => false);
            setCheckedAllContacts(false);
            setChecked(tempArrayContacts);
            afterSelectContacts(tempArrayContacts);
        }
    };

    const onSelectAllPage = (data: boolean) => {
        let tempArrayPage: boolean[] = [];
        if (data) {
            tempArrayPage = isChecked.map(() => true);
            dispatch(
                doGetCheckAllPage({
                    index: Number(pagination.currentPage),
                    checkPage: true,
                })
            );
            setCheckedAllContacts(false);
            setCheckedAllPage(true);
        } else {
            dispatch(
                doGetCheckAllPage({
                    index: Number(pagination.currentPage),
                    checkPage: false,
                })
            );
            tempArrayPage = isChecked.map(() => false);
            setCheckedAllPage(false);
        }
        setChecked(tempArrayPage);
        afterSelectPage(tempArrayPage);
    };

    // hanldeModalEdit
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showEdit, setShowEdit] = useState(false);
    const [saveId, setSaveId] = useState<number>(0);

    const handleModalEdit = (data?: number) => {
        setShowEdit((prev) => !prev);
        if (data) {
            setSaveId(data);
        }
    };

    return (
        <>
            <StyledWrap className={className}>
                <ModalEdit
                    show={showEdit}
                    onClose={handleModalEdit}
                    idLeadCheck={[saveId]}
                />
                <StyledCard>
                    <StyledCardBody>
                        {loading ? (
                            <StyledLoadingWrap>
                                <Spinner color="primary" />
                            </StyledLoadingWrap>
                        ) : (
                            <>
                                <StyledTable hover>
                                    <thead>
                                        <tr>
                                            <StyledTdHeader>
                                                <ul
                                                    ref={containerRef}
                                                    style={{ display: "flex" }}
                                                >
                                                    <StyledCheckBox
                                                        id="allSelect"
                                                        name="allSelect"
                                                        className="allSelect"
                                                        onChange={
                                                            onSelectAllLeads
                                                        }
                                                        checked={
                                                            isCheckedAllPage
                                                        }
                                                    />
                                                    <ChevronDown
                                                        onClick={() =>
                                                            setOpen(!open)
                                                        }
                                                    />
                                                    {open && (
                                                        <HandleCheckBox
                                                            isCheckedAllPage={
                                                                isCheckedAllPage
                                                            }
                                                            onPageLead={
                                                                defaultLead
                                                            }
                                                            isCheckedAllContacts={
                                                                isCheckedAllContacts
                                                            }
                                                            onSelectAllContacts={
                                                                onSelectAllContacts
                                                            }
                                                            onSelectAllPage={
                                                                onSelectAllPage
                                                            }
                                                        />
                                                    )}
                                                </ul>
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                NAME
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                EMAIL
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                PHONE
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                STAGE
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                SOURCE
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                CREATED AT
                                            </StyledTdHeader>
                                        </tr>
                                    </thead>
                                    {defaultLead.length > 0 ? (
                                        <tbody>
                                            {defaultLead?.map((lead, index) => {
                                                return (
                                                    <tr
                                                        key={lead.id}
                                                        onClick={() =>
                                                            handleModalEdit(
                                                                lead.id
                                                            )
                                                        }
                                                        className={classNames({
                                                            checkHover:
                                                                isChecked[
                                                                    index
                                                                ],
                                                        })}
                                                    >
                                                        <StyledTd>
                                                            <StyledCheckBox
                                                                id={lead.id}
                                                                name={lead.id}
                                                                checked={
                                                                    isChecked[
                                                                        index
                                                                    ]
                                                                }
                                                                onChange={() =>
                                                                    onSelectLeads(
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <StyledNameAndEmail>
                                                                {
                                                                    lead.first_name
                                                                }{" "}
                                                                {lead.last_name}
                                                            </StyledNameAndEmail>
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <StyledNameAndEmail>
                                                                {lead.email}
                                                            </StyledNameAndEmail>
                                                        </StyledTd>

                                                        <StyledTd>
                                                            <p>{lead.phone}</p>
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <p>
                                                                <StyledBadge
                                                                    className={classNames(
                                                                        {
                                                                            new:
                                                                                lead.stage ===
                                                                                "new",
                                                                            estimated:
                                                                                lead.stage ===
                                                                                "estimated",
                                                                            manual_review:
                                                                                lead.stage ===
                                                                                "manual_review",
                                                                            qualified:
                                                                                lead.stage ===
                                                                                "qualified",
                                                                            scheduled:
                                                                                lead.stage ===
                                                                                "consult_request",
                                                                        }
                                                                    )}
                                                                >
                                                                    {lead.stage.toUpperCase()}
                                                                </StyledBadge>
                                                            </p>
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <p>{lead.source}</p>
                                                        </StyledTd>
                                                        <StyledTd>
                                                            <p>
                                                                {moment(
                                                                    lead.created_at
                                                                ).format(
                                                                    "dddd, MMMM Do YYYY, h:mm:ss a"
                                                                )}
                                                            </p>
                                                        </StyledTd>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    ) : (
                                        <></>
                                    )}
                                </StyledTable>
                                {defaultLead.length > 0 ? (
                                    <>
                                        <Pagination
                                            pagination={pagination}
                                            onNext={onNextPage}
                                            onPrev={onPrevPage}
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </StyledCardBody>
                </StyledCard>
                {defaultLead.length > 0 || loading ? (
                    <></>
                ) : (
                    <StyledNoResults>
                        <Image src={noResult} />
                        <h3 style={{ fontWeight: 500, color: "#1b2e4b" }}>
                            No results found
                        </h3>
                        <p style={{ margin: 0, color: "#7987a1" }}>
                            We could&#39;nt find what you&#39;re looking for
                        </p>
                        <p style={{ margin: 0, color: "#7987a1" }}>
                            Please try another way
                        </p>
                    </StyledNoResults>
                )}
            </StyledWrap>
        </>
    );
};

export default PersonalDetails;
