export interface Directory {
  post: string;
  roomNo: string;
  contactNo: string;
  department: string;
  id: number;
  name: string;
  privacy: string;
  status: string;
  color: string | null;
  childrens: Directory[];
  fullName?: string;
  designation?: string;
  contactList?: string[];
}

export interface Contact {
  fullName: string;
  designation: string;
  department: string;
  contactList: string;
  fax: string | null;
  officialContactList: string | null;
  residentialContactList: string | null;
  address: string | null;
  privacy: string;
  email: string | null;
  level: string;
  seqNo: string;
}
