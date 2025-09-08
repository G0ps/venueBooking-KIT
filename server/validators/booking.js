import bookingModel from "../database/models/booking.js";
import { ObjectId } from "../database/connectDb.js";

// ----------------- Venue Booking Time Validator -----------------
export const bookingTimeValidator = async (venueId, s, e) => {
  let startTime = new Date(s);
  let endTime = new Date(e);

  // fetch all existing bookings for this venue
  const data = await bookingModel.find({
    venueId,
    bookingStatus: { $in: ["BOOKED"] },
  }).select("timeData");

  // check overlap
  for (let d of data) {
    let start = new Date(d.timeData.startTime);
    let end = new Date(d.timeData.endTime);

    if (startTime <= end && start <= endTime) {
      return false; // overlap exists
    }
  }

  return true; // no overlap
};

// ----------------- Overlap Eliminator (rejects pending overlaps) -----------------
export const overlapEliminator = async (venueId, s, e) => {
  let startTime = new Date(s);
  let endTime = new Date(e);

  const data = await bookingModel.find({
    venueId,
    bookingStatus: { $in: ["PENDING"] },
  });

  let promises = [];

  for (let d of data) {
    let start = new Date(d.timeData.startTime);
    let end = new Date(d.timeData.endTime);

    if (startTime <= end && start <= endTime) {
      d.bookingStatus = "REJECTED";
      promises.push(d.save());
    }
  }

  await Promise.all(promises);
  return;
};

// ----------------- Amenity Overlap Checker -----------------
export const amenityOverlapChecker = async (instances, timeData) => {
  try {
    const instanceIds = instances.map((id) => new ObjectId(id));

    // Find all bookings that use any of these instances
    const data = await bookingModel.find({
      "bookedAmenities.instanceId": { $in: instanceIds },
      bookingStatus: "BOOKED",
    });

    let conflictingInstances = [];

    for (let d of data) {
      let start = new Date(d.timeData.startTime);
      let end = new Date(d.timeData.endTime);

      if (new Date(timeData.startTime) <= end && start <= new Date(timeData.endTime)) {
        for (let k of d.bookedAmenities) {
          if (instanceIds.some((obj) => obj.equals(k.instanceId))) {
            conflictingInstances.push(k.instanceId);
          }
        }
      }
    }

    // prepare response
    let ans = instanceIds.map((obj) => {
      if (conflictingInstances.some((conflict) => conflict.equals(obj))) {
        return { instanceId: obj, bookingStatus: "CANCELED" };
      } else {
        return { instanceId: obj, bookingStatus: "PENDING" };
      }
    });

    console.log("Conflicting:", conflictingInstances);
    console.log("Result:", ans);

    return ans;
  } catch (error) {
    console.log(error.message, "error");
    return [error.message];
  }
};

// ----------------- Amenity Booking Part -----------------
export const amenityBookingPart = async (instances, timeData) => {
  try {
    const instanceIds = instances.map((id) => new ObjectId(id));

    const data = await bookingModel.find({
      "bookedAmenities.instanceId": { $in: instanceIds },
      bookingStatus: "BOOKED",
    });

    let conflictingInstances = [];

    for (let d of data) {
      let start = new Date(d.timeData.startTime);
      let end = new Date(d.timeData.endTime);

      if (new Date(timeData.startTime) <= end && start <= new Date(timeData.endTime)) {
        for (let k of d.bookedAmenities) {
          if (instanceIds.some((obj) => obj.equals(k.instanceId))) {
            conflictingInstances.push(k.instanceId);
          }
        }
      }
    }

    let ans = instanceIds.map((obj) => {
      if (conflictingInstances.some((conflict) => conflict.equals(obj))) {
        return { instanceId: obj, bookingStatus: "CANCELED" };
      } else {
        return { instanceId: obj, bookingStatus: "BOOKED" };
      }
    });

    console.log("Conflicting:", conflictingInstances);
    console.log("Result:", ans);

    return ans;
  } catch (error) {
    console.log(error.message, "error");
    return [error.message];
  }
};
