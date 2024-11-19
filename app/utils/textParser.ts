import { PrescriptionInfo, Medicine } from '../../types/types';

export const parseOCRText = (text: string, medicinesWithPosition: any[]): PrescriptionInfo => {
  const medicines: Medicine[] = [];
  let prescriptionDate = "";

  try {
    // 텍스트 정제
    text = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ');

    // 조제 날짜 추출
    const dateMatches = text.match(/\b(\d{4}-\d{2}-\d{2})\b/g);
    const nextVisitDateMatch = text.match(/다음내방일\s*[\n\s]*(\d{4}-\d{2}-\d{2})/);
    const nextVisitDate = nextVisitDateMatch ? nextVisitDateMatch[1] : "";
    if (dateMatches) {
      prescriptionDate = dateMatches.find(date => date !== nextVisitDate) || "";
    }

    // 날짜 위치 찾기
    const datePosition = medicinesWithPosition.find((item: any) =>
      item.description.includes(prescriptionDate)
    )?.position || null;

    // 약물명 및 복약 정보 패턴 설정
    const medicinePattern = /([가-힣A-Za-z]+(?:정|캡슐|포|시럽)[0-9]*(?:mg|g)?)(.*?)((?=[가-힣A-Za-z]+(?:정|캡슐|포|시럽))|$)/g;

    // 약물 블록 추출
    let match;
    while ((match = medicinePattern.exec(text)) !== null) {
      const [_, name, details] = match;

      // "환자정", "병원정", "코팅정" 제외
      if (name === "환자정" || name === "병원정" || name === "필름코팅정") continue;

      // 약물 이름 위치 정보 찾기
      const namePosition = medicinesWithPosition.find(
        (med: any) => med.description.includes(name.trim())
      )?.position || null;

      // 복약 정보 블록 위치 찾기
      const dosageFrequencyDuration = details.match(/(\d+(정|캡슐|포|mL)씩\d+회\d+일분|\d+일치)/);
      const dosageFrequencyDurationText = dosageFrequencyDuration ? dosageFrequencyDuration[0] : "";
      const blockPosition = medicinesWithPosition.find(
        (med: any) => med.description.includes(dosageFrequencyDurationText)
      )?.position || null;

      const medicine: Medicine = {
        name: name.trim(),
        dosage: "",
        frequency: "",
        duration: "",
        position: namePosition
      };

      // 세부 정보에서 투약량, 횟수, 기간 추출
      const dosageMatch = details.match(/(\d+(정|캡슐|포|mL)씩)/);
      if (dosageMatch) medicine.dosage = dosageMatch[1].trim();

      const frequencyMatch = details.match(/(\d+회)/);
      if (frequencyMatch) medicine.frequency = frequencyMatch[1].trim();

      const durationMatch = details.match(/(\d+일분|\d+일치)/);
      if (durationMatch) medicine.duration = durationMatch[1].trim();

      medicine.position = blockPosition; // 복약 블록 위치 추가
      medicines.push(medicine);
    }

    const result = {
      prescription_date: prescriptionDate,
      datePosition: datePosition, // 날짜 위치 추가
      medicineList: medicines,
    };
    console.log("전처리 결과:", JSON.stringify(result, null, 2));

    return result;

  } catch (error) {
    console.error("텍스트 분석 중 오류 발생:", error);
    return { prescription_date: "", medicineList: [] };
  }
};
