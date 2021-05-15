import * as Font from 'expo-font';
import { DB } from './db';

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'code-black': require('../assets/fonts/SourceCodePro-Black.ttf'),
      'code-bold': require('../assets/fonts/SourceCodePro-Bold.ttf'),
      'code-medium': require('../assets/fonts/SourceCodePro-Medium.ttf'),
    });
    await DB.init();
    console.log('Database started...');
  } catch (e) {
    console.log('Error: ', e);
  }
}
