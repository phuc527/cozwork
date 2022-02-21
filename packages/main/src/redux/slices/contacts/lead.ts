import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetLeadRequestParams } from "src/api/lead/lead";
import { Pagination } from "src/types/api/invoice";
import { Lead } from "../../../types/api/ticket";

export interface Source {
    source: string;
    bmi: string;
}

export interface CheckAllContactsPage {
    index: number;
    checkPage: boolean;
}

export interface ContactLeadsState {
    leads: Lead[] | null;
    allLeads: Lead[] | null;
    lead: Lead | null;
    source: Source[] | null;
    checkAllContactPage: CheckAllContactsPage | null;
    loading: boolean;
    receivingAllLeads: boolean;
    // create new array checked item
    memoryCheckedItem: number[] | null;
    pagination: Pagination;
}

const initialState: ContactLeadsState = {
    leads: null,
    lead: null,
    source: null,
    receivingAllLeads: false,
    allLeads: null,
    checkAllContactPage: null,
    // create new array to store checked item
    memoryCheckedItem: null,
    loading: false,
    pagination: {
        total: 0,
        currentPage: 1,
        limit: 25,
        from: 0,
        to: 0,
    },
};

const detailContactLeadSlice = createSlice({
    name: "contacts/lead",
    initialState,
    reducers: {
        doGetLeads(state, action: PayloadAction<GetLeadRequestParams>) {
            state.loading = true;
        },
        doGetLeadsSuccess(
            state,
            action: PayloadAction<{
                leads: Lead[];
                pagination: Pagination;
            }>
        ) {
            state.leads = action.payload.leads;
            state.loading = false;
            state.pagination = action.payload.pagination;
        },
        doGetAllLeads(
            state,
            action: PayloadAction<{
                select_all: boolean;
                select: string;
                onSuccess: (allLeads: Lead[]) => void;
            }>
        ) {
            state.receivingAllLeads = true;
        },
        doGetSourceLeads(state) {
            state.loading = true;
        },
        doGetSourceLeadsSuccess(
            state,
            action: PayloadAction<{ allSource: Source[] }>
        ) {
            state.source = action.payload.allSource;
            state.loading = false;
        },
        doGetAllLeadsSuccess(state) {
            state.receivingAllLeads = false;
        },
        doDeleteLeads(
            state,
            action: PayloadAction<{
                id: number;
                onSuccess: () => void;
            }>
        ) {
            state.loading = true;
        },
        doDeleteLeadsSuccess(state, action: PayloadAction<number>) {
            state.loading = false;
            state.leads =
                state.leads?.filter((i) => i.id !== action.payload) || null;
        },
        doGetLead(state, action: PayloadAction<number>) {
            state.loading = true;
        },
        doGetLeadSuccess(state, action: PayloadAction<Lead>) {
            state.loading = false;
            state.lead = action.payload;
        },
        doGetLeadFail(state) {
            state.loading = false;
        },
        doGetCheckAllPage(state, action: PayloadAction<CheckAllContactsPage>) {
            state.checkAllContactPage = action.payload;
        },
    },
});

export const {
    doGetLeads,
    doGetLeadsSuccess,
    doDeleteLeads,
    doDeleteLeadsSuccess,
    doGetAllLeads,
    doGetAllLeadsSuccess,
    doGetSourceLeads,
    doGetSourceLeadsSuccess,
    doGetLead,
    doGetLeadFail,
    doGetLeadSuccess,
    doGetCheckAllPage,
} = detailContactLeadSlice.actions;

export default detailContactLeadSlice.reducer;
