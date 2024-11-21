// api/family.ts

export interface FamilyMember {
    userId: string;
    name: string;
    familyRole: string;
  }
  
  // 더미 데이터를 반환하는 함수
  export const fetchFamilyMembers = async (userId: string): Promise<FamilyMember[]> => {
    // 실제 요청이 들어오면 이 부분에서 fetch 또는 axios로 API 호출
    console.log(`Fetching family members for userId: ${userId}`);
  
    // 더미 데이터 반환
    return [
      { userId: '2', name: '김미현', familyRole: '엄마' },
      { userId: '3', name: '김철수', familyRole: '아빠' },
      { userId: '4', name: '김영희', familyRole: '동생' },
    ];
  };
  