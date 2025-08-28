import bookingModel from "../booking.js"
export const bookingTimeValidator = async(venueId , startTime , endTime) => {
    const data = await bookingModel.find({
       venueId : venueId,
       bookingStatus : {$in : ["BOOKED" , "PENDING"]}
    }).select("timeData");

    console.log("timing Data : ",data);

    return true
}

/*
timing Data :  [
  {
    _id: new ObjectId('68b0a268353d4adf68454185'),
    timeData: {
      startTime: 2025-08-28T12:45:30.123Z,
      endTime: 2025-08-28T14:45:30.123Z,
      _id: new ObjectId('68b0a268353d4adf68454186')
    }
  },
  {
    _id: new ObjectId('68b0a2c1353d4adf6845418a'),
    timeData: {
      startTime: 2025-08-29T12:45:30.123Z,
      endTime: 2025-08-29T14:45:30.123Z,
      _id: new ObjectId('68b0a2c1353d4adf6845418b')
    }
  },
  {
    _id: new ObjectId('68b0a2f11412140fc3fb7bea'),
    timeData: {
      startTime: 2025-08-30T12:45:30.123Z,
      endTime: 2025-08-30T14:45:30.123Z,
      _id: new ObjectId('68b0a2f11412140fc3fb7beb')
    }
  }
]
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
[dotenv@17.2.1] injecting env (2) from .env -- tip: 📡 observe env with Radar: https://dotenvx.com/radar
✅ Server Listening
✅ MongoDB connected successfully
timing Data :  [
  {
    _id: new ObjectId('68b0a268353d4adf68454185'),
    eventName: 'Gobal Thiruvizah',
    description: 'Agilam kondadum ma berum thiruvizha',
    userId: new ObjectId('68b09250b7bf7d81da44aba5'),
    venueId: new ObjectId('68b098d36314afab6a3c6e04'),
    timeData: {
      startTime: 2025-08-28T12:45:30.123Z,
      endTime: 2025-08-28T14:45:30.123Z,
      _id: new ObjectId('68b0a268353d4adf68454186')
    },
    bookedAmenities: [ [Object] ],
    bookingStatus: 'PENDING',
    __v: 0
  },
  {
    _id: new ObjectId('68b0a2c1353d4adf6845418a'),
    eventName: 'Gobal Thiruvizah 2',
    description: 'Agilam kondadum ma berum thiruvizha',
    userId: new ObjectId('68b09250b7bf7d81da44aba5'),
    venueId: new ObjectId('68b098d36314afab6a3c6e04'),
    timeData: {
      startTime: 2025-08-29T12:45:30.123Z,
      endTime: 2025-08-29T14:45:30.123Z,
      _id: new ObjectId('68b0a2c1353d4adf6845418b')
    },
    bookedAmenities: [ [Object] ],
    bookingStatus: 'PENDING',
    __v: 0
  },
  {
    _id: new ObjectId('68b0a2f11412140fc3fb7bea'),
    eventName: 'Gobal Thiruvizah 2',
    description: 'Agilam kondadum ma berum thiruvizha',
    userId: new ObjectId('68b09250b7bf7d81da44aba5'),
    venueId: new ObjectId('68b098d36314afab6a3c6e04'),
    timeData: {
      startTime: 2025-08-30T12:45:30.123Z,
      endTime: 2025-08-30T14:45:30.123Z,
      _id: new ObjectId('68b0a2f11412140fc3fb7beb')
    },
    bookedAmenities: [ [Object] ],
    bookingStatus: 'PENDING',
    __v: 0
  }
]
timing Data :  [
  {
    _id: new ObjectId('68b0a268353d4adf68454185'),
    eventName: 'Gobal Thiruvizah',
    description: 'Agilam kondadum ma berum thiruvizha',
    userId: new ObjectId('68b09250b7bf7d81da44aba5'),
    venueId: new ObjectId('68b098d36314afab6a3c6e04'),
    timeData: {
      startTime: 2025-08-28T12:45:30.123Z,
      endTime: 2025-08-28T14:45:30.123Z,
      _id: new ObjectId('68b0a268353d4adf68454186')
    },
    bookedAmenities: [ [Object] ],
    bookingStatus: 'PENDING',
    __v: 0
  },
  {
    _id: new ObjectId('68b0a2c1353d4adf6845418a'),
    eventName: 'Gobal Thiruvizah 2',
    description: 'Agilam kondadum ma berum thiruvizha',
    userId: new ObjectId('68b09250b7bf7d81da44aba5'),
    venueId: new ObjectId('68b098d36314afab6a3c6e04'),
    timeData: {
      startTime: 2025-08-29T12:45:30.123Z,
      endTime: 2025-08-29T14:45:30.123Z,
      _id: new ObjectId('68b0a2c1353d4adf6845418b')
    },
    bookedAmenities: [ [Object] ],
    bookingStatus: 'PENDING',
    __v: 0
  },
  {
    _id: new ObjectId('68b0a2f11412140fc3fb7bea'),
    eventName: 'Gobal Thiruvizah 2',
    description: 'Agilam kondadum ma berum thiruvizha',
    userId: new ObjectId('68b09250b7bf7d81da44aba5'),
    venueId: new ObjectId('68b098d36314afab6a3c6e04'),
    timeData: {
      startTime: 2025-08-30T12:45:30.123Z,
      endTime: 2025-08-30T14:45:30.123Z,
      _id: new ObjectId('68b0a2f11412140fc3fb7beb')
    },
    bookedAmenities: [ [Object] ],
    bookingStatus: 'PENDING',
    __v: 0
  },
  {
    _id: new ObjectId('68b0a338bb5b8e1ee03bf444'),
    eventName: 'Gobal Thiruvizah 2',
    description: 'Agilam kondadum ma berum thiruvizha',
    userId: new ObjectId('68b09250b7bf7d81da44aba5'),
    venueId: new ObjectId('68b098d36314afab6a3c6e04'),
    timeData: {
      startTime: 2025-08-01T12:45:30.123Z,
      endTime: 2025-08-01T14:45:30.123Z,
      _id: new ObjectId('68b0a338bb5b8e1ee03bf445')
    },
    bookedAmenities: [ [Object] ],
    bookingStatus: 'PENDING',
    __v: 0
  }
] 
*/

