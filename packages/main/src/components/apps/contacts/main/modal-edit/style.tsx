import styled, { device, themeGet } from "@doar/shared/styled";
import { ModalClose, ModalBody } from "@doar/components";

export const StyledClose = styled(({ ...rest }) => <ModalClose {...rest} />)`
    position: absolute;
    top: 15px;
    right: 20px;
`;

export const StyledModalBody = styled(({ ...rest }) => <ModalBody {...rest} />)`
    max-height: 400px;
    overflow: auto;
    padding: 27px;
    position: relative;
`;

export const StyledHeader = styled.div`
    padding: 15px;
`;

export const StyledTitle = styled.h5`
    font-size: 18px;
    margin-bottom: 20px;
    ${device.small} {
        font-size: 20px;
    }
`;

export const StyledDesc = styled.p`
    font-size: 13px;
    color: ${themeGet("colros.text3")};
    margin-bottom: 30px;
`;

export const StyledWrap = styled.div`
    margin-top: 15px;
    ${device.small} {
        display: flex;
    }
`;

export const StyledLeft = styled.div`
    ${device.small} {
        margin-right: 30px;
    }
`;

export const StyledRight = styled.div`
    flex: 1 1 auto;
`;

export const StyledAvatar = styled.div`
    position: relative;
    margin-bottom: 20px;
    display: inline-block;
`;

export const StyledGroup = styled.div`
    margin-bottom: 10px;
`;
