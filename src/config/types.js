
export type Action =
    { type: 'LOGGED_IN', data: { id: string; name: string; } }
  | { type: 'SKIPPED_LOGIN' }
  | { type: 'LOGGED_OUT' }
  | { type: 'INVALIDATE_TAB', tab: string }
  | { type: 'REQUEST_TOPICS', tab: string }
  | { type: 'RECEIVE_TOPICS_SUCCESS', tab: string , topics: Array<Object>, receivedAt: string}
  | { type: 'RECEIVE_TOPICS_FAILURE', tab: string , error: string}
  | { type: 'INVALIDATE_NODES'}
  | { type: 'REQUEST_NODES'}
  | { type: 'RECEIVE_NODES_SUCCESS', nodes: Array<Object>, receivedAt: string}
  | { type: 'RECEIVE_NODES_FAILURE', error: string }
  | { type: 'REQUEST_TOPIC', topic_id: string}
  | { type: 'RECEIVE_TOPIC_SUCCESS', topic: Object }
  | { type: 'RECEIVE_TOPIC_FAILURE', topic_id: string, error: string}
  ;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;

