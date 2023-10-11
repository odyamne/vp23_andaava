const semesterBegin = new Date('08/28/2023');
const today = new Date();
const semesterEnd = new Date('01/28/2024');
const semesterDuration = Math.floor((semesterEnd - semesterBegin) / (1000 * 60 * 60 * 24));
let semesterLastedFor = Math.floor((today.getTime() - semesterBegin.getTime()) / (1000 * 60 * 60 * 24));
let daysLeftSemester = semesterDuration-semesterLastedFor;
let endOutput;

if (semesterBegin > today){
    endOutput = "2023/2024 õppeaasta sügissemester pole veel peale hakanud.";
}
else if (semesterBegin < today && semesterEnd > today){
    endOutput = "Semester on kestnud " + semesterLastedFor + " päeva ja alles on jäänud " + daysLeftSemester + " päeva.";
    //console.log("Semester on kestnud " + semesterLastedFor + " päeva.");
    //console.log("Semestri kogupikkus päevades on " + semesterDuration);
    //console.log("Semestri lõpuni on jäänud " + daysLeftInSemester + " päeva!")
}
else if (semesterEnd < today){
    endOutput = "Semester on läbi!";
}



module.exports = {semesterBegin: semesterBegin, today: today, semesterEnd: semesterEnd, semesterDuration: semesterDuration, semesterLastedFor: semesterLastedFor, daysLeftSemester: daysLeftSemester, endOutput: endOutput};