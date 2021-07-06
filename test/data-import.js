function dataImport(db, mockDataFilePath, doneCallback) {

  const { students, courses, instructors } = require(mockDataFilePath) // 

  const studentsCollection = db.collection('students');
  const coursesCollection = db.collection('courses');
  const instructorsCollection = db.collection('instructors');

  studentsCollection.insertMany(students, function (err,result) {
    coursesCollection.insertMany(courses, function (err, result) {
      instructorsCollection.insertMany(instructors, function (err,result) {
        doneCallback();
      });
    });
  });
}

module.exports = dataImport;
