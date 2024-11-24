export interface Medicine {
  medicineName: string; // 약물 이름
  dosagePerIntake: number; // 1회 복용량
  frequencyIntake: number; // 복용 횟수
  durationIntake: number; // 복용 기간
  morningTimebox: boolean; // 기본값 false
  lunchTimebox: boolean; // 기본값 false
  dinnerTimebox: boolean; // 기본값 false
  beforeSleepTimebox: boolean; // 기본값 false
}

// PrescriptionInfo 인터페이스 수정
export interface PrescriptionInfo {
  registrationDate: string; // 조제 날짜
  medicineList: Medicine[]; // Medicine 배열로 정의
  //type : string;            // 의약품 & 영양제 구분 필드 추가
}
