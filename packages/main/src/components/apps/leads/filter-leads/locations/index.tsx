import { classic } from "@doar/shared/styled/colors";
import { FC } from "react";
import { MapPin } from "react-feather";
import SideDropdown from "../side-dropdown";
import { StyledLabel, StyledLabelWrap } from "./style";

const Locations: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <MapPin size={18} color={classic.gray700} strokeWidth={2.5} />
            </div>
            <StyledLabel>Locations</StyledLabel>
        </StyledLabelWrap>
    );

    const renderContent = () => <div>abc</div>;
    return (
        <SideDropdown
            hasFullBorder
            title={renderLabel()}
            content={renderContent()}
        />
    );
};

export default Locations;
