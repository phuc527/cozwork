import styled, { themeGet } from "@doar/shared/styled";
import { Input } from "@doar/components";

export const StyledForm = styled.form`
    flex: 1;
    display: flex;
    margin-left: 12px;
    align-items: center;
    height: 30px;
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
