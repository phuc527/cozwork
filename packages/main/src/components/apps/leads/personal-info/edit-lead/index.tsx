import {
    Button,
    Col,
    Input,
    Modal,
    ModalBody,
    ModalClose,
    ModalFooter,
    ModalTitle,
    Row,
} from "@doar/components";
import { FC } from "react";
import { X } from "react-feather";
import { StyledLabel, StyledModalHeader, StyledSaveButton } from "./style";

interface IProps {
    show: boolean;
    onClose: () => void;
}
const EditLead: FC<IProps> = ({ show, onClose }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <StyledModalHeader>
                <ModalTitle>Editing lead</ModalTitle>
                <ModalClose onClose={onClose}>
                    <X />
                </ModalClose>
            </StyledModalHeader>
            <ModalBody>
                <Row>
                    <Col col>
                        <StyledLabel>First name</StyledLabel>
                        <Input
                            id="edit-lead-first-name"
                            name="edit-lead-first-name"
                            placeholder="Enter first name"
                        />
                    </Col>
                    <Col col>
                        <StyledLabel>Last name</StyledLabel>
                        <Input
                            id="edit-lead-last-name"
                            name="edit-lead-last-name"
                            placeholder="Enter last name"
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col col>
                        <StyledLabel>Email</StyledLabel>
                        <Input
                            id="edit-lead-email"
                            name="edit-lead-email"
                            placeholder="Enter email"
                        />
                    </Col>
                    <Col col>
                        <StyledLabel>Phone</StyledLabel>
                        <Input
                            id="edit-lead-phone"
                            name="edit-lead-phone"
                            placeholder="Enter phone"
                        />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button variant="contained" color="dark" onClick={onClose}>
                    Cancel
                </Button>
                <StyledSaveButton variant="contained">Save</StyledSaveButton>
            </ModalFooter>
        </Modal>
    );
};

export default EditLead;
