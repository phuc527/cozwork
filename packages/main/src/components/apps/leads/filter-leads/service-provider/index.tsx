import { classic } from "@doar/shared/styled/colors";
import { FC } from "react";
import { User } from "react-feather";
import SideDropdown from "../side-dropdown";
import { StyledLabel, StyledLabelWrap } from "./style";

const ServiceProvider: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <User size={18} color={classic.gray700} strokeWidth={2.5} />
            </div>
            <StyledLabel>Service provider</StyledLabel>
        </StyledLabelWrap>
    );

    const renderContent = () => <div>abc</div>;
    return <SideDropdown title={renderLabel()} content={renderContent()} />;
};

export default ServiceProvider;
