import mongoose, { Document, Schema } from 'mongoose';

export interface ISearchHistory extends Document {
  city: string;
  country: string;
  createdAt?: Date;
}

const searchHistorySchema: Schema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SearchHistory = mongoose.model<ISearchHistory>('SearchHistory', searchHistorySchema);

export default SearchHistory;