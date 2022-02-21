import { classic } from "@doar/shared/styled/colors";
import { FC } from "react";
import { Users } from "react-feather";
import SideDropdown from "../side-dropdown";
import { StyledLabel, StyledLabelWrap } from "./style";

const Source: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <Users size={18} color={classic.gray700} strokeWidth={2.5} />
            </div>
            <StyledLabel>Source</StyledLabel>
        </StyledLabelWrap>
    );

    const renderContent = () => <div>abc</div>;
    return <SideDropdown title={renderLabel()} content={renderContent()} />;
};

export default Source;
