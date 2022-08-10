export enum actionTypes {
    SET_REQUEST = "SET_REQUEST",
    SET_CONTENT = "SET_CONTENT",
    SET_TOKEN = "SET_TOKEN",
    SET_EXPANDED = "SET_EXPANDED",
    SET_ID_EDIT = "SET_ID_EDIT",
    ON_ERROR = "ON_ERROR"
}

export interface Content {
    name: string,
    tel: string,
    info: string,
    id: number,
}

export interface typeState {
    content: Content[];
    request: Content[];
    token: string;
    expanded: number | false;
    idEdit: number | false;
    error: boolean | null;
}

export type typeAction = SetRequest | SetContent | OnError | SetToken | SetExpanded | SetIdEdit

interface SetRequest {
    type: actionTypes.SET_REQUEST;
    payload: Content[];
}

interface SetContent {
    type: actionTypes.SET_CONTENT;
    payload: Content[];
}

interface SetToken {
    type: actionTypes.SET_TOKEN;
    payload: string;
}

interface SetExpanded {
    type: actionTypes.SET_EXPANDED;
    payload: number | false;
}

interface SetIdEdit {
    type: actionTypes.SET_ID_EDIT;
    payload: number | false;
}

interface OnError {
    type: actionTypes.ON_ERROR;
}
