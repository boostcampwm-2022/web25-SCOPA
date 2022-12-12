export interface MessageMetaDataType {
  with: string;
  lastCheckTime: string;
}

export interface MessageListType {
  messages: MessageMetaDataType[];
  lastPageConnectTime: string;
}

export interface SingleMessageType {
  from: string;
  content: string;
  time: string;
}
