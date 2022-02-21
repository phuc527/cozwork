import { Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC } from "react";
import {
    Activity,
    ArrowLeftCircle,
    Calendar,
    File,
    Info,
    Mail,
    MessageSquare,
    Phone,
    Video,
} from "react-feather";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "src/redux/hooks";
import {
    StyledHeader,
    StyledMedia,
    StyledMediaWrap,
    StyledOption,
    StyledStatisticsWrap,
    StyledWrap,
} from "./style";

const LeadStatistics: FC = () => {
    const history = useHistory();
    const { loading, lead } = useAppSelector((store) => store.contact.lead);

    return (
        <StyledWrap>
            {loading ? (
                <div className="loading">
                    <Spinner />
                </div>
            ) : (
                <div>
                    <StyledHeader>
                        <div className="backArrow">
                            <ArrowLeftCircle
                                size={25}
                                strokeWidth={1.2}
                                color={classic.text2}
                                onClick={() => history.push("/contacts")}
                            />
                        </div>
                        <div className="leadInfo">
                            <div className="leadName">
                                {lead?.first_name} {lead?.last_name}
                            </div>
                            <div className="leadEmail">{lead?.email}</div>
                        </div>
                        <div className="nameIconWrap">
                            <div className="nameIcon">
                                <span className="nameInitial">
                                    {lead?.first_name ? lead.first_name[0] : ""}
                                    {lead?.last_name ? lead.last_name[0] : ""}
                                </span>
                            </div>
                        </div>
                    </StyledHeader>
                    <StyledMediaWrap>
                        <StyledMedia $color={classic.primary}>
                            <div className="button">
                                <div className="icon">
                                    <MessageSquare
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </div>
                            </div>
                            <div className="textMedia">Text</div>
                        </StyledMedia>
                        <StyledMedia $color="#5BC9CA">
                            <div className="button">
                                <div className="icon">
                                    <Phone
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </div>
                            </div>
                            <div className="textMedia">Call</div>
                        </StyledMedia>
                        <StyledMedia $color="#DE3175">
                            <div className="button">
                                <div className="icon">
                                    <Video
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </div>
                            </div>
                            <div className="textMedia">Video</div>
                        </StyledMedia>
                        <StyledMedia $color="#F59F3A">
                            <div className="button">
                                <div className="icon">
                                    <Mail
                                        strokeWidth={1.7}
                                        color="#fff"
                                        size={20}
                                    />
                                </div>
                            </div>
                            <div className="textMedia">Email</div>
                        </StyledMedia>
                    </StyledMediaWrap>
                    <StyledStatisticsWrap>
                        <StyledOption className="active">
                            <div className="icon">
                                <Info color={classic.text2} size={18} />
                            </div>
                            <div className="optionName">Info</div>
                            <div className="number">0</div>
                        </StyledOption>
                        <StyledOption>
                            <div className="icon">
                                <Activity color={classic.text2} size={18} />
                            </div>
                            <div className="optionName">Activity</div>
                            <div className="number">0</div>
                        </StyledOption>
                        <StyledOption>
                            <div className="icon">
                                <MessageSquare
                                    color={classic.text2}
                                    size={18}
                                />
                            </div>
                            <div className="optionName">Conversations</div>
                            <div className="number">0</div>
                        </StyledOption>
                        <StyledOption>
                            <div className="icon">
                                <File color={classic.text2} size={18} />
                            </div>
                            <div className="optionName">Files</div>
                            <div className="number">0</div>
                        </StyledOption>
                        <StyledOption>
                            <div className="icon">
                                <Calendar color={classic.text2} size={18} />
                            </div>
                            <div className="optionName">Appointments</div>
                            <div className="number">0</div>
                        </StyledOption>
                    </StyledStatisticsWrap>
                </div>
            )}
        </StyledWrap>
    );
};

export default LeadStatistics;
