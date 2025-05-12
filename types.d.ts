
type Option = 'First option' | 'Second option' | 'Third option';

type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE' | 'RELOAD';

type EventPayloadMapping = {
  ping: string;
  changeView: View;
  sendFrameAction: FrameWindowAction;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {

    subscribeChangeView: (
      callback: (view: View) => void
    ) => UnsubscribeFunction;
    sendFrameAction: (payload: FrameWindowAction) => void;
    ping: () => Promise<string>;
  };
}
