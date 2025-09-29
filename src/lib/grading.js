

// Anna University Grading Scale
export const annaGradeScale = [
  { grade: 'O', minMarks: 90, maxMarks: 100, gradePoint: 10 },
  { grade: 'A+', minMarks: 80, maxMarks: 89, gradePoint: 9 },
  { grade: 'A', minMarks: 70, maxMarks: 79, gradePoint: 8 },
  { grade: 'B+', minMarks: 60, maxMarks: 69, gradePoint: 7 },
  { grade: 'B', minMarks: 55, maxMarks: 59, gradePoint: 6 },
  { grade: 'C', minMarks: 50, maxMarks: 54, gradePoint: 5 },
  { grade: 'RA', minMarks: 0, maxMarks: 49, gradePoint: 0 },
];

// University of Madras Grading Scale
export const madrasGradeScale = [
  { grade: 'O', minMarks: 90, maxMarks: 100, gradePoint: 10 },
  { grade: 'A+', minMarks: 80, maxMarks: 89, gradePoint: 9 },
  { grade: 'A', minMarks: 70, maxMarks: 79, gradePoint: 8 },
  { grade: 'B+', minMarks: 60, maxMarks: 69, gradePoint: 7 },
  { grade: 'B', minMarks: 50, maxMarks: 59, gradePoint: 6 },
  { grade: 'C', minMarks: 40, maxMarks: 49, gradePoint: 5 },
  { grade: 'F', minMarks: 0, maxMarks: 39, gradePoint: 0 },
];

export const getGradeScale = (university) => {
  return university === 'anna' ? annaGradeScale : madrasGradeScale;
};

export const getGradeFromMarks = (marks, university) => {
  const gradeScale = getGradeScale(university);
  const gradeInfo = gradeScale.find(scale => marks >= scale.minMarks && marks <= scale.maxMarks);
  return gradeInfo ? { grade: gradeInfo.grade, gradePoint: gradeInfo.gradePoint } : { grade: 'RA', gradePoint: 0 };
};

export const calculateSGPA = (subjects) => {
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
  const totalGradePoints = subjects.reduce((sum, subject) => sum + (subject.credits * (subject.gradePoint || 0)), 0);
  return totalCredits > 0 ? Number((totalGradePoints / totalCredits).toFixed(2)) : 0;
};

export const calculateCGPA = (semesters) => {
  const totalCredits = semesters.reduce((sum, semester) => sum + semester.totalCredits, 0);
  const totalGradePoints = semesters.reduce((sum, semester) => sum + (semester.sgpa * semester.totalCredits), 0);
  return totalCredits > 0 ? Number((totalGradePoints / totalCredits).toFixed(2)) : 0;
};

export const sgpaToPercentage = (sgpa, university) => {
  // Anna University: Percentage = (SGPA - 0.5) * 10
  // University of Madras: Percentage = SGPA * 9.5
  if (university === 'anna') {
    return Number(((sgpa - 0.5) * 10).toFixed(2));
  } else {
    return Number((sgpa * 9.5).toFixed(2));
  }
};

export const getMotivationalQuote = (sgpa) => {
  if (sgpa >= 9) {
    return "Excellence is not an act, but a habit! Keep up the outstanding work! 🌟";
  } else if (sgpa >= 7) {
    return "Good work! Keep pushing your limits and you'll achieve greatness! 💪";
  } else if (sgpa >= 5) {
    return "You're making progress! Every step forward counts. Keep learning! 📚";
  } else {
    return "Every master was once a beginner. Keep learning and never give up! 🚀";
  }
};

export const calculateRequiredExternalMarks = (
  internalMarks,
  totalInternalMarks,
  university
)=> {
  const gradeScale = getGradeScale(university);
  const maxExternalMarks = 100 - totalInternalMarks;
  
  return gradeScale.map(scale => {
    const requiredTotal = scale.minMarks;
    const requiredExternal = requiredTotal - internalMarks;
    
    let result;
    if (requiredExternal <= 0) {
      result = "Already Secured";
    } else if (requiredExternal > maxExternalMarks) {
      result = "Not Possible";
    } else {
      result = requiredExternal;
    }
    
    return {
      grade: scale.grade,
      requiredExternal: result
    };
  }).filter(item => item.grade !== 'RA' && item.grade !== 'F'); // Exclude fail grades
};