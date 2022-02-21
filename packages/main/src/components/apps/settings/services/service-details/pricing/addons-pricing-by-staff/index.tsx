import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Table,
} from "@doar/components";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { PRICING_TYPE } from "src/helpers/settings/services/constant";
import { useAppSelector } from "src/redux/hooks";
import {
    FormUpdateProcedureStaff,
    IAddonsPricing,
} from "src/types/api/service";
import { Staff } from "src/types/api/staff";
import SimpleSwitch from "../../../procedures-table/simple-switch";
import Duration from "../default-price/duration";
import PriceType from "../default-price/price-type";
import {
    StyledCard,
    StyledInputWrap,
    StyledNoPriceStaff,
    StyledTd,
    StyledTdHeader,
    StyledTitlePanel,
    StyledWrap,
} from "./style";

interface IProps {
    filterStaff: Staff | null;
}
const AddonsPricingByStaff: FC<IProps> = ({ filterStaff }) => {
    const methods = useFormContext<FormUpdateProcedureStaff>();
    const { register, reset, getValues, setValue, watch } = methods;

    const { procedureStaffs, staffs, procedureAddons } = useAppSelector(
        (store) => ({
            procedureStaffs:
                store.setting.services.procedureStaff.procedureStaffs,
            procedureAddons: store.setting.services.procedure.addons,
            staffs: store.setting.manage_users.activeStaffs.staffs,
        })
    );
    const [originalAddons, setOriginalAddons] = useState<IAddonsPricing[] | []>(
        []
    );

    useEffect(() => {
        if (procedureStaffs && staffs) {
            let activeAddons: { id: number; staffId: number }[] | [] = [];
            procedureStaffs.forEach((i) => {
                i.procedure_addons?.forEach((j) => {
                    activeAddons = [
                        ...activeAddons,
                        {
                            id: j.id,
                            staffId: i.staff_id,
                        },
                    ];
                });
            });

            let addons: IAddonsPricing[] | [] = [];
            staffs.forEach((staff) => {
                procedureAddons.forEach((addon) => {
                    addons = [
                        ...addons,
                        {
                            staffId: staff.id,
                            addonName: addon.name,
                            addonId: addon.id,
                            duration: addon.duration || 0,
                            discount: addon.discount || 0,
                            minPrice: addon.min_cost || 0,
                            maxPrice: addon.max_cost || 0,
                            type: addon.pricing_type || PRICING_TYPE.from,
                            enable: !!activeAddons.find(
                                (i) =>
                                    i.id === addon.id && i.staffId === staff.id
                            ),
                        },
                    ];
                });
            });

            setOriginalAddons(addons);

            reset({
                addons:
                    addons?.map((i) => ({
                        duration: i.duration,
                        discount: i.discount,
                        minPrice: i.minPrice,
                        maxPrice: i.maxPrice,
                        type: i.type,
                        staffId: i.staffId,
                        addonId: i.addonId,
                        enable: i.enable,
                    })) || [],
                procedures: getValues("procedures"),
            });
        }
    }, [reset, procedureAddons, procedureStaffs, staffs, getValues]);

    const onChangeType = (type: string, index: number) => {
        setValue(`addons.${index}.type`, type);
        if (type !== PRICING_TYPE.range) {
            setValue(`addons.${index}.maxPrice`, 0);
        } else
            setValue(
                `addons.${index}.maxPrice`,
                originalAddons[index].maxPrice
            );
    };

    return (
        <StyledWrap>
            <StyledTitlePanel>Addon pricing by staff</StyledTitlePanel>
            <StyledCard>
                <Table hover>
                    <thead>
                        <tr>
                            <StyledTdHeader className="before" />
                            <StyledTdHeader className="switch" />
                            <StyledTdHeader className="addonName">
                                ADDON NAME
                            </StyledTdHeader>
                            <StyledTdHeader>DURATION</StyledTdHeader>
                            <StyledTdHeader>TYPE</StyledTdHeader>
                            <StyledTdHeader>MIN PRICE</StyledTdHeader>
                            <StyledTdHeader>MAX PRICE</StyledTdHeader>
                            <StyledTdHeader>SPECIAL PRICE</StyledTdHeader>
                            <StyledTdHeader className="after" />
                        </tr>
                    </thead>
                    <tbody>
                        {originalAddons?.map((item, index) => {
                            return (
                                <tr
                                    key={`${item.addonId}-${item.staffId}`}
                                    className={classNames({
                                        disabled: !watch(
                                            `addons.${index}.enable`
                                        ),
                                        hidden:
                                            filterStaff?.id !== item.staffId,
                                    })}
                                >
                                    <StyledTd />
                                    <StyledTd className="switchBtn">
                                        <input
                                            hidden
                                            {...register(
                                                `addons.${index}.enable`
                                            )}
                                        />
                                        <SimpleSwitch
                                            state={
                                                watch(`addons.${index}.enable`)
                                                    ? "on"
                                                    : "off"
                                            }
                                            onSwitch={(state) =>
                                                setValue(
                                                    `addons.${index}.enable`,
                                                    state
                                                )
                                            }
                                        />
                                    </StyledTd>
                                    <StyledTd>{item.addonName}</StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <input
                                                hidden
                                                {...register(
                                                    `addons.${index}.duration`
                                                )}
                                            />
                                            <Duration
                                                value={watch(
                                                    `addons.${index}.duration`
                                                )}
                                                disabled={
                                                    !watch(
                                                        `addons.${index}.enable`
                                                    )
                                                }
                                                onChangeDuration={(duration) =>
                                                    setValue(
                                                        `addons.${index}.duration`,
                                                        duration
                                                    )
                                                }
                                            />
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <input
                                                hidden
                                                {...register(
                                                    `addons.${index}.type`
                                                )}
                                            />
                                            <PriceType
                                                value={watch(
                                                    `addons.${index}.type`
                                                )}
                                                disabled={
                                                    !watch(
                                                        `addons.${index}.enable`
                                                    )
                                                }
                                                onChangeType={(type) =>
                                                    onChangeType(type, index)
                                                }
                                            />
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <InputGroup>
                                                <InputGroupAddon dir="prepend">
                                                    <InputGroupText>
                                                        $
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="number"
                                                    id={`staff-${item.staffId}-min-price-addon-${item.addonId}`}
                                                    disabled={
                                                        !watch(
                                                            `addons.${index}.enable`
                                                        )
                                                    }
                                                    {...register(
                                                        `addons.${index}.minPrice`
                                                    )}
                                                />
                                            </InputGroup>
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <InputGroup>
                                                <InputGroupAddon dir="prepend">
                                                    <InputGroupText>
                                                        $
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="number"
                                                    id={`staff-${item.staffId}-max-price-addon-${item.addonId}`}
                                                    disabled={
                                                        watch(
                                                            `addons.${index}.type`
                                                        ) !==
                                                            PRICING_TYPE.range ||
                                                        !watch(
                                                            `addons.${index}.enable`
                                                        )
                                                    }
                                                    {...register(
                                                        `addons.${index}.maxPrice`
                                                    )}
                                                />
                                            </InputGroup>
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd>
                                        <StyledInputWrap>
                                            <InputGroup>
                                                <InputGroupAddon dir="prepend">
                                                    <InputGroupText>
                                                        $
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="number"
                                                    id={`staff-${item.staffId}-special-price-addon-${item.addonId}`}
                                                    disabled={
                                                        !watch(
                                                            `addons.${index}.enable`
                                                        )
                                                    }
                                                    {...register(
                                                        `addons.${index}.discount`
                                                    )}
                                                />
                                            </InputGroup>
                                        </StyledInputWrap>
                                    </StyledTd>
                                    <StyledTd />
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {/* In case no addons pricing for this staff */}
                {filterStaff &&
                originalAddons.filter((i) => i.staffId === filterStaff.id)
                    .length < 1 ? (
                    <StyledNoPriceStaff>
                        No addon pricing by{" "}
                        <b className="staffName">
                            {filterStaff?.first_name} {filterStaff?.last_name}
                        </b>{" "}
                        found.
                    </StyledNoPriceStaff>
                ) : (
                    ""
                )}
            </StyledCard>
        </StyledWrap>
    );
};

export default AddonsPricingByStaff;
