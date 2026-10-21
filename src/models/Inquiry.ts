import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'General' | 'Sponsorship' | 'Ticketing' | 'Speaker Application' | 'Support';
  status: 'new' | 'in-progress' | 'resolved';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please enter your message'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
    },
    category: {
      type: String,
      enum: ['General', 'Sponsorship', 'Ticketing', 'Speaker Application', 'Support'],
      default: 'General',
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved'],
      default: 'new',
      index: true,
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = mongoose.model<IInquiry>('Inquiry', InquirySchema);
