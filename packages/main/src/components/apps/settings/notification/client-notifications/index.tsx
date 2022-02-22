// import { Button } from "@doar/components";
import { FC, useEffect, useState } from "react";
import { INotification } from "src/types/api/notifications";
import Title from "../../title";
import { SETTING } from "../constants";
import {
    StyledCard,
    StyledCardBody,
    StyledLabel,
    StyledLabelCheckBox,
    StyledLabelCheck,
    StyledText,
    StyledInput,
} from "../style";
import { StyledPlanInfo } from "./style";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Switch from "../switch-button/index";

interface IProps {
    estimateEmailNotification?: INotification | null;
    imageUploadLink?: INotification | null;
    onChangeNotification: (
        name: string,
        on: boolean,
        email: boolean,
        sms: boolean
    ) => void;
}

const ClientNotifications: FC<IProps> = ({
    estimateEmailNotification,
    imageUploadLink,
    onChangeNotification,
}) => {
    const [onStateEstimateLink, setOnStateEstimateLink] = useState(false);
    const [onStateEstimateLinkSms, setOnStateEstimateLinkSms] = useState(false);
    const [onStateEstimateLinkEmail, setOnStateEstimateLinkEmail] =
        useState(false);

    const [onStateImageUpload, setOnStateImageUpload] = useState(false);
    const [onStateImageUploadSms, setOnStateImageUploadSms] = useState(false);
    const [onStateImageUploadEmail, setOnStateImageUploadEmail] =
        useState(false);
    // const toggleEstimateLink = () => {
    //     setOnStateEstimateLink((o) => !o);
    //     onChangeNotification(
    //         SETTING.estimate_link,
    //         !onStateEstimateLink,
    //         onStateEstimateLinkEmail,
    //         onStateEstimateLinkSms
    //     );
    // };
    // const toggleImageUpload = () => {
    //     setOnStateImageUpload((o) => !o);
    //     onChangeNotification(
    //         SETTING.image_upload,
    //         !onStateImageUpload,
    //         onStateImageUploadEmail,
    //         onStateImageUploadSms
    //     );
    // };

    useEffect(() => {
        if (estimateEmailNotification) {
            const Estimate = estimateEmailNotification?.on
                ? estimateEmailNotification?.on
                : false;
            const EstimateSMS = estimateEmailNotification?.sms
                ? estimateEmailNotification?.sms
                : false;
            const EstimateEmail = estimateEmailNotification?.email
                ? estimateEmailNotification?.email
                : false;
            setOnStateEstimateLink(Estimate);
            setOnStateEstimateLinkSms(EstimateSMS);
            setOnStateEstimateLinkEmail(EstimateEmail);
        }
        if (imageUploadLink) {
            const UploadLinkSMS = imageUploadLink?.sms
                ? imageUploadLink?.sms
                : false;
            const UploadLinkEmail = imageUploadLink?.email
                ? imageUploadLink?.email
                : false;
            setOnStateImageUpload(imageUploadLink?.on);
            setOnStateImageUploadSms(UploadLinkSMS);
            setOnStateImageUploadEmail(UploadLinkEmail);
        }
    }, [estimateEmailNotification, imageUploadLink]);

    const onSave = (state: boolean) => {
        setOnStateEstimateLink(!state);
        onChangeNotification(
            SETTING.estimate_link,
            !onStateEstimateLink,
            onStateEstimateLinkEmail,
            onStateEstimateLinkSms
        );
    };

    const onSaveImage = (state: boolean) => {
        setOnStateImageUpload(!state);
        onChangeNotification(
            SETTING.image_upload,
            !onStateImageUpload,
            onStateImageUploadEmail,
            onStateImageUploadSms
        );
    };

    return (
        <>
            <Title>Client Notifications</Title>
            <StyledCard>
                <StyledCardBody>
                    <StyledLabel>Estimate email notifications</StyledLabel>
                    <StyledPlanInfo>
                        Send me notification when i receives an estimate
                    </StyledPlanInfo>
                    <StyledLabelCheck>
                        <StyledLabelCheckBox className="disabledCursor">
                            {/* <Button
                                className={onStateEstimateLink ? "on" : "off"}
                                onClick={() => toggleEstimateLink()}
                                color="light"
                                borderRadius="30px"
                                height="30px"
                                width="60px"
                                size="lg"
                            >
                                <span className="pin" />
                            </Button> */}

                            <Switch
                                state={onStateEstimateLink ? "on" : "off"}
                                onSwitch={(state: boolean) => onSave(state)}
                                width={60}
                                height={30}
                            />
                            <StyledText>Enable Notification </StyledText>
                        </StyledLabelCheckBox>

                        <StyledLabelCheckBox>
                            <StyledInput
                                type="checkbox"
                                disabled={!onStateEstimateLink}
                                checked={onStateEstimateLinkEmail}
                                onChange={(e) => {
                                    onChangeNotification(
                                        SETTING.estimate_link,
                                        onStateEstimateLink,
                                        e.target.checked,
                                        onStateEstimateLinkSms
                                    );
                                    setOnStateEstimateLinkEmail(
                                        e.target.checked
                                    );
                                }}
                            />
                            <StyledText>Send Via Email</StyledText>
                        </StyledLabelCheckBox>
                        <StyledLabelCheckBox>
                            <StyledInput
                                type="checkbox"
                                disabled={!onStateEstimateLink}
                                checked={onStateEstimateLinkSms}
                                onChange={(e) => {
                                    onChangeNotification(
                                        SETTING.estimate_link,
                                        onStateEstimateLink,
                                        onStateEstimateLinkEmail,
                                        e.target.checked
                                    );
                                    setOnStateEstimateLinkSms(e.target.checked);
                                }}
                            />
                            <StyledText>Send Via Text</StyledText>
                        </StyledLabelCheckBox>
                    </StyledLabelCheck>

                    <StyledLabel>Image upload link</StyledLabel>
                    <StyledPlanInfo>
                        Send me notification when i uploaded a image
                    </StyledPlanInfo>
                    <StyledLabelCheck>
                        <StyledLabelCheckBox>
                            {/* <Button
                                className={onStateImageUpload ? "on" : "off"}
                                onClick={() => toggleImageUpload()}
                                color="light"
                                borderRadius="25px"
                                height="25px"
                                width="60px"
                            >
                                <span className="pin" />
                            </Button> */}
                            <Switch
                                state={onStateImageUpload ? "on" : "off"}
                                onSwitch={(state: boolean) =>
                                    onSaveImage(state)
                                }
                                width={60}
                                height={30}
                            />

                            <StyledText>Enable Notification </StyledText>
                        </StyledLabelCheckBox>

                        <StyledLabelCheckBox>
                            <StyledInput
                                type="checkbox"
                                disabled={!onStateImageUpload}
                                checked={onStateImageUploadEmail}
                                onChange={(e) => {
                                    onChangeNotification(
                                        SETTING.image_upload,
                                        onStateImageUpload,
                                        e.target.checked,
                                        onStateImageUploadSms
                                    );
                                    setOnStateImageUploadEmail(
                                        e.target.checked
                                    );
                                }}
                            />
                            <StyledText>Send Via Email</StyledText>
                        </StyledLabelCheckBox>
                        <StyledLabelCheckBox>
                            <StyledInput
                                type="checkbox"
                                disabled={!onStateImageUpload}
                                checked={onStateImageUploadSms}
                                onChange={(e) => {
                                    onChangeNotification(
                                        SETTING.image_upload,
                                        onStateImageUpload,
                                        onStateImageUploadEmail,
                                        e.target.checked
                                    );
                                    setOnStateImageUploadSms(e.target.checked);
                                }}
                            />
                            <StyledText>Send Via Text</StyledText>
                        </StyledLabelCheckBox>
                    </StyledLabelCheck>
                </StyledCardBody>
            </StyledCard>
        </>
    );
};

export default ClientNotifications;
