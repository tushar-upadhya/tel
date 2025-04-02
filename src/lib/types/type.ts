export interface Directory {
    id: number;
    name: string;
    post: string;
    roomNo: string;
    contactNo: string;
    department: string;
    privacy: "public" | "private";
    status: "active" | "inactive";
    color: string | null;
    childrens: Directory[];
    fullName?: string;
    designation?: string;
    contactList?: string[];
}

export interface Contact {
    id: number;
    fullName: string;
    designation: string;
    department: string;
    contactList: string[];
    fax: string | null;
    officialContactList: string[] | null;
    residentialContactList: string[] | null;
    address: string | null;
    privacy: "public" | "private";
    email: string | null;
    level: string;
    seqNo: string;
}
