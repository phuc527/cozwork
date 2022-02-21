import { Input } from "@doar/components";
import styled, { css } from "@doar/shared/styled";

export const StyledFilterProcedure = styled.div`
    position: relative;
    & .dropdownToggle {
        display: flex;
        align-items: center;
        & .selectedProcedure {
            height: 20px;
        }
        & .dropdownArrow {
            height: 22px;
            position: relative;
            right: -5px;
        }
        & .selectedStaffProcedure {
            margin-top: 3px;
            margin-left: 5px;
        }
    }
    & .dropdownToggleNoProcedure {
        display: flex;
        align-items: center;
        padding: 0;
        border: 0;
        font-size: 16px;
        color: #0168fa;
        font-weight: 500;
        & .selectedProcedure {
            height: 20px;
        }
        & .dropdownArrow {
            height: 22px;
            position: relative;
            right: -5px;
        }
        & .selectedStaffProcedure {
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

export const StyledInputWrapper = styled.div`
    padding: 10px 5px;
    position: relative;
`;

export const StyledSearchInput = styled(({ ...rest }) => <Input {...rest} />)<{
    inputLoading: boolean;
}>`
    ${({ inputLoading }) =>
        inputLoading &&
        css`
            padding-right: 30px;
        `}
`;

export const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 15px;
    top: 18px;
`;

export const StyledItemsWrapper = styled.div`
    overflow: auto;
    max-height: 200px;
`;
