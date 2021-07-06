const coursesData = require('../test/data.json')

async function produceReport(db, callback) {
  const students = db.collection('students')
  const courses = db.collection('courses')
  const instructors = db.collection('instructors')
  const coursereport = db.collection('coursereport')
  
  let studentsArr = []
  let students_data = []

  for (let i = 0; i < coursesData.students.length; i++) {
    studentsArr.push(coursesData.students[i]._id);
    students_data.push({
      _id: coursesData.students[i]._id,
      value: {
        name: coursesData.students[i].name.first + ' ' + coursesData.students[i].name.last,
        numbercourses: 0,
      },
    })
  }


  for (let j = 0; j < studentsArr.length; j++) {
    for (let i = 0; i < coursesData.courses.length; i++) {
      if (coursesData.courses[i].students.includes(studentsArr[j])) {
        let x = students_data.find(el => el._id === studentsArr[j]);
        x.value.numbercourses += 1;
        students_data = students_data.filter(student => {
          return student._id !== studentsArr[j]
        });
        students_data.push(x);
      }
    }
  }
  coursereport.insertMany(students_data);

  callback(coursereport)
}

module.exports = produceReport
