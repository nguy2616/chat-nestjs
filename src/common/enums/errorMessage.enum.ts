export enum ErrorMsgEnum {
  NOT_FOUND = 'NOT_FOUND',
  EXISTED = 'EXISTED',
  INVALID_PASSWORD = 'INVALID_CREDENTIALS',
  SAME_USER = 'SENDER_AND_RECEIVER_ARE_SAME',
  CONVERSATION_CREATED = 'CONVERSATION_CREATED',
  NOT_IN_CONVERSATION = 'NOT_IN_CONVERSATION',
  CREATE_FAIL = 'CREATE_FAIL',
  TIME_FORMAT = 'openTime must be in HH:MM format and in 30-minute intervals',
  NOT_PROVIDER = 'USER_IS_NOT_PROVIDER',
  NOT_CUSTOMER = 'USER_IS_NOT_CUSTOMER',
  INVALID_HOUR = 'CLOSE_HOUR_MUST_BE_GREATER_THAN_OPEN_HOUR',
}
