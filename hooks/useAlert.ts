import { useCallback } from 'react';
import { Platform, Alert as RNAlert } from 'react-native';

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertOptions {
  title: string;
  message: string;
  buttons?: AlertButton[];
}

/**
 * Cross-platform alert hook that works on both web and native
 * On web: Uses custom implementation with browser confirm/alert
 * On native: Uses React Native Alert API
 */
export function useAlert() {
  const showAlert = useCallback((options: AlertOptions) => {
    if (Platform.OS === 'web') {
      // Web implementation using browser APIs
      const buttons = options.buttons || [{ text: 'OK' }];

      if (buttons.length === 1) {
        // Single button - use alert
        window.alert(`${options.title}\n\n${options.message}`);
        buttons[0].onPress?.();
      } else if (buttons.length === 2) {
        // Two buttons - use confirm
        const confirmMessage = `${options.title}\n\n${options.message}\n\n[${buttons[0].text}] or [${buttons[1].text}]`;
        const result = window.confirm(confirmMessage);

        if (result) {
          buttons[0].onPress?.();
        } else {
          buttons[1].onPress?.();
        }
      } else {
        // Multiple buttons - use prompt with options
        const buttonList = buttons.map((btn, idx) => `${idx + 1}. ${btn.text}`).join('\n');
        const message = `${options.title}\n\n${options.message}\n\n${buttonList}\n\nEnter number:`;
        const input = window.prompt(message);

        if (input) {
          const index = parseInt(input, 10) - 1;
          if (index >= 0 && index < buttons.length) {
            buttons[index].onPress?.();
          }
        }
      }
    } else {
      // Native platforms: Use React Native Alert API
      const buttons = options.buttons || [{ text: 'OK' }];
      RNAlert.alert(options.title, options.message, buttons);
    }
  }, []);

  return { showAlert };
}
