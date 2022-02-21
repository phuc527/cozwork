import { FC, useState, useEffect } from "react";
import {
    Modal,
    ModalFooter,
    Avatar,
    AvatarInitial,
    Heading,
    Input,
    Textarea,
    Button,
    Spinner,
} from "@doar/components";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Lead } from "src/types/api/ticket";
import {
    StyledClose,
    StyledTitle,
    StyledDesc,
    StyledWrap,
    StyledLeft,
    StyledRight,
    StyledAvatar,
    StyledGroup,
    StyledModalBody,
    StyledHeader,
} from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
    idLeadCheck: number[];
}

const ModalEdit: FC<IProps> = ({ show, onClose, idLeadCheck }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useAppDispatch();
    const { loading, leads } = useAppSelector((store) => store.contact.lead);
    const [getLead, setGetLead] = useState<Lead[] | null>(null);
    useEffect(() => {
        if (leads) {
            setGetLead(leads?.filter((l) => l.id === idLeadCheck[0]));
        }
    }, [setGetLead, leads, idLeadCheck]);

    return (
        <Modal show={show} onClose={onClose}>
            <StyledHeader>
                <StyledClose onClose={onClose}>×</StyledClose>
                <StyledTitle>Edit Contact</StyledTitle>
                <StyledDesc>
                    You can add more information than what you see here, such as
                    address and birthday by clicking.
                </StyledDesc>
            </StyledHeader>
            <StyledModalBody>
                <StyledWrap>
                    {getLead &&
                        getLead.length > 0 &&
                        getLead.map((lead) => {
                            return (
                                <>
                                    <StyledLeft>
                                        <StyledAvatar>
                                            <Avatar size="xxl">
                                                <AvatarInitial
                                                    bg="gray700"
                                                    fontWeight={400}
                                                >
                                                    A
                                                </AvatarInitial>
                                            </Avatar>
                                        </StyledAvatar>
                                    </StyledLeft>
                                    <StyledRight>
                                        <Heading mb="10px">
                                            Personal Information
                                        </Heading>
                                        <StyledGroup>
                                            <Input
                                                name="edit-fname"
                                                id="edit-fname"
                                                placeholder="First Name"
                                                value={lead.first_name}
                                            />
                                        </StyledGroup>
                                        <StyledGroup>
                                            <Input
                                                name="edit-lname"
                                                id="edit-lname"
                                                placeholder="Last Name"
                                                value={lead.last_name}
                                            />
                                        </StyledGroup>
                                        <Heading mb="10px" mt="20px">
                                            Contact Information
                                        </Heading>
                                        <StyledGroup>
                                            <Input
                                                name="edit-phone"
                                                id="edit-phone"
                                                placeholder="Phone Number"
                                                value={lead.phone}
                                            />
                                        </StyledGroup>
                                        <StyledGroup>
                                            <Input
                                                name="edit-email"
                                                id="edit-email"
                                                placeholder="Email"
                                                value={lead.email}
                                            />
                                        </StyledGroup>
                                        <Heading mb="10px" mt="20px">
                                            Source
                                        </Heading>
                                        <StyledGroup>
                                            <Input
                                                name="edit-source"
                                                id="edit-source"
                                                placeholder="Source"
                                                value={lead.source}
                                            />
                                        </StyledGroup>
                                        <Heading mb="10px" mt="20px">
                                            Notes
                                        </Heading>
                                        <StyledGroup>
                                            <Textarea
                                                name="edit-notes"
                                                id="edit-notes"
                                                placeholder="Add notes"
                                            />
                                        </StyledGroup>
                                    </StyledRight>
                                </>
                            );
                        })}
                </StyledWrap>
            </StyledModalBody>
            <ModalFooter>
                <Button mb={["5px", 0]} disabled={loading}>
                    {loading ? (
                        <Spinner color="white" size="xs" />
                    ) : (
                        <>Edit contacts</>
                    )}
                </Button>
                <Button ml="5px" color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalEdit;
