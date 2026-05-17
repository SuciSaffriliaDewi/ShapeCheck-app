import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.shapecheck.proporsi',
  appName: 'ShapeCheck',
  webDir: 'www',
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
      resizeOnFullScreen: true
    }
  }
};

export default config;