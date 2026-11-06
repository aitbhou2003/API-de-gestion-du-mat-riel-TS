import mongoose, { Document, Schema } from "mongoose";

export interface ILoan extends Document {
  equipmetId: Schema.Types.ObjectId;
  status: "ongoing" | "returned";
  returnedAt: Date;
}

const loanSchema = new Schema<ILoan>({
  equipmetId: {
    type: Schema.Types.ObjectId,
    ref: "Equipment",
  },

  status: {
    type: String,
    enum: ["ongoing", "returned"],
    required: true,
  },

  returnedAt: {
    type: Date,
    default: null,
  },
});

const Loan = mongoose.model<ILoan>("Loan", loanSchema);


export default Loan 