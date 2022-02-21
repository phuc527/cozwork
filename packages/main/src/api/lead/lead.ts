import { Source } from "src/redux/slices/contacts/lead";
import { CommonPagination } from "src/types/api/common";
import { Lead } from "src/types/api/ticket";
import request from "src/utils/request";

export type GetLeadRequestParams = {
    email?: string;
    keyword?: string | null;
    location_id?: number;
    procedure_id?: number;
    staff_id?: number;
    created_from?: number;
    created_to?: number;
    source?: string | null;
    stage?: string | null;
    limit?: number;
    page?: number;
};

export const deleteLeadsApi = (id: number): Promise<unknown> =>
    request.delete(`api/leads/${id}`);

export const getLeadsApi = (
    params: GetLeadRequestParams | null = null
): Promise<CommonPagination<Lead>> =>
    request.get<CommonPagination<Lead>, CommonPagination<Lead>>("/api/leads", {
        params,
    });

export const getAllLeadsApi = (params: {
    select_all?: boolean;
    select?: string | null;
}): Promise<Lead> =>
    request.get<Lead, Lead>("/api/leads", {
        params,
    });

export const getDetailLeadsApi = (id: number): Promise<Lead> =>
    request.get<Lead, Lead>(`api/leads/${id}`);

export const getSourceLeadApi = (): Promise<Source> =>
    request.get<Source, Source>(`api/leads?group_by=source&select=source`);