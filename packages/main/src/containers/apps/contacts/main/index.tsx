import { FC } from "react";
import { Col, Container, Row } from "@doar/components";
import { StyledWrap, StyledContent } from "./style";
import GroupFilter from "../../../../components/apps/contacts/filters";
import Main from "../../../../components/apps/contacts/main";

const Wrapper: FC = () => {
    return (
        <StyledContent>
            <StyledWrap>
                <Container className="container">
                    <Row className="rowHeight">
                        <Col
                            // col={12}
                            // sm={12}
                            // md={12}
                            // lg={2.5}
                            // xl={2.5}
                            className="colHeight"
                        >
                            <GroupFilter />
                        </Col>
                        <Col
                            // col={12}
                            // sm={12}
                            // md={12}
                            // lg={9.5}
                            // xl={9.5}
                            className="colMainHeight"
                        >
                            <Main />
                        </Col>
                    </Row>
                </Container>
            </StyledWrap>
        </StyledContent>
    );
};

export default Wrapper;
