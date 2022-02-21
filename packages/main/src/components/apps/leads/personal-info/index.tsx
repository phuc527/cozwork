import {
    Avatar,
    AvatarInitial,
    Button,
    Col,
    Container,
    Row,
    Spinner,
} from "@doar/components";
import { FC, useState } from "react";
import { Edit2, Trash } from "react-feather";
import { useAppSelector } from "src/redux/hooks";
import {
    StyledButtonsWrap,
    StyledInfo,
    StyledLabel,
    StyledNoInfo,
    StyledTitle,
    StyledWrap,
} from "./style";
import EditLead from "./edit-lead";

const PersonalInfo: FC = () => {
    const { loading, lead } = useAppSelector((store) => store.contact.lead);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showEdit, setShowEdit] = useState(false);

    return (
        <StyledWrap>
            <Container>
                {loading ? (
                    <div className="loading">
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        <StyledTitle>Basic information</StyledTitle>
                        <StyledButtonsWrap>
                            <Button
                                variant="outlined"
                                color="dark"
                                onClick={() => setShowEdit(true)}
                            >
                                <div className="icon">
                                    <Edit2 size={15} strokeWidth={2.5} />
                                </div>
                                Edit
                            </Button>
                            <Button variant="outlined" color="dark" ml="10px">
                                <div className="icon">
                                    <Trash size={15} strokeWidth={2.5} />
                                </div>
                                Delete
                            </Button>
                        </StyledButtonsWrap>
                        <Row>
                            <Col col={6} xs={12}>
                                <StyledLabel>First name</StyledLabel>
                                <StyledInfo>
                                    {lead?.first_name || (
                                        <StyledNoInfo>
                                            No first name
                                        </StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                            <Col col={6} xs={12}>
                                <StyledLabel>Last name</StyledLabel>
                                <StyledInfo>
                                    {lead?.last_name || (
                                        <StyledNoInfo>
                                            No last name
                                        </StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col col={6} xs={12}>
                                <StyledLabel>Email</StyledLabel>
                                <StyledInfo>
                                    {lead?.email || (
                                        <StyledNoInfo>No email</StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                            <Col col={6} xs={12}>
                                <StyledLabel>Phone</StyledLabel>
                                <StyledInfo>
                                    {lead?.phone || (
                                        <StyledNoInfo>No phone</StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col col={6} xs={12}>
                                <StyledLabel>Date of birth</StyledLabel>
                                <StyledInfo>
                                    {lead?.date_of_birth || (
                                        <StyledNoInfo>
                                            No date of birth
                                        </StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                            <Col col={6} xs={12}>
                                <StyledLabel>Email Opt-Out</StyledLabel>
                                <StyledInfo>
                                    {lead?.email_optout ? "Yes" : "No"}
                                </StyledInfo>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col col={6} xs={12}>
                                <StyledLabel>SMS Opt-Out</StyledLabel>
                                <StyledInfo>
                                    {lead?.sms_optout ? "Yes" : "No"}
                                </StyledInfo>
                            </Col>
                            <Col col={6} xs={12}>
                                <StyledLabel>Source</StyledLabel>
                                <StyledInfo>
                                    {lead?.source || (
                                        <StyledNoInfo>No source</StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col col={6} xs={12}>
                                <StyledLabel>Address 1</StyledLabel>
                                <StyledInfo>
                                    {lead?.address1 || (
                                        <StyledNoInfo>
                                            No address 1
                                        </StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                            <Col col={6} xs={12}>
                                <StyledLabel>Address 2</StyledLabel>
                                <StyledInfo>
                                    {lead?.address2 || (
                                        <StyledNoInfo>
                                            No address 2
                                        </StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                        </Row>
                        <hr />
                        <StyledTitle>Medical information</StyledTitle>
                        <Row>
                            <Col col={6} xs={12}>
                                <StyledLabel>Gender</StyledLabel>
                                <StyledInfo>
                                    {lead?.gender ? (
                                        `${lead.gender[0].toUpperCase()}${lead.gender.substring(
                                            1
                                        )}`
                                    ) : (
                                        <StyledNoInfo>No gender</StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                            <Col col={6} xs={12}>
                                <StyledLabel>Provider (staff)</StyledLabel>
                                {lead?.staff ? (
                                    <StyledInfo>
                                        <Avatar shape="circle" mr="10px">
                                            <AvatarInitial>
                                                {lead.staff.first_name
                                                    ? lead.staff.first_name[0]
                                                    : ""}
                                                {lead.staff.last_name
                                                    ? lead.staff.last_name[0]
                                                    : ""}
                                            </AvatarInitial>
                                        </Avatar>
                                        <div className="providerName">
                                            {lead.staff.first_name}{" "}
                                            {lead.staff.last_name}
                                        </div>
                                    </StyledInfo>
                                ) : (
                                    <StyledNoInfo>No provider</StyledNoInfo>
                                )}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col col={6} xs={12}>
                                <StyledLabel>Medical condition</StyledLabel>
                                <StyledInfo>
                                    {lead?.medical_condition || (
                                        <StyledNoInfo>
                                            No medical condition
                                        </StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                            <Col col={6} xs={12}>
                                <StyledLabel>Smoker</StyledLabel>
                                <StyledInfo>
                                    {lead?.smoker ? "Yes" : "No"}
                                </StyledInfo>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col col={6} xs={12}>
                                <StyledLabel>Weight</StyledLabel>
                                <StyledInfo>
                                    {lead?.weight || (
                                        <StyledNoInfo>No weight</StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                            <Col col={6} xs={12}>
                                <StyledLabel>BMI</StyledLabel>
                                <StyledInfo>
                                    {lead?.bmi || (
                                        <StyledNoInfo>No BMI</StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col col={6} xs={12}>
                                <StyledLabel>Height (feet)</StyledLabel>
                                <StyledInfo>
                                    {lead?.height_feet || (
                                        <StyledNoInfo>
                                            No height in feet
                                        </StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                            <Col col={6} xs={12}>
                                <StyledLabel>Height (inch)</StyledLabel>
                                <StyledInfo>
                                    {lead?.height_inch || (
                                        <StyledNoInfo>
                                            No height in inch
                                        </StyledNoInfo>
                                    )}
                                </StyledInfo>
                            </Col>
                        </Row>
                    </div>
                )}
                <EditLead show={showEdit} onClose={() => setShowEdit(false)} />
            </Container>
        </StyledWrap>
    );
};

export default PersonalInfo;
