import type { TwitchExtensionAuthResponse, TwitchExtensionContextResponse } from '@/common/interfaces/twitch.interface';

declare global {
  interface Window {
    Twitch: {
      ext: {
        actions: {
          minimize: () => void;
        };
        configuration: {
          broadcaster: {
            content: string;
          };
          onChanged: (callback: () => void) => void;
          set: (segment: 'broadcaster', version: string, content: string) => void;
        };
        onAuthorized: (callback: (auth: TwitchExtensionAuthResponse) => void) => void;
        onContext: (callback: (context: TwitchExtensionContextResponse, changedContextProperties: string[]) => void) => void;
      };
    };
  }
}
