import axios from 'axios';

export const fetchMedications = async (date, userId) => {
  // 실제 API 요청 예시 코드 (백엔드 준비 후 활성화)
  /*
  try {
    const response = await axios.get(`http://localhost:8080/api/medications`, {
      params: { date, userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching medications:', error);
    return [];
  }
  */

  // 현재는 예시 데이터를 반환
  if (date === '2024-11-10') {
    return [
      { id: 1, name: '환절기 감기약', image: 'https://via.placeholder.com/50', time: '아침' },
      { id: 2, name: '오전 영양제', image: 'https://via.placeholder.com/50', time: '오전' },
      { id: 3, name: '저녁 영양제', image: 'https://via.placeholder.com/50', time: '저녁' },
    ];
  } else if (date === '2024-11-11') {
    return [
      { id: 4, name: '비타민C', image: 'https://via.placeholder.com/50', time: '아침' },
      { id: 5, name: '칼슘 영양제', image: 'https://via.placeholder.com/50', time: '점심' },
      { id: 6, name: '저녁 소화제', image: 'https://via.placeholder.com/50', time: '저녁' },
    ];
  } else {
    return []; // 다른 날짜에는 빈 배열을 반환
  }
};
