// types.ts

// 약물 위치 정보를 위한 Position 인터페이스 정의
export interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  // Medicine 인터페이스 수정
  export interface Medicine {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    position?: Position | null; // Position 타입 사용
  }
  
  // PrescriptionInfo 인터페이스 수정
  export interface PrescriptionInfo {
    prescription_date: string;
    datePosition?: Position | null; // datePosition 속성 추가
    medicineList: Medicine[];       // Medicine 배열로 정의
  }
  