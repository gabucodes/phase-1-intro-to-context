// Your code here
 let payrollSystem
const list = ["jamie", "Lanister", "kingsGuard",150]

 function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents:[],
    timeOutEvents:[]

}
 }

 //let twoRows = [[firstName, familyName, title, payPerHour],
   // [firstName, familyName, title, payPerHour] ]

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord)
}
  

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" "); // Split the date stamp into date and time

    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10), // Convert the time to a number
      date: date // Use the date part
    });
  
    return employeeRecord;
  }


  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",  
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)

    const timeInHour = timeInEvent.hour;
  const timeOutHour = timeOutEvent.hour;
  const hoursWorked = (timeOutHour - timeInHour) / 100

  return hoursWorked

  }


  function wagesEarnedOnDate(employeeRecord, date) {
    // Get the hours worked on the given date
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  
    // Calculate pay owed by multiplying hours worked by pay rate
    const payOwed = hoursWorked * employeeRecord.payPerHour;
  
    return payOwed;
  }



  function allWagesFor(employeeRecord) {
    // Extract all unique dates from the timeInEvents array
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    // Calculate total wages by summing up wages for each date
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return totalWages;
  }



  function calculatePayroll(employeeRecords) {
    // Calculate total payroll by summing up wages for all employees
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
      return total + allWagesFor(employeeRecord);
    }, 0);
  
    return totalPayroll;
  }