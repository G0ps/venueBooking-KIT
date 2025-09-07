import bookingModel from "../database/models/booking.js";

export const bookingTimeValidator = async (venueId, s, e) => {
  // Get all booked timings
  let startTime = new Date(s);
  let endTime = new Date(e);
  console.log(startTime , " : " , endTime);
  const data = await bookingModel.find({
    venueId: venueId,
    bookingStatus: {$in : ["BOOKED"]}
  }).select("timeData");

  for (let d of data) {
    let start = new Date(d.timeData.startTime);
    let end = new Date(d.timeData.endTime);
    // console.log("check : " , start ,  " : ",end);
    // check overlap
    if (startTime <= end && start <= endTime) {
      return false; // overlap found
    }
  }

  return true; // no overlap
};
