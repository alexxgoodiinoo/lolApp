export interface Champ {
    status: string;
    data:   Datum[];
}

export interface Datum {
    id?:          string;
    name:        string;
    role:        string;
    abilities:   string[];
    region:      string;
    description: string;
    imagen:      string;
    createdAt?:   string;
    updateAt?:    string;
}