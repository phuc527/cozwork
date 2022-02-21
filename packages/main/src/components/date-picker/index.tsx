import { FC, useState, useEffect } from "react";
import classNames from "classnames";
import moment from "moment";
import { Input } from "@doar/components";
import { StyledDatePicker } from "./style";
import Calendar from "../calendar";

moment.suppressDeprecationWarnings = true;

interface IProps {
    name: string;
    id: string;
    placeholder?: string;
    getDate: (name: string, date: string) => void;
    currentDate?: Date;
    maxDate?: string;
    error?: string;
}

const DatePicker: FC<IProps> = ({
    name,
    id,
    placeholder,
    getDate,
    currentDate,
    maxDate,
    error
}) => {
    const [value, setValue] = useState<Date | Date[]>(new Date());
    const [show, setShow] = useState(false);
    const [errorInput, setErrorInput] = useState('');

    useEffect(() => {
        if (!currentDate) return;
        setValue(currentDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (error) {
            setErrorInput(error);
        }
    }, [error]);

    const dateChangeHandler = (date: Date | Date[]) => {
        setValue(date);
        getDate(name, moment(date.toString()).format("ll"));
    };

    const inputChangeHandler = () => {
        setValue(value);
    };

    const inputClickHandler = () => {
        setShow(true);
    };
    const inputBlurHandler = () => {
        setShow(false);
    };
    return (
        <StyledDatePicker $show={show}>
            <Input
                className={classNames({
                    'errorInput': errorInput,
                    'successInput': !errorInput
                })}
                name={name}
                id={id}
                placeholder={placeholder}
                value={moment(value.toString()).format("ll")}
                onChange={inputChangeHandler}
                onClick={inputClickHandler}
                onBlur={inputBlurHandler}
            />
            <Calendar value={value} onChange={dateChangeHandler} maxDate={maxDate} />
        </StyledDatePicker>
    );
};

export default DatePicker;
