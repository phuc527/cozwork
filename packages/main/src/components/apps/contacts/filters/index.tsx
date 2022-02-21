import classNames from "classnames";
import { FC, useState } from "react";
import SearchForm from "src/components/apps/contacts/filters/search-form";
import { Calendar, CheckSquare, Users, MapPin, Search, User, Heart } from "react-feather";
import LocationsFilter from "src/components/apps/contacts/filters/locations-filter";
import CreateAtFilter from "src/components/apps/contacts/filters/create-at-filter";
import SourceFilter from "src/components/apps/contacts/filters/source-filter";
import ProcedureInterestedInFilter from "src/components/apps/contacts/filters/procedure-interested-in-filter";
import StageFilter from "src/components/apps/contacts/filters/stage-filter";
import ServiceProviderFilter from "src/components/apps/contacts/filters/service-provider-filter";
import { StyledSidebar, StyledGroup, StyledBodyFilter, StyledItemFilter, StyledTitle, StyledTitleFilterBy } from "./style";

const GroupFilter: FC = () => {
    const [openCreateAt, setOpenCreateAt] = useState(false)
    const [openStage, setOpenStage] = useState(false)
    const [openProcedureInterestedIn, setOpenProcedureInterestedIn] = useState(false)
    const [openLocations, setOpenLocations] = useState(false)
    const [openSource, setOpenSource] = useState(false)
    const [openServiceProvider, setOpenServiceProvider] = useState(false)

    const handleSelectFilter = (data: boolean, name: string) => {
        switch (name) {
            case 'create_at':
                setOpenCreateAt(data)
                break;
            case 'stage':
                setOpenStage(data)
                break;
            case 'service_provider':
                setOpenServiceProvider(data)
                break;
            case 'procedure_interested_in':
                setOpenProcedureInterestedIn(data)
                break;
            case 'locations':
                setOpenLocations(data)
                break;
            case 'source':
                setOpenSource(data)
                break;
            default: break;
        }
    }
    return (
        <StyledGroup>
            <StyledSidebar className="sidebar">
                <StyledTitle>Filter Contacts</StyledTitle>
                <StyledBodyFilter>
                    <StyledItemFilter>
                        <Search className="filter" color="#c0ccda" size={24} />
                        <SearchForm />
                    </StyledItemFilter>
                    <StyledTitleFilterBy>FILTER CONTACTS BY</StyledTitleFilterBy>
                    {/* Create at */}
                    <StyledItemFilter className={classNames({
                        "selectFilter": openCreateAt
                    })} >
                        <Calendar className={classNames({
                            "filter": !openCreateAt,
                            "selectFilter": openCreateAt
                        })} size={18} />
                        <CreateAtFilter selectFilter={handleSelectFilter} openFilter={openCreateAt} />
                    </StyledItemFilter>

                    {/* Source */}
                    <StyledItemFilter className={classNames({
                        "selectFilter": openSource
                    })} >
                        <Users className={classNames({
                            "filter": !openSource,
                            "selectFilter": openSource
                        })} size={18} />
                        <SourceFilter selectFilter={handleSelectFilter} openFilter={openSource} />
                    </StyledItemFilter>

                    {/* Procedure Interested In */}
                    <StyledItemFilter className={classNames({
                        "selectFilter": openProcedureInterestedIn
                    })} >
                        <Heart className={classNames({
                            "filter": !openProcedureInterestedIn,
                            "selectFilter": openProcedureInterestedIn
                        })} size={18} />
                        <ProcedureInterestedInFilter selectFilter={handleSelectFilter} openFilter={openProcedureInterestedIn} />
                    </StyledItemFilter>

                    {/* Stage */}
                    <StyledItemFilter className={classNames({
                        "selectFilter": openStage
                    })} >
                        <CheckSquare className={classNames({
                            "filter": !openStage,
                            "selectFilter": openStage
                        })} size={18} />
                        <StageFilter selectFilter={handleSelectFilter} openFilter={openStage} />
                    </StyledItemFilter>

                    {/* Service Provider */}
                    <StyledItemFilter className={classNames({
                        "selectFilter": openServiceProvider
                    })}  >
                        <User className={classNames({
                            "filter": !openServiceProvider,
                            "selectFilter": openServiceProvider
                        })} size={18} />
                        <ServiceProviderFilter selectFilter={handleSelectFilter} openFilter={openServiceProvider} />
                    </StyledItemFilter>

                    {/* Locations */}
                    <StyledItemFilter className={classNames({
                        "selectFilter": openLocations
                    })} >
                        <MapPin className={classNames({
                            "filter": !openLocations,
                            "selectFilter": openLocations
                        })} size={18} />
                        <LocationsFilter selectFilter={handleSelectFilter} openFilter={openLocations} />
                    </StyledItemFilter>

                </StyledBodyFilter>
            </StyledSidebar>
        </StyledGroup>
    );
};

export default GroupFilter;
