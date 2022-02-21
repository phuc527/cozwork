import { Card, CardBody, Col, Row, Spinner } from "@doar/components";
import { Container } from "@doar/shared";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { getChannelAppsApi } from "src/api/channelApp/channelApp";
import { ChannelApp } from "src/types/api/app";
import ChannelList from "./list";
import { StyledListItem, StyledLoading, StyledWrap } from "./style";

const Channel: FC = () => {
    const { isLoading, data } = useQuery("fetchChannelApps", () =>
        getChannelAppsApi()
    );
    const [channelApp, setChannelApp] = useState<ChannelApp | null>(null);
    const history = useHistory();
    const handleSelectApp = (app: ChannelApp) => {
        history.push(`/settings/channels/${app.id}`);
        setChannelApp(app);
    };
    return (
        <StyledWrap>
            <Container>
                <Row>
                    <Col col={6} sm={6} md={6} lg={6} xl={6}>
                        <Card>
                            <CardBody>
                                {isLoading ? (
                                    <StyledLoading>
                                        <Spinner />
                                    </StyledLoading>
                                ) : (
                                    <ul>
                                        {data?.data?.map((app) => (
                                            <StyledListItem
                                                key={app.id}
                                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                                role="button"
                                                tabIndex={0}
                                                onClick={() =>
                                                    handleSelectApp(app)
                                                }
                                            >
                                                {app.app.name}
                                            </StyledListItem>
                                        ))}
                                    </ul>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                    {channelApp && (
                        <Col col={6} sm={6} md={6} lg={6} xl={6}>
                            <Card>
                                <CardBody>
                                    <ChannelList
                                        channelApp={channelApp}
                                        key={channelApp.id}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </StyledWrap>
    );
};

export default Channel;
