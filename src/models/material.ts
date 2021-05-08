import mongoose, {Schema,model, Model} from "mongoose";

import {material} from "./types";

const materielsSchema:Schema= new Schema({
    name: {
        type: String,
    },
    title: {

        type: String,
    },
    body: {
        type: String
    },
    fileUrl: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "fileUrls"
    }]
});

const materiels:Model<material> = model<material>("materiels",materielsSchema);

export default materiels;
