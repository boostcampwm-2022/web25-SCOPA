export interface MessageMetaDataType {
  with: string;
  username: string;
  lastCheckTime: string;
}

export interface MessageDetailType {
  contents: SingleMessageType[];
  toUsername: string;
}

export interface SingleMessageType {
  from: string;
  content: string;
  createdAt: string;
}
