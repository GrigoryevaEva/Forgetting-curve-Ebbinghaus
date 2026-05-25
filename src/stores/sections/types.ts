export interface ISection {
    id: string;
    name: string;
    color: string;
}

export interface IUpdateSectionPayload {
    name?: string;
    color?: string;
}

export interface ICreateSectionPayload {
    name: string;
    color: string;
}
