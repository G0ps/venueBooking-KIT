import mongoose from 'mongoose'
import { bookingTimeValidator } from './validators/booking.js'

const schema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  timeData: {
    type: {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true }
    },
    required: true
  },
  bookedAmenities: {
    type: [
      {
        typeId: { type: mongoose.Schema.Types.ObjectId, ref: 'amenity' },
        instanceId: { type: [Number] }
      }
    ]
  },
  bookingStatus: {
    type: String,
    enum: ['BOOKED', 'PENDING', 'COMPLETED', 'REJECTED'],
    default: 'PENDING'
  }
})

const model = mongoose.model('booking', schema, 'booking')

export default model
