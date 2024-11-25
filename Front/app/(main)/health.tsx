// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Text, Alert } from "react-native";
// import { Calendar } from "react-native-calendars";
// import BloodPressure from "@/components/BloodPressure"; // 혈압 컴포넌트
// import BloodSugar from "@/components/BloodSugar"; // 혈당 컴포넌트
// import axios from "axios";

// const HealthCalendar = ({ userId = 1 }) => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [calendarData, setCalendarData] = useState([]);
//   const [markedDates, setMarkedDates] = useState({});
//   const [currentDate, setCurrentDate] = useState(new Date());

//   // 현재 연도와 월을 포맷팅하는 함수
//   const formatDate = (date) => {
//     return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
//   };

//   // 데이터 가져오기
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const formattedDate = formatDate(currentDate);
//         const response = await axios.get(`http://localhost:8080/api/calendar/${userId}`, {
//           params: { date: formattedDate },
//           withCredentials: true,
//         });

//         const fetchedData = Array.isArray(response.data) ? response.data : [];
//         setCalendarData(fetchedData);

//         // 받아온 데이터를 기반으로 markedDates 설정
//         const marks = {};
//         fetchedData.forEach((item) => {
//           item.target.forEach((target) => {
//             marks[target.targetMonth] = {
//               marked: true,
//               dotColor: "#735BF2", // 점 색상
//             };
//           });
//         });
//         setMarkedDates(marks);
//       } catch (error) {
//         console.error("데이터 가져오기 실패: ", error);
//         Alert.alert("데이터 오류", "캘린더 데이터를 가져오는 중 문제가 발생했습니다.");
//       }
//     };

//     fetchData();
//   }, [userId, currentDate]);

//   // 날짜 선택 시 데이터 표시
//   const handleDayPress = (day) => {
//     setSelectedDate(day.dateString);

//     const selectedEvents = calendarData.filter((item) =>
//       item.target.some((target) => target.targetMonth === day.dateString)
//     );

//     if (selectedEvents.length > 0) {
//       const eventTitles = selectedEvents.map((event) => event.calendarTitle).join(", ");
//       Alert.alert("선택된 날짜 이벤트", `이벤트: ${eventTitles}`);
//     } else {
//       Alert.alert("선택된 날짜 이벤트", "해당 날짜에는 이벤트가 없습니다.");
//     }
//   };

//   // 다음 달로 이동
//   const nextMonth = () => {
//     const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
//     setCurrentDate(next);
//   };

//   // 이전 달로 이동
//   const prevMonth = () => {
//     const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
//     setCurrentDate(prev);
//   };

//   return (
//     <View style={styles.container}>
//       {/* 헤더 */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>
//           {currentDate.toLocaleString("ko-KR", { year: "numeric", month: "long" })}
//         </Text>
//       </View>

//       {/* 달력 */}
//       <Calendar
//         style={styles.calendar}
//         theme={{
//           backgroundColor: "#FFFFFF",
//           calendarBackground: "#FFFFFF",
//           textSectionTitleColor: "#8F9BB3",
//           selectedDayBackgroundColor: "#735BF2",
//           selectedDayTextColor: "#FFFFFF",
//           todayTextColor: "#0095FF",
//           dayTextColor: "#222B45",
//           textDisabledColor: "#D9E1E8",
//           arrowColor: "#7686DB",
//           monthTextColor: "#7686DB",
//           textDayFontFamily: "SF UI Text",
//           textMonthFontFamily: "SF UI Text",
//           textDayHeaderFontFamily: "SF UI Text",
//           textDayFontSize: 16,
//           textMonthFontSize: 18,
//           textDayHeaderFontSize: 14,
//         }}
//         current={formatDate(currentDate)}
//         onDayPress={handleDayPress}
//         markedDates={{
//           ...markedDates,
//           [selectedDate]: { selected: true, selectedColor: "#735BF2" },
//         }}
//         onMonthChange={(month) => {
//           const newDate = new Date(month.year, month.month - 1, 1);
//           setCurrentDate(newDate); // 달이 변경될 때 currentDate 업데이트
//         }}
//         enableSwipeMonths={true}
//       />
//       <BloodPressure />
//       <BloodSugar />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#AFB8DA", // 배경색
//     padding: 10,
//   },
//   header: {
//     padding: 10,
//     alignItems: "center",
//     backgroundColor: "#7686DB",
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 18,
//     color: "#FFFFFF",
//     fontWeight: "bold",
//   },
//   calendar: {
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default HealthCalendar;
/////////////////////////////////////


import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import BloodPressure from '@/components/BloodPressure';
import BloodSugar from '@/components/BloodSugar';
import axios from 'axios';

const HealthCalendar = ({ userId = 1 }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = formatDate(currentDate);
        const response = await axios.get(`http://localhost:8080/api/calendar/${userId}`, {
          params: { date: formattedDate },
          withCredentials: true,
        });

        const fetchedData = response.data || [];
        const marks = {};
        fetchedData.forEach((item) => {
          item.target.forEach((target) => {
            marks[target.targetMonth] = {
              marked: true,
              dotColor: '#735BF2',
            };
          });
        });
        setMarkedDates(marks);
      } catch (error) {
        console.error('데이터 가져오기 실패: ', error);
        Alert.alert('데이터 오류', '캘린더 데이터를 가져오는 중 문제가 발생했습니다.');
      }
    };

    fetchData();
  }, [userId, currentDate]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // const nextMonth = () => {
  //   const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  //   setCurrentDate(next);
  // };

  // const prevMonth = () => {
  //   const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  //   setCurrentDate(prev);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {currentDate.toLocaleString('ko-KR', { year: 'numeric', month: 'long' })}
        </Text>
      </View>
      <Calendar
        style={styles.calendar}
        current={formatDate(currentDate)}
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: '#735BF2' },
        }}
        enableSwipeMonths={true}
      />
      {selectedDate && (
        <>
          <BloodPressure selectedDate={selectedDate} userId={userId} />
          <BloodSugar selectedDate={selectedDate} userId={userId} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFB8DA',
    padding: 10,
  },
  header: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#7686DB',
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  calendar: {
    borderRadius: 10,
  },
});

export default HealthCalendar;






