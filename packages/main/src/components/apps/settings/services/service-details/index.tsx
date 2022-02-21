import { TabList, Tab, TabContent, TabPanel, Row, Col } from "@doar/components";
import { FC, useEffect } from "react";
import { ArrowLeftCircle } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doSetProcedure } from "src/redux/slices/settings/services/procedure";
import { doGetProcedureStaff } from "src/redux/slices/settings/services/procedureStaff";
import { doGetStaffs } from "src/redux/slices/settings/manage-users/active-staffs";
import Title from "../../title";
import DetailAddonsInformation from "./basic-details/addons";
import BasicInformation from "./basic-details/basic-information";
import { StyledTabWrap, StyledWrap, StyledBackArrow } from "./style";
import AddonsSetting from "./assistant-settings/addon-setting";
import Pricing from "./pricing";

const ServiceDetails: FC = () => {
    const dispatch = useAppDispatch();
    const { procedure } = useAppSelector((store) => ({
        procedure: store.setting.services.procedure.procedure,
    }));

    const onBack = () => {
        dispatch(doSetProcedure(null));
    };

    useEffect(() => {
        if (procedure) {
            dispatch(doGetProcedureStaff(procedure.id));
        }
    }, [dispatch, procedure]);

    useEffect(() => {
        dispatch(
            doGetStaffs({
                keyword: null,
            })
        );
    }, [dispatch]);

    return (
        <StyledWrap>
            <Title>
                <StyledBackArrow onClick={onBack}>
                    <ArrowLeftCircle size={26} />
                </StyledBackArrow>
                Service details
            </Title>
            <StyledTabWrap variation="line">
                <TabList>
                    <Tab>Basic Details</Tab>
                    <Tab>Pricing</Tab>
                    <Tab>Assistant Settings</Tab>
                </TabList>
                <TabContent>
                    <TabPanel>
                        <Row>
                            <Col col xs={12} sm={12} md={12} lg={12} xl={5}>
                                <BasicInformation />
                            </Col>
                            <Col col xs={12} sm={12} md={12} lg={12} xl={7}>
                                <DetailAddonsInformation />
                            </Col>
                        </Row>
                    </TabPanel>
                    <TabPanel>
                        <Pricing />
                    </TabPanel>
                    <TabPanel>
                        <Row>
                            <Col col xs={12} sm={12} md={12} lg={12} xl={5}>
                                <AddonsSetting />
                            </Col>
                        </Row>
                    </TabPanel>
                </TabContent>
            </StyledTabWrap>
        </StyledWrap>
    );
};

export default ServiceDetails;
