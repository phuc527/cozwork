import styled, { themeGet } from "@doar/shared/styled";
import { Input } from "@doar/components";

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

export const StyledItemSelect = styled.div`
    grid-area: 2 / 1 / 2 / 3;
    &.selectOpen {
        padding: 15px 0;
    }
    & .dropdownToggle {
        width: 100%;
        justify-content: space-between;
    }
    & .dropdownMenu  {
        width: 100%;
    }
`

export const StyledInput = styled(({ ...rest }) => <Input {...rest} />)`
    border-width: 0;
    background-color: transparent;
    font-size: inherit;
    padding: 0;
    color: ${themeGet("colors.text2")};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;

export const StyledFilterStage = styled.div`
    position: relative;
    & .dropdownToggle {
        display: flex;
        align-items: center;
        & .selectedStage {
            height: 100%;
        }
        & .dropdownArrow {
            height: 22px;
            position: relative;
            right: -5px;
        }
        & .selectedStaffLocation {
            margin-top: 3px;
            margin-left: 5px;
        }
    }
    & .dropdownToggleNoLocation {
        display: flex;
        align-items: center;
        padding: 0;
        border: 0;
        font-size: 16px;
        color: #0168fa;
        font-weight: 500;
        & .selectedLocation {
            height: 20px;
        }
        & .dropdownArrow {
            height: 22px;
            position: relative;
            right: -5px;
        }
        & .selectedStaffLocation {
            margin-top: 3px;
            margin-left: 5px;
        }
    }
    & .dropdownMenu {
        right: 0;
        left: auto;
    }
    & .dropdownMenuStaff {
        left: auto;
    }
`;

export const StyledItemsWrapper = styled.div`
    overflow: auto;
    max-height: 200px;
`;
