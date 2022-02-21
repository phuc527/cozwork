import { Button, ModalHeader } from "@doar/components";
import styled, { themeGet } from "@doar/shared/styled";

export const StyledModalHeader = styled(({ ...rest }) => (
    <ModalHeader {...rest} />
))`
    align-items: center;
`;

export const StyledSaveButton = styled(({ ...rest }) => <Button {...rest} />)`
    min-width: 60px;
    .icon {
        height: 20px;
    }
`;

export const StyledLabel = styled.div`
    color: ${themeGet("colors.gray600")};
`;
