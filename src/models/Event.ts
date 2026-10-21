import mongoose, { Document, Schema } from 'mongoose';

export interface ISpeaker {
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface IAgendaItem {
  time: string;
  topic: string;
  speaker: string;
}

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  price: number;
  date: Date;
  endDate?: Date;
  time: string;
  location: string;
  isVirtual: boolean;
  images: string[];
  featuredImage: string;
  capacity: number;
  ticketsSold: number;
  speakers: ISpeaker[];
  agenda: IAgendaItem[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  organizer: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SpeakerSchema = new Schema<ISpeaker>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  avatar: { type: String, required: true },
});

const AgendaItemSchema = new Schema<IAgendaItem>({
  time: { type: String, required: true },
  topic: { type: String, required: true },
  speaker: { type: String, required: true },
});

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a detailed event description'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short summary description'],
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please specify an event category'],
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Please specify a ticket price (0 for free)'],
      min: [0, 'Price cannot be negative'],
      index: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide event start date'],
      index: true,
    },
    endDate: {
      type: Date,
    },
    time: {
      type: String,
      required: [true, 'Please provide event time schedule (e.g. 09:00 AM - 05:00 PM EST)'],
    },
    location: {
      type: String,
      required: [true, 'Please provide venue location or "Virtual Online"'],
    },
    isVirtual: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      validate: {
        validator: function (val: string[]) {
          return val && val.length > 0;
        },
        message: 'At least one image is required for gallery',
      },
    },
    featuredImage: {
      type: String,
      required: [true, 'Please provide a primary cover image'],
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide max event capacity'],
      min: [1, 'Capacity must be at least 1'],
    },
    ticketsSold: {
      type: Number,
      default: 0,
    },
    speakers: [SpeakerSchema],
    agenda: [AgendaItemSchema],
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
      index: true,
    },
    organizer: {
      type: String,
      default: 'EventPulse Global',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search
EventSchema.index({ title: 'text', description: 'text', shortDescription: 'text', location: 'text' });

export const Event = mongoose.model<IEvent>('Event', EventSchema);
