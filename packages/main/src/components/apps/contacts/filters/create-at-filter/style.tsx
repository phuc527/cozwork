import styled, { themeGet } from "@doar/shared/styled";
import { Input } from "@doar/components";

export const StyledError = styled.p`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
`

export const StyledItemSelect = styled.div`
    grid-area: 2 / 1 / 2 / 3;
    &.selectOpen {
        padding: 15px 0;
    }
    & .datePicker {
        padding: 10px 0;
    }
    & .textFont  {
        margin: 0;
        font-size: 14px;
    }
`

export const StyledForm = styled.form`
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    color: #566476;
    flex: 1;
    display: flex;
    margin-left: 10px;
    align-items: center;
    justify-content: space-between;
    input {
        &:hover,
        &:focus,
        &:active {
            border: none;
            box-shadow: none;
        }
    }
`;

export const StyledInput = styled(({ ...rest }) => <Input {...rest} />)`
    border-width: 0;
    background-color: transparent;
    font-size: inherit;
    padding: 0;
    color: ${themeGet("colors.text2")};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;
