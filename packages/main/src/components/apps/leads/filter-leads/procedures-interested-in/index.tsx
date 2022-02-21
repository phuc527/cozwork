import { classic } from "@doar/shared/styled/colors";
import { FC } from "react";
import { Heart } from "react-feather";
import SideDropdown from "../side-dropdown";
import { StyledLabel, StyledLabelWrap } from "./style";

const ProcedureInterestedIn: FC = () => {
    const renderLabel = () => (
        <StyledLabelWrap>
            <div className="icon">
                <Heart size={18} color={classic.gray700} strokeWidth={2.5} />
            </div>
            <StyledLabel>Procedures interested in</StyledLabel>
        </StyledLabelWrap>
    );

    const renderContent = () => <div>abc</div>;
    return <SideDropdown title={renderLabel()} content={renderContent()} />;
};

export default ProcedureInterestedIn;
