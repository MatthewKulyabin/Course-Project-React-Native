import * as Font from 'expo-font';

export async function bootstrap() {
	await Font.loadAsync({
		'code-black': require('../assets/fonts/SourceCodePro-Black.ttf'),
		'code-bold': require('../assets/fonts/SourceCodePro-Bold.ttf'),
		'code-medium': require('../assets/fonts/SourceCodePro-Medium.ttf'),
	});
};
