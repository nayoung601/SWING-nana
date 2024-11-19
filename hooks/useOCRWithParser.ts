import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { parseOCRText } from '../app/utils/textParser';
import { PrescriptionInfo } from '../types/types';

const GOOGLE_VISION_API_KEY = Constants.expoConfig?.extra?.googleVisionApiKey || 'fallback-api-key';

export const useOCRWithParser = async (imageUri: string): Promise<PrescriptionInfo | null> => {
  try {
    let imageBase64: string;

    if (Platform.OS === 'web') {
      // 웹에서 Base64 추출
      if (imageUri.startsWith('data:image/')) {
        imageBase64 = imageUri.split(',')[1];
      } else {
        throw new Error('웹에서 지원되지 않는 이미지 형식입니다.');
      }
    } else {
      // 네이티브 환경에서 Base64 변환
      const { readAsStringAsync } = await import('expo-file-system');
      imageBase64 = await readAsStringAsync(imageUri, { encoding: 'base64' });
    }

    const body = JSON.stringify({
      requests: [
        {
          image: { content: imageBase64 },
          features: [{ type: 'TEXT_DETECTION' }],
        },
      ],
    });

    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OCR 요청 실패:', errorText);
      return null;
    }

    const data = await response.json();
    const rawText = data.responses[0]?.fullTextAnnotation?.text || '텍스트를 인식하지 못했습니다.';
    const textAnnotations = data.responses[0]?.textAnnotations;

    const medicinesWithPosition = textAnnotations?.slice(1).map((annotation: any) => {
      const { description, boundingPoly } = annotation;
      const vertices = boundingPoly?.vertices;
      if (vertices && vertices.length === 4) {
        const x = vertices[0].x || 0;
        const y = vertices[0].y || 0;
        const width = (vertices[1].x || x) - x;
        const height = (vertices[2].y || y) - y;
        return { description, position: { x, y, width, height } };
      }
      return null;
    }).filter((item: any) => item !== null);

    return parseOCRText(rawText, medicinesWithPosition);

  } catch (error) {
    console.error('OCR 실패:', error);
    return null;
  }
};
