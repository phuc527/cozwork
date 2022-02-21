import { FC } from "react";
import SearchForm from "../search-form";
import CreatedAt from "./created-at";
import Source from "./lead-source";
import Locations from "./locations";
import ProcedureInterestedIn from "./procedures-interested-in";
import ServiceProvider from "./service-provider";
import Stage from "./stage";
import {
    StyledFilterLeadTitle,
    StyledHr,
    StyledSearchWrap,
    StyledTitle,
    StyledWrap,
} from "./style";

const FilterLead: FC = () => {
    return (
        <StyledWrap>
            <StyledTitle>Filter Leads</StyledTitle>
            <StyledHr />
            <StyledSearchWrap>
                <SearchForm
                    placeholder="Search eg companie"
                    value=""
                    onSearch={() => {}}
                />
            </StyledSearchWrap>
            <StyledHr />
            <StyledFilterLeadTitle>Filter leads by</StyledFilterLeadTitle>
            <CreatedAt />
            <Source />
            <ProcedureInterestedIn />
            <Stage />
            <ServiceProvider />
            <Locations />
        </StyledWrap>
    );
};

export default FilterLead;
