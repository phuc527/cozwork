import styled from "@doar/shared/styled";

export const StyledForm = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    & .searchInput {
        border: none;
        &:focus {
            box-shadow: none;
        }
    }
`;
