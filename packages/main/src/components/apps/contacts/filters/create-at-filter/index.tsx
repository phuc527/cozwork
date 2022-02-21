import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { ChevronDown, ChevronRight } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetLeads } from "src/redux/slices/contacts/lead";
import moment from "moment";
import DatePicker from "src/components/date-picker";
import { StyledForm, StyledItemSelect, StyledError } from "./style";

interface Props {
    selectFilter: (data: boolean, name: string) => void;
    openFilter: boolean;
}
const CreateAtFilter: FC<Props> = ({
    selectFilter,
    openFilter
}) => {
    const dispatch = useAppDispatch();
    const { idLocation, inputValue, idProcedure, idStaff, stage, source } = useAppSelector(store => store.contact.search_filter);
    const [currentDate] = useState<{ start: Date; end: Date }>({
        start: new Date(),
        end: new Date(),
    });
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        createStartDate: "",
        createEndDate: "",
    });

    useEffect(() => {
        setOpen(openFilter)
    }, [openFilter])

    useEffect(() => {
        setValues((prev) => {
            return {
                ...prev,
                createStartDate: moment(currentDate.start).format(
                    "YYYY-MM-DD"
                ),
                createEndDate: moment(currentDate.end).format(
                    "YYYY-MM-DD"
                ),
            };
        });
    }, [currentDate]);

    const getDate = (name: string, date: string) => {
        const dateFormat = moment(date).format(
            "YYYY-MM-DD"
        )
        setValues((prev) => {
            return {
                ...prev,
                [name]: dateFormat,
            };
        });

        if (name === 'createStartDate') {
            if (Date.parse(dateFormat) / 1000 > Date.parse(values.createEndDate) / 1000) {
                setError('Date from')
            } else {
                setError('')
            }
            dispatch(doGetLeads({
                ...(dateFormat && {
                    created_from: Date.parse(dateFormat) / 1000,
                    created_to: Date.parse(values.createEndDate) / 1000
                }),
                source: source || null,
                stage: stage || null,
                location_id: idLocation || 0,
                keyword: inputValue || null,
                procedure_id: idProcedure || 0,
                staff_id: idStaff || 0
            }))
        } else {
            if (Date.parse(dateFormat) / 1000 < Date.parse(values.createEndDate) / 1000) {
                setError('Date to')
            } else {
                setError('')
            }
            dispatch(doGetLeads({
                ...(dateFormat && {
                    created_from: Date.parse(values.createStartDate) / 1000,
                    created_to: Date.parse(dateFormat) / 1000
                }),
                source: source || null,
                stage: stage || null,
                location_id: idLocation || 0,
                keyword: inputValue || null,
                procedure_id: idProcedure || 0,
                staff_id: idStaff || 0
            }))

        }

    }
    return (
        <>
            <StyledForm onClick={() => {
                setOpen(!open)
                selectFilter(!open, 'create_at')
            }}>
                Created at
                {open ? <ChevronRight onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'create_at')
                }} size={20} /> : <ChevronDown onClick={() => {
                    setOpen(!open)
                    selectFilter(!open, 'create_at')
                }} size={20} />}
            </StyledForm>
            <StyledItemSelect className={classNames({
                'selectOpen': open
            })}>
                {
                    open && (
                        <>
                            <p className="textFont">From</p>
                            <div className="datePicker">
                                <DatePicker
                                    error={error === 'Date from' ? error : ''}
                                    maxDate="maxStartDate"
                                    id="createStartDate"
                                    name="createStartDate"
                                    placeholder="Select Date"
                                    getDate={getDate}
                                    currentDate={new Date(values.createStartDate)}
                                />
                                {error === 'Date from' && (<StyledError>Date From must be smaller Date To</StyledError>)}
                            </div>
                            <p className="textFont">To</p>
                            <div className="datePicker">
                                <DatePicker
                                    error={error === 'Date to' ? error : ''}
                                    maxDate="maxEndDate"
                                    id="createEndDate"
                                    name="createEndDate"
                                    placeholder="Select Date"
                                    getDate={getDate}
                                    currentDate={new Date(values.createEndDate)}
                                />
                                {error === 'Date to' && (<StyledError>Date From must be bigger Date To</StyledError>)}
                            </div>
                        </>
                    )
                }
            </StyledItemSelect>
        </>
    );
};

export default CreateAtFilter;
